import { useQuery } from "@tanstack/react-query"
import { getcategory } from "../api/baseapi"

export const useCategory = () => {
    return useQuery({
        queryKey: ['categorydata'],
        queryFn: getcategory,
        staleTime: 1000 * 60 * 2
    })
}