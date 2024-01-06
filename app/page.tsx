'use client'

import BookGrid from "./BookGrid";
import GenreList from "./GenreList";
import HydrationZustand from "./HydrationZustand";
import { useState } from "react";

export default function Home() {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const handleGenreSelect = (genreId: string) => {
    setSelectedGenre(genreId);
  };

  return (
    <HydrationZustand>
      <main className="flex justify-between">
        <GenreList selectedGenre={selectedGenre} onSelectGenre={handleGenreSelect} />
        <BookGrid selectedGenre={selectedGenre} />
      </main>
    </HydrationZustand>
  )
}
