'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'

export default function SignInBtn() {
  const [loading, setLoading] = useState(false)

  const onClick = () => {
    setLoading(true)
    signIn()
  }

  return (
    <div className="flex flex-row">
      <button
        onClick={() => onClick()}
        disabled={loading}
        className="px-6 py-4 text-4xl font-semibold transition duration-500 rounded-lg hover:cursor-pointer bg-main-yellow text-background hover:text-white"
      >
        Sign In!
      </button>

      {loading && (
        <Loader2 className="my-4 h-7 w-7 text-zinc-500 animate-spin" />
      )}
    </div>
  )
}
