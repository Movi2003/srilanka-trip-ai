// app/api/register/route.ts
import { connectToDatabase } from '@/lib/utils/db';
import User from '@/lib/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  await connectToDatabase();

  const { name, email, password } = await req.json();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return new Response('Email is already in use', { status: 400 });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = new User({ name, email, password: hashedPassword });
  await newUser.save();

  return new Response('User registered', { status: 200 });
}