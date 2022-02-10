import { useCallback } from "react";
import { useSnackbar, VariantType } from "notistack";

const useAlert = () => {
  const { enqueueSnackbar } = useSnackbar();

  const alert = useCallback(
    (message: string, variant: VariantType) => {
      enqueueSnackbar(message, {
        variant,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    },
    [enqueueSnackbar]
  );

  return { alert };
};

export default useAlert;
