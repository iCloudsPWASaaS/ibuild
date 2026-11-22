import { useQuery } from "@tanstack/react-query"
import { getsupportticket } from "../api/baseapi"

export const useSupportticket = (params: any) => {
    return useQuery({
        queryKey: ['supportdata', params],
        queryFn: () => getsupportticket(params),
        staleTime: 1000 * 60 * 5,
        placeholderData: (previousData) => previousData,
    });
}