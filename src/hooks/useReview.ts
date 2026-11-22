import { useQuery } from "@tanstack/react-query"
import { getreviewdata } from "../api/baseapi"

export const useReview = () => {
    return useQuery({
        queryKey: ['reviewdata'],
        queryFn: getreviewdata,
        staleTime: 1000 * 60 * 2
    })
}