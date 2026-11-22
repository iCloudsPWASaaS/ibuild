import { useQuery } from "@tanstack/react-query";
import { getwebsitetypes } from "../api/baseapi";

export const useWebsitetype = () => {
    return useQuery({
        queryKey: ["websitetypes"],
        queryFn: getwebsitetypes,
        staleTime: 1000 * 60 * 2,
    });
}