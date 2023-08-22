import pageMap from 'stories/page-map';
import * as fs from 'fs-extra';
import { replaceInFile } from 'replace-in-file';
import { dictionaryService, layoutService } from './layout-data-helper';
import chalk from 'chalk';
import * as imageDownloader from 'image-downloader';
import config from 'temp/config';
//// import * as url from 'url'; // built-in utility

/**
 * ? This script fetches sitecore layout data for each page in page-map and writes to /stories/[PAGE]/page-data.json to then be consumed by the generated page story at /stories/[pageName]/index.stories.tsx
 */
const TOKENS = {
  PageName: '__PageName__',
};

const { Pages } = pageMap;
const imageList = [] as string[];

console.log(`${chalk.green('Fetching Sitecore Layout Data for Pages and downloading Images...')}`);

fs.ensureDirSync('./public/temp');
Pages.forEach(async (page) => {
  const data = await layoutService.fetchLayoutData(page.Url);
  console.log(
    `Layout Data fetched for ${chalk.green(page.Name)} and written to ${chalk.green(
      `/src/stories/${page.Name}/page-data.json`
    )}`
  );

  /*
   * download images for storybook consumption
   **   - pattern: "/-/media/Project/DemoSite/DemoSiteWebsite/Samples/jss_logo.png
   **        ?h=160&iar=0&w=300&*hash=567C97137213C511A8CF181B10153285"
   */
  let layoutDataVal = JSON.stringify(data);
  layoutDataVal = layoutDataVal.replaceAll(/"\/-\/(jss)?media(.*?)"/g, (matchingVal) => {
    const imageUrl = matchingVal.replaceAll('"', '');
    const imageUrlNoQueryString = imageUrl.replace(/\?.*$/, '');
    const imagePath = imageUrlNoQueryString.substring(0, imageUrlNoQueryString.lastIndexOf('/'));

    // return early with modified image path if image already downloaded
    if (imageList.length && imageList.includes(matchingVal)) {
      return `"/temp${imageUrlNoQueryString}"`;
    }
    imageList.push(matchingVal);

    // ensure directory exists / create
    fs.ensureDirSync(`./public/temp/${imagePath}`);
    // download image
    imageDownloader
      .image({
        url: `${config.sitecoreApiHost}${imageUrl}`,
        dest: `../../public/temp/${imageUrlNoQueryString}`,
      })
      .then(({ filename }) => {
        // move downloaded image to equivalent jssmedia path to account for when media handler changes to jssmedia
        console.log(`image downloaded from: ${config.sitecoreApiHost}${imageUrl}`);
        console.log(`image downloaded to: ${filename}`);
        const jssMediaImageUrl = imageUrlNoQueryString.replace('/media/', '/jssmedia/');
        fs.copySync(`${filename}`, `./public/temp/${jssMediaImageUrl}`, { overwrite: true });
      });
    return `"/temp${imageUrlNoQueryString}"`;
  });

  // write to /stories/[PAGE]/page-data
  await fs.outputJson(`./src/stories/${page.Name}/page-data.json`, JSON.parse(layoutDataVal));

  // generate page story from _template
  fs.copyFile('./src/stories/_template/index.stories.tsx', `./src/stories/${page.Name}/index.stories.tsx`).then(() => {
    // replace tokens
    replaceInFile({
      files: `./src/stories/${page.Name}/index.stories.tsx`,
      from: [TOKENS.PageName],
      to: [page.Name],
    }).then((_result) => {
      console.log(`Page Story generated: ${chalk.bgCyan(`./src/stories/${page.Name}/index.stories.tsx`)}`);
    });
  });
});
// fs.removeSync('./public/temp');

// comment this part out if you don't need to get any more dictionary items
dictionaryService
  .fetchDictionaryData('en')
  .then(async (value) => {
    console.log(`Dictionary data generated: ${chalk.bgCyan(`./data/dictionary/storybook-dictionary-data.json`)}`);
    return fs.outputJSON('./data/dictionary/storybook-dictionary-data.json', value);
  })
  .catch((reason) => {
    console.log(reason);
  });
