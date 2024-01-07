'use client'

import { Flex, Table, Text } from "@radix-ui/themes"
import useReturns from "../hooks/useReturns"
import useAuth from "../hooks/useAuth"

export default function page() {
  const { isLoading } = useAuth()

  const { returns, error, isLoading: rentalLoading } = useReturns()

  if (rentalLoading) return <Text>loading...</Text>
  if (error) return <Text>{error}</Text>
  if (!returns?.length) return <Text>No Returns</Text>

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Flex direction='row' justify="center" className="h-[70vh] items-center">
        <Table.Root variant="surface" className="w-1/2">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Book Name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Customer Name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Return Date</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {returns?.map(r => (
              <Table.Row key={r._id}>
                <Table.RowHeaderCell>{r.rental.book.title}</Table.RowHeaderCell>
                <Table.Cell>{r.rental.customer.name}</Table.Cell>
                <Table.Cell>{new Date(r.dateReturned).toLocaleString()}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Flex>
    </>
  )
}
