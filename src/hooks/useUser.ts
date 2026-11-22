import { useQuery } from "@tanstack/react-query"
import { getuserdata } from "../api/baseapi"

export const useUserdata = (params: any) => {
    return useQuery({
        queryKey: ['getuderdata',params],
        queryFn:()=> getuserdata(params),
        staleTime: 1000 * 60 * 2
    })
}