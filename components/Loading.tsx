import { HStack, Heading, Spinner } from "native-base";

type LoadingProps = {
  hasHeading?: boolean;
};

export function Loading({ hasHeading = true }: LoadingProps) {
  return (
    <HStack space={2} justifyContent="center">
      <Spinner color="emerald.500" />
      {hasHeading && (
        <Heading color="emerald.500" fontSize="md">
          Loading
        </Heading>
      )}
    </HStack>
  );
}
