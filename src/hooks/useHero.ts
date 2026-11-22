import { useQuery } from "@tanstack/react-query";
import { getherodata } from "../api/baseapi";


export const useHero = () => {
    return useQuery({
        queryKey: ["herodata"],
        queryFn: getherodata,
        staleTime: 1000 * 60 * 2,
    });
};
