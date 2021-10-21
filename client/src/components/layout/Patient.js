import classNames from "classnames";
import usePatient from "../../custom-hooks/usePatient";
import useHistorial from "../../custom-hooks/useHistorial"
import { useParams } from "react-router"
import useDeleteMutation from "../../custom-hooks/useDeleteMutation"
import PostForm from "../form-components/PostForm"
import { TableInstance } from "../table-components/TableInstance"

const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

const Patient = () => {
    const { patientId } = useParams()
    const { 
      data: patientData, 
      isLoading: patientIsLoading, 
      error: patientError } = usePatient(patientId)
    const historialId = patientData?.historial
    const { 
      data: historialData,  
      isLoading: historialIsLoading, 
      error: historialError, 
      isIdle: historialIsIdle } = useHistorial(historialId)
    const clearHistorial = useDeleteMutation({ items: "historials"})
    return (
        <>
          {patientIsLoading ? (
            <span>Loading...</span>
          ) : patientError ? (
            patientError.message
          ) : (
            <div>
              <h2>{patientData.name}</h2>
              <p>{patientData.specie}</p>
              <p>Born on { new Date(patientData.birth).toLocaleDateString('en-EN', dateOptions) }</p>
            </div>
          )}
          { historialIsIdle ? (
            <div>Waiting for patients' data </div>
          ) : historialIsLoading ? (
            <div>Loading...</div>
          ) : historialError ? (
            <div>{ historialError.message }</div>
          ) : historialData && (
            <div>
              <div style={{ display: "flex", flexDirection: "row" , alignItems: "center", marginBottom: "10px"}}>
                <h4 style={{ marginRight: "20px", marginBottom: "0px" }}>Medical Record</h4>
                <button className={classNames("bttn", "delete-btn")} onClick={() => {
                  clearHistorial.mutate({ items: "historials", itemId: historialId })
                }}>clear</button>
              </div>
              <PostForm />
              <TableInstance tableData={ historialData }></TableInstance>
            </div>
          )}
        </>
      )
}

export default Patient