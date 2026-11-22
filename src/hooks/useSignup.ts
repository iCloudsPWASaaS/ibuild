import { useMutation, useQuery } from "@tanstack/react-query"
import { getsignupuidata } from "../api/baseapi"
import { postsignup } from "../api/postapi"

export const useSignupui = () => {
    return useQuery({
        queryKey: ['signupuidata'],
        queryFn: getsignupuidata,
        staleTime: 1000 * 60 * 5
    })
}

export const useSignup = () => {
    return useMutation({
        mutationFn: postsignup
    })
}