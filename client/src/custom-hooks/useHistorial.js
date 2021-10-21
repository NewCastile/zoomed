import axios from "axios"
import { useQuery, useQueryClient } from "react-query"

const useHistorial = (historialId) => {
    const queryClient = useQueryClient()
    return useQuery(
      ['historials', historialId], 
      () => axios.get(`/api/reports/search/${historialId}`).then((res) => res.data),
      { 
        enabled: !!historialId,
        initialData: () => {
          return queryClient.getQueryData(['historials', historialId])
        },
        refetchOnWindowFocus: false
      }
    )
}

export default useHistorial
