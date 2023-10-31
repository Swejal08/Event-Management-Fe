export const DASHBOARD_URL = {
  LOGIN: '/login',
  REGISTER: '/register',
  EVENTS: '/events',
  EVENT: {
    ROOT: (id: string) => `event/${id}`,
    ADD: '/event/add',
    EDIT: (id: string) => `event/${id}/edit`,
  },
  SESSION: {
    ROOT: (eventId: string) => `event/${eventId}/session`,
    ADD: (eventId: string) => `event/${eventId}/session/add`,
    EDIT: (eventId: string, sessionId: string) =>
      `event/${eventId}/session/${sessionId}/edit`,
  },
  USER: {
    ROOT: (eventId: string) => `event/${eventId}/user`,
    INVITE: (eventId: string) => `event/${eventId}/invite`,
    REASSIGN: (eventId: string, userId: string) =>
      `event/${eventId}/user/${userId}/reassign`,
  },
  EXPENSE: {
    ROOT: (eventId: string) => `event/${eventId}/expense`,
    ADD: (eventId: string) => `event/${eventId}/expense/add`,
    EDIT: (eventId: string, expenseId: string) =>
      `event/${eventId}/expense/${expenseId}/edit`,
  },
  CATEGORY: {
    ADD: (eventId: string) => `event/${eventId}/category/add`,
  },
}
