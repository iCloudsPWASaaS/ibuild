import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getwebhistory, getwebdetails, getpagedata, deletewebhistory } from "../api/baseapi"

export const useWebhistorydata = (limit = 0) => {
    return useQuery({
        queryKey: ['webhistorydata', limit],
        queryFn: () => getwebhistory(limit),
        staleTime: 1000 * 60 * 2,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
    })
}

export const useWebDetailsydata = (id: any) => {
    return useQuery({
        queryKey: ['webdetailsdata', id],
        queryFn: () => getwebdetails(id),
        staleTime: 1000 * 60 * 2
    })
}


export const usePagedata = (limit = 0) => {
    return useQuery({
        queryKey: ['pagedata', limit],
        queryFn: () => getpagedata(limit),
        staleTime: 1000 * 60 * 2
    })
}

export const useDeleteProject = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (preferenceId: string) => deletewebhistory(preferenceId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['webhistorydata'] })
        },
    })
}