import { Grid } from "@radix-ui/themes";
import BookGrid from "./BookGrid";
import GenreList from "./GenreList";
import LanguageSelector from "./LanguageSelector";

export default function Home() {
  return (
    <main className="flex justify-between">
      <GenreList />
      <Grid>
        <LanguageSelector />
        <BookGrid />
      </Grid>
    </main>
  )
}
