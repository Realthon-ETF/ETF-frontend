# 알려주잡 서비스

## Project URL

https://etf-frontend-bqum.vercel.app

## 프로젝트 소개

AI 기반 맞춤 정보 알림 서비스. 이력서 업로드 후 AI 분석을 통해 학과 공지, 회사 공고, 취업 포털 정보를 자동 수집하여 알림톡으로 전달합니다.

## 기술 스택

### Frontend

- React 19 + TypeScript
- React Router DOM
- Styled Components
- Vite

## 주요 기능

### Frontend

- 이력서 PDF 업로드 및 AI 분석
- 맞춤 정보 수집 및 알림톡 발송
- 프로필 관리 및 알림 설정
- 모바일 최적화 알림 히스토리

## 프로젝트 구조

```
interest-monitoring-notification/
├── src/                    # Frontend 소스 코드
│   ├── routes/            # 페이지 컴포넌트
│   │   ├── login.tsx      # 로그인 페이지
│   │   ├── create-account.tsx  # 회원가입 페이지
│   │   ├── home.tsx       # 홈 페이지 (이력서 업로드)
│   │   ├── result.tsx     # 분석 결과 페이지
│   │   ├── profile.tsx    # 프로필 페이지
│   │   ├── confirmed.tsx  # 서비스 신청 완료 페이지
│   │   └── alarm-lists.tsx # 알림 목록 페이지
│   ├── components/        # 공통 컴포넌트
│   └── App.tsx           # 메인 앱 컴포넌트
├── vercel.json           # Vercel 배포 설정
└── package.json          # 프로젝트 의존성
```
