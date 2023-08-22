import type { Field, Item, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import { IconVariant } from 'components/helpers/Icon';

export type RecordOfFields = {
  [name: string]: Field | Item[];
};

export const GetLinkFieldIcon = (linkField: LinkField): IconVariant | undefined => {
  return linkField.value?.target == '_blank' ? 'external-link' : undefined;
};
