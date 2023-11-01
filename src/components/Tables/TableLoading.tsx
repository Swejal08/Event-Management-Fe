import React from 'react'

interface Props {
  rowCount?: number
  rowHeight?: number
  headerCount?: number
  hideHeader?: boolean
}

const TableLoading: React.FC<Props> = ({
  rowHeight = 12,
  rowCount = 2,
  headerCount = 3,
  hideHeader = false,
}) => (
  <div className="flex flex-col ">
    {!hideHeader && (
      <div className="flex gap-10">
        {[...Array(headerCount)].map((_, i) => (
          <div key={i} className="w-1/4 h-10 bg-gray-300 rounded-md"></div>
        ))}
      </div>
    )}
    <div className="flex flex-col gap-4">
      {[...Array(rowCount)].map((_, i) => (
        <div
          key={i}
          className={`w-full h-${rowHeight} bg-gray-300 rounded-md`}
        ></div>
      ))}
    </div>
  </div>
)

export default TableLoading
