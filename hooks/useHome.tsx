import { getAllMovies, getTrendingMovies } from "@/repository/movies";
import { useQuery } from "@tanstack/react-query";

export default function useHome() {
  const {
    data: trendingMovies,
    isLoading: trendingMoviesIsLoading,
    error: trendingMoviesError,
  } = useQuery({ queryKey: ["movies:trending"], queryFn: getTrendingMovies });

  const {
    data: allMovies,
    isLoading: allMoviesIsLoading,
    error: allMoviesError,
  } = useQuery({ queryKey: ["movies:all"], queryFn: getAllMovies });

  return {
    trendingMovies,
    trendingMoviesIsLoading,
    trendingMoviesError,
    allMovies,
    allMoviesIsLoading,
    allMoviesError,
  };
}
