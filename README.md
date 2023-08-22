# DemoSite - Sitecore Next.js Starter Kit

## About this Project

This project is designed to be used as a Boilerplate starter for the DemoSite, with root technology consisting of the following high-level features:

- Sitecore Helix Publishing Pipeline
- Sitecore Helix Principles
- Local Sitecore Containers
- Sitecore Next.js v21.1.6 (versions managed by branching: version/21.1.6)
- Sitecore Content Serialization (SCS)
- Plop templates for .Net Project and React Component generation

## Configured for Sitecore-first workflow

It is intended that you work directly in Sitecore to define templates and renderings, instead of using the code-first approach. To support this mode:

- The JSS content workflow is disabled
- Imported items will not be marked as 'protected'
- JSS import warnings in the Content Editor and Experience Editor have been disabled

## Prerequisites

- NodeJs LTS (18.13.0) - confirm this version is installed with `node -v`
- .NET 6.0 SDK
- .NET Framework 4.8 SDK
- Visual Studio 2019
- A Sitecore license.xml file placed at C:\Sitecore
- Docker for Windows, with Windows Containers enabled

See Sitecore Containers documentation for more information on system requirements.

## Helix Publishing Pipeline

- A Helix Publishing Pipeline project called "Environment" controls publishing and deploying all projects configuration and code into the Sitecore Content Management role. (see `src\Environment`).

## Local Docker: What's Included

- A `docker-compose` environment for each Sitecore topology (XPO, XP1, XM1)
  with Sitecore's Next.js rendering host. The project is configured to run XM1 by default, so the other topology folders can be ignored or switched to.

  > The containers structure is organized by specific topology environment (see `run\sitecore-xp0`, `run\sitecore-xp1`, `run\sitecore-xm1`).
  > The included `docker-compose.yml` is a stock environment from the Sitecore
  > Container Support Package. All changes/additions for this solution are included
  > in the `docker-compose.override.yml`.

<br>

# Local Docker: Docker-Desktop Initial Set Up

Some machines will have permission issues and random faults that occur after installing Docker-Desktop.
<br>
Check the following line-items below for troubleshooting purposes:

