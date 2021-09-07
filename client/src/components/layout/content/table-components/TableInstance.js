import React from 'react'
import { useMemo } from 'react';
import { useTable, usePagination, useFilters, useExpanded } from 'react-table';
import { TableLayout } from './TableLayout';
import { DefaultColumnFilter } from './filters/Filters';
import { useStore } from '../Content';
import { defineColumns } from './Columns';
import classNames from 'classnames';
import { BasicTable } from './BasicTable';

export const TableInstance = ({ tableData }) => {
  const { tableItems, tableActions } = useStore()
  const tableColumns = defineColumns(tableItems)

  const columns = useMemo(
    () => tableColumns.concat(
        {
          Header: () => null,
          id: 'remove',
          accessor: 'actions',
          disableFilters: true,
          Cell: (props) => {
            const id = props.row.original._id
            return (
              <>
                <button className={classNames("bttn", "delete-btn")}
                  onClick={ async () => {
                    try {
                      await tableActions.remove({ items: tableItems, itemId: id })
                    } catch (error) {
                      alert(`An error has ocurred: ${error}`)
                    }
                  } }> 
                  { tableItems === "historials" ? "clear": "delete"}
                </button>
              </>
            )
          }
        }
      )
    , [tableActions, tableItems, tableColumns]
  )

  const data = useMemo(() => tableData, [tableData])

  const tableInstance = useTable(
  { 
    columns, 
    data, 
    initialState: { pageIndex: 0, pageSize: 10 },
    defaultColumn: { Filter: DefaultColumnFilter },
  }, 
    useExpanded,
    useFilters,
    usePagination,
  );

  return (
    <>
    { 
      tableItems === "historials" ? 
      <BasicTable {...tableInstance}></BasicTable> :
      <TableLayout {...tableInstance} ></TableLayout>
    }
    </>
  );
}