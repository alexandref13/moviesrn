import { getWatchListMovies } from "@/repository/watchlist";
import { Movie } from "@/types/movies";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useWatchlist() {
  const { data, error, isLoading, fetchNextPage } = useInfiniteQuery({
    queryKey: ["movies:watchlist"],
    queryFn: ({ pageParam }) => getWatchListMovies(pageParam),
    initialPageParam: 1,
    getNextPageParam: (_, pages) => pages.length + 1,
  });

  const watchlist = data?.pages.flat() as Movie[];

  return { watchlist, error, isLoading, fetchNextPage };
}
