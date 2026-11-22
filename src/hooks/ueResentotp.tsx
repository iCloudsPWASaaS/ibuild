import { useMutation } from "@tanstack/react-query"
import { postresentotp } from "../api/postapi"

export const useResendotp = () => {
    return useMutation({
        mutationFn: postresentotp
    })
}