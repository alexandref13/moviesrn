import { ImageStyle, Pressable, StyleProp } from "react-native";
import { Image, Box } from "native-base";

import { Movie } from "@/types/movies";

import { CustomText } from "./CustomText";
import { Link } from "expo-router";

type MovieTrendingItemProps = {
  movie: Movie;
  imageWidth?: number;
  imageHeight?: number;
  imageStyle?: StyleProp<ImageStyle>;
};

export function MovieTrendingItem({
  imageHeight = 500,
  imageWidth = 400,
  imageStyle,
  movie,
}: MovieTrendingItemProps) {
  return (
    <Box>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
        }}
        style={[{ borderRadius: 16, aspectRatio: 3 / 4 }, imageStyle]}
        alt={`Logo from ${movie.title}`}
        width="sm"
      />

      <CustomText
        fontFamilyProps="MEDIUM"
        fontSize="2xl"
        textAlign="center"
        numberOfLines={1}
        maxWidth={"sm"}
      >
        {movie.title}
      </CustomText>
    </Box>
  );
}
