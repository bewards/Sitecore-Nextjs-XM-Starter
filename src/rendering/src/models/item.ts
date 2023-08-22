import { Field, Item } from '@sitecore-jss/sitecore-jss-nextjs';

export interface ProcessedItem {
  name: string;
  displayName?: string;
  id: string;
  url: string;
  fields: {
    [name: string]: Field | Item | Item[] | undefined;
  };
}
