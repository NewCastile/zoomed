import axios from "axios"
import { useMutation, useQueryClient } from "react-query"

export function useAddMutation({ items }) {
    const client = useQueryClient()
    const mutation = useMutation(
    async ({ items, newItem }) => {
        const response = await axios.post(`/api/${items}`, newItem)
        const { data } = response
        return data
    }, 
    {
    onSuccess: (response) => {
      return response
    },
    onError: (err) =>{ 
      return err
    },
    onSettled: () =>{
      client.invalidateQueries(items)
    },
  })
  
  return mutation
}
