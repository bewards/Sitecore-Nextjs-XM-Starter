import React, { useEffect } from 'react';
import Head from 'next/head';
import {
  Placeholder,
  getPublicUrl,
  LayoutServiceData,
  Field,
  ImageField,
  getFieldValue,
  Item,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Scripts from 'src/Scripts';
import { useI18n } from 'next-localization';
import { useRouter } from 'next/router';

// Prefix public assets with a public URL to enable compatibility with Sitecore Experience Editor.
// If you're not supporting the Experience Editor, you can remove this.
const publicUrl = getPublicUrl();

interface LayoutProps {
  layoutData: LayoutServiceData;
}

type GetFieldValueFields = {
  [name: string]: Field | Item[];
};

const Layout = ({ layoutData }: LayoutProps): JSX.Element => {
  const { asPath, events } = useRouter();
  const { t } = useI18n();
  const { route } = layoutData.sitecore;

  const fields = route?.fields as GetFieldValueFields;
  const isPageEditing = layoutData.sitecore.context.pageEditing;
  const mainClassPageEditing = isPageEditing ? 'editing-mode' : 'prod-mode';

  useEffect(() => {
    events.on('routeChangeComplete', (_url) => {
      document.body.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    });
  }, [events]);

  let pageTitle: string = getFieldValue(fields, 'title') || getFieldValue(fields, 'pageMetaTitle') || 'Page';
  pageTitle = getFieldValue<boolean>(fields, 'appendSiteSuffix')
    ? pageTitle.concat(' ', t('MetaData-MetaTitleSuffix'))
    : pageTitle;

  const pageDesc: string = getFieldValue(fields, 'pageMetaDescription') ?? '';
  const baseUrl = getPublicUrl();
  const pageUrl = baseUrl + asPath;
  const ogImg = fields.openGraphImage as ImageField;
  const RawHtml = ({ html = '' }): JSX.Element =>
    isPageEditing ? <></> : <script dangerouslySetInnerHTML={{ __html: `</script>${html}<script>` }} />;

  // ROBOTS
  const robotsDirectives = (fields.robotsDirectiveValue as Array<Item>) || [];
  const robots = robotsDirectives.length ? robotsDirectives.map((r) => r.name) : [];
  const robotText = robots.join(', ');

  const templateName = route?.templateName?.replace(' ', '-').toLowerCase();

  const MainBottomPlaceholder = (): JSX.Element | null => {
    if (!isPageEditing && route?.placeholders['jss-main-bottom']?.length === 0) return null;

    return (
      <div id="main-bottom" className="main-bottom">
        {route && <Placeholder name="jss-main-bottom" rendering={route} />}
      </div>
    );
  };

  return (
    <>
      <Scripts />
      <Head>
        <title>{pageTitle}</title>
        <link rel="icon" href={`${publicUrl}/favicon.ico`} />

        {/* Inline Script via Multi-line text */}
        <RawHtml html={'place any javascript here'} />

        {/* SEO metadata */}
        <meta name="title" content={pageTitle} />
        <meta name="description" content={pageDesc} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {getFieldValue(fields, 'pageMetaKeywords') ? (
          <meta name="keywords" content={getFieldValue(fields, 'pageMetaKeywords')} />
        ) : null}

        {/* OpenGraph metadata */}
        <meta
          name="og:title"
          content={getFieldValue(fields, 'openGraphTitle') ? getFieldValue(fields, 'openGraphTitle') : pageTitle}
        />
        <meta
          name="og:description"
          content={
            getFieldValue(fields, 'openGraphDescription') ? getFieldValue(fields, 'openGraphDescription') : pageDesc
          }
        />
        {getFieldValue(fields, 'openGraphURL') ? (
          <meta name="og:url" content={getFieldValue(fields, 'openGraphURL')} />
        ) : (
          <meta name="og:url" content={pageUrl} />
        )}
        {ogImg?.value?.src ? <meta name="og:image" content={`${publicUrl}/${ogImg.value.src.toString()}`} /> : null}
        {getFieldValue(fields, 'openGraphType') ? (
          <meta name="og:type" content={getFieldValue(fields, 'openGraphType')} />
        ) : null}
        {getFieldValue(fields, 'openGraphSiteName') ? (
          <meta name="og:site_name" content={getFieldValue(fields, 'openGraphSiteName')} />
        ) : null}
        {getFieldValue(fields, 'openGraphLocale') ? (
          <meta name="og:locale" content={getFieldValue(fields, 'openGraphLocale')} />
        ) : null}
        {getFieldValue(fields, 'canonicalUrl') ? (
          <link rel="canonical" href={getFieldValue(fields, 'canonicalUrl')} />
        ) : (
          <link rel="canonical" href={pageUrl} />
        )}
        {robotText !== '' ? <meta name="robots" content={robotText} /> : null}
      </Head>

      {/* root placeholder for the app, which we add components to using route data */}
      <div className={mainClassPageEditing}>
        <div id="header-container">{route && <Placeholder name="jss-header" rendering={route} />}</div>
        <main id="main" className={templateName}>
          <div id="main-container" className="container-md">
            <div id="main-inner" className="main-inner">
              <div>{getFieldValue(fields, 'body') ?? null}</div>
              {route && <Placeholder name="jss-main" rendering={route} />}
            </div>
            <MainBottomPlaceholder />
          </div>
        </main>
        <footer id="footer-container">{route && <Placeholder name="jss-footer" rendering={route} />}</footer>
      </div>
    </>
  );
};

export default Layout;
