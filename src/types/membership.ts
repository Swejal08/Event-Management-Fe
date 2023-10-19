import { IUserDetails } from './user'

export enum UserRole {
  ADMIN = 'admin',
  CONTRIBUTOR = 'contributor',
  ATTENDEE = 'attendee',
}

export interface IMembershipDetails {
  id: string
  role: UserRole
  user: IUserDetails
}
