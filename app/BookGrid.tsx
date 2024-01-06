'use client'

import useBooks from "./hooks/useBooks";
import BookCard from "./BookCard";

const BookGrid = ({ selectedGenre }: { selectedGenre: string | null }) => {
  const { books, isLoading, error } = useBooks()

  const filteredBooks = selectedGenre
    ? books.filter((book) => book.category === selectedGenre)
    : books;

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-600 text-center">{error}</p>}
      <div className="flex flex-wrap gap-8 w-full">
        {
          filteredBooks.map(book => (
            <div key={book._id}>
              <BookCard
                _id={book._id}
                title={book.title}
                image_url={"https://covers.openlibrary.org/b/id/6633571-L.jpg"}
              />
            </div>
          ))
        }
      </div>
    </>
  )
}

export default BookGrid
