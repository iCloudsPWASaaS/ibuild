import { useQuery } from "@tanstack/react-query"
import { getfeaturesectiondata } from "../api/baseapi"

export const useFeature = () => {
    return useQuery({
        queryKey: ['feacturesectiondata'],
        queryFn: getfeaturesectiondata,
        staleTime: 1000 * 60 * 2,
    })
}