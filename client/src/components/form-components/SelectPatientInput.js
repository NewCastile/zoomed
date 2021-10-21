import axios from "axios"
import React from "react"
import { useState } from "react"
import Autosuggest from "react-autosuggest"
import { useFormikContext } from "formik"

const SelectPatientInput = ({ initialValue = "" }) => {
    const [inputValue, setInputValue] = useState(initialValue)
    const [suggestions, setSuggestions] = useState([])
    const { setFieldValue } = useFormikContext()

    const onSuggestionsFetchRequested = async({value}) => {
        if(!value) {
            setSuggestions([])
            return
        }
        try {
            const result = await axios.get(`/api/patients/search/${value}`)
            setSuggestions(result.data.map(patient =>({ 
                    _id: patient._id,
                    name: patient.name
                }))
            )
        } catch (error) {
            setSuggestions([])
        }
    }

    const onSuggestionSelected = (event, {suggestion, method}) => {
        if (method === "enter" || "click") {
            event.preventDefault()
        }
        setFieldValue("patientID", suggestion._id)
    }

    return (
            <Autosuggest 
                inputProps={{
                    placeholder: "Type patient's name",
                    autoComplete: "",
                    name: "patientID",      
                    id: "patientID",
                    value: inputValue,
                    className: "form-control",
                    onChange: (_event, { newValue }) => {
                        setInputValue(newValue)
                    }
                }}
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={() => {
                    setSuggestions([])
                }}
                onSuggestionSelected={onSuggestionSelected}
                getSuggestionValue={suggestion => suggestion.name}
                renderSuggestion={suggestion => <div>
                    <p>{suggestion.name}</p>
                    <p>{suggestion._id}</p>
                </div>}
                >
            </Autosuggest>
    )
}

export default SelectPatientInput