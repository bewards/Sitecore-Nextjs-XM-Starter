/**
 * (Custom due to Azure Linux Web App)
 * Override the default directory used by the disk-based editing cache implementation
 *
 * ref: https://doc.sitecore.com/xp/en/developers/hd/201/sitecore-headless-development/override-the-default-directory-used-by-the-disk-based-editing-cache-implementation.html
 */
import {
  EditingDataDiskCache,
  BasicEditingDataService,
  ServerlessEditingDataService,
} from '@sitecore-jss/sitecore-jss-nextjs/editing';

// Override the default editingDataDiskCache with an accessible temp directory
export const azureEditingDataDiskCache =
  process.env.APP_ENV !== 'local' ? new EditingDataDiskCache('/home/editing-disk-cache') : new EditingDataDiskCache();

// Override default editingDataService to use myEditingDataDiskCache for BasicEditingDataService
export const azureEditingDataService = process.env.VERCEL
  ? new ServerlessEditingDataService()
  : new BasicEditingDataService({
      editingDataCache: azureEditingDataDiskCache,
    });
