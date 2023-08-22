# escape=`

ARG PARENT_IMAGE
ARG DELTA_ASSET_IMAGE
ARG SXA_IMAGE
ARG SPE_IMAGE
ARG SOLUTION_IMAGE
ARG TOOLS_IMAGE
ARG MANAGEMENT_SERVICES_IMAGE
ARG HEADLESS_SERVICES_IMAGE

FROM ${SOLUTION_IMAGE} as solution
FROM ${DELTA_ASSET_IMAGE} as deltaAssetImage
FROM ${TOOLS_IMAGE} as tools
FROM ${SPE_IMAGE} as spe
FROM ${SXA_IMAGE} as sxa
FROM ${MANAGEMENT_SERVICES_IMAGE} AS management_services
FROM ${HEADLESS_SERVICES_IMAGE} AS headless_services
FROM ${PARENT_IMAGE}

SHELL ["powershell", "-Command", "$ErrorActionPreference = 'Stop'; $ProgressPreference = 'SilentlyContinue';"]

WORKDIR C:\inetpub\wwwroot

# Copy cm resources from "Cumulative hotfix for Sitecore XP 10.3"
COPY --from=deltaAssetImage \platform\cm .\

# Copy developer tools and entrypoint
COPY --from=tools C:\tools C:\tools

# Add SPE module
COPY --from=spe \module\cm\content .\

# Add SXA module
COPY --from=sxa \module\cm\content .\
COPY --from=sxa \module\tools \module\tools
RUN C:\module\tools\Initialize-Content.ps1 -TargetPath .\; `
    Remove-Item -Path C:\module -Recurse -Force;

# Copy the Sitecore Management Services Module
COPY --from=management_services C:\module\cm\content C:\inetpub\wwwroot

# Copy and init the JSS / Headless Services Module
COPY --from=headless_services C:\module\cm\content C:\inetpub\wwwroot
COPY --from=headless_services C:\module\tools C:\module\tools
RUN C:\module\tools\Initialize-Content.ps1 -TargetPath C:\inetpub\wwwroot; `
    Remove-Item -Path C:\module -Recurse -Force;

# Copy solution website files (./ is the webroot "wwww")
COPY --from=solution /artifacts/sitecore/ ./
COPY readme.md *.config*  c:\inetpub\wwwroot\App_Config\Include\

# Copy solution transforms
COPY --from=solution /artifacts/transforms/ /transforms/solution/

# Perform solution transforms
RUN C:\tools\scripts\Invoke-XdtTransform.ps1 -Path .\ -XdtPath C:\transforms\solution\Project\DemoSite\platform