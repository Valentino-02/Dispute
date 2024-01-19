import { db } from '@/lib/db'
import { User } from 'next-auth'

export async function getUserExists(userId: string) {
  const profile = await db.profile.findUnique({
    where: {
      userId: userId,
    },
  })

  if (profile) return true
  return false
}

export async function createUser(user: User) {
  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: user.name ?? '',
      imageUrl: user.image ?? '',
      email: user.email ?? '',
    },
  })

  return newProfile
}
