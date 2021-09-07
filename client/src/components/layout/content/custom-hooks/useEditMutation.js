import axios from 'axios'
import { useMutation, useQueryClient } from "react-query"

export function useEditMutation({ items }) {
    const client = useQueryClient()
    const mutation = useMutation(
    async ({ items, editedItem, update }) => {
        const response = await axios.patch(`/api/${items}/${editedItem}`, update)
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