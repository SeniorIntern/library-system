'use client'

import { Button, Flex, Table, Text } from "@radix-ui/themes";
import useRentals from "../hooks/useRentals";
import { apiClient } from "../services/api-client";
import useAuth from "../hooks/useAuth";

export default function page() {
  const { isLoading } = useAuth()

  const { rentals, setRentals, error, isLoading: rentalLoading } = useRentals()

  const handleReturn = async (rentalId: string) => {
    const originalRentals = [...rentals || []]
    setRentals(rentals?.map(r => r._id === rentalId ? { ...r, hasReturned: true } : r))

    apiClient.post('/returns', { rentalId })
      .then(res => {
        console.log(res.data)
        apiClient.patch('/rentals/' + rentalId)
          .catch(err => console.log(err.message))
      }).catch(err => {
        console.log(err.messgae)
        setRentals(originalRentals)
      })

  }

  if (rentalLoading) return <Text>loading...</Text>
  if (error) return <Text color="red">{error}</Text>
  if (!rentals?.length) return <Text>No Rentals</Text>

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
              <Table.ColumnHeaderCell>Rent Date</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Return Status/Options</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {rentals?.map(rental => (
              <Table.Row key={rental._id}>
                <Table.RowHeaderCell>{rental.book.title}</Table.RowHeaderCell>
                <Table.Cell>{rental.customer.name}</Table.Cell>
                <Table.Cell>{new Date(rental.dateOut).toLocaleString()}</Table.Cell>
                {
                  rental.hasReturned ?
                    <Table.Cell>Returned</Table.Cell>
                    :
                    <Table.Cell><Button onClick={() => handleReturn(rental._id)}>Mark Return</Button></Table.Cell>
                }
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Flex>
    </>
  )
}
