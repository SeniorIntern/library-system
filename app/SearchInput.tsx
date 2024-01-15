import { Button } from "@radix-ui/themes"
import { Dispatch, SetStateAction, useRef, useState } from "react"
import { UnpopulatedBook } from "./hooks/useBooks";

type Props = {
  books: UnpopulatedBook[]
  setBooks: Dispatch<SetStateAction<UnpopulatedBook[]>>
  setDoRefetch: Dispatch<SetStateAction<boolean>>
}

const SearchInput = ({ books, setBooks, setDoRefetch }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [showReset, setShowReset] = useState<boolean>(false)

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
      setShowReset(true)
    }
  }

  const handleReset = () => {
    setDoRefetch(prevValue => !prevValue)
  }

  return (
    <div className="flex justify-center w-full gap-2 mb-4">
      <input ref={inputRef} placeholder='Search Title...' className='w-2/4 rounded-md border-black border-[1px] px-1 py-2' />
      <Button size='3' onClick={handleSearch}>Search</Button>
      {showReset &&
        <Button size='3' onClick={handleReset}>Reset</Button>
      }
    </div>
  )
}

export default SearchInput
