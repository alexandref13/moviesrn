import { getAMovie } from "@/repository/movies";
import {
  getWatchListMovies,
  toggleMovieToWatchList,
} from "@/repository/watchlist";
import { Movie } from "@/types/movies";
import { useToast } from "@/utils/toast";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useTheme } from "native-base";

export function useMovieDetails() {
  const queryClient = useQueryClient();
  const { id }: { id: string } = useLocalSearchParams();

  const { colors } = useTheme();
  const { showToast } = useToast();

  const {
    data: movie,
    isLoading: movieIsLoading,
    error: movieError,
  } = useQuery({ queryKey: ["movie", id], queryFn: () => getAMovie(id) });

  const {
    data,
    isLoading: watchlistIsLoading,
    error: watchlistError,
  } = useInfiniteQuery({
    queryKey: ["movies:watchlist"],
    queryFn: ({ pageParam }) => getWatchListMovies(pageParam),
    initialPageParam: 1,
    getNextPageParam: (_, pages) => pages.length + 1,
  });

  const watchlist = data?.pages.flat();

  function hasIdInWatchlistMovies(watchList: Movie[] | undefined) {
    if (!watchList) {
      return false;
    }

    const filteredWatchList = watchlist?.filter(
      (movie) => movie.id === Number(id)
    );

    if (!filteredWatchList) {
      return false;
    }

    return filteredWatchList?.length > 0;
  }

  const {
    mutate: watchlistMutate,
    error: mutationError,
    isPending: watchlistMutateIsPending,
  } = useMutation({
    mutationFn: () =>
      toggleMovieToWatchList(id, hasIdInWatchlistMovies(watchlist)),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["movies:watchlist"] });
      showToast({
        message: hasIdInWatchlistMovies(watchlist)
          ? "Movie removed of Watchlist"
          : "Movie added to Watchlist",
        backgroundColor: colors.emerald[500],
      });
    },
  });

  return {
    colors,
    movie,
    movieIsLoading,
    movieError,
    watchlistIsLoading,
    watchlistError,
    watchlist,
    watchlistMutate,
    mutationError,
    watchlistMutateIsPending,
    hasIdInWatchlistMovies,
  };
}
