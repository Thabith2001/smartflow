'use server';

import { userRepository } from '@/repositories/user.repository';
import bcrypt from 'bcryptjs';
import { encryptSSN } from '@/util/encrypt';
import type { userRegister } from '@/app/auth/signup/page';

export async function registerUser(data: userRegister) {
  const {
    name,
    email,
    phone,
    homeAddress,
    ssn,
    role,
    password,
    confirmPassword,
  } = data;

  //  Business rules
  if (password !== confirmPassword) {
    throw new Error('Passwords do not match');
  }

  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters');
  }

  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    throw new Error('Email already registered');
  }

  //  Security
  const hashedPassword = await bcrypt.hash(password, 10);
  const encryptedSSN = encryptSSN(ssn);

  const user = await userRepository.create({
    name,
    email,
    phone,
    homeAddress,
    ssn: encryptedSSN,
    role,
    password: hashedPassword,
  });

  //  RETURN A SAFE DTO (NOT DB OBJECT)
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
  };
}
