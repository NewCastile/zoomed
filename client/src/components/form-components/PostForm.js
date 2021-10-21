import React from 'react'
import classNames from 'classnames';
import { Formik, useField } from "formik";
import useStore from '../../custom-hooks/useStore.js';
import { Input } from 'reactstrap';
import useFields from '../../custom-hooks/useFields.js';
import Error from './Error.js';

const Field = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <>
        <label>{ label }</label>
        <Input {...field} {...props} />
        <Error touched={meta.touched} message={meta.error}></Error>
      </>
    )
 }
 
const PostForm = () => {
    const { tableItems, tableActions } = useStore()
    const { fields, validationSchema } = useFields()
    const initialValues = {}
    fields.forEach(field => {
        initialValues[field.name] = ""
    })
    return (
        <Formik 
        initialValues = {initialValues}
        validationSchema = {validationSchema}
        onSubmit={async (values, {setSubmitting, resetForm}) => {
            setSubmitting(true)
            try {
                setSubmitting(false)
                await tableActions.add.mutate({items: tableItems, newItem: values})
                resetForm()
            } catch (error) {
                setSubmitting(false)
                alert(`An error has ocurred: ${error}`)
                resetForm()
            }
        }}
        >
            {({
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                errors
            }) => (
                <form className={classNames('form', 'post-form')} onSubmit={ handleSubmit }>
                    { fields.map((field, index) => {
                        return field.component ? 
                        <div className="input-row" key={index}>
                            <label>{ field.label }</label>
                            <field.component />
                            <Error touched={touched[field.name]} message={errors[field.name]}></Error>
                        </div>
                        :
                            <div className="input-row" key={index}>
                                <Field {...field} onchange={ handleChange }/>
                            </div>
                      }) }
                    <button className={classNames("bttn", "submit-btn")} type="submit" disabled={isSubmitting}>
                        {tableActions.add.isLoading
                        ? 'adding...'
                        : tableActions.add.isError
                        ? 'error!'
                        : 'add'}
                    </button>
                </form>
            )}
        </Formik>
    )
 }

export default PostForm