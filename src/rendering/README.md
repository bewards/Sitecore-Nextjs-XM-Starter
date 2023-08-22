# Sitecore JSS Next.js Sample Application

[Documentation (Experience Platform)](https://doc.sitecore.com/xp/en/developers/hd/201/sitecore-headless-development/sitecore-javascript-rendering-sdk--jss--for-next-js.html)

[Documentation (XM Cloud)](https://doc.sitecore.com/xmc/en/developers/xm-cloud/sitecore-javascript-rendering-sdk--jss--for-next-js.html)

All commands below are ran from the `src/rendering` directory
<br><br>

## Component Guidelines

- All styling for a componenent should be done with `[component-name].module.scss` files within the same directory as the component
  - Review the /components/Navigation/Header component for an example
  - If a utility type (reusable) class is needed or a global change, see the additional SCSS asset notes below.
    <br><br>
- Additional SCSS is located under the `@sass` alias, `/assets/sass`. This area should be used under the following circumstances:

  - Bootstrap variable and sass-map overrides located in `@sass/vendors/bootstrap`
  - A global styling update is needed that should be reflected across all pages, such as global markup tags (ex: html/body in `_layout.scss`)
  - An SXA component is used that needs styling updates (SXA organized under: `@sass/sxa`).
  - A scss module utility class needs to be created for re-use in react components.
    > first see if a Bootstrap [utility class](https://getbootstrap.com/docs/5.2/utilities/background) is already available

- All hex values should come directly from either sass variables or generated css var

## Bootstrap 5 Guidelines

- The project is configured with Bootstrap 5.2.3 using Sass
- A `snippet` file has been added to the workspace for Bootstrap Breakpoints
  - in a scss file, simply type `bsbp` to get a dropdown list of available breakpoint commands

## Getting FE updates in Sitecore-first connected mode

- When the Docker rendering service starts, it will automatically run `npm run start:connected` to start the Next.js application and watch for changes (HMR)
  - you will not have to run this command locally

## Running the application in disconnected mode (Storybook)

- To run Storybook for Components with Sitecore Layout Data, your application must have credentials (from ./init.ps1) for connecting to a Sitecore instance.

```
npm run storybook:sc
```

> A custom Storybook setup that will generate a Storybook pages with available components by retrieving
> layout data from a running Sitecore instance.

- Page maps are configurable here: `./rendering/src/stories/page-map.ts`

- Layout data is stored here and should be comitted: `./rendering/src/stories/[page.Name]/page-data.json`

- Page Stories are generated here: `./rendering/src/stories/[page.Name]/index.stories.tsx`

- Based off the template here: `./rendering/src/stories/_template/index.stories.tsx`

## Scaffold a React Component with Project standard customizations

- Run `npm run plop scaffold-react-component`
- This will not create the separate stories file. Create that manually by copying an existing stories file.

## Debugging

- Debugging of the Next.js application is possible by using the `start:connected` or `start` scripts from the Next.js `package.json`, and the pre-configured _Attach to Process_ VS Code launch configuration.
