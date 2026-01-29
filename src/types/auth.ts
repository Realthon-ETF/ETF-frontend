export interface ProfileFormData {
  name: string;
  phone: string;
  email: string;
  school: string;
  major: string;
  interest: string;
  alarmPeriod: string;
  alarmTime: string;
}

export interface ProfileResponse {
  userId: number;
  loginId: string;
  username: string;
  phoneNumber: string;
  email: string;
  school: string;
  major: string;
  interestFields: string[];
  intervalDays: number;
  alarmTime: string;
}
