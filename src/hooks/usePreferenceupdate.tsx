import { useMutation } from "@tanstack/react-query";
import { updatePreferencePhoto, updatePreference, regeneratePreference } from "../api/postapi";

export const useUpdatePreference =  () => {
  return useMutation({
    mutationFn: updatePreference,
  });
};


export const useUpdatePreferencePhoto = () => {
  return useMutation({
    mutationFn: updatePreferencePhoto,
  });
};

export const useRegeneratePreference = () => {
  return useMutation({
    mutationFn: regeneratePreference,
  });
};