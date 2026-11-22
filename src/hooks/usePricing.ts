import { useQuery } from "@tanstack/react-query"
import { getpricingdata } from "../api/baseapi"

export const usePricing = () => {
    const storedUser = localStorage.getItem("userData")
    let userId = undefined

    if (storedUser) {
        try {
            const parsedUser = JSON.parse(storedUser)
            userId = parsedUser?.id
        } catch (error) {
            console.error(error)
        }
    }

    return useQuery({
        queryKey: ['pricingdata', userId],
        queryFn: () => getpricingdata(userId),
        staleTime: 1000 * 60 * 2
    })
}