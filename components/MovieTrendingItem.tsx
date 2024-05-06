import { ImageStyle, StyleProp } from "react-native";
import { Image, Box } from "native-base";

import { Movie } from "@/types/movies";

import { CustomText } from "./CustomText";

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
          uri: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
        }}
        style={[{ borderRadius: 16 }, imageStyle]}
        alt={`Logo from ${movie.title}`}
        width={imageWidth}
        height={imageHeight}
      />

      <CustomText
        flex={1}
        fontFamilyProps="MEDIUM"
        fontSize="2xl"
        textAlign="center"
      >
        {movie.title}
      </CustomText>
    </Box>
  );
}
