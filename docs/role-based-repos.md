# Role-based Repositories & Auth Refactor

Date: 2026-03-07
Author: (backend refactor)

Overview
--------
This document summarizes the backend refactor that replaced a single legacy `user.repository` pattern with role-specific repositories and supporting services for the four user roles in the system: `customer`, `vendor`, `manager`, and `admin`.

Goals
-----
- Improve domain clarity by separating role responsibilities.
- Preserve existing data (keep the `users` collection) to avoid an immediate DB migration.
- Provide clear repository/service contracts so future role-specific business logic can be implemented safely.
- Update auth flows to be role-aware while keeping authentication behavior (password hashing, sessions) centralized.

Scope
-----
Files added (examples):
- `repositories/customers.repository.ts`
- `repositories/vendors.repository.ts`
- `repositories/managers.repository.ts`
- `repositories/admins.repository.ts`
- `services/customers.service.ts` (example)
- `app/api/customers/[id]/route.ts` (example API route)

Files modified (example):
- `services/auth.service.ts` — now routes registration/login through role-aware repositories.

NOTE: `repositories/user.repository.ts` (legacy) is retained until CI/build passes and no references remain.

Design summary
--------------
Storage strategy
- We reuse a single `users` collection in MongoDB for now. The role-specific repositories act as thin wrappers and always include `{ role: '<role>' }` in queries. This avoids immediate data migration and minimizes risk.

Repository responsibilities
- Encapsulate DB access and enforce role-filtering for every operation.
- Provide CRUD operations focused on a role's users.

Service responsibilities
- Implement business logic, validation, mapping DTOs, and any role-specific permissions.
- Call the role repository and strip sensitive fields before returning to callers.

Auth responsibilities
- Centralized in `services/auth.service.ts`:
  - Registration delegates creation to the appropriate role repository based on the `role` field in the incoming payload.
  - Login uses a helper `findUserByEmailAcrossRoles(email)` that checks role repositories in a defined order and returns the first match.
  - Password hashing, session creation, and safe-user mapping remain centralized in the auth service.

Repository contract (per role)
-----------------------------
Path: `repositories/<role>.repository.ts` (e.g., `repositories/customers.repository.ts`)

Expected exports and method signatures:
- findById(id: string): Promise<UserDocument | null>
- findByEmail(email: string): Promise<UserDocument | null>
- findAll(filter?: Partial<UserFilter>): Promise<UserDocument[]>
- create(payload: CreateUserPayload): Promise<UserDocument>
- update(id: string, updates: Partial<CreateUserPayload>): Promise<UserDocument | null>
- delete(id: string): Promise<boolean>

Implementation notes:
- Use `getDb()` from `lib/mongodb.ts` to access the DB.
- All queries include `{ role: '<role>' }`.
- On create, set `role`, and set `createdAt`/`updatedAt` timestamps.

Service contract (per role)
---------------------------
Path: `services/<role>.service.ts` (e.g., `services/customers.service.ts`)

Suggested methods:
- getById(id: string): Promise<SafeUser | null>
- list(filter, paging)
- create(data)
- update(id, data)

Responsibilities:
- Validation and mapping to DTOs.
- Call repository methods.
- Remove sensitive fields (password, tokens) from responses.

Auth flow details
-----------------
Registration
- Incoming payload must include `role` (one of `customer | vendor | manager | admin`).
- `services/auth.service.ts` will:
  - Validate payload.
  - Check for existing user across roles using `findUserByEmailAcrossRoles`.
  - Hash password (bcrypt).
  - Call the role repository `create()`.
  - Create session and return `toSafeUser(user)`.

Login
- `services/auth.service.ts` will:
  - Use `findUserByEmailAcrossRoles(email)` to locate the user.
  - Compare password with bcrypt.
  - Create session and return `toSafeUser(user)`.

Handling email uniqueness
- The auth service should check for existing email across all roles before creating a new account.
- Recommended: add a unique index on `users.email` in the DB to enforce global uniqueness.

