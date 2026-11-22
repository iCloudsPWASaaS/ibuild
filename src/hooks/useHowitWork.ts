import { useQuery } from "@tanstack/react-query"
import { gethowitworksectiondata } from "../api/baseapi"

export const useHowitWork = () => {
    return useQuery({
        queryKey: ['howitworkdata'],
        queryFn: gethowitworksectiondata,
        staleTime: 1000 * 60 * 2,
    })
}