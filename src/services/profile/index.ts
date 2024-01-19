import { getServerSession } from 'next-auth/next'
import { NextApiRequest } from 'next'

import { NextApiResponseServerIo } from '@/types'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export const getProfile = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    return null
  }

  let userId = session.user.id

  const profile = await db.profile.findUnique({
    where: {
      userId,
    },
  })

  return profile
}

export const getProfileFromPagesApi = async (
  req: NextApiRequest,
  res: NextApiResponseServerIo
) => {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return null
  }

  let userId = session.user.id

  const profile = await db.profile.findUnique({
    where: {
      userId,
    },
  })

  return profile
}
