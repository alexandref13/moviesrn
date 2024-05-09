import { searchMovie } from "@/repository/search";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useTheme, useToast } from "native-base";
import { useEffect, useState } from "react";

export function useSearch() {
  const [movie, setMovie] = useState("");
  const [search, setSearch] = useState(false);

  const toast = useToast();
  const { colors } = useTheme();

  const queryClient = useQueryClient();

  const { data, isLoading, error, fetchNextPage } = useInfiniteQuery({
    queryKey: ["movies:search", movie],
    queryFn: ({ pageParam }) => searchMovie(movie, pageParam),
    initialPageParam: 1,
    getNextPageParam: (_, pages) => pages.length + 1,
    enabled: search,
  });

  const movieSearched = data?.pages.flat();

  function handleSearch() {
    if (movie.length < 3) {
      toast.show({
        title: "Must have a least 3 letters to find movies",
        placement: "top",
        duration: 2000,
      });
      return;
    }
    setSearch(true);

    queryClient.cancelQueries({ queryKey: ["movies:search", movie] });
  }

  useEffect(() => {
    setSearch(false);
    console.log(movie);
  }, [movie]);

  return {
    movie,
    setMovie,
    colors,
    isLoading,
    error,
    fetchNextPage,
    movieSearched,
    handleSearch,
  };
}
