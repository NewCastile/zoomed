import axios from "axios"
import { useMutation, useQueryClient } from "react-query"

export function useDeleteMutation({ items }) {
    const client = useQueryClient()
    const mutation = useMutation(
    async ({ items, itemId }) => {
        const response = await axios.delete(`/api/${items}/${itemId}`)
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