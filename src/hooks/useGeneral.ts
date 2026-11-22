import { useQuery } from "@tanstack/react-query"
import { getgeneraldata } from "../api/baseapi"

export const useGeneraldata = () => {
    return useQuery({
        queryKey: ['generaldata'],
        queryFn: getgeneraldata,
        staleTime: 1000 * 60 * 2
    })
}