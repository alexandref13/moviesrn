import { api } from "@/services/api";
import { Movie } from "@/types/movies";

export async function getTrendingMovies(): Promise<Movie[]> {
  const response = await api.get(
    "/trending/movie/week?language=pt-Br"
  );

  return response.data.results;
}

export async function getAllMovies(): Promise<Movie[]> {
  const response = await api.get(
    "/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=1&sort_by=popularity.desc"
  );

  return response.data.results;
}

export async function getAMovie(id: string): Promise<Movie> {
  const response = await api.get(
    `/movie/${id}?language=pt-BR`
  );

  return response.data;
}