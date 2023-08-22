using Newtonsoft.Json.Linq;
using Sitecore.Data.Items;
using Sitecore.Diagnostics;
using Sitecore.LayoutService.Configuration;
using System.Collections.Generic;
using System.Linq;

namespace DemoSite.Foundation.SitecoreExtensions.Platform.ContentResolvers
{
    public class DatasourceWithChildrenContentsResolver : Sitecore.LayoutService.ItemRendering.ContentsResolvers.RenderingContentsResolver
    {
        private List<Item> items = new List<Item>();

        public override object ResolveContents(Sitecore.Mvc.Presentation.Rendering rendering, IRenderingConfiguration renderingConfig)
        {
            Assert.ArgumentNotNull((object)rendering, nameof(rendering));
            Assert.ArgumentNotNull((object)renderingConfig, nameof(renderingConfig));
            Item contextItem = this.GetContextItem(rendering, renderingConfig);

            //If the contextItem is null then return null
            if (contextItem == null)
                return (object)null;

            JObject jobject = this.ProcessItem(contextItem, rendering, renderingConfig);

            //Overwrite the Item selector query to make sure the resolver always only returns the children
            this.ItemSelectorQuery = "./*";
            IEnumerable<Item> items = this.GetItems(contextItem);
            List<Item> objList = items != null ? items.ToList<Item>() : (List<Item>)null;
            if (objList == null || objList.Count == 0)
                return (object)jobject;
            jobject["children"] = (JToken)this.ProcessItems((IEnumerable<Item>)objList, rendering, renderingConfig);

            return (object)jobject;
        }
    }
}