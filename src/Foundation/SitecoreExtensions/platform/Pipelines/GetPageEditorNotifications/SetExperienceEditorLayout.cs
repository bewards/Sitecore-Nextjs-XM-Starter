using Sitecore.Diagnostics;
using Sitecore.ExperienceEditor.Utils;
using Sitecore.Pipelines.GetPageEditorNotifications;
using Sitecore.Web.UI.HtmlControls;
using EE_Constants = Sitecore.ExperienceEditor.Constants;

namespace DemoSite.Foundation.SitecoreExtensions.Platform.Pipelines.GetPageEditorNotifications
{
    public class SetExperienceEditorLayout : GetPageEditorNotificationsProcessor
    {
        public override void Process(GetPageEditorNotificationsArgs arguments)
        {
            Assert.ArgumentNotNull(arguments, "arguments");
            bool editingSharedVersion = WebUtility.IsEditAllVersionsTicked();
            if (!editingSharedVersion)
            {
                arguments.Notifications.Add(new PageEditorNotification("You are editing the final layout", PageEditorNotificationType.Warning));
                Registry.SetString(EE_Constants.RegistryKeys.EditAllVersions, EE_Constants.Registry.CheckboxTickedRegistryValue);
            }
        }
    }
}