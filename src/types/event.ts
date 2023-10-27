import { ISession } from './session'

export interface IEvent {
  id: string
  name: string
  description: string
  location: string
}

export interface IEventDetails extends IEvent {
  sessions: ISession[]
}
