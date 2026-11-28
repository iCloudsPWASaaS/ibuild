import { useMutation, useQueryClient } from "@tanstack/react-query"
import { postcancelsubscription } from "../api/postapi"

export const useCancelSubscription = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: postcancelsubscription,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getuderdata'] })
        },
    })
}
