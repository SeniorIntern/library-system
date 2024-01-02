'use client'

import { Text } from '@radix-ui/themes'
import React, { useEffect } from 'react'
import useUserStore from '../store'
import { redirect } from 'next/navigation'
import Link from 'next/link'

function page() {
  const { token } = useUserStore()
  useEffect(() => {
    if (!token) return redirect('/')
  }, [token])

  const bookLinks = [
    { id: 1, label: "New Book", href: "/books/new" },
    { id: 2, label: "Update", href: "/books/update" },
    { id: 3, label: "Delete", href: "/books/delete" },
    { id: 4, label: "Rent Book", href: "/books/rent" },
  ]

  return (
    <div className='flex min-h-[70vh] w-full justify-center items-center'>
      <section className="grid grid-cols-2 gap-6 p-4 md:p-6">
        {bookLinks.map(bl =>
        (
          <Link href={bl.href} key={bl.id}>
            <div className="flex items-center justify-center bg-gray-200 rounded-lg shadow-md h-32 w-44">
              <Text className="text-lg font-bold text-center">{bl.label}</Text>
            </div>
          </Link>
        )
        )}
      </section>
    </div>
  )
}

export default page
