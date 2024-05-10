import { useToast as Toast } from "native-base";

type ShowToastProps = {
  message: string;
  backgroundColor?: string;
  placement?:
    | "top"
    | "bottom"
    | "top-right"
    | "top-left"
    | "bottom-left"
    | "bottom-right";
  duration?: number;
};

export function useToast() {
  const toast = Toast();

  function showToast({
    placement = "top",
    duration = 3000,
    backgroundColor = "#000",
    message,
  }: ShowToastProps) {
    return toast.show({
      title: message,
      backgroundColor,
      placement,
      duration,
    });
  }

  return { showToast };
}
