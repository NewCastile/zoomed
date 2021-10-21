import React, { useRef } from 'react'
import { useMemo } from 'react';
import { useTable, usePagination, useFilters, useExpanded } from 'react-table';
import { TableLayout } from './TableLayout';
import { DefaultColumnFilter } from './filters/Filters';
import { defineColumns } from './Columns';
import classNames from 'classnames';
import useStore from '../../custom-hooks/useStore';

export const TableInstance = ({ tableData }) => {
  const { tableItems, tableActions } = useStore()
  const tableColumns = useMemo(() => defineColumns(tableItems), [tableItems])

  const itemsRef = useRef(tableItems)
  const actionsRef = useRef(tableActions)

  const columns = useMemo(
    () => tableColumns.concat(
        {
          Header: () => null,
          id: 'remove',
          accessor: 'actions',
          disableFilters: true,
          Cell: (props) => {
            const itemId = props.row.original._id
            const remove = actionsRef.current.remove
            const items = itemsRef.current
            return (
              <>
                <button className={classNames("bttn", "delete-btn")}
                  onClick={ async () => {
                    try {
                      await remove.mutate({ items, itemId })
                    } catch (error) {
                      alert(`An error has ocurred: ${error}`)
                    }
                  } }> 
                  { items === "historials" ? "clear": "delete"}
                </button>
              </>
            )
          }
        }
      )
    , [tableColumns]
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
      <TableLayout {...tableInstance} ></TableLayout>
    </>
  );
}