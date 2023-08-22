// import * as fs from "fs";
// import * as path from "path";
import { randomUUID } from "crypto";

/* eslint-disable import/no-anonymous-default-export */
export default function (plop) {
  // GENERATOR: Create Feature or Foundation Project
  plop.setGenerator("scaffold-project", {
    description: "Generates a C# Project in Sitecore 10.3 flavor",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Project name (no spaces)",
        validate: (data) => {
          if (!data?.length) {
            console.log("Please provide a valid name.");
            return false;
          }
          return true;
        },
      },
      {
        type: "confirm",
        name: "isFeatureProject",
        message: "Will it be a Feature? (No = Foundation)",
      },
    ],
    actions: function (data) {
      var actions = [];

      data["ProjectGuid"] = `{${randomUUID({}).toUpperCase()}}`;

      var pascalCaseHelper = plop.getHelper("pascalCase");
      var projectName = pascalCaseHelper(data.name);
      var isFeatureProject = data.isFeatureProject || false;

      const destinationPath = isFeatureProject ? "./src/Feature" : "./src/Foundation";

      actions.push({
        type: "addMany",
        destination: destinationPath,
        templateFiles: "./plop-templates/scaffold-project/**/*",
        base: "./plop-templates/scaffold-project",
      });

      return actions;
    },
  });
}
