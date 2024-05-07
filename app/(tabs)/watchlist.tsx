import { Box, Center, FlatList } from "native-base";
import { useQuery } from "@tanstack/react-query";

import { CustomText } from "@/components/CustomText";
import { Loading } from "@/components/Loading";
import { getWatchListMovies } from "@/repository/watchlist";

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
      renderItem={({ item }) => <CustomText>{item.title}</CustomText>}
      contentContainerStyle={{ flex: 1 }}
      ListEmptyComponent={() => (
        <Box flex={1} alignItems="center" justifyContent="center">
          <CustomText>Add a movie to your WatchList</CustomText>
        </Box>
      )}
    />
  );
}
