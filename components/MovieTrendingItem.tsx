import { ImageStyle, Pressable, StyleProp } from "react-native";
import { Image } from "native-base";

import { Movie } from "@/types/movies";

import { CustomText } from "./CustomText";
import { Link } from "expo-router";

type MovieTrendingItemProps = {
  movie: Movie;
  imageStyle?: StyleProp<ImageStyle>;
};

export function MovieTrendingItem({
  imageStyle,
  movie,
}: MovieTrendingItemProps) {
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
          style={[{ borderRadius: 16, aspectRatio: 3 / 4 }, imageStyle]}
          alt={`Logo from ${movie.title}`}
          width="sm"
        />

        <CustomText
          fontFamilyProps="REGULAR"
          fontSize="xl"
          textAlign="center"
          numberOfLines={1}
          maxWidth={"sm"}
        >
          {movie.title}
        </CustomText>
      </Pressable>
    </Link>
  );
}
