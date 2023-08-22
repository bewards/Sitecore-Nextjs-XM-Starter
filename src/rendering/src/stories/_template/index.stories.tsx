/**
 * ! AUTO-GENERATED STORY FILE created from _template/index.stories.tsx
 * ? generated from [npm run storybook:sc]
 */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { LayoutServiceData, SitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
// import { ComponentRendering } from '@sitecore-jss/sitecore-jss/types/layout/models';
import { StoryFn } from '@storybook/react';
import React, { ComponentType } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { I18nProvider } from 'next-localization';
import { LayoutServicePageState } from '@sitecore-jss/sitecore-jss-nextjs';
import { componentFactory } from 'temp/componentFactory';

// registry for components
const AllComponents: Record<string, unknown> = {};

// build a webpack context module from the components
const requireComponents = require.context(
  '../../components', // components folder
  true, // look in subfolders
  /((?!.*stories).*)\.([jt]sx)$/ // regex for files
);

// resolve the modules and store in AllComponents key/value
requireComponents.keys().forEach((filePath) => {
  const Component = requireComponents(filePath);

  // Gets the file name regardless of folder depth
  const componentName = filePath
    .split('/')
    .pop()
    ?.replace(/\.\w+$/, '');
  if (!componentName) {
    return;
  }
  /**
   * Default export is used. If named export required, use:
   *  AllComponents[componentName] = Component[componentName];
   */
  AllComponents[componentName] = Component.default;
});

const mockComponentFactory = (componentName: string) => {
  const component = AllComponents[componentName];
  return component as ComponentType | null;
};

// @ts-ignore
// import page json data
import data from './page-data.json';
// @ts-ignore
import dictionary from '../../../data/dictionary/storybook-dictionary-data.json';
import Layout from 'src/Layout';

const mockLayoutData = {
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
      ],
    },
    setContext: () => {
      // nothing
    },
    route: data.sitecore?.route,
  },
} as unknown as LayoutServiceData;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'pages/__PageName__',
  decorators: [
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    (Story: StoryFn) => (
      <MemoryRouter>
        {/* SitecoreContext needed for "withDatasourceCheck". componentFactory required. */}
        <SitecoreContext
          componentFactory={componentFactory || mockComponentFactory}
          layoutData={mockLayoutData as unknown as undefined}
        >
          <I18nProvider lngDict={dictionary} locale="en">
            <Story />
          </I18nProvider>
        </SitecoreContext>
      </MemoryRouter>
    ),
  ],
  parameters: {
    options: {
      showPanel: false,
    },
  },
};

// type PlaceholderOfComponents = {
//   [key: string]: ComponentRendering[];
// };

export const Default: StoryFn<ComponentType> = () => {
  // const mainData = data.sitecore?.route?.placeholders?.['jss-main'] as unknown as ComponentRendering[];
  // const topLevelPlaceholders = data.sitecore?.route?.placeholders as unknown as PlaceholderOfComponents;

  return <Layout layoutData={mockLayoutData} />;

  // return (
  //   <>
  //     {AllComponents &&
  //       Object.keys(topLevelPlaceholders).map((placeholderName) => {
  //         // placeholderName > "header", "main", "footer"
  //         const componentRenderings: ComponentRendering[] = topLevelPlaceholders[placeholderName];

  //         return componentRenderings
  //           .filter((rendering) => {
  //             if (!AllComponents[rendering.componentName]) {
  //               console.warn(`Missing component: ${rendering.componentName}`);
  //               return false;
  //             }
  //             return true;
  //           })
  //           .map((rendering) => {
  //             const Component = AllComponents[rendering.componentName] as React.FC<Record<string, unknown>>;

  //             return (
  //               <div key={rendering.uid}>
  //                 <Component
  //                   key={rendering.uid}
  //                   rendering={{
  //                     uid: rendering.uid,
  //                     dataSource: rendering.dataSource,
  //                     placeholders: rendering.placeholders,
  //                   }}
  //                   params={rendering.params}
  //                   fields={rendering.fields || data.sitecore?.route?.fields}
  //                   sitecoreContext={data.sitecore}
  //                 />
  //               </div>
  //             );
  //           });
  //       })}
  //   </>
  // );
};
