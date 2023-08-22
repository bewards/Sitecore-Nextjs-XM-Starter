import { ComponentStory, ComponentMeta } from '@storybook/react';
import Footer from './Footer';
import { defaultPageMap } from 'stories/page-map';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Sitecore/Footer',
  component: Footer,
  parameters: {
    // sitecore parameters for when component renders by itself, in order to find the component in page
    sitecoreComponentName: 'Footer',
    sitecorePageName: defaultPageMap.Name,
  },
} as ComponentMeta<typeof Footer>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Footer> = (args) => {
  return <Footer {...args} />;
};

export const Primary = Template.bind({});

Primary.args = {
  fields: {
    bottomRightLink: {
      value: {
        text: 'Active Privacy & Breach Alerts',
        anchor: '',
        linktype: 'internal',
        class: '',
        title: '',
        target: '|Custom',
        querystring: '',
        id: '{A6904518-754A-4340-9349-9B773D05AF1A}',
        href: '/',
      },
    },
    copyrightLabel: { value: 'Copyright {currentYear}. DemoSite, Inc.' },
    sections: [
      {
        title: { value: '' },
        columns: [
          [
            {
              id: 'd7e0ac4f-09d7-4aff-8d84-c7c32990d7f7',
              url: '/Data/Footers/Footer/Footer-Section-One/Column-One/Individual-and-Families',
              name: 'Individual and Families',
              displayName: 'Individual and Families',
              fields: {
                link: {
                  value: {
                    text: 'Individual & Families',
                    anchor: '',
                    linktype: 'internal',
                    class: '',
                    title: '',
                    target: '|Custom',
                    querystring: '',
                    id: '{A6904518-754A-4340-9349-9B773D05AF1A}',
                    href: '/',
                  },
                },
                langAttributeValue: { value: '' },
                linkText: { value: '' },
              },
            },
            {
              id: '05beb641-ca1a-4b28-8d14-77c68d06837f',
              url: '/Data/Footers/Footer/Footer-Section-One/Column-One/Medicare',
              name: 'Medicare',
              displayName: 'Medicare',
              fields: {
                link: {
                  value: {
                    text: 'Medicare',
                    anchor: '',
                    linktype: 'internal',
                    class: '',
                    title: '',
                    target: '|Custom',
                    querystring: '',
                    id: '{A6904518-754A-4340-9349-9B773D05AF1A}',
                    href: '/',
                  },
                },
                langAttributeValue: { value: '' },
                linkText: { value: '' },
              },
            },
            {
              id: 'bddbb853-1620-4675-b237-7ab348067cf7',
              url: '/Data/Footers/Footer/Footer-Section-One/Column-One/Member-Benefits',
              name: 'Member Benefits',
              displayName: 'Member Benefits',
              fields: {
                link: {
                  value: {
                    text: 'Member Benefits',
                    anchor: '',
                    linktype: 'internal',
                    class: '',
                    title: '',
                    target: '|Custom',
                    querystring: '',
                    id: '{A6904518-754A-4340-9349-9B773D05AF1A}',
                    href: '/',
                  },
                },
                langAttributeValue: { value: '' },
                linkText: { value: '' },
              },
            },
            {
              id: '792a8533-f9b3-4771-a034-4dacb11f406c',
              url: '/Data/Footers/Footer/Footer-Section-One/Column-One/MyHealth-Matters',
              name: 'MyHealth Matters',
              displayName: 'MyHealth Matters',
              fields: {
                link: {
                  value: {
                    text: 'MyHealth Matters',
                    anchor: '',
                    linktype: 'internal',
                    class: '',
                    title: '',
                    target: '|Custom',
                    querystring: '',
                    id: '{A6904518-754A-4340-9349-9B773D05AF1A}',
                    href: '/',
                  },
                },
                langAttributeValue: { value: '' },
                linkText: { value: '<em>My</em>Health Matters' },
              },
            },
          ],
          [
            {
              id: 'fb24df66-489a-4e37-8ce4-482d5a758d3a',
              url: '/Data/Footers/Footer/Footer-Section-One/Column-Two/Employers',
              name: 'Employers',
              displayName: 'Employers',
              fields: {
                link: {
                  value: {
                    text: 'Employers',
                    anchor: '',
                    linktype: 'internal',
                    class: '',
                    title: '',
                    target: '|Custom',
                    querystring: '',
                    id: '{A6904518-754A-4340-9349-9B773D05AF1A}',
                    href: '/',
                  },
                },
                langAttributeValue: { value: '' },
                linkText: { value: '' },
              },
            },
            {
              id: '6c6b85b5-36f3-4a8d-8f44-a911d2f09c7b',
              url: '/Data/Footers/Footer/Footer-Section-One/Column-Two/About-Us',
              name: 'About Us',
              displayName: 'About Us',
              fields: {
                link: {
                  value: {
                    text: 'About Us',
                    anchor: '',
                    linktype: 'internal',
                    class: '',
                    title: '',
                    target: '|Custom',
                    querystring: '',
                    id: '{A6904518-754A-4340-9349-9B773D05AF1A}',
                    href: '/',
                  },
                },
                langAttributeValue: { value: '' },
                linkText: { value: '' },
              },
            },
            {
              id: '5d9fe05b-6cfb-45ca-a835-ee3df37c9c1f',
              url: '/Data/Footers/Footer/Footer-Section-One/Column-Two/Contact',
              name: 'Contact',
              displayName: 'Contact',
              fields: {
                link: {
                  value: {
                    text: 'Contact',
                    anchor: '',
                    linktype: 'internal',
                    class: '',
                    title: '',
                    target: '|Custom',
                    querystring: '',
                    id: '{A6904518-754A-4340-9349-9B773D05AF1A}',
                    href: '/',
                  },
                },
                langAttributeValue: { value: '' },
                linkText: { value: '' },
              },
            },
          ],
          [
            {
              id: '8dc3782d-10c6-4bb6-bb77-d086afe210f8',
              url: '/Data/Footers/Footer/Footer-Section-One/Column-Three/Providers',
              name: 'Providers',
              displayName: 'Providers',
              fields: {
                link: {
                  value: {
                    text: 'Providers',
                    anchor: '',
                    linktype: 'internal',
                    class: '',
                    title: '',
                    target: '|Custom',
                    querystring: '',
                    id: '{A6904518-754A-4340-9349-9B773D05AF1A}',
                    href: '/',
                  },
                },
                langAttributeValue: { value: '' },
                linkText: { value: '' },
              },
            },
            {
              id: '90324350-2a99-4dac-9fd6-6ba15398c5c7',
              url: '/Data/Footers/Footer/Footer-Section-One/Column-Three/Find-Care',
              name: 'Find Care',
              displayName: 'Find Care',
              fields: {
                link: {
                  value: {
                    text: 'Find Care',
                    anchor: '',
                    linktype: 'internal',
                    class: '',
                    title: '',
                    target: '|Custom',
                    querystring: '',
                    id: '{A6904518-754A-4340-9349-9B773D05AF1A}',
                    href: '/',
                  },
                },
                langAttributeValue: { value: '' },
                linkText: { value: '' },
              },
            },
            {
              id: 'a78401f4-7913-4fa0-adcf-dc28b81b1e1f',
              url: '/Data/Footers/Footer/Footer-Section-One/Column-Three/Find-a-Medication',
              name: 'Find a Medication',
              displayName: 'Find a Medication',
              fields: {
                link: {
                  value: {
                    text: 'Find a Medication',
                    anchor: '',
                    linktype: 'internal',
                    class: '',
                    title: '',
                    target: '|Custom',
                    querystring: '',
                    id: '{A6904518-754A-4340-9349-9B773D05AF1A}',
                    href: '/',
                  },
                },
                langAttributeValue: { value: '' },
                linkText: { value: '' },
              },
            },
            {
              id: '2b7eefb0-a837-49c2-bd44-317a50b35102',
              url: '/Data/Footers/Footer/Footer-Section-One/Column-Three/Last-Column-Three-Link',
              name: 'Last Column Three Link',
              displayName: 'Last Column Three Link',
              fields: {
                link: {
                  value: {
                    text: 'Last Column Three Link',
                    anchor: '',
                    linktype: 'internal',
                    class: '',
                    title: '',
                    target: '|Custom',
                    querystring: '',
                    id: '{A6904518-754A-4340-9349-9B773D05AF1A}',
                    href: '/',
                  },
                },
                langAttributeValue: { value: '' },
                linkText: { value: '' },
              },
            },
          ],
        ],
      },
      {
        title: { value: '' },
        columns: [
          [
            {
              id: '51cd2c6a-63d4-4fc5-817c-564b121059c4',
              url: '/Data/Footers/Footer/Footer-Section-Two/Column-One/Nondiscrimination-Notice',
              name: 'Nondiscrimination Notice',
              displayName: 'Nondiscrimination Notice',
              fields: {
                link: {
                  value: {
                    href: 'https://google.com',
                    text: 'Nondiscrimination Notice (PDF)',
                    linktype: 'external',
                    url: 'https://google.com',
                    anchor: '',
                    target: '_blank',
                  },
                },
                langAttributeValue: { value: '' },
                linkText: { value: '' },
              },
            },
            {
              id: '6abf1c72-3bba-415f-8cc8-f924331fc0f1',
              url: '/Data/Footers/Footer/Footer-Section-Two/Column-One/Terms-and-Conditions',
              name: 'Terms and Conditions',
              displayName: 'Terms and Conditions',
              fields: {
                link: {
                  value: {
                    text: 'Terms & Conditions',
                    anchor: '',
                    linktype: 'internal',
                    class: '',
                    title: '',
                    target: '|Custom',
                    querystring: '',
                    id: '{A6904518-754A-4340-9349-9B773D05AF1A}',
                    href: '/',
                  },
                },
                langAttributeValue: { value: '' },
                linkText: { value: '' },
              },
            },
            {
              id: '38663705-7472-4f5b-a641-6ca66af3e49a',
              url: '/Data/Footers/Footer/Footer-Section-Two/Column-One/Contact',
              name: 'Contact',
              displayName: 'Contact',
              fields: {
                link: {
                  value: {
                    text: 'Contact',
                    anchor: '',
                    linktype: 'internal',
                    class: '',
                    title: '',
                    target: '|Custom',
                    querystring: '',
                    id: '{A6904518-754A-4340-9349-9B773D05AF1A}',
                    href: '/',
                  },
                },
                langAttributeValue: { value: '' },
                linkText: { value: '' },
              },
            },
          ],
          [
            {
              id: '344c4c5b-93ed-4b86-ac03-99c25242111b',
              url: '/Data/Footers/Footer/Footer-Section-Two/Column-Two/Transparency-in-Coverage',
              name: 'Transparency in Coverage',
              displayName: 'Transparency in Coverage',
              fields: {
                link: {
                  value: {
                    text: 'Transparency in Coverage',
                    anchor: '',
                    linktype: 'internal',
                    class: '',
                    title: '',
                    target: '|Custom',
                    querystring: '',
                    id: '{A6904518-754A-4340-9349-9B773D05AF1A}',
                    href: '/',
                  },
                },
                langAttributeValue: { value: '' },
                linkText: { value: '' },
              },
            },
            {
              id: 'ff151deb-2816-484c-a063-3991d5abf4cf',
              url: '/Data/Footers/Footer/Footer-Section-Two/Column-Two/Translation-Services',
              name: 'Translation Services',
              displayName: 'Translation Services',
              fields: {
                link: {
                  value: {
                    text: 'Translation Services',
                    anchor: '',
                    linktype: 'internal',
                    class: '',
                    title: '',
                    target: '|Custom',
                    querystring: '',
                    id: '{A6904518-754A-4340-9349-9B773D05AF1A}',
                    href: '/',
                  },
                },
                langAttributeValue: { value: '' },
                linkText: { value: '' },
              },
            },
          ],
          [
            {
              id: 'd0d72d88-27cf-41fc-8ad4-31313f3cd10b',
              url: '/Data/Footers/Footer/Footer-Section-Two/Column-Three/Privacy-Statement-and-HIPAA-Forms',
              name: 'Privacy Statement and HIPAA Forms',
              displayName: 'Privacy Statement and HIPAA Forms',
              fields: {
                link: {
                  value: {
                    text: 'Privacy Statement & HIPAA Forms',
                    anchor: '',
                    linktype: 'internal',
                    class: '',
                    title: '',
                    target: '|Custom',
                    querystring: '',
                    id: '{A6904518-754A-4340-9349-9B773D05AF1A}',
                    href: '/',
                  },
                },
                langAttributeValue: { value: '' },
                linkText: { value: '' },
              },
            },
            {
              id: '9a6925ba-2b71-43cf-9354-b0957f1af9d2',
              url: '/Data/Footers/Footer/Footer-Section-Two/Column-Three/Visit',
              name: 'Visit',
              displayName: 'Visit',
              fields: {
                link: {
                  value: {
                    href: 'https://www.google.com/',
                    text: 'Visit Google.com',
                    linktype: 'external',
                    url: 'https://www.google.com/',
                    anchor: '',
                    target: '|Custom',
                  },
                },
                langAttributeValue: { value: '' },
                linkText: { value: '' },
              },
            },
          ],
        ],
      },
      {
        title: { value: 'Translation Services Available:' },
        columns: [
          [
            {
              id: 'd4457c69-ca99-4be9-aa04-daa2cbe9e514',
              url: '/Data/Footers/Footer/Footer-Section-Three/Column-One/Spanish',
              name: 'Spanish',
              displayName: 'Spanish',
              fields: {
                link: {
                  value: {
                    text: 'Español',
                    anchor: 'spanish',
                    linktype: 'internal',
                    class: '',
                    title: '',
                    target: '|Custom',
                    querystring: '',
                    id: '{A6904518-754A-4340-9349-9B773D05AF1A}',
                    href: '/',
                  },
                },
                langAttributeValue: { value: 'es' },
                linkText: { value: '' },
              },
            },
            {
              id: 'fc68f377-bdec-4232-968e-649fecbf74eb',
              url: '/Data/Footers/Footer/Footer-Section-Three/Column-One/Deitsch',
              name: 'Deitsch',
              displayName: 'Deitsch',
              fields: {
                link: {
                  value: {
                    text: 'Deitsch',
                    anchor: 'penn-dutc',
                    linktype: 'internal',
                    class: '',
                    title: '',
                    target: '|Custom',
                    querystring: '',
                    id: '{A6904518-754A-4340-9349-9B773D05AF1A}',
                    href: '/',
                  },
                },
                langAttributeValue: { value: 'pdc' },
                linkText: { value: '' },
              },
            },
            {
              id: '333cb7f4-44b3-48f0-b9a2-b317dd7a3a9b',
              url: '/Data/Footers/Footer/Footer-Section-Three/Column-One/Francais',
              name: 'Francais',
              displayName: 'Francais',
              fields: {
                link: {
                  value: {
                    text: 'Français',
                    anchor: 'french',
                    linktype: 'internal',
                    class: '',
                    title: '',
                    target: '|Custom',
                    querystring: '',
                    id: '{A6904518-754A-4340-9349-9B773D05AF1A}',
                    href: '/',
                  },
                },
                langAttributeValue: { value: 'fr' },
                linkText: { value: '' },
              },
            },
            {
              id: 'bd25daf7-29e6-4b6c-b9df-2e821bb9604d',
              url: '/Data/Footers/Footer/Footer-Section-Three/Column-One/Kreyol-Ayisyen',
              name: 'Kreyol Ayisyen',
              displayName: 'Kreyol Ayisyen',
              fields: {
                link: {
                  value: {
                    text: 'Kreyòl Ayisyen',
                    anchor: 'creole',
                    linktype: 'internal',
                    class: '',
                    title: '',
                    target: '|Custom',
                    querystring: '',
                    id: '{A6904518-754A-4340-9349-9B773D05AF1A}',
                    href: '/',
                  },
                },
                langAttributeValue: { value: 'ht' },
                linkText: { value: '' },
              },
            },
          ],
          [
            {
              id: '3ada1677-a748-4597-a087-2fadf29a0e8c',
              url: '/Data/Footers/Footer/Footer-Section-Three/Column-Two/Chinese',
              name: 'Chinese',
              displayName: 'Chinese',
              fields: {
                link: {
                  value: {
                    text: '繁體中文',
                    anchor: 'chinese',
                    linktype: 'internal',
                    class: '',
                    title: '',
                    target: '|Custom',
                    querystring: '',
                    id: '{A6904518-754A-4340-9349-9B773D05AF1A}',
                    href: '/',
                  },
                },
                langAttributeValue: { value: 'zh' },
                linkText: { value: '' },
              },
            },
            {
              id: 'ad4f1416-5852-4dc3-9c70-b06848c04a74',
              url: '/Data/Footers/Footer/Footer-Section-Three/Column-Two/Korean',
              name: 'Korean',
              displayName: 'Korean',
              fields: {
                link: {
                  value: {
                    text: '한국어',
                    anchor: 'korean',
                    linktype: 'internal',
                    class: '',
                    title: '',
                    target: '|Custom',
                    querystring: '',
                    id: '{A6904518-754A-4340-9349-9B773D05AF1A}',
                    href: '/',
                  },
                },
                langAttributeValue: { value: 'ko' },
                linkText: { value: '' },
              },
            },
            {
              id: '3b338bca-722b-4443-bb9a-603b2cedf955',
              url: '/Data/Footers/Footer/Footer-Section-Three/Column-Two/Deutsch',
              name: 'Deutsch',
              displayName: 'Deutsch',
              fields: {
                link: {
                  value: {
                    text: 'Deutsch',
                    anchor: 'german',
                    linktype: 'internal',
                    class: '',
                    title: '',
                    target: '|Custom',
                    querystring: '',
                    id: '{A6904518-754A-4340-9349-9B773D05AF1A}',
                    href: '/',
                  },
                },
                langAttributeValue: { value: 'de' },
                linkText: { value: '' },
              },
            },
            {
              id: '8fdeae80-2faa-4a25-b70f-430c9de85f44',
              url: '/Data/Footers/Footer/Footer-Section-Three/Column-Two/Vietnamese',
              name: 'Vietnamese',
              displayName: 'Vietnamese',
              fields: {
                link: {
                  value: {
                    text: 'Tiếng Việt',
                    anchor: 'viatnamese',
                    linktype: 'internal',
                    class: '',
                    title: '',
                    target: '|Custom',
                    querystring: '',
                    id: '{A6904518-754A-4340-9349-9B773D05AF1A}',
                    href: '/',
                  },
                },
                langAttributeValue: { value: 'vi' },
                linkText: { value: '' },
              },
            },
          ],
          [
            {
              id: 'dc106775-092a-4ced-96bb-2c9720904b72',
              url: '/Data/Footers/Footer/Footer-Section-Three/Column-Three/Italian',
              name: 'Italian',
              displayName: 'Italian',
              fields: {
                link: {
                  value: {
                    text: 'Italiano',
                    anchor: 'italian',
                    linktype: 'internal',
                    class: '',
                    title: '',
                    target: '|Custom',
                    querystring: '',
                    id: '{A6904518-754A-4340-9349-9B773D05AF1A}',
                    href: '/',
                  },
                },
                langAttributeValue: { value: 'it' },
                linkText: { value: '' },
              },
            },
            {
              id: '88971fa2-9004-48d5-8c7b-b416eeca37bb',
              url: '/Data/Footers/Footer/Footer-Section-Three/Column-Three/Gujarati',
              name: 'Gujarati',
              displayName: 'Gujarati',
              fields: {
                link: {
                  value: {
                    text: 'ગુજરાતી',
                    anchor: 'gujarati',
                    linktype: 'internal',
                    class: '',
                    title: '',
                    target: '|Custom',
                    querystring: '',
                    id: '{A6904518-754A-4340-9349-9B773D05AF1A}',
                    href: '/',
                  },
                },
                langAttributeValue: { value: 'gu' },
                linkText: { value: '' },
              },
            },
            {
              id: 'a6ce5f72-373e-464b-b4ec-cf3355ce57ec',
              url: '/Data/Footers/Footer/Footer-Section-Three/Column-Three/Portuguese',
              name: 'Portuguese',
              displayName: 'Portuguese',
              fields: {
                link: {
                  value: {
                    text: 'Português',
                    anchor: 'portuguese',
                    linktype: 'internal',
                    class: '',
                    title: '',
                    target: '|Custom',
                    querystring: '',
                    id: '{A6904518-754A-4340-9349-9B773D05AF1A}',
                    href: '/',
                  },
                },
                langAttributeValue: { value: 'pt' },
                linkText: { value: '' },
              },
            },
            {
              id: 'd33871f5-4bcf-4e9d-b34d-5cbcee748591',
              url: '/Data/Footers/Footer/Footer-Section-Three/Column-Three/Russian',
              name: 'Russian',
              displayName: 'Russian',
              fields: {
                link: {
                  value: {
                    text: 'Русский',
                    anchor: 'russian',
                    linktype: 'internal',
                    class: '',
                    title: '',
                    target: '|Custom',
                    querystring: '',
                    id: '{A6904518-754A-4340-9349-9B773D05AF1A}',
                    href: '/',
                  },
                },
                langAttributeValue: { value: 'ru' },
                linkText: { value: '' },
              },
            },
          ],
          [
            {
              id: '92a4cd55-1a0a-4802-8462-5f856ae485ec',
              url: '/Data/Footers/Footer/Footer-Section-Three/Column-Four/Footer-Socials',
              name: 'Footer Socials',
              displayName: 'Footer Socials',
              fields: {
                title: { value: 'Connect with Us' },
                facebookLink: {
                  value: {
                    href: 'http://www.facebook.com',
                    text: 'Facebook',
                    linktype: 'external',
                    url: 'http://www.facebook.com',
                    anchor: '',
                    target: '_blank',
                  },
                },
                twitterLink: {
                  value: {
                    href: 'http://www.facebook.com',
                    text: 'Facebook',
                    linktype: 'external',
                    url: 'http://www.facebook.com',
                    anchor: '',
                    target: '_blank',
                  },
                },
                youtubeLink: {
                  value: {
                    href: 'http://www.facebook.com',
                    text: 'Facebook',
                    linktype: 'external',
                    url: 'http://www.facebook.com',
                    anchor: '',
                    target: '_blank',
                  },
                },
                instagramLink: {
                  value: {
                    href: 'http://www.facebook.com',
                    text: 'Facebook',
                    linktype: 'external',
                    url: 'http://www.facebook.com',
                    anchor: '',
                    target: '_blank',
                  },
                },
                pinterestLink: {
                  value: {
                    href: 'http://www.facebook.com',
                    text: 'Facebook',
                    linktype: 'external',
                    url: 'http://www.facebook.com',
                    anchor: '',
                    target: '_blank',
                  },
                },
              },
            },
            {
              id: '2b03276c-aa03-4df8-bba5-ddba22d829c1',
              url: '/Data/Footers/Footer/Footer-Section-Three/Column-Four/Footer-Apps',
              name: 'Footer Apps',
              displayName: 'Footer Apps',
              fields: {
                appStoreImage: {
                  value: {
                    src: '/-/media/Project/DemoSite/DemoSiteWebsite/Footer/app-store.png?h=40&iar=0&w=120&hash=3BF17682B3771F3AEEE07824A0904D71',
                    alt: 'download on the app store',
                    width: '120',
                    height: '40',
                  },
                },
                googlePlayImage: {
                  value: {
                    src: '/-/media/Project/DemoSite/DemoSiteWebsite/Footer/google-play.png?h=40&iar=0&w=135&hash=059039B2EF99E6CB9DF71FFD7DD894BD',
                    alt: 'get it on google play',
                    width: '135',
                    height: '40',
                  },
                },
                appStoreLink: {
                  value: {
                    href: 'https://apps.apple.com',
                    linktype: 'external',
                    url: 'https://apps.apple.com',
                    anchor: '',
                    target: '',
                  },
                },
                title: { value: 'Download our Mobile App' },
                googlePlayLink: {
                  value: {
                    href: 'https://play.google.com/store',
                    linktype: 'external',
                    url: 'https://play.google.com/store',
                    anchor: '',
                    target: '',
                  },
                },
              },
            },
          ],
        ],
      },
    ],
  },
};
