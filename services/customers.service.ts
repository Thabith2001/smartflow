import { customerRepository } from '@/repositories/customer.repository';

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status?: string;
  createdAt?: Date;
};

export async function getCustomers(): Promise<Customer[]> {
  try {
    return await customerRepository.findAll();
  } catch (err) {
    console.error('getCustomers error', err);
    return [];
  }
}
