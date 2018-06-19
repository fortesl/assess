export interface NavItem {
  label: string;
  path?: string[];
  icon?: string;
  roles?: string[];
  items?: NavItem[];
  submenu?: string;
}
