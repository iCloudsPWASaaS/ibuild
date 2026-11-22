import { useQuery } from "@tanstack/react-query"
import { getblogdetails } from "../api/baseapi"

export const useBlogdetails = (id:any) => {
    return useQuery({
        queryKey: ['blog-details',id],
        queryFn: () => getblogdetails(id),
        enabled: !!id,
    });
}