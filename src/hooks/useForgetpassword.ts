import { useMutation } from "@tanstack/react-query"
import { postforgetpassword } from "../api/postapi"

export const useForgetpassword = () => {
    return useMutation({
        mutationFn: postforgetpassword
    })
}