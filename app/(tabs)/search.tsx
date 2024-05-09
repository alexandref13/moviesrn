import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import {
  Center,
  Divider,
  FlatList,
  HStack,
  Input,
  Pressable,
} from "native-base";
import { Loading } from "@/components/Loading";
import { CustomText } from "@/components/CustomText";
import { WatchListItem } from "@/components/WatchListItem";
import { useSearch } from "@/hooks/useSearch";

export default function SearchScreen() {
  const {
    colors,
    error,
    fetchNextPage,
    isLoading,
    movie,
    movieSearched,
    setMovie,
    handleSearch,
  } = useSearch();

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

        <Pressable onPress={handleSearch}>
          <FontAwesome name="search" size={28} color={colors.info[700]} />
        </Pressable>
      </HStack>

      {isLoading ? (
        <Center>
          <Loading />
        </Center>
      ) : (
        <FlatList
          data={movieSearched}
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
