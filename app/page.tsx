'use client'
import { Grid } from "@radix-ui/themes";
import BookGrid from "./BookGrid";
import GenreList from "./GenreList";
import LanguageSelector from "./LanguageSelector";
import HydrationZustand from "./HydrationZustand";

export type Props = {
  searchParams: {
    language?: string,
    genre?: string
  }
}

export default function Home({ searchParams }: Props) {
  return (
    <HydrationZustand>
      <main className="flex justify-between">
        <GenreList searchParams={searchParams} />
        <Grid>
          <LanguageSelector />
          <BookGrid />
        </Grid>
      </main>
    </HydrationZustand>
  )
}
