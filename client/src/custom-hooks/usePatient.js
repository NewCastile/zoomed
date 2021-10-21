import axios from "axios"
import { useQuery, useQueryClient } from "react-query"

const usePatient = (patientId) => {
    const queryClient = useQueryClient()
      return useQuery(
          ['patients', patientId],
          () => axios.get(`/api/patients/${patientId}`).then((res) => res.data),
          {
            initialData: () => {
              return queryClient.getQueryData(['patients', patientId])
            },
            refetchOnWindowFocus: false
          }
      )
    }

export default usePatient