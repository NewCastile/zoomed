import classNames from 'classnames'
import React from 'react'
import { Link } from 'react-router-dom'
import { DateRangeColumnFilter, dateBetweenFilterFn } from "./filters/Filters.js" 

const patientsTableColumns = [
    {
      Header: 'Name',
      accessor: 'name',
      Cell: (props) => {
          const name = props.row.values.name
          return (
            <Link to={`./patients/${props.row.values._id}`}>{ name }</Link>
          )
      }
    },
    {
      Header: 'Specie',
      accessor: 'specie',
    },
    {
        Header: 'Birth',
        accessor: 'birth',
        Filter: DateRangeColumnFilter,
        filter: dateBetweenFilterFn,
        Cell: (props) => {
            const birth = props.row.values.birth
            return (
            <div to>{ birth.slice(0, 10) }</div>
            )
        } 
    },
    {
      Header: 'ID',
      accessor: '_id',
    },
    {
        Header: () => null,
        id: 'edit',
        Cell: ({ row }) => (
          <span {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? 
            <button className={classNames('bttn', 'edit-btn', 'open')} style={{ color: "#3f4fd4"} }>edit</button> :
            <button className={classNames('bttn', 'edit-btn')}>edit</button>}
          </span>
        ),
      }
  ]

const historialsTableColumns = [
    {
        Header: 'Patient Name',
        accessor: (row) => row.patient.name,
        id: 'patientName'
    },
    {
        Header: 'Patient Birth',
        accessor: (row) => row.patient.birth,
        id: 'patientBirth',
        Filter: DateRangeColumnFilter,
        filter: dateBetweenFilterFn,
        Cell: (props) => {
            const historialPatient = props.row.original.patient
            return (
                <div>{ historialPatient.birth.slice(0, 10) }</div>
            )
        } 
    },
    {
        Header: 'ID',
        accessor: '_id',
    }
]

const reportsTableColumns = [
    {
        Header: 'Patient Name',
        accessor: (row) => row.patient.name,
        id: 'patientName',
        Cell: (props) => {
            const name = props.row.original.patient.name
            return (
              <Link to={`./patients/${props.row.original.patient._id}`}>{ name }</Link>
            )
        }
    },
    {
        Header: 'Diagnosis',
        accessor:'diagnosis'
    },
    {
        Header: 'Date',
        accessor:'createdDate',
        Filter: DateRangeColumnFilter,
        filter: dateBetweenFilterFn,
        Cell: (props) => {
            const createdDate = props.row.original.createdDate
            return (
            <div>{ createdDate.slice(0, 10) }</div>
            )
        } 
    },
    {
        Header: 'ID',
        accessor: '_id',
    },
    {
        Header: () => null,
        id: 'edit',
        Cell: ({ row }) => (
          <span {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? 
            <button className={classNames('bttn', 'edit-btn', 'open')} style={{ color: "#3f4fd4"} }>edit</button> :
            <button className={classNames('bttn', 'edit-btn')}>edit</button>}
          </span>
        ),
    }
]

export const defineColumns = (tableItems) => {
    switch (tableItems) {
        case 'patients':
            return patientsTableColumns
        case 'historials':
            return historialsTableColumns
        case 'reports':
            return reportsTableColumns
        default:
            return 'table items not defined'
    }
}