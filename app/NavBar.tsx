import { Flex, Switch, Text } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const NavBar = () => {
  return (
    <nav className='flex justify-between border-b border-black px-5 py-3 mb-10'>
      <Link href={'/'}>
        <Text>Home</Text>
      </Link>
      <Text as="label" size="2">
        <Flex gap="2">
          <Switch defaultChecked />Dark Mode
        </Flex>
      </Text>
    </nav>
  )
}

export default NavBar
