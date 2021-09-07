import { useQuery, useQueryClient } from 'react-query';
import { useStore } from '../Content';
import { TableInstance } from './TableInstance';
import axios from 'axios';

export const TableQuery = () => {
  const { tableItems: items } = useStore()
  const queryClient = useQueryClient()
  const { data, isLoading, error } = useQuery(
      items, 
      () => axios.get(`/api/${items}`).then((res) => res.data), {
        initialData: () => {
          return queryClient.getQueryData(items)
        },
        refetchOnWindowFocus: false
      }
    ) 

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>An error has ocurred: {error.message}</div>
  }

  return (
      <TableInstance tableData={data} />
  )
}