interface ISessionProps {
  id: string
  startDate: string
  endDate: string
}

interface IProps {
  sessions: ISessionProps[]
}

const SessionTable: React.FC<IProps> = ({ sessions }) => {
  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Session</th>
              <th className="py-3 px-6">Start Date</th>
              <th className="py-3 px-6">End Date</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {sessions.map(session => (
              <tr key={session.id}>
                <td className="px-6 py-4 whitespace-nowrap">Session</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {session.startDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {session.endDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SessionTable
