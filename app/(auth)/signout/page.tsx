'use client'

import { useEffect } from 'react'
import { signOut } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'

export default function SignOutPage() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/unauthorized'

  useEffect(() => {
    signOut({ callbackUrl })
  }, [callbackUrl])

  return (
    <div className="flex min-h-screen items-center justify-center bg-(--cream)">
      <div className="text-stone-600 animate-pulse">Signing out...</div>
    </div>
  )
}
