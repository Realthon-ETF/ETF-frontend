// import mixpanel from "mixpanel-browser";

// // const MIXPANEL_TOKEN = "76b5cc25179ab9d033b127d3f1266dcc";

// // 토큰이 없을 경우를 대비한 방어 코드
// // if (MIXPANEL_TOKEN) {
// //   mixpanel.init(MIXPANEL_TOKEN, {
// //     debug: process.env.NODE_ENV !== "production", // 프로덕션이 아닐 때만 디버그 모드 활성화
// //     track_pageview: true,
// //     persistence: "localStorage",
// //   });
// // }
// // mixpanel.init("76b5cc25179ab9d033b127d3f1266dcc", {
// //   autocapture: true,
// //   record_sessions_percent: 100,
// // });
// mixpanel.init(import.meta.env.MIXPANEL_TOKEN, {
//   debug: true, // 로컬 개발 시 콘솔에 로그가 찍히도록 설정
//   track_pageview: true, // 페이지 뷰 자동 추적 여부
//   persistence: "localStorage",
// });

// // export const Mixpanel = {
// //   identify: (id: string) => mixpanel.identify(id),
// //   alias: (id: string) => mixpanel.alias(id),
// //   track: (name: string, props?: object) => mixpanel.track(name, props),
// //   people: {
// //     set: (props: object) => mixpanel.people.set(props),
// //   },
// // };

import mixpanel from "mixpanel-browser";

// Vite 환경변수 로드 (VITE_ 접두사가 붙어야 합니다)
const MIXPANEL_TOKEN = import.meta.env.VITE_MIXPANEL_TOKEN;

if (MIXPANEL_TOKEN) {
  mixpanel.init(MIXPANEL_TOKEN, {
    debug: true, // 테스트 중에는 true, 배포 시에는 process.env.NODE_ENV !== "production" 추천
    track_pageview: true,
    persistence: "localStorage",
  });
}

// 애플리케이션에서 사용할 Mixpanel 인터페이스 정의
export const Mixpanel = {
  identify: (id: string) => {
    mixpanel.identify(id);
  },
  alias: (id: string) => {
    mixpanel.alias(id);
  },
  track: (name: string, props?: object) => {
    mixpanel.track(name, props);
  },
  people: {
    set: (props: object) => {
      mixpanel.people.set(props);
    },
  },
};
