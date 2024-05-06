import { ImageStyle, StyleProp } from "react-native";
import { Image, Box } from "native-base";

import { Movie } from "@/types/movies";

import { CustomText } from "./CustomText";

type GeneralMovieItemProps = {
  movie: Movie;
  imageWidth?: number;
  imageHeight?: number;
  imageStyle?: StyleProp<ImageStyle>;
};

export function GeneralMovieItem({
  imageHeight = 200,
  imageWidth = 280,
  imageStyle,
  movie,
}: GeneralMovieItemProps) {
  return (
    <Box>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
        }}
        style={[{ borderRadius: 16, objectFit: "fill" }, imageStyle]}
        alt={`Logo from ${movie.title}`}
        width={imageWidth}
        height={imageHeight}
      />

      <CustomText fontFamilyProps="REGULAR" fontSize="md" overflow="hidden">
        {movie.title}
      </CustomText>
    </Box>
  );
}
