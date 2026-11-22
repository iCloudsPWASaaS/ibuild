import { useMutation } from "@tanstack/react-query"
import { deleteaccount } from "../api/deleteapi"

export const useDeleteAccount = () => {
    return useMutation({
        mutationFn: () => deleteaccount()
    })
}