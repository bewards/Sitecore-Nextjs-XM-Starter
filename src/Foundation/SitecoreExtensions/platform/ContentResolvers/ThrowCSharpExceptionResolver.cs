using Sitecore.LayoutService.Configuration;
using Sitecore.Mvc.Presentation;
using System;

namespace DemoSite.Foundation.SitecoreExtensions.Platform.ContentResolvers
{
    public class ThrowCSharpExceptionResolver : Sitecore.LayoutService.ItemRendering.ContentsResolvers.RenderingContentsResolver
    {
        public ThrowCSharpExceptionResolver() { }

        public override object ResolveContents(Rendering rendering, IRenderingConfiguration renderingConfig)
        {
            throw new Exception("ThrowCSharpExceptionResolver");
        }
    }
}