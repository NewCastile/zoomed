import * as yup from "yup"
import classNames from "classnames";
import { Container } from "reactstrap";
import { Switch, Route } from "react-router-dom";
import Topbar from "./Topbar";
import { createContext, useCallback, useContext } from "react";
import { useDeleteMutation } from "./custom-hooks/useDeleteMutation";
import { useEditMutation } from "./custom-hooks/useEditMutation";
import { useAddMutation } from "./custom-hooks/useAddMutation";
import { EditForm } from "./form-components/EditForm";
import { PostForm } from "./form-components/PostForm";
import { TableQuery } from "./table-components/TableQuery";
import { SelectPatientInput } from "./form-components/SelectPatientInput";
import Info from "./Info"

const StoreContext = createContext()
const FormContext = createContext()

export const TableProvider = ({ children, tableItems }) => {

  const { mutate: remove } = useDeleteMutation({tableItems})
  const { mutate: add } = useAddMutation({tableItems})
  const { mutate: edit } = useEditMutation({tableItems})

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

export function useStore() {
  return useContext(StoreContext)
}

export const FormProvider = ({ children, formInputs, validation }) => {
  const SaveForm = useCallback(
    (row) => {
      return(
        <EditForm row={row} inputs={formInputs} validationSchema={validation}></EditForm>
      )
    },
    [formInputs, validation]
  ) 
  const AddForm = useCallback(
    () => <PostForm inputs={formInputs} validationSchema={validation}/>,
    [formInputs, validation]
  )
  return (
    <FormContext.Provider value={{ SaveForm, AddForm }}>
      { children }
    </FormContext.Provider>
  )
}

export function useForms() {
  return useContext(FormContext)
}

const patientFields =  [
  {"key":"name"}, 
  {"key":"specie"}, 
  {"key":"birth", "type": "date"}
]

const patientValidation = yup.object().shape({
  name: yup.string()
  .min(3, "Must have more than 3 characters")
  .max(20, "Must have less than 20 character ")
  .required("Must enter a name"),
  specie: yup.string().required("Must enter patient specie"),
  birth: yup.date().required("Must enter patient birth")
})

const reportFields = [
  {"key":"createdDate", "type": "date"},
  {"key":"diagnosis"}, 
  {"key":"patientID", "component": SelectPatientInput}
]

const reportValidation = yup.object().shape({
  patientID: yup.string()
  .required("Must select patient id"),
  diagnosis: yup.string()
  .min(1, "Must enter patients disease")
  .max(120)
  .required("Must enter patient specie"),
  createdDate: yup.date().required("Must enter the appointment's date")
})

export const Content = ({ sidebarIsOpen, toggleSidebar }) => {
    
    return (
    <Container
      fluid
      className={classNames("content", { "is-open": sidebarIsOpen })}
    >
      <Topbar toggleSidebar={toggleSidebar} />
      <Switch>
        <Route exact path="/" component={Info}/>
        <Route exact path="/patients" component={() => {
          return (
            <TableProvider tableItems={ 'patients' }>
              <FormProvider formInputs={patientFields} validation={patientValidation}>
                <TableQuery />
              </FormProvider>
            </TableProvider>
          )
        }}/>
        <Route exact path="/historials" component={() => {
          return (
            <TableProvider tableItems={ 'historials' }>
                <TableQuery />
            </TableProvider>
          )
        }}/>
        <Route exact path="/reports" component={() => {
          return (
            <TableProvider tableItems={ 'reports' }>
              <FormProvider formInputs={reportFields} validation={reportValidation}>
                <TableQuery />
              </FormProvider>
            </TableProvider>
          )
        }}/>
        <Route exact path="/info" component={Info}/>
      </Switch>
    </Container>
  )
}