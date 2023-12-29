import { Flex, Switch, Text } from '@radix-ui/themes'
import React from 'react'

const NavBar = () => {
  return (
    <nav className='flex justify-between border-b border-black px-5 py-3'>
      <Text>Home</Text>
      <Text as="label" size="2">
        <Flex gap="2">
          <Switch defaultChecked />Dark Mode
        </Flex>
      </Text>
    </nav>
  )
}

export default NavBar