Example API: GET customer by id
------------------------------
File: `app/api/customers/[id]/route.ts` (Next.js App Router API route)
Behavior:
- Validate `id` param; return 400 on invalid format.
- Call `services/customers.service.ts -> getById(id)`.
- If not found: return 404.
- Return 200 JSON with the safe user object (no `password`).

Commands & checklist for applying/refining changes
-------------------------------------------------
Search for legacy references (run from repo root):

```bash
grep -Rn "repositories/user.repository" . || true
grep -Rn "userRepository" . || true
grep -Rn "from '@/repositories/user" . || true
```

Iterative implementation checklist:
1. Add role-specific repositories (wrap `users` collection + role filter).
2. Add role services (validation + mapping).
3. Update `services/auth.service.ts`:
   - Add `findUserByEmailAcrossRoles` helper.
   - Route registration to the matching role repo.
4. Run type-check and build frequently:

```bash
npx tsc -p tsconfig.json --noEmit
npm run build
```

5. Replace any remaining imports that reference the legacy `user.repository`.
6. When CI/build is green and all tests pass: remove `repositories/user.repository.ts`.

To delete legacy repository only after verification:

```bash
git rm repositories/user.repository.ts
git commit -m "chore(repos): remove legacy user.repository after role-based refactor"
```

Testing & verification
----------------------
Unit tests (recommended):
- Repositories: create, findById, update, delete lifecycle tests (use mocked `getDb()` or a test Mongo instance).
- Auth service: mock repositories to verify register/login routing and error cases.

Integration smoke test:
- Start dev server: `npm run dev`.
- Call endpoint:

```bash
curl -i http://localhost:3000/api/customers/<id>
```

Expect:
- 200 with safe user object (no password) if user exists for that role.
- 404 if not found.

Edge cases to cover
- Missing or invalid `role` during registration: return 400.
- Duplicate email across roles: prevent registration if email exists anywhere.
- Invalid ObjectId strings: return 400.
- Race conditions: enforce DB-level unique index on `email`.

PR and commit messages
----------------------
Single-line commit (short):

```
feat(auth): add role-specific repositories (customer/vendor/manager/admin) and wire auth
```

Multi-line commit (detailed):

```
Replace legacy `repositories/user.repository.ts` with role-specific repositories:
`repositories/customers.repository.ts`, `repositories/vendors.repository.ts`,
`repositories/managers.repository.ts`, and `repositories/admins.repository.ts`.

- Auth flows now route registration/login through the new role-aware repositories.
- New `services/customers.service.ts` and example API route `app/api/customers/[id]/route.ts`.
- Repositories reuse the existing `users` collection and enforce `role` filtering (no DB migration).
- Legacy `repositories/user.repository.ts` retained until CI passes and all references are updated.
```

PR description template (paste into GitHub):
- Title: Refactor: role-specific repositories and auth wiring
- Summary: Introduce role-specific repositories for `customer`, `vendor`, `manager`, and `admin` and update auth wiring.
- Why: Improves domain clarity, prepares for role-specific logic, avoids immediate DB migration.
- What changed: list new/modified files and testing commands (see above).

Risks & rollback
-----------------
Risks:
- Missed references to `user.repository` can break the build. Mitigation: exhaustive grep and type-check before deletion.
- Duplicate emails across roles. Mitigation: global unique index on `users.email` and pre-checks in auth service.
- If you switch to separate collections later, you'll need a data migration plan.

Rollback:
- Keep the legacy `repositories/user.repository.ts` in Git until final cleanup commit.
- Revert to the previous commit if critical failures appear: `git revert <commit-hash>` or roll back the PR.

Next steps and recommendations
------------------------------
1. Add unit tests for the new repositories and services.
2. Add CI check that runs a grep for `user.repository` to prevent premature deletion.
3. Consider a DB migration plan if you later want separate collections per role.
4. Add documentation comments inside each new repository and service file to make intent explicit.

Contacts / reviewers
- Backend owner(s) who maintain `services/auth.service.ts`.
- QA to smoke-test registration/login flows and role pages.
- Devops/DB owner if you add DB indexes or migration steps.

If you want, I can:
- Generate the repository and service source files for you and run type-check/build in this workspace.
- Produce unit test skeletons for the repositories and auth service.

— End of document —

