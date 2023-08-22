import { withComponentSitecoreData } from './decorators/sitecore-decorators';
import { RouterContext } from 'next/dist/shared/lib/router-context';

// sitecore related styling
import 'assets/storybook-main.scss';

// import * as nextImage from 'next/image';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'fullscreen',
  breakpoints: {
    breakpointNames: {
      default: '0',
      sm: '640',
      md: '768',
      lg: '1024',
      xl: '1280',
      '2xl': '1536',
    },
    debounceTimeout: 200,
  },
  // nextRouter: {
  //   Provider: RouterContext.Provider,
  // },
};

// NO LONGER NEEDED FOR STORYBOOK V7 NEXTJS FRAMEWORK?
// Object.defineProperty(nextImage, 'default', {
//   configurable: true,
//   value: (props) => <img {...props} />,
// });

// globally apply sitecore decorators
export const decorators = [withComponentSitecoreData];
