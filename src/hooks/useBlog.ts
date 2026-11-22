import { useQuery } from "@tanstack/react-query";
import { getblog } from "../api/baseapi";


export const useBlogs = () => {
    return useQuery({
        queryKey: ["blogs"],
        queryFn: getblog,
        staleTime: 1000 * 60 * 2,
    });
};
