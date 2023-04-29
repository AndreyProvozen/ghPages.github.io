export interface linkData {
  clicked: number;
  code: string;
  url: string;
  _id: string;
  __v: number;
}

export enum ScreenSize {
  DESKTOP_BELOW = "(max-width: 1200px)",
  DESKTOP_SMALL_BELOW = "(max-width: 1023px)",
  TABLET_BELOW = "(max-width: 767px)",
  TABLET_SMALL_BELOW = "(max-width: 640px)",
  MOBILE_BELOW = "(max-width: 500px)",
  MOBILE_SMALL_BELOW = "(max-width: 400px)",
}
export enum flashMessageType {
  ERROR = "bg-darkRed",
  WARNING = "bg-lightOrange",
  SUCCESSFUL = "bg-darkGreen",
}
