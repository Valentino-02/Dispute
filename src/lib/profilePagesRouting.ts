// Only use this in the api routes, provided by the pages router folder.

import { NextApiRequest } from 'next'
import { getAuth } from '@clerk/nextjs/server'

import { db } from '@/lib/db'

export default async function getProfile(req: NextApiRequest) {
  const { userId } = getAuth(req)

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
