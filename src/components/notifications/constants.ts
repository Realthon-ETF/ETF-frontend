export const COLORS = {
  primary: "#141618",
  textSecondary: "#5A5C63",
  white: "#FFFFFF",
  borderLight: "#EAEBEC",
  badgeRed: "#FF4242",
  badgeBlue: "#EAF2FE",
  badgeOrange: "#FEF4E6",
  badgeLime: "#E6FFD4",
  bgHover: "#F9F9F9",
};

export type CategoryType =
  | "학과 공지"
  | "회사 공고"
  | "취업 포털"
  | "인턴 공고";

export function getNotificationBadgeColor(category: CategoryType) {
  switch (category) {
    case "학과 공지":
      return COLORS.badgeBlue;
    case "회사 공고":
      return COLORS.badgeOrange;
    case "취업 포털":
      return COLORS.badgeLime;
    default:
      return COLORS.badgeBlue;
  }
}
