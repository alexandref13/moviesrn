import { ImageStyle, StyleProp } from "react-native";
import { Image, Box, Pressable } from "native-base";

import { Movie } from "@/types/movies";

import { CustomText } from "./CustomText";
import { Link } from "expo-router";

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
    <Link
      href={{
        pathname: "/movie/[id]",
        params: { id: movie.id },
      }}
      asChild
    >
      <Pressable>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
          }}
          style={[
            { borderRadius: 16, objectFit: "fill", aspectRatio: 3 / 5 },
            imageStyle,
          ]}
          alt={`Logo from ${movie.title}`}
          width={imageWidth}
          height={imageHeight}
        />

        <CustomText
          fontFamilyProps="REGULAR"
          fontSize="md"
          numberOfLines={1}
          style={{ maxWidth: 120 }}
        >
          {movie.title}
        </CustomText>
      </Pressable>
    </Link>
  );
}
