using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json.Linq;
using Sitecore.Data.Items;
using Sitecore.LayoutService.Configuration;
using Sitecore.Mvc.Presentation;

namespace DemoSite.Feature.Navigation.Platform.Services
{
    public interface IFooterBuilder
    {
        object GetFooterData(Item datasourceItem, Rendering rendering, IRenderingConfiguration renderingConfig,
            Func<Item, Rendering, IRenderingConfiguration, JObject> ProcessItem,
            Func<IEnumerable<Item>, Rendering, IRenderingConfiguration, JArray> ProcessItems);
    }
}