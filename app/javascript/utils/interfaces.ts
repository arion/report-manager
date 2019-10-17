export interface IUser {
  id: number;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface IReport {
  id: number;
  file: {
    url: string
  };
  title: string;
  description: string;
  position: number;
  file_data: {
    original_filename: string,
    size: string,
    mime_type: string,
  },
  createdAt: string;
  updatedAt: string;
}

export type IAction =
  | { type: 'account-signedIn', user: IUser | undefined }
  | { type: 'account-signedOut' }
  | { type: 'reports-loaded', reports: IReport[] }
  | { type: 'reports-updated', report: IReport }
  | { type: 'reports-created', report: IReport }
