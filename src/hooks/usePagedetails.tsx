import { useQuery } from "@tanstack/react-query"
import { pagedetails } from "../api/baseapi";

export const usePagedetails = (params: any) => {
    return useQuery({
        queryKey: ['pagedetails', params],
        queryFn: () => pagedetails(params),
        staleTime: 1000 * 60 * 5,
        placeholderData: (previousData) => previousData,
    });
}