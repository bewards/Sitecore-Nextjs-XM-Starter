using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DemoSite.Feature.Navigation.Platform
{
    public static class Constants
    {
        public static class NavigationSiteSettings
        {
            public static class FieldNames
            {
                public static string DefaultFooter = "defaultFooter";
                public static string DefaultHeader = "defaultHeader";
                public static string Link = "link";
                public static string LinkText = "linkText";
            }
        }

        public static class TemplateGuids
        {
            public static Guid PrimaryNav = new Guid("3778ED4A-0A91-4291-B511-7AC6D8CABEF4");
            public static Guid UtilityLinkSection = new Guid("794129FB-8EBD-4E5F-B894-45E6D9896441");
            public static Guid PrimaryNavSection = new Guid("E29A8175-D3D3-4B00-949A-3B1E8EA15E45");
            public static Guid PrimaryNavMenuBtn = new Guid("C5D60182-5B2D-44AE-89DD-1C60042A0AE6");
            public static Guid DynamicButtonsChoiceSection = new Guid("76106B77-F6EF-4463-ABD1-88F91D95CA1A");
            public static Guid LinkWithLang = new Guid("4DD932C2-FE9B-494D-8853-B00AFAF084E6");
            public static Guid HeadlessSite = new Guid("0073FAE7-226A-4779-BA2B-C6CA36E8D554");
            public static Guid PageRouteFolder = new Guid("2FAD270E-01F9-4EA2-BEAD-FCA6FE74DA18");
        }
    }
}