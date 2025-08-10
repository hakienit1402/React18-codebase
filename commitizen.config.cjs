const custom = require("@digitalroute/cz-conventional-changelog-for-jira/configurable");
const defaultTypes = require("@digitalroute/cz-conventional-changelog-for-jira/types");
module.exports = custom({
  types: {
    ...defaultTypes,
    perf: {
      description: "Improvements that will make your code perform better",
      title: "Performance",
    },
    style: {
      description:
        "Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)",
      title: "Style",
    },
  },
  skipScope: true,
  jiraPrefix: "PD",
  jiraPrepend: "[",
  jiraAppend: "]",
});
