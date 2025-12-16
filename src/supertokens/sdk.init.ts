import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import config from "../config/";

supertokens.init({
  framework: "express",
  supertokens: config.supertokens,
  appInfo: {
    // learn more about this on https://supertokens.com/docs/session/appinfo
    appName: "project-management",
    apiDomain:
      process.env["NODE_ENV"] == "dev"
        ? "http://localhost:8080"
        : (process.env["AWS_EBS_DOMAIN"] as string),
    websiteDomain:
      process.env["NODE_ENV"] == "dev"
        ? "http://localhost:3000"
        : (process.env["AWS_AMP_DOMAIN"] as string),
    apiBasePath: "/auth",
    websiteBasePath: "/auth",
  },
  recipeList: [
    EmailPassword.init(), // initializes signin / sign up features
    Session.init(), // initializes session features
  ],
});
