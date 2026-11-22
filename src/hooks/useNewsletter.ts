import { useMutation } from "@tanstack/react-query"
import { postnewsletter } from "../api/postapi"


export const useNewsletter = () => {
    return useMutation({
        mutationFn:postnewsletter
    })
}