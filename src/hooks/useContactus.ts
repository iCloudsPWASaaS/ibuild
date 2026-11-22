import { useMutation } from "@tanstack/react-query"
import { postcontactus } from "../api/postapi"

export const useContactus = () => {
    return useMutation({
        mutationFn: postcontactus
    })
}