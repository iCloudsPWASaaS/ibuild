import { useQuery } from "@tanstack/react-query"
import { getuserdashboard, getuserwebsiteanalytics } from "../api/baseapi"

export const useDashboard = () => {
    return useQuery({
        queryKey: ['dashboarddata'],
        queryFn: () => getuserdashboard(),
        staleTime: 1000 * 60 * 2
    })
}

export const userWebsiteAnalytics = (filter: string = "yearly", start?: string, end?: string) => {
    return useQuery({
        queryKey: ['userwebsiteanalytics',filter, start, end],
        queryFn: () => getuserwebsiteanalytics(filter, start, end),
        staleTime: 1000 * 60 * 2
    })
}