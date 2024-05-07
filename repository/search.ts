import { api } from "@/services/api";
import { Movie } from "@/types/movies";

export async function searchMovie(movie: string, pageParams: number): Promise<Movie[]> {
  const response = await api.get(
    `/search/movie?query=${movie}&include_adult=false&page=${pageParams}`
  );

  return response.data.results;
}