import * as yup from "yup"
import classNames from "classnames";
import { Container } from "reactstrap";
import { Switch, Route } from "react-router-dom";
import Topbar from "./Topbar";
import { StoreProvider } from "../../custom-hooks/useStore";
import { FieldProvider } from "../../custom-hooks/useFields";
import { MainTable } from "../table-components/MainTable";
import SelectPatientInput from "../form-components/SelectPatientInput";
import Info from "./Info"
import Patient from "./Patient";
import PostForm from "../form-components/PostForm";

const patientFields = [
  {
    label: "Name",
    name: "name",
    type: "text",
    placeholder: "Patient name"
  },
  {
    label: "Specie",
    name: "specie",
    type: "text",
    placeholder: "Patient specie"
  },
  {
    label: "Birth",
    name: "birth",
    type: "date",
    placeholder: "Patient birth"
  }
]

const patientValidation = yup.object().shape({
  name: yup.string()
  .min(3, "Must have more than 3 characters")
  .max(20, "Must have less than 20 character ")
  .required("Must enter a name"),
  specie: yup.string().required("Must enter patient specie"),
  birth: yup.date().required("Must enter patient birth")
})

export const reportFields = [
  {
    label: "Created at",
    name: "createdDate",
    type: "date",
    placeholder: "Created at",
  },
  {
    label: "Diagnosis",
    name: "diagnosis",
    type: "text",
    placeholder: "Diagnosis",
  },
  { 
    label: "PatientID",
    name: "patientID",
    component: SelectPatientInput,
  },
]

export const reportValidation = yup.object().shape({
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
            <StoreProvider tableItems={ 'patients' }>
              <FieldProvider fields={patientFields} validationSchema={patientValidation}>
                <PostForm />
                <MainTable />
              </FieldProvider>
            </StoreProvider>
          )
        }}/>
        <Route exact path="/patients/:patientId" component={ () => {
          return (
          <StoreProvider tableItems={ 'reports' }>
            <FieldProvider fields={reportFields} validationSchema={reportValidation}>
              <Patient></Patient>
            </FieldProvider>
          </StoreProvider>
          )
        } }/>
        <Route exact path="/historials" component={() => {
          return (
            <StoreProvider tableItems={ 'historials' }>
                <MainTable />
            </StoreProvider>
          )
        }}/>
        <Route exact path="/reports" component={() => {
          return (
            <StoreProvider tableItems={ 'reports' }>
              <FieldProvider fields={reportFields} validationSchema={reportValidation}>
                <PostForm />
                <MainTable />
              </FieldProvider>
            </StoreProvider>
          )
        }}/>
        <Route exact path="/info" component={Info}/>
      </Switch>
    </Container>
  )
}