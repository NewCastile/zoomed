import { useMemo } from 'react'
import { Input } from 'reactstrap'

export const DefaultColumnFilter = ({
    column: { filterValue, preFilteredRows, setFilter },
    }) => {
    const count = preFilteredRows.length
  
    return (
      <Input
        value={filterValue || ''}
        onChange={e => {
          setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
        }}
        placeholder={`Search ${count} records...`}
      />
    )
  }

export function dateBetweenFilterFn(rows, id, filterValues) {
    let sd = filterValues[0] ? Date.parse(filterValues[0]) : undefined
    let ed = filterValues[1] ? Date.parse(filterValues[1]) : undefined

    if (ed || sd) {
      // eslint-disable-next-line array-callback-return
      return rows.filter(r => {
        var time = Date.parse(r.values[id])
        return ed && sd ? time >= sd && time <= ed : 
        sd ? time >= sd : 
        ed ? time <= ed : false
      })
    } else {
      return rows
    }
  }

export function DateRangeColumnFilter({
    column: { filterValue = [], preFilteredRows, setFilter, id },
  }) {
    const [min, max] = useMemo(() => {
      let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
      let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
      preFilteredRows.forEach(row => {
        const rowDate = Date.parse(row)
        min = Math.min(rowDate, min)
        max = Math.max(rowDate, max)
      })
      return [min, max]
    }, [id, preFilteredRows])
  
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <Input
          value={filterValue[0] || ''}
          type="date"
          onChange={e => {
            const val = e.target.value
            setFilter((old = []) => [val ? val : undefined, old[1]])
          }}
          placeholder={`Min (${min})`}
          style={{
            marginRight: '0.5rem',
          }}
        />
        to
        <Input
          value={filterValue[1] || ''}
          type="date"
          onChange={e => {
            const val = e.target.value
            setFilter((old = []) => [old[0], val ? val : undefined])
          }}
          placeholder={`Max (${max})`}
          style={{
            marginLeft: '0.5rem',
          }}
        />
      </div>
    )
  }