- If a Azure VM (AVDM) was set up for you, Docker-Desktop will already be installed with the correct version (v4.13.1). Do not update. If you step through all of the items below
  and an uknown error still occurs, we can look into using the latest version with [this registry key workaround](https://blog.jermdavis.dev/posts/2022/fix-broken-pipe-docker-engine-windows#end).
- Once Docker-Desktop is installed, if an error is thrown for "access denid, you must be in the docker-users group", run the following:
  ```ps1
  net localgroup docker-users "your-user-id" /ADD
  ```
- Make sure to always "Switch to Windows Containers"
- Under Docker-Desktop Settings, uncheck "Use Docker Compose V2" at the bottom of settings
- Disable [buildkit](https://stackoverflow.com/a/65157981/1148619) property in the daemon.json file
- If you're on a VM, make sure the daemon.json file is located at `%userprofile%\.docker\daemon.json`.
- If there is a Docker-Desktop error complaining about "npipe docker_engine_windows", the daemon.json file needs to have a property called "hosts". Include this section below in the file, then restart docker-desktop:
  ```json
    "hosts": [
      "npipe:////./pipe/docker_engine_windows"
    ]
  ```
- Lastly, check the machine for Sitecore Container compatability (not required if using a pre-built VM) [with this powershell command](https://github.com/strezag/sitecore-containers-prerequisites)

# Repository Set Up

1. Install Git for Windows if not already installed
1. Clone the repo from the master branch on ADO with VS Code option
1. Open the project in VS Code and install the workspace recommended extensions (a prompt should appear on the bottom right to accept this)
1. Store the Sitecore license.xml file under `C:\Sitecore\license.xml`
1. Disable citrix client and MS Drive from startup and exit these applications just incase

# Running the Solution

DO NOT skip out on any step below and make sure to read carefully.

1. If your local IIS is listening on port 443, you'll need to stop it.

   > This requires an elevated PowerShell or command prompt.

   ```
   iisreset /stop
   ```

1. Prepare the Sitecore container environment by running

   > You must use an elevated/Administrator Windows PowerShell 5.1 prompt for
   > this command, PowerShell 7 is not supported at this time.

   ```ps1
   .\init.ps1 -InitEnv -LicenseXmlPath C:\Sitecore\license.xml -AdminPassword demosite123!
   ```

   > The file `/run/sitecore-xm1/.env` is in the `.gitignore` and auto-populated for each developer.
   > Individual users may also override values using process or system environment variables.
   > Make sure that the Sitecore license.xml file is located at the LicenseXmlPath location.

1. If this is your first time using `mkcert` with NodeJs, you will
   need to set the `NODE_EXTRA_CA_CERTS` environment variable. This variable
   must be set in your user or system environment variables. The `init.ps1`
   script will provide instructions on how to do this.

   - Be sure to restart your terminal or VS Code for the environment variable
     to take effect.

1. After completing this environment preparation, run the startup script
   from the solution root:

   ```ps1
   .\up.ps1
   ```

1. When prompted, log into Sitecore via your browser, and accept the device authorization.

1. Wait for the startup script to open browser tabs for the rendered site and Sitecore Launchpad.

1. If any issues occur, review the troubleshooting section. Once the container is up and running successfully, the `init` script will not have to be ran again, unless the env file is wiped.
   <br>

# Using the Solution

- A Visual Studio Web Publish / Build of the `Environment` project with `Local` publish setting will update the running `cm` service.
- The running `rendering` service uses `next dev` against the mounted Next.js application, and will recompile automatically for any changes you make.
- You can also run the Next.js application directly using `npm` commands within `src\rendering` (separate README is included).
- Review README's found in the projects and throughout the solution for additional information.

> Reference: [CLI Commands](https://doc.sitecore.com/xp/en/developers/101/developer-tools/the-cli-serialization-command.html)

<br>

# Development Standards

## Sitecore Templates

### Architecture Principles

- This project follows best practices from [Sitecore Helix](https://helix.sitecore.com/introduction/index.html).
- Before creating Sitecore templates, review the [Template topics](https://helix.sitecore.com/principles/templates/index.html).

<br>

### Template Field Naming Conventions

Template field names should be in `camelCase` format so that the layout data shows JavaScript formatted property names.

1. Name your Sitecore field like "pageTitle".
1. Go to the template field item created (template/fieldName) and set the "Title" field to a friendly name "Page Title"
   <br>
   _Content Authors will see the readable "Title" value when they work with an item of this template_

<br>

### Template Field Sources

- Image field sources should use the $sxa token value `query:$siteMedia`
  - sitecore site example item path of image use: `/sitecore/content/DemoSite/DemoSiteWebsite/Home/styleguide/Page Data/styleguide-jss-styleguide-section-B78937DAD4FF4C1B82D6AEC0555633BBACC1FDD9F8CB46D9E358E84784A1E510EA` or GUID of item `{B0A7CA37-BB9A-5C7D-AB2B-00B963972D51}`
  - [sxa resolveTokens reference](https://doc.sitecore.com/xp/en/developers/sxa/103/sitecore-experience-accelerator/the-sxa-pipelines.html)

### After Template Updates - **_[Reference](https://doc.sitecore.com/xp/en/developers/hd/210/sitecore-headless-development/introspecting-the-graphql-schema-in-jss-next-js-apps.html)_**

When you alter item templates related to the site, your locally stored graphql introspection data becomes out of sync with the information in your Sitecore instance. To update the data, in the root directory of the Next.js application (./src/rendering), run:

```
npx jss graphql:update
```

<br>

## Serializing Items

When new Sitecore items are created, first determine whether the item is included in serialization from one of the \*.module.json files by running:

```ps1
dotnet sitecore ser explain --path "[PATH_TO_ITEM]"
```

> If the item is not currently serialized, you will need to [include the item for serialization](https://doc.sitecore.com/xp/en/developers/103/developer-tools/sitecore-content-serialization-structural-overview.html) in the proper `[layer].module.json` file.

Once a module is confirmed configured, pull items from your local Sitecore instance into source control with:

```ps1
dotnet sitecore ser pull
```

<br>
If you need to push items into your local Sitecore instance from source control, run:
```ps1
dotnet sitecore ser push
```

<br>

## Creating a New Feature or Foundation Project

Sometimes a new C# project is required in order to create a new feature or foundation layer to separate business logic between components. For example, all of our Navigation related components business logic (Content Resolvers, etc.) live in the Navigation Project (Helix Feature Layer). Some components aren't grouped and can be placed into their own project when necessary.

We can use plop.js to scaffold our project, see below for instructions:

1. From top-level directory, in powershell run `npm run plop`

- provide a project name
- select whether the project is a Feature or a Foundation level project

1. Open Visual Studio 2019 and navigate to the feature or foundation layer folder

- right-click, add new solution folder, and name it the same as the name given in plop
- right-click on solution folder > add existing project
  - navigate to the csproj of the generated project and select it to add the existing project to the solution

1. Close the solution and re-open it so that the Environment project automatically retrieves the newer Feature project reference!

1. right-click top-level solution > restore nuget packages

## Sitecore-first Workflow & Creating Components

This project uses the Sitecore-first workflow in connected mode. When developing a JSS app using the Sitecore-first workflow, the JSS app consumes data from Sitecore but has no responsibility for defining the structure of that data or what components are registered with Sitecore.

- To create a new component, navigate to the `src/rendering` directory where the Next.js application lives
- Review the separate README file in that application for FE specific guidelines

<br>

# Troubleshooting Issues

- When running .\up.ps1 or `jss deploy`, you receieve an error of: `Unexpected response from import service: unable to verify the first certificate`
  - run the jss command with `--acceptCertificate test` to retrieve the correct self-signed thumbprint, then use the expected thumbprint from this result with the acceptCertificate flag (save this into the up.ps1 script for future cases).
- If any errors occur when downloading and extracting (pulling) Docker Images, simply retry running the `up.ps1` script first before anything else.
  - Exit out of any VPN Clients
  - Open the advanced Windows firewall > Inbound connections, and see if any "dockerd.exe" applications are set to "not allow". If so, set to "allow".
  - Review windows application logs for any Errors
- If the CM or Rendering host comes up with "unsecure / untrusted cert" in https, you'll need to find where the "rootCA.pem" file was generated and run the following command to add it to the Trusted Root CA User Store:
  - `certutil –addstore –f "Root" C:\Users\[APADM_USER]\AppData\Local\mkcert\rootCA.pem`
    > [APADM_USER] will be the administrative user that ran the init.ps1 script
- Receiving `invalid grant` means your access token has expired
  - run `dotnet sitecore login --authority https://id.demosite.localhost/ --cm https://cm.demosite.localhost --allow-write true`
- Receiving `Unexpected HttpResponseMessage with code: InternalServerError` during serialization (mostly occurs after running clean.ps1 that clears the databases)
  - run serialization pushes by layer:
    - dotnet sitecore ser push -i Foundation.\*
    - dotnet sitecore ser push -i Feature.\*
    - dotnet sitecore ser push -i InitItems
    - dotnet sitecore ser push -i DemoSite.\*

# How to Debug C#/.NET code in Containers

1. Run Visual Studio as admin
1. If your instance has zscaler installed, turn off the Internet Security option
1. Open the "Containers" window in VS
1. Refer to section "Attach the Visual Studio debugger" in [Sitecore docs](https://doc.sitecore.com/xp/en/developers/103/developer-tools/debug-code-running-in-containers.html)
1. Make sure the "Connection target" dropdown field is set to the cm services (not the rendering service)
1. Make sure you've deployed the latest code to the Container from the Environment Project (web one-click publish)

<br>

# Formatting

- To format all TypeScript files within the Next.js app, simply run `npx prettier --write /src/rendering/**/*.ts`
