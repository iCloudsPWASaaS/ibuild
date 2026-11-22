import { useMutation } from "@tanstack/react-query"
import { postprofileinfo } from "../api/postapi"

export const useProfileinfo = () => {
    return useMutation({
        mutationFn: postprofileinfo
    })
}