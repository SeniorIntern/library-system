'use client'
import { Flex, Switch, Text } from '@radix-ui/themes'
import Link from 'next/link'
import useUserStore from './store'
import { useRouter } from 'next/navigation'

const NavBar = () => {
  const router = useRouter()
  const { token, setToken } = useUserStore()

  return (
    <nav className='flex justify-between border-b border-black px-5 py-3 mb-10'>
      <div className='space-x-6'>
        <Link href={'/'}>
          <Text>Home</Text>
        </Link>

        {
          token &&
          <Link href={'/books/new'}>
            <Text>New Book</Text>
          </Link>
        }
      </div>
      <Text as="label" size="2">
        <Flex className='flex space-x-6'>
          <Switch defaultChecked mr='1' />Dark Mode
          <div>
            {token
              ?
              <Text size='2' onClick={() => {
                setToken("")
                router.push('/')
              }}>Log Out</Text>
              :
              <Link href='/login'>
                <Text size='2'>Log In</Text>
              </Link>
            }
          </div>
        </Flex>
      </Text>
    </nav>
  )
}

export default NavBar
