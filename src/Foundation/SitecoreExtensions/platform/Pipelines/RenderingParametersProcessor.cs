using Sitecore.Diagnostics;
using Sitecore.LayoutService.Configuration;
using Sitecore.LayoutService.Presentation.Pipelines.RenderJsonRendering;
using Sitecore.Data;
using Sitecore.LayoutService.Serialization;
using System.Linq;
using Sitecore.Data.Items;

/**
 * References:
 * - https://andypaz.com/2021/01/05/serializing-rendering-parameters-in-the-layout-service/
 * - https://smartsitecore.com/en/sxa-grid-system-with-sitecore-jss-part-1/
 */
namespace DemoSite.Foundation.SitecoreExtensions.Platform.Pipelines
{
    public class RenderingParametersProcessor : BaseRenderJsonRendering
    {
        public RenderingParametersProcessor(IConfiguration configuration) : base(configuration) { }

        protected override void SetResult(RenderJsonRenderingArgs args)
        {
            Assert.ArgumentNotNull(args, nameof(args));
            Assert.IsNotNull(args.Result, "args.Result should not be null");

            var rendering = args.Result;
            var renderingParams = rendering.RenderingParams;

            if (renderingParams == null)
            {
                return;
            }

            foreach (string key in renderingParams.Keys.ToList())
            {
                if (ID.TryParse(renderingParams[key], out var itemId))
                {
                    Item item = args.Rendering.RenderingItem.Database.GetItem(itemId);
                    if (item == null)
                    {
                        continue;
                    }
                    renderingParams[key] = args.RenderingConfiguration.ItemSerializer.Serialize(item, new SerializationOptions() { DisableEditing = true });
                }
            }

            args.Result = rendering;
        }
    }
}
