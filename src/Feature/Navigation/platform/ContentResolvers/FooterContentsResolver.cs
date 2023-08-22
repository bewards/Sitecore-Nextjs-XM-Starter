using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json.Linq;
using Sitecore.Data.Items;
using Sitecore.Diagnostics;
using Sitecore.LayoutService.Configuration;
using System.Collections.Generic;
using System.Linq;
using Sitecore.XA.Foundation.Multisite;
using Sitecore.DependencyInjection;
using NavigationSiteSettings = DemoSite.Feature.Navigation.Platform.Constants.NavigationSiteSettings;
using Sitecore.Mvc.Presentation;
using DemoSite.Feature.Navigation.Platform.Services;

namespace DemoSite.Feature.Navigation.Platform.ContentResolvers
{
    public class FooterContentsResolver : Sitecore.LayoutService.ItemRendering.ContentsResolvers.RenderingContentsResolver
    {
        protected readonly IFooterBuilder FooterBuilder;

        public FooterContentsResolver(IFooterBuilder _footerBuilder)
        {
            Debug.Assert(_footerBuilder != null, "Footer Builder is null");
            FooterBuilder = _footerBuilder;
        }

        public override object ResolveContents(Sitecore.Mvc.Presentation.Rendering rendering, IRenderingConfiguration renderingConfig)
        {
            Assert.ArgumentNotNull((object)rendering, nameof(rendering));
            Assert.ArgumentNotNull((object)renderingConfig, nameof(renderingConfig));

            // Get Footer datasource: try page-level datasource first, then site-level
            var datasourceItem = GetDatasourceItem(rendering);

            var footerData = FooterBuilder.GetFooterData(datasourceItem, rendering, renderingConfig, this.ProcessItem, this.ProcessItems);

            return footerData;
        }

        /// <summary>
        /// Get Footer datasource: try page-level datasource first, then site-level
        /// </summary>
        /// <param name="rendering"></param>
        /// <returns></returns>
        private static Item GetDatasourceItem(Rendering rendering)
        {
            var datasource = !string.IsNullOrEmpty(rendering.DataSource)
                ? rendering.RenderingItem?.Database.GetItem(rendering.DataSource)
                : null;

            if (datasource == null)
            {
                var siteItem = ServiceLocator.ServiceProvider.GetService<IMultisiteContext>().GetSiteItem(Sitecore.Context.Item);
                if (siteItem != null)
                {
                    Sitecore.Data.Fields.ReferenceField rf = siteItem.Fields[NavigationSiteSettings.FieldNames.DefaultFooter];
                    if (rf != null && rf.TargetItem != null)
                    {
                        datasource = rf.TargetItem;
                    }
                }
            }
            return datasource;
        }
    }
}