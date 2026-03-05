export interface ProfileFormData {
  name: string;
  phone: string;
  email: string;
  school: string;
  major: string;
  interestFields: string[];
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
  // response는 "09:30:00"와 같이 받지만,
  // 실제 저장은 '시/분/초' 중 '시'만 저장함
  alarmTime: string;
}
