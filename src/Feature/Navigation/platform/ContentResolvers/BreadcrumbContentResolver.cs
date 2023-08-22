using Newtonsoft.Json.Linq;
using Sitecore.Data.Items;
using Sitecore.Diagnostics;
using Sitecore.LayoutService.Configuration;
using Sitecore.Mvc.Presentation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DemoSite.Foundation.SitecoreExtensions.Platform;

namespace DemoSite.Feature.Navigation.Platform.ContentResolvers
{
    public class BreadcrumbContentResolver : Sitecore.LayoutService.ItemRendering.ContentsResolvers.RenderingContentsResolver
    {
        public BreadcrumbContentResolver() { }

        public override object ResolveContents(Rendering rendering, IRenderingConfiguration renderingConfig)
        {
            Assert.ArgumentNotNull((object)rendering, nameof(rendering));
            Assert.ArgumentNotNull((object)renderingConfig, nameof(renderingConfig));

            JObject rootObject = new JObject { ["crumbs"] = new JArray() };
            JArray crumbs = new JArray();
            JArray crumbsReversed = new JArray();

            //var datasourceItem = rendering.RenderingItem?.Database.GetItem(rendering.DataSource);
            var contextItem = Sitecore.Context.Item;
            var contextItemObj = this.ProcessItem(contextItem, rendering, renderingConfig);

            var homeItemObj = this.ProcessItem(Sitecore.Context.Database.GetItem(Sitecore.Context.Site.ContentStartPath), rendering, renderingConfig);

            var titleOverride = contextItemObj["breadcrumbTitle"].Values().FirstOrDefault();

            // Creating initial crumb of current page:
            JObject initialCrumb = new JObject
                (
                    new JProperty("label", !string.IsNullOrWhiteSpace((string)titleOverride) ? contextItemObj["breadcrumbTitle"] : contextItemObj["title"]),
                    new JProperty("url", null) // last crumb will not be a link.
                );

            crumbs.Add(initialCrumb);

            BuildTrail(crumbs, contextItem.Parent, rendering, renderingConfig);

            var temp = crumbs.Reverse();
            foreach (var item in temp)
                crumbsReversed.Add(item);

            rootObject["crumbs"] = crumbsReversed;
            rootObject["homeIcon"] = homeItemObj["breadcrumbIcon"];

            return (object)rootObject;
        }

        private void BuildTrail(JArray trail, Item page, Rendering rendering, IRenderingConfiguration renderingConfig)
        {
            if (page == null || page.IsOrInherits(Constants.TemplateGuids.HeadlessSite))
            {
                // No page data, or we've hit the headless site node.
                return;
            }

            var pageObj = this.ProcessItem(page, rendering, renderingConfig);

            if (pageObj == null || pageObj.Count == 0)
            {
                // this is null in experience editor for certain pages...
                return;
            }

            var isBreadcrumbRoot = pageObj["isBreadcrumbRoot"].Values().FirstOrDefault();
            var titleOverride = pageObj["breadcrumbTitle"].Values().FirstOrDefault();

            if (!page.IsOrInherits(Constants.TemplateGuids.PageRouteFolder))
            {
                // 'Page' is not a folder.
                var newCrumbObj = new JObject
                    (
                        new JProperty("label", !string.IsNullOrWhiteSpace((string)titleOverride) ? pageObj["breadcrumbTitle"] : pageObj["title"]),
                        new JProperty("url", Sitecore.Links.LinkManager.GetItemUrl(page))
                    );

                trail.Add(newCrumbObj);
            }

            if (!(bool)isBreadcrumbRoot)
            {
                // Current page was not marked as root, continue with trail 
                BuildTrail(trail, page.Parent, rendering, renderingConfig);
            }
        }
    }
}