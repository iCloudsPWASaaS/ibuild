import { useMutation } from "@tanstack/react-query"
import { postPreference } from "../api/postapi"

export const usePreference = () => {
    return useMutation({
        mutationFn: postPreference
    })
}