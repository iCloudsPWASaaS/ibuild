import { useQuery } from "@tanstack/react-query"
import { getfaqdata } from "../api/baseapi"

export const useFaq = () => {
    return useQuery({
        queryKey: ['faqdata'],
        queryFn: getfaqdata,
        staleTime: 1000 * 60 * 2
    })
}