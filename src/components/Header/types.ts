import { NavItemType } from '../BaseHeader';

export interface NavLinkType extends NavItemType {
  url?: string;
}

export type Params = {
  projectId?: string;
};
