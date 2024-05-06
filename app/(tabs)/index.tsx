import { useQuery } from "@tanstack/react-query";
import { Box, FlatList, VStack } from "native-base";

import { CustomText } from "@/components/CustomText";
import { Loading } from "@/components/Loading";
import { getAllMovies, getTrendingMovies } from "@/repository/movies";

export default function HomeScreen() {
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

  if (trendingMoviesIsLoading || allMoviesIsLoading) {
    return (
      <Box flex={1}>
        <Loading />
      </Box>
    );
  }

  if (trendingMoviesError || allMoviesError) {
    return (
      <VStack flex={1}>
        <CustomText fontFamilyProps="BOLD">
          {trendingMoviesError?.message ?? "Something went wrong"}
        </CustomText>
        <CustomText fontFamilyProps="BOLD">
          {allMoviesError?.message ?? "Something went wrong"}
        </CustomText>
      </VStack>
    );
  }

  return (
    <Box flex={1}>
      <CustomText fontFamilyProps="BOLD">Trending Movies</CustomText>
      <FlatList
        data={trendingMovies}
        horizontal
        renderItem={({ item }) => {
          return (
            <CustomText key={item.id} fontFamilyProps="REGULAR">
              {item.title}
            </CustomText>
          );
        }}
      />

      <FlatList
        data={allMovies}
        horizontal
        renderItem={({ item }) => {
          return (
            <CustomText key={item.id} fontFamilyProps="REGULAR">
              {item.title}
            </CustomText>
          );
        }}
      />
    </Box>
  );
}
