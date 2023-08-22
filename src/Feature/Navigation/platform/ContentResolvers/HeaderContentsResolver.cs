using Microsoft.Extensions.DependencyInjection;
using Sitecore.Data.Items;
using Sitecore.DependencyInjection;
using Sitecore.Diagnostics;
using Sitecore.LayoutService.Configuration;
using Sitecore.Mvc.Presentation;
using Sitecore.XA.Foundation.Multisite;
using DemoSite.Foundation.SitecoreExtensions.Platform;
using NavigationSiteSettings = DemoSite.Feature.Navigation.Platform.Constants.NavigationSiteSettings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json.Linq;

namespace DemoSite.Feature.Navigation.Platform.ContentResolvers
{
    public class HeaderContentsResolver : Sitecore.LayoutService.ItemRendering.ContentsResolvers.RenderingContentsResolver
    {
        public HeaderContentsResolver() { }

        public override object ResolveContents(Rendering rendering, IRenderingConfiguration renderingConfig)
        {
            Assert.ArgumentNotNull((object)rendering, nameof(rendering));
            Assert.ArgumentNotNull((object)renderingConfig, nameof(renderingConfig));

            // Getting Minimal Header datasource:
            // trying page-level first, then site-level
            var datasourceItem = GetDatasourceItem(rendering);
            var currentUrl = Sitecore.Links.LinkManager.GetItemUrl(Sitecore.Context.Item);
            var currentLang = Sitecore.Context.Language.ToString();
            // Defaulting home to starting node.
            var siteHome = Sitecore.Links.LinkManager.GetItemUrl(Sitecore.Context.Database.GetItem(Sitecore.Context.Site.ContentStartPath));

            JObject rootObject = this.ProcessItem(datasourceItem, rendering, renderingConfig);

            // Getting current page info
            rootObject["currentPage"] = currentUrl;

            // Getting current lang
            rootObject["lang"] = currentLang;

            // Adding translation link.
            var translationObj = new Translation
            {
                href = currentUrl,
                locale = currentLang.Contains(Sitecore.Configuration.Settings.GetSetting("TranslationToggleOtherLanguage")) ? "en" : "es-ES"
            };
            rootObject["translation"] = JToken.FromObject(translationObj);

            // Getting the first instance of a Primary Navigation item.
            var primaryNav = datasourceItem.Children.FirstOrDefault(item => item.IsOrInherits(Constants.TemplateGuids.PrimaryNav));
            if(primaryNav != null)
            {
                var navObj = this.ProcessItem(primaryNav, rendering, renderingConfig);

                // Changing where the home page is so the IsDescendants knows where to stop climbing.
                Sitecore.Data.Fields.LinkField primaryHomeLink = primaryNav.Fields["link"];
                if (!string.IsNullOrWhiteSpace(primaryHomeLink.GetFriendlyUrl()))
                {
                    siteHome = primaryHomeLink.GetFriendlyUrl();
                }

                // Getting the primary nav top-level items.
                var navSections = primaryNav.Children.Select(section => {
                    var navSection = this.ProcessItem(section, rendering, renderingConfig);
                    Sitecore.Data.Fields.LinkField sectionLink = null;

                    // Getting the sub-navigation if one exist.
                    if (section.IsOrInherits(Constants.TemplateGuids.PrimaryNavMenuBtn) && section.Children.Count > 0)
                    {
                        sectionLink = section.Fields["pageLink"];

                        var subNavSections = section.Children.Select(subSection => {
                            var subNavSection = this.ProcessItem(subSection, rendering, renderingConfig);

                            // Getting the sub-links of this sub-nav section.
                            if (subSection.Children.Count > 0)
                            {
                                var subNavSectionLinks = subSection.Children.Select(subSectionLink => {
                                    return this.ProcessItem(subSectionLink, rendering, renderingConfig);
                                }).ToList();

                                subNavSection["subNavSectionLinks"] = JToken.FromObject(subNavSectionLinks);
                            }

                            return subNavSection;
                        }).ToList();

                        navSection["subNavSections"] = JToken.FromObject(subNavSections);
                    }
                    else if (section.IsOrInherits(Constants.TemplateGuids.PrimaryNavSection))
                    {
                        // Checking if page is a descendant of the current nav section.
                        sectionLink = section.Fields["link"];
                    }

                    if (sectionLink != null && !string.IsNullOrEmpty(sectionLink.Value))
                        navSection["isDescendant"] = IsDescendant(Sitecore.Context.Item, sectionLink.GetFriendlyUrl(), siteHome);

                    return navSection;
                }).ToList();

                navObj["navSections"] = JToken.FromObject(navSections);

                rootObject["primaryNav"] = JToken.FromObject(navObj);
            }

            // Getting the first instance of a Uility Link Section item.
            var utilitySectionLinks = datasourceItem.Children.FirstOrDefault(item => item.IsOrInherits(Constants.TemplateGuids.UtilityLinkSection));
            if(utilitySectionLinks != null)
            {
                var utilityObj = this.ProcessItem(utilitySectionLinks, rendering, renderingConfig);
                var utilityLinks = utilitySectionLinks.Children.Select(links =>
                {
                    return this.ProcessItem(links, rendering, renderingConfig);
                }).ToList();
                utilityObj["utilityLinks"] = JToken.FromObject(utilityLinks);

                rootObject["utilitySection"] = JToken.FromObject(utilityObj);
            }

            return (object)rootObject;
        }

        /// <summary>
        /// Gets the datasource item for the Minimal Header. 
        /// First tries he current page, then moves up to the site-level.
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
                    Sitecore.Data.Fields.ReferenceField rf = siteItem.Fields[NavigationSiteSettings.FieldNames.DefaultHeader];
                    if (rf != null && rf.TargetItem != null)
                    {
                        datasource = rf.TargetItem;
                    }
                }
            }

            return datasource;
        }

        /// <summary>
        /// Checks if the current page is a descendant of the give primary navigation section.
        /// Starts with the current page and works it's way up the content tree until it reached the provided home page.
        /// </summary>
        /// <param name="current">The current item being checked.</param>
        /// <param name="sectionURL">The URL of the primary navigation section.</param>
        /// <param name="homeURL">The URL of the home page, or top most page to navigation to.</param>
        /// <returns></returns>
        private static Boolean IsDescendant(Item current, string sectionURL, string homeURL )
        {
            if (current == null || string.IsNullOrEmpty(sectionURL) || string.IsNullOrEmpty(homeURL) || Sitecore.Links.LinkManager.GetItemUrl(current) == homeURL)
            {
                // We've hit the top page of the site,
                // or one of the arguments has an invalid value.
                // Returning false since everything is a descendant of home.
                return false;
            }

            if (Sitecore.Links.LinkManager.GetItemUrl(current) == sectionURL)
            {
                // We've hit the navigation item 
                // Returning true since the current page is a descendant of the given navigation section.
                return true;
            }

            // Moving up the tree
            return IsDescendant(current.Parent, sectionURL, homeURL);
        }
    }

    class Translation
    {
        public string href;
        public string locale;
    }
}
