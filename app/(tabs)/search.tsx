import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Center,
  Divider,
  FlatList,
  HStack,
  Input,
  Pressable,
  useTheme,
  useToast,
} from "native-base";
import { searchMovie } from "@/repository/search";
import { Loading } from "@/components/Loading";
import { CustomText } from "@/components/CustomText";
import { WatchListItem } from "@/components/WatchListItem";

export default function SearchScreen() {
  const [movie, setMovie] = useState("");
  const [search, setSearch] = useState(false);

  const toast = useToast();
  const { colors } = useTheme();

  const queryClient = useQueryClient();

  const {
    data: movieSearched,
    isLoading,
    error,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["movies:search", movie],
    queryFn: ({ pageParam }) => searchMovie(movie, pageParam),
    initialPageParam: 1,
    getNextPageParam: (_, pages) => pages.length + 1,
    enabled: search,
  });

  const data = movieSearched?.pages.flat();

  useEffect(() => {
    setSearch(false);
  }, [movie]);

  if (error) {
    return (
      <Center flex={1}>
        <CustomText fontFamilyProps="BOLD">
          {error?.message ?? "Something went wrong"}
        </CustomText>
      </Center>
    );
  }

  return (
    <SafeAreaView>
      <HStack
        marginY={2}
        marginX={4}
        alignItems="center"
        justifyContent="space-between"
      >
        <Input
          flex={1}
          variant="outline"
          marginRight={4}
          height="12"
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Find movies"
          value={movie}
          onChangeText={setMovie}
        />

        <Pressable
          onPress={() => {
            if (movie.length < 3) {
              toast.show({
                title: "Must have a least 3 letters to find movies",
                placement: "top",
                duration: 2000,
              });
              return;
            }
            setSearch((prevState) => !prevState);

            queryClient.cancelQueries({ queryKey: ["movies:search", movie] });
          }}
        >
          <FontAwesome name="search" size={28} color={colors.info[700]} />
        </Pressable>
      </HStack>

      {isLoading ? (
        <Center>
          <Loading />
        </Center>
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => <WatchListItem movie={item} />}
          ItemSeparatorComponent={() => <Divider marginY={2} />}
          ListFooterComponent={() => <Divider marginY={2} />}
          contentContainerStyle={{ paddingBottom: 24 }}
          onEndReached={() => {
            fetchNextPage();
          }}
        />
      )}
    </SafeAreaView>
  );
}
