import { IUser, IReport, IAction } from '../utils/interfaces'

export const initialState = {
  account: {
    user: undefined as IUser | undefined,
  },
  reports: [] as IReport[],
}

export type IState = typeof initialState;

export function reducer(state: IState, action : IAction) {
  console.log('dispatch', action)

  switch (action.type) {
    case 'account-signedOut':
      localStorage.removeItem('account-user')
      return {
        ...state,
        account: {
          user: undefined,
        },
      }
    case 'account-signedIn':
      localStorage.setItem('account-user', JSON.stringify(action.user))
      return {
        ...state,
        account: {
          user: action.user,
          loaded: true,
        },
      }
    case 'reports-loaded': {

      return {
        ...state,
        reports: action.reports,
      }
    }
    case 'reports-created': {
      return {
        ...state,
        reports: [...state.reports, action.report],
      }
    }
    case 'reports-updated': {
      const updatedReports = state.reports.map((r) => r.id === action.report.id ? action.report : r)

      return {
        ...state,
        reports: updatedReports,
      }
    }

    default: return state;
  }
}
