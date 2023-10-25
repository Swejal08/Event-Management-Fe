import { IEventDetails } from '@/types/event'
import SessionTable from '../components/SessionTable'

interface IProps {
  eventDetails: IEventDetails
}

const Sessions: React.FC<IProps> = ({ eventDetails }) => {
  return (
    <>
      {/* {!loadingEventDetails && ( */}
      <SessionTable sessions={eventDetails.sessions} />
      {/* )} */}
    </>
  )
}

export default Sessions
