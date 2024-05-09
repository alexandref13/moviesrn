import { Box, Center, FlatList, ScrollView, VStack } from "native-base";

import { CustomText } from "@/components/CustomText";
import { Loading } from "@/components/Loading";
import { MovieTrendingItem } from "@/components/MovieTrendingItem";
import { GeneralMovieItem } from "@/components/GeneralMovieItem";

import useHome from "@/hooks/useHome";

export default function HomeScreen() {
  const {
    trendingMovies,
    trendingMoviesError,
    trendingMoviesIsLoading,
    allMovies,
    allMoviesError,
    allMoviesIsLoading,
  } = useHome();

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
          keyExtractor={(item) => item.id.toString()}
          horizontal
          initialNumToRender={2}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <Box paddingRight={2} />}
          renderItem={({ item }) => <MovieTrendingItem movie={item} />}
        />
      </VStack>

      <VStack paddingTop={2}>
        <CustomText fontFamilyProps="BOLD" fontSize="lg" paddingBottom={2}>
          Recent Movies
        </CustomText>
        <FlatList
          data={allMovies}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          initialNumToRender={5}
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
