import React from 'react'
import { Formik } from "formik";
import { useStore } from '../Content.js';
import Error from './Error.js';
import classNames from 'classnames';
import { Input } from 'reactstrap';

export const EditForm = ({ row, inputs, validationSchema }) => {
    const { tableItems, tableActions } = useStore()
    const initialValues = {}
    inputs.forEach(input => {
        initialValues[input.key] = row.values[input.key]
    })
    return (
        <Formik 
        initialValues={ initialValues }
        validationSchema = {validationSchema}
        onSubmit={async (values, {setSubmitting, resetForm}) => {
            setSubmitting(true)
            try {
                setSubmitting(false)
                await tableActions.edit({items: tableItems, editedItem: row.values._id, update: values})
            } catch (error) {
                setSubmitting(false)
                alert(`An error has ocurred: ${error}`)
            } 
        }}
        >
            {({ values, 
                errors, 
                touched, 
                handleChange, 
                handleBlur,
                handleSubmit,
                isSubmitting,
            }) => (
                <form className={classNames('form', 'edit-form')} onSubmit={ handleSubmit } style={{alignItems: "flex-start"}}>
                { inputs.map((input, index) => {
                    return input.component ? 
                    <div className="input-row" key={index}>
                        <input.component 
                            initialValue={values[input.key]} 
                        />
                        <Error touched={touched[input.key]} message={errors[input.key]}></Error>
                    </div> : 
                    <div className="input-row" key={index}>
                        <Input 
                            type={ input.type ? input.type : "text" }
                            name={ input.key }
                            id={ input.key }
                            placeholder={ input.key }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={ values[input.key] }
                            className={touched[input.key] && errors[input.key] ? "has-error" : null}
                            />
                        <Error touched={touched[input.key]} message={errors[input.key]}></Error>
                    </div>
                }) }
                <button className={classNames("bttn", "submit-btn")} type="submit" disabled={isSubmitting}>update</button>
                </form>
            )}
        </Formik>
    )
}