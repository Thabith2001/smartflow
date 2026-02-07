import { DbUser, SafeUser} from '@/types/users.type';

export function toSafeUser(
  user: Pick<DbUser, '_id' | 'name' | 'email' | 'role'>
): SafeUser {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
  };
}


