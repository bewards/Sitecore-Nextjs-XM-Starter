import { Field, LinkField, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { useContext } from 'react';
import { contextType, HeaderContext } from './Header';

import Link from 'components/helpers/Link/Link';

type SubnavigationTitleProps = {
  title: Field<string>;
  link: LinkField;
  isOpen: boolean;
};

const SubnavigationTitle = (props: SubnavigationTitleProps): JSX.Element => {
  const { setOpenMenu } = useContext(HeaderContext) as contextType;
  if (props.link?.value?.href?.length) {
    return (
      <Link
        field={props.link}
        data-id="sublink"
        tabIndex={props.isOpen ? 0 : -1}
        showLinkTextWithChildrenPresent={false}
        onClick={() => {
          document.body.classList.remove('no-scroll');
          setOpenMenu(false);
        }}
      >
        <Text field={props.title} tag="h5" encode={false} />
      </Link>
    );
  }

  return <Text field={props.title} tag="h5" encode={false} />;
};

export default SubnavigationTitle;
