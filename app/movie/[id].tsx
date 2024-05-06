import { Box, Center } from "native-base";
import { Stack, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";

import { CustomText } from "@/components/CustomText";
import { getAMovie } from "@/repository/movies";
import { Loading } from "@/components/Loading";

export default function MovieDetails() {
  const { id }: { id: string } = useLocalSearchParams();

  const {
    data: movie,
    isLoading: movieIsLoading,
    error: movieError,
  } = useQuery({ queryKey: ["movie", id], queryFn: () => getAMovie(id) });

  if (movieIsLoading) {
    return (
      <Center flex={1} alignItems="center" justifyContent="center">
        <Loading />
      </Center>
    );
  }

  if (movieError) {
    return (
      <Center flex={1} alignItems="center" justifyContent="center">
        <CustomText fontFamilyProps="BOLD">
          {movieError.message ?? "Something went wrong"}
        </CustomText>
      </Center>
    );
  }

  console.log(movie?.id);

  return (
    <Box>
      <Stack.Screen options={{ headerBackTitleVisible: false, title: "" }} />
      <CustomText>MovieDetails: {movie?.title}</CustomText>
    </Box>
  );
}
