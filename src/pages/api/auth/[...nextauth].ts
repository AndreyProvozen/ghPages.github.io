import type { AuthOptions, ISODateString } from 'next-auth';
import NextAuth from 'next-auth/next';
import FacebookProvider from 'next-auth/providers/facebook';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

import User from '@/models/User';

declare module 'next-auth' {
  interface Session {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      provider?: string;
      userLinks?: string[];
    };
    expires: ISODateString;
  }
}

export const authConfig: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID ?? '',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? '',
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
  ],
  pages: {
    signIn: '/auth',
  },
  secret: process.env.NEXTAUTH_SECRET ?? '',
  jwt: {
    secret: process.env.NEXTAUTH_SECRET ?? '',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (account.type === 'oauth') {
        return await signInWithOAuth({ account, profile });
      }

      return true;
    },
    async session({ session, token }) {
      session.user = token.user;

      return session;
    },
    async jwt({ token }) {
      const user = await getUserByEmail({ email: token.email });
      token.user = user;

      return token;
    },
  },
};

export default NextAuth(authConfig);

const signInWithOAuth = async ({ account, profile }) => {
  const user = await User.findOne({ email: profile.email });
  if (user) return true;

  const newUser = new User({
    name: profile.name,
    email: profile.email,
    image: account?.provider !== 'github' ? profile.picture : profile.avatar_url,
    provider: account.provider,
  });

  await newUser.save();

  return true;
};
const getUserByEmail = async ({ email }) => {
  const user = await User.findOne({ email }).select('-password');
  if (!user) throw new Error('Email does not exist');
  return { ...user._doc, _id: user._id.toString() };
};
