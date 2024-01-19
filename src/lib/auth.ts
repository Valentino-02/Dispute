import { createUser, getUserExists } from '@/services/auth'
import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      let userExists = await getUserExists(user.id)
      if (userExists) return true
      let newUser = await createUser(user)
      if (newUser) return true
      return false
    },
    jwt({ token, user }) {
      if (user) {
        return { ...token, id: user.id }
      }
      return token
    },
    async session({ token, session }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      }
    },
  },
}
