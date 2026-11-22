// hooks/useUpdateNotifications.ts

import { useMutation } from "@tanstack/react-query";
import { updateNotificationApi } from "../api/postapi";

export const useUpdateNotifications = () => {
  return useMutation({
    mutationFn: (payload: {
      emailNotifications: number;
      marketingEmails: number;
    }) => updateNotificationApi(payload),
  });
};