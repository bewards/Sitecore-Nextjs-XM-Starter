# Definition of Done

Review the definitions of done below to confirm the PR is ready.

## Task Level

- [ ] component meets the acceptance criteria of the story section that defines the business behavior
- [ ] component meets the functional requirements of every variation

## Sitecore Specifics

- [ ] rendering item has the `Thumbnail` field set to a screenshot of the Component from design (or web)
- [ ] rendering item has Datasource Template field properly configured with a xpath query
- [ ] rendering item Parameters Template field is set to "Templates/Foundation/DemoSite/Base Rendering Parameters/\_HPComponentBaseRenderingParameters" (or another Parameters template that inherits this template if more fields are required)
- [ ] rendering item has appropriate cache setting enabled. Always select "Vary By Param" since all HP Renderings will use Rendering Parameters (for styles). Use vary by data if the item has a datasource.
      <br><br>
- [ ] if rendering item uses a Datasource, then Datasource Location field is properly configured with a template
- [ ] if rendering item uses a Datasource, insert options are configured for the Datasource template at the page component folder level
- [ ] if rendering item uses a Datasource, then `withDatasourceCheck` should be used in the rendering file so that if no datasource is set, a friendly message is shown in Experience Editor.
- [ ] if rendering item uses a Datasource, configure the \_\_Standard Values of **all** datasource related item templates so that the field `Default Workflow` value is set to _Workflows/DemoSite Workflow_
      <br><br>
- [ ] if rendering component uses a JSS Placeholder, a placeholder setting item is created with the key and this ph setting item is selected within the rendering items _Layout Service Placeholders_ field
      <br><br>
- [ ] NO static text is left in the rendering file (tsx). A static phrase such as "click here" should be placed in Sitecore as a dictionary item and the i18n Sitecore helper should be used to translate.
- [ ] All Sitecore items are serialized and checked in (template, rendering, sample content if relevant, etc.)
- [ ] If there are any template updates, make sure to run `jss graphql:update` to update retrospection data
- [ ] If there is an API/3rd party dependency, a mock service should be Implemented such as MirageJS
