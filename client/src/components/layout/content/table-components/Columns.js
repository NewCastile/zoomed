import classNames from 'classnames'
import React from 'react'
import { DateRangeColumnFilter, dateBetweenFilterFn } from "./filters/Filters.js" 

const patientsTableColumns = [
    {
      Header: 'Name',
      accessor: 'name',
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
            const birth = props.row.original.birth
            return (
            <div>{ birth }</div>
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
            return (
                <div>{ props.row.original.patient.birth }</div>
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
        Header: 'Date',
        accessor:'createdDate',
        Filter: DateRangeColumnFilter,
        filter: dateBetweenFilterFn,
        Cell: (props) => {
            const createdDate = props.row.original.createdDate
            return (
            <div>{ createdDate }</div>
            )
        } 
    },
    {
        Header: 'Diagnosis',
        accessor:'diagnosis'
    },
    {
        Header: 'ID',
        accessor: '_id',
    },
    {
        Header: 'Patient Name',
        accessor: (row) => row.patient.name,
        id: 'patientName'
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