import { useQuery } from "@tanstack/react-query"
import { getpaymentlog } from "../api/baseapi"

export const usePaymentlog = (page: number, limit: number,  status: string,search: string) => {
    return useQuery({
        queryKey: ['paymentlogdata', page, limit, status,search],
        queryFn: () => getpaymentlog({ page, limit, status: status !== "all" ? status : "", search }),
        staleTime: 1000 * 60 * 2
    })
}