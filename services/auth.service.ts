'use server';

import bcrypt from 'bcryptjs';
import { accountsRepository } from '@/repositories/accounts.repository';


import { createSession } from '@/util/session';
import { toSafeUser } from '@/dto/user.dto';
import { userLogin, userRegister } from '@/types/users.type';


export async function registerUser(data: userRegister) {
  const {
    name,
    email,
    phone,
    homeAddress,
    role,
    password,
    confirmPassword,
  } = data;

  if (password !== confirmPassword) {
    throw new Error('Passwords do not match');
  }

  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters');
  }

  if (await accountsRepository.findByEmail(email)) {
    throw new Error('Email already registered');
  }

  const user = await accountsRepository.create({
    name,
    email,
    phone,
    homeAddress,
    role,
    password: await bcrypt.hash(password, 10),
  });

  await createSession(user);
  return toSafeUser(user);
}


export async function loginUser(credentials: userLogin) {
  const user = await accountsRepository.findByEmail(credentials.email);
  if (!user) throw new Error('Invalid credentials');

  const valid = await bcrypt.compare(
    credentials.password,
    user.password,
  );
  if (!valid) throw new Error('Invalid credentials');

  await createSession({
    _id: user?._id,
    role: user?.role,
  });

  return toSafeUser({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  });
}
