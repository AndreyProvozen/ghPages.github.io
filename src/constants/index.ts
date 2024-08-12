export interface linkDataProps {
  code: string;
  url: string;
  clicked: number;
  createdAt: Date;
  updatedAt: Date;
  _id: string;
  __v: number;
}

export interface linkDataListProps {
  linksList: linkDataProps[];
  count: number;
}

export interface metricsProps {
  title: string;
  data: Record<string, number>;
}
export interface Session {
  expires: string;
  user: { email: string; image: string; name: string };
}

export interface FullLinkDataProps extends linkDataProps {
  metrics: metricsProps[];
}

export const LOCALHOST_ADDRESSES = ['::1', '127.0.0.1'];
export const IP_LIST_FOR_LOCALHOST = ['161.184.29.248', '185.237.74.247', '195.140.184.24', '1.32.231.255'];

export enum ScreenSize {
  DESKTOP_BELOW = '(max-width: 1200px)',
  DESKTOP_SMALL_BELOW = '(max-width: 1023px)',
  TABLET_BELOW = '(max-width: 767px)',
  TABLET_SMALL_BELOW = '(max-width: 640px)',
  MOBILE_BELOW = '(max-width: 500px)',
  MOBILE_SMALL_BELOW = '(max-width: 400px)',
}
export enum flashMessageType {
  //fix me
  ERROR = '#c1002a',
  WARNING = '#F0AD4E',
  SUCCESSFUL = '#05c148',
}
