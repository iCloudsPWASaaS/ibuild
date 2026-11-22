import { useMutation } from "@tanstack/react-query"
import { postchangespassword } from "../api/postapi"

export const useChangepassword = () => {
    return useMutation({
        mutationFn: postchangespassword
    })
}