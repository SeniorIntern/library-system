'use client'
import { Grid } from "@radix-ui/themes";
import BookGrid from "./BookGrid";
import GenreList from "./GenreList";
import LanguageSelector from "./LanguageSelector";

export type Props = {
  searchParams: {
    language?: string,
    genre?: string
  }
}

export default function Home({ searchParams }: Props) {
  return (
    <main className="flex justify-between">
      <GenreList searchParams={searchParams} />
      <Grid>
        <LanguageSelector />
        <BookGrid />
      </Grid>
    </main>
  )
}
