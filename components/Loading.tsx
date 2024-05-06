import { HStack, Heading, Spinner } from "native-base";

type LoadingProps = {
  hasHeading?: boolean;
};

export function Loading({ hasHeading = true }: LoadingProps) {
  return (
    <HStack space={2} justifyContent="center">
      <Spinner color="info.700" />
      {hasHeading && (
        <Heading color="info.700" fontSize="md">
          Loading
        </Heading>
      )}
    </HStack>
  );
}
