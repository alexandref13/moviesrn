import { Box, HStack, Image, Pressable, VStack } from "native-base";

import { Movie } from "@/types/movies";
import { CustomText } from "./CustomText";
import { Link } from "expo-router";

type WatchListItemProps = {
  movie: Movie;
};

export function WatchListItem({ movie }: WatchListItemProps) {
  return (
    <Link
      href={{
        pathname: "/movie/[id]",
        params: { id: movie.id },
      }}
      asChild
    >
      <Pressable>
        <HStack paddingX={2}>
          <Image
            marginRight={2}
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
            }}
            style={[{ borderRadius: 4, objectFit: "fill", aspectRatio: 3 / 5 }]}
            alt={`Logo from ${movie.title}`}
            width={100}
          />

          <VStack>
            <CustomText fontFamilyProps="BOLD">{movie.title}</CustomText>
            <Box style={{ maxWidth: 300 }}>
              <CustomText
                fontFamilyProps="REGULAR"
                textAlign="left"
                overflow="scroll"
                maxWidth="sm"
                numberOfLines={5}
              >
                {movie.overview}
              </CustomText>
            </Box>
          </VStack>
        </HStack>
      </Pressable>
    </Link>
  );
}
