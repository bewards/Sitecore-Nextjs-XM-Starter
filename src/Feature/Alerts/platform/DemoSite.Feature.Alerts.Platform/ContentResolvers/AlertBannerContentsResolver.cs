using Microsoft.Extensions.DependencyInjection;
using NavigationSiteSettings = DemoSite.Feature.Alerts.Platform.Constants.NavigationSiteSettings;
using Newtonsoft.Json.Linq;
using Sitecore.Data.Items;
using Sitecore.DependencyInjection;
using Sitecore.Diagnostics;
using Sitecore.LayoutService.Configuration;
using Sitecore.LayoutService.ItemRendering.ContentsResolvers;
using Sitecore.Mvc.Presentation;
using Sitecore.XA.Foundation.Multisite;
using System.Collections.Generic;
using System.Linq;
using DemoSite.Foundation.SitecoreExtensions.Platform;

namespace DemoSite.Feature.Alerts.Platform.ContentResolvers
{
    public class AlertBannerContentsResolver : RenderingContentsResolver
    {
        public override object ResolveContents(Rendering rendering, IRenderingConfiguration renderingConfig)
        {
            Assert.ArgumentNotNull(rendering, nameof(rendering));
            Assert.ArgumentNotNull(renderingConfig, nameof(renderingConfig));

            JObject jObject = new JObject { ["items"] = new JArray() };
            List<Item> alerts = new List<Item>();

            Item datasourceItem = GetDatasourceItem();
            Item contextItem = this.GetContextItem(rendering, renderingConfig);


            if (datasourceItem != null)
            {
                alerts.AddRange(GetAlertsList(datasourceItem));
            }

            if (contextItem != null)
            {
                alerts.AddRange(GetAlertsList(contextItem));
            }
            else
            {
                return null;
            }

            if (alerts == null || alerts.Count == 0)
            {
                return jObject;
            }

            jObject["items"] = ProcessItems(alerts, rendering, renderingConfig);
            return jObject;
        }

        private static Item GetDatasourceItem()
        {
            Item siteItem = ServiceLocator.ServiceProvider.GetService<IMultisiteContext>().GetSiteItem(Sitecore.Context.Item);
            Item datasource = null;

            if (siteItem != null)
            {
                Sitecore.Data.Fields.ReferenceField rf = siteItem.Fields[NavigationSiteSettings.FieldNames.GlobalAlertFolder];
                if (rf != null && rf.TargetItem != null)
                {
                    datasource = rf.TargetItem;
                }
            }

            return datasource;
        }

        private IEnumerable<Item> GetChildAlerts(Item item)
        {
            return item.GetChildren()
                .FirstOrDefault(x => x.IsOrInherits(Constants.TemplateGuids.AlertFolder))
                ?.GetChildren()
                   ?? Enumerable.Empty<Item>();
        }

        private List<Item> GetAlertsList(Item item)
        {
            return item.Axes.GetAncestors().Append(item).SelectMany(GetChildAlerts)?.ToList();
        }
    }
}
