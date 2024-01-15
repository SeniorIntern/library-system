import { Button } from "@radix-ui/themes"
import { Dispatch, SetStateAction, useRef } from "react"
import { UnpopulatedBook } from "./hooks/useBooks";

type Props = {
  books: UnpopulatedBook[]
  setBooks: Dispatch<SetStateAction<UnpopulatedBook[]>>
}

const SearchInput = ({ books, setBooks }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)

  function searchBooks(query: string) {
    query = query.toLowerCase(); // Convert query to lowercase for case-insensitive search

    const result = books.filter(book => {
      // Check if any of the user's properties contain the search query
      return Object.values(book).some(value =>
        typeof value === 'string' && value.toLowerCase().includes(query)
      );
    });

    setBooks(result)
  }

  const handleSearch = () => {
    if (inputRef.current !== null) {
      // for debug purpose
      const result = searchBooks(inputRef.current.value)
      console.log(result);
    }
  }

  return (
    <div className="flex justify-center w-full gap-2 mb-4">
      <input ref={inputRef} placeholder='Search Title...' className='w-2/4 rounded-md border-black border-[1px] px-1 py-2' />
      <Button size='3' onClick={handleSearch}>Search</Button>
      <Button size='3' onClick={handleSearch}>Reset</Button>
    </div>
  )
}

export default SearchInput
