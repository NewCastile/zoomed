import { createContext, useContext } from "react"
import useAddMutation from "../custom-hooks/useAddMutation"
import useDeleteMutation from "./useDeleteMutation"
import useEditMutation from "./useEditMutation"

const StoreContext = createContext()

export const StoreProvider = ({ children, tableItems }) => {

    const remove = useDeleteMutation(tableItems)
    const add = useAddMutation(tableItems)
    const edit = useEditMutation(tableItems)
  
    const tableActions = {
      remove,
      add,
      edit
    }
    
    return (
      <StoreContext.Provider value={{tableItems, tableActions}}>
        { children }
      </StoreContext.Provider>
    )
}
  
export default function useStore() {
  return useContext(StoreContext)
}