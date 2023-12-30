import BookGrid from "./BookGrid";
import GenreList from "./GenreList";

export default function Home() {
  return (
    <main className="flex justify-between">
      <GenreList />
      <BookGrid />
    </main>
  )
}
