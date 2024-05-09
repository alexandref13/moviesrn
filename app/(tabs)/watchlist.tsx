import { Center, Divider, FlatList } from "native-base";

import { CustomText } from "@/components/CustomText";
import { Loading } from "@/components/Loading";
import { WatchListItem } from "@/components/WatchListItem";

import { useWatchlist } from "@/hooks/useWatchlist";

export default function WatchListScreen() {
  const { watchlist, isLoading, error, fetchNextPage } = useWatchlist();

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

  if (watchlist && watchlist.length === 0) {
    return (
      <Center flex={1}>
        <CustomText>Add a movie to your WatchList</CustomText>
      </Center>
    );
  }

  return (
    <FlatList
      data={watchlist}
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
