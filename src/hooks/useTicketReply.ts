import { useMutation } from "@tanstack/react-query"
import { postticketreply } from "../api/postapi"

export const useTicketReply = () => {
    return useMutation({
        mutationFn: postticketreply
    })
}