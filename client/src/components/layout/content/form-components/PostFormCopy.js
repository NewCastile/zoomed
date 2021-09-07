import React from 'react'
import { Formik } from "formik";
import { useStore } from '../Content.js';
import classNames from 'classnames';
import { Input } from 'reactstrap';

export const PostForm = ({ inputs }) => {
    const { tableItems, tableActions } = useStore()
    const initialValues = {}
    inputs.forEach(input => {
        initialValues[input.key] = ""
    })
    return (
        <Formik 
        initialValues = {initialValues}
        onSubmit={async (values, {setSubmitting, resetForm}) => {
            setSubmitting(true)
            try {
                setSubmitting(false)
                tableActions.add({items: tableItems, newItem: values})
                resetForm()
            } catch (error) {
                setSubmitting(false)
                alert(`An error has ocurred: ${error}`)
                resetForm()
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
                <form className={classNames('form', 'post-form')} onSubmit={ handleSubmit }>
                { inputs.map((input, index) => {
                    return input.component ? 
                    <div className="input-row" key={index}>
                        <label htmlFor={ input.key }>{ `${input.key.charAt(0).toUpperCase()}${input.key.slice(1)}` }</label>
                        <input.component />
                    </div> : 
                    <div className="input-row" key={index}>
                        <label htmlFor={ input.key }>{ `${input.key.charAt(0).toUpperCase()}${input.key.slice(1)}` }</label>
                        <Input 
                            type={ input.type ? input.type : "text" }
                            name={ input.key }
                            id={ input.key }
                            placeholder={ input.key }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            />
                    </div>
                }) }
                <button className={classNames("bttn", "submit-btn")} type="submit" disabled={isSubmitting}>add</button>
                </form>
            )}
        </Formik>
    )
}