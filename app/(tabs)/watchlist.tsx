import { Box, Center, Divider, FlatList } from "native-base";
import { useQuery } from "@tanstack/react-query";

import { CustomText } from "@/components/CustomText";
import { Loading } from "@/components/Loading";
import { getWatchListMovies } from "@/repository/watchlist";
import { WatchListItem } from "@/components/WatchListItem";

export default function WatchListScreen() {
  const {
    data: watchlist,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["movies:watchlist"],
    queryFn: getWatchListMovies,
  });

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

  return (
    <FlatList
      data={watchlist}
      renderItem={({ item }) => <WatchListItem movie={item} />}
      contentContainerStyle={{ flex: 1 }}
      ItemSeparatorComponent={() => <Divider marginY={2} />}
      ListFooterComponent={() => <Divider marginY={2} />}
      ListEmptyComponent={() => (
        <Box flex={1} alignItems="center" justifyContent="center">
          <CustomText>Add a movie to your WatchList</CustomText>
        </Box>
      )}
    />
  );
}
