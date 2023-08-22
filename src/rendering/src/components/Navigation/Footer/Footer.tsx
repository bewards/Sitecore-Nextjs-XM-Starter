import { Field, LinkField, Text, useSitecoreContext, ImageField, NextImage } from '@sitecore-jss/sitecore-jss-nextjs';
import Link from '../../helpers/Link/Link';
import classNames from 'classnames';
import styles from './Footer.module.scss';
import { ComponentProps } from 'lib/component-props';

import { ProcessedItem } from 'src/models/item';
import { IconVariant } from 'components/helpers/Icon';
import { GetLinkFieldIcon } from 'models/fields';

const cx = classNames.bind(styles);

// top-level datasource
type FooterProps = ComponentProps & {
  fields: {
    copyrightLabel: Field<string>;
    bottomRightLink: LinkField;
    sections: FooterSection[];
  };
};

type FooterSection = {
  title: Field<string>;
  columns: GenericLinkItem[][];
};

// a single item underneath a column item that can be of different types (have different fields)
type GenericLinkItem = ProcessedItem & {
  fields: AllPossibleFields;
  columnIndex?: number;
};

type LinkWithLangFields = {
  linkText: Field<string>;
  link: LinkField;
  langAttributeValue: Field<string>;
};

type FooterSocialFields = {
  title: Field<string>;
  facebookLink: LinkField;
  twitterLink: LinkField;
  youtubeLink: LinkField;
  instagramLink: LinkField;
  pinterestLink: LinkField;
};

type FooterAppFields = {
  title: Field<string>;
  appStoreLink: LinkField;
  appStoreImage: ImageField;
  googlePlayLink: LinkField;
  googlePlayImage: ImageField;
};

type AllPossibleFields = LinkWithLangFields | FooterSocialFields | FooterAppFields;

const Footer = (props: FooterProps): JSX.Element => {
  const { fields } = props;
  const { sitecoreContext } = useSitecoreContext();

  const SocialLink = (props: { link: LinkField; icon: IconVariant }): JSX.Element | null => {
    if (!props.link.value?.href || !props.icon) {
      return null;
    }

    return <Link field={props.link} showLinkTextWithChildrenPresent={false} icon={props.icon} iconAriaHidden={true} />;
  };

  const FooterLink = (prop: { link: LinkField; lang: Field<string>; linkText: Field<string> }): JSX.Element | null => {
    if (!prop.link.value?.href && prop.linkText.value == '') {
      return null;
    }

    if (prop.linkText.value != '') {
      return (
        <Link
          field={prop.link}
          className={cx('small')}
          lang={prop.lang?.value}
          showLinkTextWithChildrenPresent={false}
          icon={GetLinkFieldIcon(prop.link)}
          iconAriaHidden={true}
        >
          <Text field={prop.linkText} encode={false} />
        </Link>
      );
    }

    return (
      <Link
        field={prop.link}
        className={cx('small')}
        lang={prop.lang?.value}
        showLinkTextWithChildrenPresent={false}
        icon={GetLinkFieldIcon(prop.link)}
        iconAriaHidden={true}
      >
        {prop.link.value?.text}
      </Link>
    );
  };

  function hasSocialFields(fields: AllPossibleFields): fields is FooterSocialFields {
    return (fields as FooterSocialFields).facebookLink !== undefined;
  }

  function hasAppFields(fields: AllPossibleFields): fields is FooterAppFields {
    return (fields as FooterAppFields).appStoreLink !== undefined;
  }

  return (
    <footer className={styles.footer}>
      <div className="container-md">
        {fields.sections.map((section, sectionIndex) => {
          const columnCount = section.columns.length;
          // get column with largest count to use as iterator across all columns
          const largestColumnLinkCount = Math.max(...section.columns.map((col) => col.length));
          const totalLinkCountForSection = section.columns.reduce((prev, curr) => {
            // refactor to not count empty links.
            return prev + curr.length;
          }, 0);

          const links: GenericLinkItem[] = [];
          for (let totalIndex = 0; totalIndex < largestColumnLinkCount; totalIndex++) {
            for (let n = 0; n < columnCount; n++) {
              const currentLink = section.columns[n][totalIndex];
              if (currentLink == null) continue;

              currentLink.columnIndex = n + 1;
              links.push(currentLink);
            }
          }

          const linkUlClass = classNames(
            styles.linksList,
            styles[`linksList__${columnCount}`],
            'links-list',
            'list-inline'
          );

          const linkUlStyles = {
            '--cols': columnCount,
            '--colsCount': totalLinkCountForSection,
          } as React.CSSProperties;

          return (
            <section className={styles.footerSection} key={sectionIndex}>
              <Text field={section.title} tag="p" encode={false} className="small fw-semibold" />

              <ul className={linkUlClass} style={linkUlStyles}>
                {links.map((link, i) => {
                  const linkStyles = { '--col': link.columnIndex } as React.CSSProperties;

                  if (hasSocialFields(link.fields)) {
                    return (
                      <li key={i} className={styles.socialLinks} style={linkStyles}>
                        <Text field={link.fields.title} tag="p" className="small fw-semibold" />
                        <SocialLink link={link.fields.facebookLink} icon="facebook" />
                        <SocialLink link={link.fields.twitterLink} icon="twitter" />
                        <SocialLink link={link.fields.youtubeLink} icon="youtube" />
                        <SocialLink link={link.fields.instagramLink} icon="instagram" />
                        <SocialLink link={link.fields.pinterestLink} icon="pinterest" />
                      </li>
                    );
                  } else if (hasAppFields(link.fields)) {
                    return (
                      <li key={i} className={styles.appLinks} style={linkStyles}>
                        <Text field={link.fields.title} tag="p" className="small fw-semibold" />
                        <Link field={link.fields.appStoreLink} showLinkTextWithChildrenPresent={false}>
                          <NextImage field={link.fields.appStoreImage} height="40" width="120" />
                        </Link>
                        <Link field={link.fields.googlePlayLink} showLinkTextWithChildrenPresent={false}>
                          <NextImage field={link.fields.googlePlayImage} height="40" width="135" />
                        </Link>
                      </li>
                    );
                  }
                  if (!link.fields.link) {
                    return;
                  }
                  return (
                    <li key={i} data-col={link.columnIndex} style={linkStyles}>
                      <FooterLink
                        link={link.fields.link}
                        lang={link.fields.langAttributeValue}
                        linkText={link.fields.linkText}
                      />
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}

        <section className={styles.bottomLinks}>
          {sitecoreContext.pageEditing ? (
            <Text field={fields.copyrightLabel} className="text-uppercase" />
          ) : (
            <span className="small d-block text-uppercase fw-semibold">
              {fields.copyrightLabel.value.replace('{currentYear}', new Date().getFullYear().toString())}
            </span>
          )}

          {fields.bottomRightLink?.value.href?.length && fields.bottomRightLink?.value.text?.length ? (
            <Link field={fields.bottomRightLink} className="text-warning small fw-semibold" />
          ) : null}
        </section>
      </div>
    </footer>
  );
};

export default Footer;
