'use client'

import { signOut, useSession } from 'next-auth/react'

const SignOutBtn = () => {
  const { data: session } = useSession()

  const onClick = async () => {
    await signOut({
      callbackUrl: '/',
    })
  }

  if (session) {
    return <button onClick={() => onClick()}>OUT</button>
  }
  return <></>
}

export default SignOutBtn
