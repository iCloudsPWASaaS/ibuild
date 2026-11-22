import { useMutation } from "@tanstack/react-query"
import { postsetnewpassword } from "../api/postapi"

export const useSetnewpassword = () => {
    return useMutation({
        mutationFn:postsetnewpassword
    })
}