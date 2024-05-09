import { Center, Divider, FlatList } from "native-base";
import { useInfiniteQuery } from "@tanstack/react-query";

import { CustomText } from "@/components/CustomText";
import { Loading } from "@/components/Loading";
import { getWatchListMovies } from "@/repository/watchlist";
import { WatchListItem } from "@/components/WatchListItem";
import { Movie } from "@/types/movies";

export default function WatchListScreen() {
  const {
    data: watchlist,
    error,
    isLoading,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["movies:watchlist"],
    queryFn: ({ pageParam }) => getWatchListMovies(pageParam),
    initialPageParam: 1,
    getNextPageParam: (_, pages) => pages.length + 1,
  });

  const data = watchlist?.pages.flat() as Movie[];

  if (isLoading) {
    return (
      <Center flex={1}>
        <Loading />
      </Center>
    );
  }

  if (error) {
    return (
      <Center flex={1}>
        <CustomText fontFamilyProps="BOLD">
          {error?.message ?? "Something went wrong"}
        </CustomText>
      </Center>
    );
  }

  if (data && data.length === 0) {
    return (
      <Center flex={1}>
        <CustomText>Add a movie to your WatchList</CustomText>
      </Center>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <WatchListItem movie={item} />}
      ItemSeparatorComponent={() => <Divider marginY={2} />}
      ListFooterComponent={() => <Divider marginY={2} />}
      contentContainerStyle={{ paddingBottom: 24 }}
      onEndReached={() => {
        fetchNextPage();
      }}
      paddingTop="2"
    />
  );
}
