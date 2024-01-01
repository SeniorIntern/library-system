'use client'

import { Button, Flex, Table, Text } from "@radix-ui/themes";
import useRentals from "../hooks/useRentals";
import { apiClient } from "../services/api-client";
import { useState } from "react";

export default function page() {
  const { rentals, setRentals, error, isLoading } = useRentals()
  const [deleteError, setDeleteError] = useState<string>()

  if (isLoading) return <Text>loading...</Text>
  if (error) return <Text>{error}</Text>

  const handleReturn = async (rentalId: string) => {
    const oldRentals = [...rentals || []]
    setRentals(rentals?.filter(rental => rental._id !== rentalId))

    apiClient.delete('/rentals/' + rentalId).catch(err => {
      setDeleteError(err.message)
      setRentals(oldRentals)
    })

    // POST on returns
  }

  return (
    <>
      {deleteError && <Text color="red">{deleteError}</Text>}
      <Flex direction='row' justify="center" className="h-[70vh] items-center">
        <Table.Root variant="surface" className="w-1/2">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Book Name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Customer Name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Rent Date</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Option</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {rentals?.map(rental => (
              <Table.Row key={rental._id}>
                <Table.RowHeaderCell>{rental.book.title}</Table.RowHeaderCell>
                <Table.Cell>{rental.customer.name}</Table.Cell>
                <Table.Cell>{new Date(rental.dateOut).toLocaleString()}</Table.Cell>
                <Table.Cell><Button onClick={() => handleReturn(rental._id)}>Set Return</Button></Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Flex>
    </>
  )
}
