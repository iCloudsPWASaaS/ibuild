import { useMutation, useQuery } from "@tanstack/react-query"
import { postlogin } from "../api/postapi"
import { getloginuidata } from "../api/baseapi"

export const useLoginui = () => {
    return useQuery({
        queryKey: ['loginuidata'],
        queryFn: getloginuidata,
        staleTime: 1000 * 60 * 2
    })
}

export const useLogin = () => {
  return  useMutation({
        mutationFn: postlogin
    })
}
