import { ISession } from '@/types/session'
import { ReactNode } from 'react'
import moment from 'moment'

interface IProps {
  session: ISession
  children: ReactNode
}

const SessionTableRow: React.FC<IProps> = ({ session, children }) => {
  const row = {
    name: session.name,
    startDate: moment
      .utc(session.startDate)
      .local()
      .format('Do MMM YYYY h:mm a'),
    endDate: moment.utc(session.endDate).local().format('Do MMM YYYY h:mm a'),
  }

  return (
    <tr>
      <td className="px-6 py-4 whitespace-normal break-all">{row.name}</td>
      <td className="px-6 py-4 whitespace-normal break-all">{row.startDate}</td>
      <td className="px-6 py-4 whitespace-normal break-all">{row.endDate}</td>
      <td>{children}</td>
    </tr>
  )
}

export default SessionTableRow
