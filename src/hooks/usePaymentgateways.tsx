import { useQuery } from "@tanstack/react-query";
import { getpaymentgateways } from "../api/baseapi";

export const usePaymentgateways = () => {
    return useQuery({
        queryKey: ['paymentgateways'],
        queryFn: getpaymentgateways,
        staleTime: 1000 * 60 * 2, 
    });
}