'use client'

import { Button, Flex, Text } from '@radix-ui/themes'
import Link from 'next/link'
import useUserStore from './store'
import { redirect } from 'next/navigation'
import HydrationZustand from './HydrationZustand'

const NavBar = () => {
  const { token, setToken } = useUserStore()

  return (
    <HydrationZustand>
      <nav className='flex justify-between border-b border-black px-5 py-3 mb-10'>
        <div className='flex space-x-6 items-center'>
          <Link href={'/'}>
            <Text>Home</Text>
          </Link>
          {
            token &&
            <>
              <Link href={'/books'}>
                <Text>Manage Books</Text>
              </Link>
              <Link href={'/rentals'}>
                <Text>Rentals</Text>
              </Link>
              <Link href={'/returns'}>
                <Text>Returns</Text>
              </Link>
              <Link href={'/register'}>
                <Text>Register</Text>
              </Link>
            </>
          }
        </div>
        <Text as="label" size="2">
          <Flex className='flex space-x-6 items-center'>
            <div>
              {token
                ?
                <Button onClick={() => {
                  setToken("")
                  redirect('/')
                }}>Log Out</Button>
                :
                <Link href='/login'>
                  <Button>Log In</Button>
                </Link>
              }
            </div>
          </Flex>
        </Text>
      </nav>
    </HydrationZustand>
  )
}

export default NavBar
