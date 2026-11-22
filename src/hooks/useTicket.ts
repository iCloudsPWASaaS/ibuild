import { useQuery } from "@tanstack/react-query";
import { getticketresponse } from "../api/baseapi";

export const useTicket = (id: string | number) => {
    return useQuery({
        queryKey: ["ticketdata", id],
        queryFn: () => getticketresponse(id),
        enabled: !!id, 
        staleTime: 1000 * 60 * 2, 
    });
};
