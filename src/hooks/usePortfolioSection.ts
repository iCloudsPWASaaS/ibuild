import { useQuery } from "@tanstack/react-query";
import { getportfoliodata } from "../api/baseapi";

export const usePortfoliosection = () => {
    return useQuery({
        queryKey: ["portfoliosectiondata"],
        queryFn: getportfoliodata,
        staleTime: 1000 * 60 * 2,
    });
};
