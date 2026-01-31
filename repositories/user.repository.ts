import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export const userRepository = {
  async findByEmail(email: string) {
    const db = await getDb();
    return await db.collection("users").findOne({ email });
  },

  async create(user: {
    name: string;
    email: string;
    phone: string;
    homeAddress: string;
    ssn: string;
    role: string;
    password: string;
  }) {
    const db = await getDb();

    const result = await db.collection("users").insertOne({
      ...user,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return {
      _id: result.insertedId,
      ...user,
    };
  },

  async findById(id: string) {
    const db = await getDb();
    return await db
      .collection("users")
      .findOne({ _id: new ObjectId(id) });
  },
};
