using Sitecore.Data;
using Sitecore.Data.Items;
using Sitecore.Data.Managers;
using Sitecore.Links;
using Sitecore.Links.UrlBuilders;
using System;

namespace DemoSite.Foundation.SitecoreExtensions.Platform
{
    public static class ItemExtensions
    {
        public static bool IsOrInherits(this Item item, Guid templateGuid)
        {
            var templateId = ID.Parse(templateGuid);

            return item.IsOrInherits(templateId);
        }

        public static bool IsOrInherits(this Item item, ID templateID)
        {
            var templateId = templateID;

            if (item.TemplateID == templateId)
            {
                return true;
            }

            var templateItem = TemplateManager.GetTemplate(item);

            if (templateItem == null)
            {
                return false;
            }

            return templateItem.DescendsFrom(templateId);
        }

        public static string GetUrl(this Item item, ItemUrlBuilderOptions options = null)
        {
            if (options != null)
            {
                return LinkManager.GetItemUrl(item, options);
            }

            return LinkManager.GetItemUrl(item);
        }
    }
}