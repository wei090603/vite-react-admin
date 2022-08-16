export interface MetaProps {
  keepAlive?: boolean;
  title: string;
  key?: string;
  hidden?: boolean;
  activeMenu?: string;
}

export interface RouteObject {
  caseSensitive?: boolean;
  children?: RouteObject[];
  element?: React.ReactNode;
  index?: boolean;
  path?: string;
  meta?: MetaProps;
  isLink?: string;
  title?: string;
  activeMenu?: string;
}
