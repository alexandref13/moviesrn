import {
  Center,
  Divider,
  HStack,
  Image,
  Pressable,
  ScrollView,
  useTheme,
} from "native-base";
import { Stack, useLocalSearchParams } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { CustomText } from "@/components/CustomText";
import { getAMovie } from "@/repository/movies";
import { Loading } from "@/components/Loading";
import {
  getWatchListMovies,
  toggleMovieToWatchList,
} from "@/repository/watchlist";
import { Movie } from "@/types/movies";
import { useState } from "react";

export default function MovieDetails() {
  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();
  const { id }: { id: string } = useLocalSearchParams();
  const { colors } = useTheme();

  const {
    data: movie,
    isLoading: movieIsLoading,
    error: movieError,
  } = useQuery({ queryKey: ["movie", id], queryFn: () => getAMovie(id) });

  const {
    data: watchlist,
    isLoading: watchlistIsLoading,
    error: watchlistError,
  } = useQuery({
    queryKey: ["movies:watchlist"],
    queryFn: getWatchListMovies,
  });

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
    mutate,
    error: mutationError,
    isPending,
  } = useMutation({
    mutationFn: () =>
      toggleMovieToWatchList(id, hasIdInWatchlistMovies(watchlist)),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["movies:watchlist"] });
    },
  });

  if (movieIsLoading || watchlistIsLoading || isPending) {
    return (
      <Center flex={1} alignItems="center" justifyContent="center">
        <Loading />
      </Center>
    );
  }

  if (movieError || mutationError || watchlistError) {
    return (
      <Center flex={1} alignItems="center" justifyContent="center">
        <CustomText fontFamilyProps="BOLD">
          {movieError?.message ?? "Something went wrong"}
        </CustomText>
        <CustomText fontFamilyProps="BOLD">
          {mutationError?.message ?? "Something went wrong"}
        </CustomText>
      </Center>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Stack.Screen options={{ title: movie?.title }} />
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500/${movie?.poster_path}`,
        }}
        alt={`Logo from ${movie?.title}`}
        borderBottomLeftRadius="2xl"
        borderBottomRightRadius="2xl"
        width="full"
        height="lg"
      />
      <HStack alignItems="center" justifyContent="space-between">
        <CustomText
          padding={2}
          fontFamilyProps="MEDIUM"
          fontSize="xl"
          numberOfLines={1}
          maxWidth={"sm"}
        >
          {movie?.title}
        </CustomText>
        <Pressable marginRight="2" onPress={() => mutate()}>
          <FontAwesome
            name="bookmark"
            size={28}
            color={
              hasIdInWatchlistMovies(watchlist)
                ? colors.amber[400]
                : colors.blueGray[600]
            }
          />
        </Pressable>
      </HStack>

      <Divider height="0.5" />

      <CustomText
        padding={2}
        fontFamilyProps="REGULAR"
        fontSize="md"
        maxWidth={"sm"}
      >
        {movie?.overview}
      </CustomText>
    </ScrollView>
  );
}
