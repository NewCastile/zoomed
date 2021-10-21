import { createContext, useContext } from "react"
const FieldContext = createContext()

export const FieldProvider = ({ children, fields, validationSchema }) => {
    return (
      <FieldContext.Provider value={{ fields, validationSchema }}>
        { children }
      </FieldContext.Provider>
    )
  }
  
export default function useFields() {
    return useContext(FieldContext)
}