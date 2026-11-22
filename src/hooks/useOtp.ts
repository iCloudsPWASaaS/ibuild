import { useMutation } from "@tanstack/react-query"
import { postotp } from "../api/postapi"

export const useOtp = () => {
    return useMutation({
        mutationFn: postotp
    })
}