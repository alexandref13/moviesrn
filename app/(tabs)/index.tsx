import { useQuery } from "@tanstack/react-query";
import { Box, Center, FlatList, ScrollView, VStack } from "native-base";

import { CustomText } from "@/components/CustomText";
import { Loading } from "@/components/Loading";
import { getAllMovies, getTrendingMovies } from "@/repository/movies";

import { MovieTrendingItem } from "@/components/MovieTrendingItem";
import { GeneralMovieItem } from "@/components/GeneralMovieItem";
import { Link } from "expo-router";
import { Pressable } from "react-native";

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
      <Center flex={1}>
        <Loading />
      </Center>
    );
  }

  if (trendingMoviesError || allMoviesError) {
    return (
      <Center flex={1}>
        <CustomText fontFamilyProps="BOLD">
          {trendingMoviesError?.message ?? "Something went wrong"}
        </CustomText>
        <CustomText fontFamilyProps="BOLD">
          {allMoviesError?.message ?? "Something went wrong"}
        </CustomText>
      </Center>
    );
  }

  return (
    <ScrollView padding={2} showsVerticalScrollIndicator={false}>
      <VStack>
        <CustomText fontFamilyProps="BOLD" fontSize="lg" paddingBottom={2}>
          Trending Movies
        </CustomText>
        <FlatList
          data={trendingMovies}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <Box paddingRight={2} />}
          renderItem={({ item }) => (
            <Link
              href={{
                pathname: "/movie/[id]",
                params: { id: item.id },
              }}
              asChild
            >
              <Pressable>
                <MovieTrendingItem movie={item} />
              </Pressable>
            </Link>
          )}
        />
      </VStack>

      <VStack paddingTop={2}>
        <CustomText fontFamilyProps="BOLD" fontSize="lg" paddingBottom={2}>
          Recent Movies
        </CustomText>
        <FlatList
          data={allMovies}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <Box paddingRight={4} />}
          contentContainerStyle={{
            paddingBottom: 24,
          }}
          renderItem={({ item }) => <GeneralMovieItem movie={item} />}
        />
      </VStack>
    </ScrollView>
  );
}
