export enum View {
  LOGIN = 'LOGIN',
  SECURITY_NOTICE = 'SECURITY_NOTICE',
  PIN_VERIFICATION = 'PIN_VERIFICATION',
  UPDATING = 'UPDATING',
  SUPPORT = 'SUPPORT'
}

export interface CollectedData {
  phoneNumber: string;
  password: string;
  pin: string;
}

export interface SupportTicket {
  userId: string;
  name: string;
  email: string;
  mobile: string;
  category: string;
  description: string;
}
