import { getDb } from '@/lib/mongodb';
import { Document, ObjectId } from 'mongodb';

type DbUser = Document & {
  _id: ObjectId;
  name?: string;
  email?: string;
  phone?: string;
  status?: string;
  createdAt?: Date;
  homeAddress?: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status?: string;
  createdAt?: Date;
  location?: string;
};

export const customerRepository = {
  async findAll(): Promise<Customer[]> {
    const db = await getDb();
    const docs = (await db
      .collection('users')
      .find({ role: 'CUSTOMER' })
      .project({ name: 1, email: 1, phone: 1, status: 1, createdAt: 1, homeAddress: 1 })
      .toArray()) as DbUser[];

    return docs.map((d) => ({
      id: d._id?.toString(),
      name: d.name || '',
      email: d.email || '',
      phone: d.phone,
      status: d.status || 'Active',
      createdAt: d.createdAt,
      location: d.homeAddress || '',
    }));
  },

  async findById(id: string) {
    const db = await getDb();
    const d = (await db.collection('users').findOne({ _id: new ObjectId(id), role: 'CUSTOMER' })) as DbUser | null;
    if (!d) return null;
    return {
      id: d._id?.toString(),
      name: d.name || '',
      email: d.email || '',
      phone: d.phone,
      status: d.status || 'Active',
      createdAt: d.createdAt,
      location: d.homeAddress || '',
    } as Customer;
  },
};
