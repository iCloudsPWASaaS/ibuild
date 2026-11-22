import { useQuery } from "@tanstack/react-query"
import { getctadata } from "../api/baseapi"

export const useCta = () => {
    return useQuery({
        queryKey: ["ctadata"],
        queryFn: getctadata,
        staleTime: 1000 * 60 * 2
    })
}