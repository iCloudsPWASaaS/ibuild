import { useQuery } from "@tanstack/react-query";
import { getstate } from "../api/baseapi";

export const useStates = (countryId: string | null) => {
    return useQuery({
        queryKey: ['statedata'],
        queryFn: () => getstate(countryId || ''),
        staleTime: 1000 * 60 * 5,
    });
}