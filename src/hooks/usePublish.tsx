import { useMutation } from "@tanstack/react-query";
import { exportWebsiteApi } from "../api/postapi";

export const useExportWebsite = () => {
  return useMutation({
    mutationFn: exportWebsiteApi,
  });
};
