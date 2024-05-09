import {
  Center,
  Divider,
  HStack,
  Image,
  Pressable,
  ScrollView,
} from "native-base";
import { Stack } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { CustomText } from "@/components/CustomText";
import { Loading } from "@/components/Loading";

import { useMovieDetails } from "@/hooks/useMovieDetails";

export default function MovieDetailsScreen() {
  const {
    movieIsLoading,
    movieError,
    movie,
    watchlist,
    watchlistError,
    watchlistIsLoading,
    watchlistMutateIsPending,
    mutationError,
    colors,
    watchlistMutate,
    hasIdInWatchlistMovies,
  } = useMovieDetails();

  if (movieIsLoading || watchlistIsLoading || watchlistMutateIsPending) {
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
        <Pressable marginRight="2" onPress={() => watchlistMutate()}>
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
