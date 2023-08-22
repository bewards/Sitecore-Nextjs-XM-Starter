using Newtonsoft.Json.Linq;
using Sitecore.Data.Items;
using Sitecore.Diagnostics;
using Sitecore.LayoutService.Configuration;
using Sitecore.Mvc.Presentation;
using System.Linq;
using DemoSite.Foundation.SitecoreExtensions.Platform;

namespace DemoSite.Feature.Navigation.Platform.ContentResolvers
{
    public class DynamicButtonsContentsResolver : Sitecore.LayoutService.ItemRendering.ContentsResolvers.RenderingContentsResolver
    {
        public DynamicButtonsContentsResolver() { }

        public override object ResolveContents(Rendering rendering, IRenderingConfiguration renderingConfig)
        {
            Assert.ArgumentNotNull((object)rendering, nameof(rendering));
            Assert.ArgumentNotNull((object)renderingConfig, nameof(renderingConfig));

            // Getting data source item:
            var datasourceItem = rendering.RenderingItem?.Database.GetItem(rendering.DataSource);

            var id = datasourceItem.ID.Guid.ToString();

            // Creating JSON object:
            JObject initialObject = this.ProcessItem(datasourceItem, rendering, renderingConfig);

            JObject rootObject = new JObject
                (
                    new JProperty("backLabel", initialObject["backLabel"]),
                    new JProperty("initialTitle", initialObject["initialTitle"]),
                    new JProperty("initialSection", id)
                );

            JArray sections = new JArray();

            JObject initialSectionObj = new JObject
                (
                    new JProperty("id", id),
                    new JProperty("parentId", null),
                    new JProperty("title", initialObject["initialTitle"]),
                    new JProperty("choices", GetChoices(datasourceItem, rendering, renderingConfig))
                );

            sections.Add(initialSectionObj);

            TraverseSubsections(sections, datasourceItem, rendering, renderingConfig, id);

            rootObject["sections"] = sections;

            return (object)rootObject;
        }

        private void TraverseSubsections(JArray collection, Item section, Rendering rendering, IRenderingConfiguration renderingConfig, string parentId)
        {
            var choices = section.Children;
            
            foreach (Item choice in choices) {
                // checking if choice has a sub-section
                var subSection = choice.Children.FirstOrDefault(item => item.IsOrInherits(Constants.TemplateGuids.DynamicButtonsChoiceSection));

                if (subSection != null)
                {
                    var id = subSection.ID.Guid.ToString();

                    var tempObj = this.ProcessItem(subSection, rendering, renderingConfig);

                    JObject subSectionObj = new JObject
                    (
                        new JProperty("id", id),
                        new JProperty("parentId", parentId),
                        new JProperty("title", tempObj["sectionTitle"]),
                        new JProperty("choices", GetChoices(subSection, rendering, renderingConfig))
                    );

                    collection.Add(subSectionObj);

                    TraverseSubsections(collection, subSection, rendering, renderingConfig, id);
                }
            }
        }

        private JToken GetChoices(Item section, Rendering rendering, IRenderingConfiguration renderingConfig)
        {
            var choices = section.Children.Select(choice => {
                var choiceObj = this.ProcessItem(choice, rendering, renderingConfig);

                // checking if choice has a sub-section
                var subSection = choice.Children.FirstOrDefault(item => item.IsOrInherits(Constants.TemplateGuids.DynamicButtonsChoiceSection));
                if (subSection != null)
                {
                    choiceObj["nextSectionId"] = subSection.ID.Guid.ToString();
                }
                else
                {
                    choiceObj["nextSectionId"] = null;
                }

                return choiceObj;
            }).ToList();

            return JToken.FromObject(choices);
        }
    }
}