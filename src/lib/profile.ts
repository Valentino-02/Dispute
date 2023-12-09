// This file could be in the services folder,
// but since it heavily depends on the clerck library it lives here.

import { currentUser, redirectToSignIn, auth } from '@clerk/nextjs'

import { db } from '@/lib/db'

export async function tryCreateProfile() {
  const user = await currentUser()

  if (!user) {
    return redirectToSignIn()
  }

  const profile = await db.profile.findUnique({
    where: {
      userId: user.id,
    },
  })

  if (profile) {
    return profile
  }

  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  })

  return newProfile
}

export const getProfile = async () => {
  const { userId } = auth()

  if (!userId) {
    return null
  }

  const profile = await db.profile.findUnique({
    where: {
      userId,
    },
  })

  return profile
}
