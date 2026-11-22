import { useMutation } from "@tanstack/react-query"
import { postsupportticket } from "../api/postapi"

export const useCreateTicket = () => {
    return useMutation({
        mutationFn: postsupportticket
    })
}