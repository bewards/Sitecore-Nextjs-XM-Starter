using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json.Linq;
using Sitecore.Data.Items;
using Sitecore.Diagnostics;
using Sitecore.LayoutService.Configuration;
using Sitecore.XA.Foundation.Multisite;
using Sitecore.DependencyInjection;
using Sitecore.Mvc.Presentation;
using DemoSite.Foundation.SitecoreExtensions.Platform;

namespace DemoSite.Feature.Navigation.Platform.Services
{
    public class FooterBuilder : IFooterBuilder
    {
        public object GetFooterData(Item datasourceItem, Rendering rendering, IRenderingConfiguration renderingConfig,
            Func<Item, Rendering, IRenderingConfiguration, JObject> ProcessItem,
            Func<IEnumerable<Item>, Rendering, IRenderingConfiguration, JArray> ProcessItems)
        {
            Debug.Assert(datasourceItem != null, "Context Item is null");

            JObject rootObject = ProcessItem(datasourceItem, rendering, renderingConfig);

            //var footerSections = FooterBuilder.GetFooterSections(datasourceItem);
            //rootObject["sections"] = (JToken)this.ProcessItems(footerSections, rendering, renderingConfig);

            var sectionsWithLinks = datasourceItem.Children.Select(section =>
            {
                var sectionObj = ProcessItem(section, rendering, renderingConfig);
                var columnsWithLinks = section.Children.Where(column => column.HasChildren).Select(column =>
                {
                    var columnChildren = column.Children.Where(child =>
                    {
                        if (child.IsOrInherits(Constants.TemplateGuids.LinkWithLang))
                        {
                            Sitecore.Data.Fields.LinkField linkField = child.Fields[Constants.NavigationSiteSettings.FieldNames.Link];
                            Sitecore.Data.Fields.LinkField linkTextField = child.Fields[Constants.NavigationSiteSettings.FieldNames.LinkText];


                            if (linkField == null || string.IsNullOrWhiteSpace(linkField.Value) || (string.IsNullOrWhiteSpace(linkField.Text) && string.IsNullOrWhiteSpace(linkTextField.Value)))
                                return false;
                        }

                        return true;
                    }).ToList();
                    return ProcessItems(columnChildren, rendering, renderingConfig);
                }).ToList();
                sectionObj["columns"] = JToken.FromObject(columnsWithLinks);

                return sectionObj;
            }).ToList();

            rootObject["sections"] = JToken.FromObject(sectionsWithLinks);

            return (object)rootObject;
        }
    }
}