using Microsoft.Extensions.DependencyInjection;
using Sitecore.DependencyInjection;
using Sitecore.LayoutService.ItemRendering.Pipelines.GetLayoutServiceContext;
using Sitecore.XA.Foundation.Multisite;
using Sitecore.JavaScriptServices.ViewEngine.LayoutService.Pipelines.GetLayoutServiceContext;
using Sitecore.JavaScriptServices.Configuration;

namespace DemoSite.Foundation.SitecoreExtensions.Platform.Pipelines.GetLayoutServiceContext
{
    public class HPContentExtension : JssGetLayoutServiceContextProcessor
    {
        public HPContentExtension(IConfigurationResolver configurationResolver) : base(configurationResolver) { }

        protected override void DoProcess(GetLayoutServiceContextArgs args, AppConfiguration application)
        {
            var siteItem = ServiceLocator.ServiceProvider.GetService<IMultisiteContext>().GetSiteItem(Sitecore.Context.Item);
            if (siteItem != null)
            {
                Sitecore.Data.Fields.Field mlt = siteItem.Fields[Constants.FieldNames.CookieBotScript];
                if (mlt != null && mlt.Value != null)
                {
                    args.ContextData.Add("cookieBot", mlt.Value);
                }
            }

        }
    }
}
