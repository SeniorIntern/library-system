'use client'

import { Grid } from "@radix-ui/themes";
import BookGrid from "./BookGrid";
import GenreList from "./GenreList";
import LanguageSelector from "./LanguageSelector";
import HydrationZustand from "./HydrationZustand";

export default function Home() {
  return (
    <HydrationZustand>
      <main className="flex justify-between">
        <GenreList />
        <Grid>
          <LanguageSelector />
          <BookGrid />
        </Grid>
      </main>
    </HydrationZustand>
  )
}
