import { useQuery } from "@tanstack/react-query";
import { gettaglinedata } from "../api/baseapi";

export const useTagline = () => {
    return useQuery({
        queryKey: ["taglinedata"],
        queryFn: gettaglinedata,
        staleTime: 1000 * 60 * 5,
    });
};