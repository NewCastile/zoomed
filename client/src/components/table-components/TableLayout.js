import { Input } from "reactstrap"
import classNames from 'classnames';
import EditForm from "../form-components/EditForm"
import useStore from "../../custom-hooks/useStore";

const rowStyles = { 
  borderTopWidth: "1px", 
  borderTopColor: "#dedede", 
  borderTopStyle: "solid" 
}

const paginationStyles = { 
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'left',
}

export const TableLayout = ({
  getTableProps,
  getTableBodyProps,
  headerGroups,
  page,
  prepareRow,
  visibleColumns,
  canPreviousPage,
  canNextPage,
  pageOptions,
  pageCount,
  gotoPage,
  nextPage,
  previousPage,
  state: { pageIndex },
  }) => {
    const { tableItems } = useStore()
    return (
      <>
      <table {...getTableProps()} className={classNames(`${tableItems}-table`)}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr className="theader" {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} style={{padding: "20px 10px"}}>
                  {column.render('Header')}
                  {column.canFilter ? ( column.render('Filter') ) : null}
                </th>
              ))} 
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row)
            return (
              <>
                <tr style={ rowStyles } {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td style={{padding: "10px"}} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </tr>
                { row.isExpanded ? (
                    <tr>
                      <td style={{padding: "10px"}} colSpan={visibleColumns.length}>
                        { <EditForm row={row} /> }
                      </td>
                    </tr>
                ) : null }
              </>
            )
          })}
        </tbody>
      </table>
      <br />
      <div className="pagination" style={paginationStyles}>
        <button className={classNames('bttn', 'pag-btn')} onClick={() => gotoPage(0)} disabled={!canNextPage}>
          {'<<'}
        </button>
        <button className={classNames('bttn', 'pag-btn')} onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>
        <button className={classNames('bttn', 'pag-btn')} onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>
        <button className={classNames('bttn', 'pag-btn')} onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>
        <div>
            Page<strong> {pageIndex + 1} of {pageOptions.length}</strong>
        </div>
        <div>
            | Go to page:
        </div>
        <Input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ maxWidth: '100px' }}
          />
        </div>
      </>
    );
  }