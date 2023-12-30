'use client'

import useBook from "@/app/hooks/useBook"
import { Flex } from "@radix-ui/themes"
import Image from "next/image"

type Props = {
  params: {
    id: string
  }
}

const BookDetail = ({ params }: Props) => {
  const { book, error, isLoading } = useBook(params.id)

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-600 text-center">{error}</p>}
      <div>
        <Flex>
          <div className="w-1/2 m-4">
            <h1 className="font-bold text-[1.5rem]">{book.title}</h1>
            <p>{book.description}</p>

            <div className="mt-4">
              <ul>
                <li>Author(s): {book.authors?.map(a => a.name).join(', ')}</li>
                <li>Category: {book.category?.name}</li>
                <li>Language: {book.language?.language}</li>
              </ul>
            </div>
          </div>
          <div className="ml-4">
            <Image
              src={"https://covers.openlibrary.org/b/id/6633571-L.jpg"}
              width={400}
              height={600}
              alt=""
            />
          </div>
        </Flex>
      </div>
    </>
  )
}

export default BookDetail
