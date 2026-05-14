// app/api/forgot-password/route.ts
import { connectToDatabase } from '@/lib/utils/db';
import User from '@/lib/models/User';

export async function POST(req: Request) {
  await connectToDatabase();

  const { email } = await req.json();

  const user = await User.findOne({ email });
  if (!user) {
    return new Response('Email not found', { status: 400 });
  }

  // Here, you would send a reset email (use nodemailer or similar – add later)
  console.log(`Reset link sent to ${email}`); // Mock for now

  return new Response('Reset link sent', { status: 200 });
}