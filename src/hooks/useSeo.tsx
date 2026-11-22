import { useQuery } from "@tanstack/react-query"
import { getseodata } from "../api/baseapi"

export const useseo = () => {
    return useQuery({
        queryKey: ['getseo'],
        queryFn: getseodata,
        staleTime: 1000 * 60 * 5
    })
}