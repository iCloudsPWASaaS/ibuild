import { useQuery } from "@tanstack/react-query";
import { getcountry } from "../api/baseapi";

export const useCountry = () => {
    return useQuery({
        queryKey: ['countrydata'],
        queryFn: getcountry,
        staleTime: 1000 * 60 * 2,
    });
}