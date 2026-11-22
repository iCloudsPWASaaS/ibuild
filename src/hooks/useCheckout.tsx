import { useMutation } from "@tanstack/react-query"
import { poscheckout } from "../api/postapi"


export const useCheckout = () => {
    return useMutation({
        mutationKey: ['checkout'],
        mutationFn: poscheckout
    })
}