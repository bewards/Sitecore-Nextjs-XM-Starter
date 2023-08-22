import React from 'react';
import { useEffect, useArgs, useParameter } from '@storybook/addons';
import { StoryFn, DecoratorFn } from '@storybook/react';
import { getLayoutDataFromJson } from '../../scripts/layout-data-helper';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss/layout';
import { defaultPageMap } from '../../src/stories/page-map';
import {
  LayoutServicePageState,
  SitecoreContext,
  SitecoreContextReactContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { I18nProvider } from 'next-localization';

import dictionary from '../../data/dictionary/storybook-dictionary-data.json';

// wraps individual component stories in Sitecore Context and retrieves it's layout data from "sitecorePageName"
export const withComponentSitecoreData: DecoratorFn = (Story: StoryFn, _context) => {
  const [args, updateArgs, resetArgs] = useArgs();

  // get sitecore parameters to load individual component
  const scComponentName = useParameter('sitecoreComponentName', null) || '';
  const scPageName = useParameter('sitecorePageName', null) || defaultPageMap.Name;

  // if story doesn't have sc component name parameter, exit
  if (!scComponentName.length) {
    return (
      <SitecoreContextReactContext.Provider value={mockLayoutData.sitecore}>
        <div style={{ margin: '1rem' }}>
          <Story />
        </div>
      </SitecoreContextReactContext.Provider>
    );
  }

  // ? uncomment below if you need the storybook api (ex: control what loads first)
  // const sbAPI = useStorybookApi();

  useEffect(() => {
    getLayoutDataFromJson(scPageName).then((data) => {
      if (!data?.sitecore?.route) return;

      const components = data.sitecore.route?.placeholders['jss-main'] as ComponentRendering[];
      if (components?.length) {
        const firstMatchingComponent = components.find((c) => c.componentName.includes(scComponentName));

        // use hook to update args instead of needing to pass them through Story due to async nature
        updateArgs({
          ...firstMatchingComponent,
          rendering: {
            uid: firstMatchingComponent?.uid,
            dataSource: firstMatchingComponent?.dataSource,
            componentName: firstMatchingComponent?.componentName,
          },
        });
      }
    });
  }, []);

  return (
    <>
      {/* <SitecoreContext componentFactory={(_cname: string) => null}>
        <Story />
      </SitecoreContext> */}
      <SitecoreContextReactContext.Provider value={mockLayoutData.sitecore}>
        <I18nProvider lngDict={dictionary} locale="en">
          <Story />
        </I18nProvider>
      </SitecoreContextReactContext.Provider>
    </>
  );
};

export const mockLayoutData = {
  sitecore: {
    context: {
      pageEditing: false,
      pageState: LayoutServicePageState.Normal,
      Languages: [
        {
          Name: 'en',
        },
        {
          Name: 'en-US',
        },
        {
          Name: 'fr',
        },
        {
          Name: 'fr-CA',
        },
        {
          Name: 'es-ES',
        },
        {
          Name: 'ja-JP',
        },
      ],
    },
    setContext: () => {
      // nothing
    },
    route: null,
  },
};
