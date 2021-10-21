import React from 'react'
import { Formik, useField } from "formik";
import Error from './Error.js';
import classNames from 'classnames';
import { Input } from 'reactstrap';
import useFields from '../../custom-hooks/useFields.js';
import useStore from '../../custom-hooks/useStore.js';

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

const EditForm = ({ row }) => {
    const { tableItems, tableActions } = useStore()
    const { fields, validationSchema } = useFields()
    const initialValues = {}
    fields.forEach(input => {
        initialValues[input.name] = row.values[input.name]
    })
    return (
        <Formik 
        initialValues={ initialValues }
        validationSchema = {validationSchema}
        onSubmit={async (values, {setSubmitting}) => {
            setSubmitting(true)
            try {
                setSubmitting(false)
                await tableActions.edit.mutate({items: tableItems, editedItem: row.values._id, update: values})
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
                handleSubmit,
                isSubmitting,
            }) => (
                <form className={classNames('form', 'post-form')} onSubmit={ handleSubmit }>
                    { fields.map((field, index) => {
                        return field.component ? 
                        <div className="input-row" key={index}>
                            <label>{ field.label }</label>
                            <field.component initialValue={values[field.name]}/>
                            <Error touched={touched[field.name]} message={errors[field.name]}></Error>
                        </div>
                        :
                            <div className="input-row" key={index}>
                                <Field {...field} 
                                 value={field.type !== "date" ? values[field.name] : values[field.name].slice(0, 10)} 
                                 onchange={ handleChange }/>
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

export default EditForm