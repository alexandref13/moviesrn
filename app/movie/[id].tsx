import {
  Box,
  Center,
  Divider,
  HStack,
  Image,
  ScrollView,
  useTheme,
} from "native-base";
import { Stack, useLocalSearchParams } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useQuery } from "@tanstack/react-query";

import { CustomText } from "@/components/CustomText";
import { getAMovie } from "@/repository/movies";
import { Loading } from "@/components/Loading";

export default function MovieDetails() {
  const { id }: { id: string } = useLocalSearchParams();

  const { colors } = useTheme();

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

  // TODO -> Buscar a lista de watchList e ver se nela o ID do filme em detalhes contém, se conter mudar a cor do Bookmark para amarelo/dourado e mdar a chamada API pra retirar do WatchList

  if (movieError) {
    return (
      <Center flex={1} alignItems="center" justifyContent="center">
        <CustomText fontFamilyProps="BOLD">
          {movieError.message ?? "Something went wrong"}
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
        <Box marginRight="2">
          <FontAwesome name="bookmark" size={28} color={colors.blueGray[600]} />
        </Box>
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
