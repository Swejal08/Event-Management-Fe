interface TableProps {
  columns: ColumnType[]
  rows: React.ReactNode[]
}

interface ColumnType {
  key: string
  label: string
}

const Table: React.FC<TableProps> = ({ columns = [], rows = [] }) => {
  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="mt-4 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              {columns.map(column => (
                <th key={column.key} className="py-3 px-6">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    </div>
  )
}

export default Table
