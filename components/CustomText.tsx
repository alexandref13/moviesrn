import { Text, ITextProps } from "native-base";

type CustomTextProps = {
  children: React.ReactNode;
  fontFamilyProps?: "REGULAR" | "MEDIUM" | "BOLD";
} & ITextProps;

export function CustomText({
  fontFamilyProps = "REGULAR",
  children,
  ...rest
}: CustomTextProps) {
  const getFontFamily = () => {
    switch (fontFamilyProps) {
      case "REGULAR":
        return "Poppins_400Regular";
      case "MEDIUM":
        return "Poppins_500Medium";
      case "BOLD":
        return "Poppins_700Bold";
      default:
        return "Poppins_400Regular";
    }
  };

  return (
    <Text {...rest} fontFamily={getFontFamily()}>
      {children}
    </Text>
  );
}
