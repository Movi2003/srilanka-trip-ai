// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import User from '@/lib/models/User';
import { connectToDatabase } from '@/lib/utils/db';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await connectToDatabase();
        const user = await User.findOne({ email: credentials?.email });
        if (user && bcrypt.compareSync(credentials?.password || '', user.password)) {
          return { id: user._id.toString(), name: user.name, email: user.email };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt' as const,  // Explicitly type as 'jwt' to satisfy SessionStrategy
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };