import { LinkField, ImageField, Image } from '@sitecore-jss/sitecore-jss-nextjs';
import Link from 'components/helpers/Link/Link';

type LogoLinkProps = {
  logo: ImageField;
  link: LinkField;
};

const LogoLink = (props: LogoLinkProps): JSX.Element | null => {
  /**
   * Checking if there was a logo image provided.
   * If none, return null.
   */
  if (props.logo.value?.src === undefined) {
    return null;
  }

  /**
   * Checking if the logo should act as a link.
   * If a link is provide logo will be wrapped in an anchor.
   */
  if (props.link.value?.href !== '') {
    return (
      <Link field={props.link} showLinkTextWithChildrenPresent={false}>
        <Image field={props.logo} />
      </Link>
    );
  }

  return <Image field={props.logo} />;
};

export default LogoLink;
