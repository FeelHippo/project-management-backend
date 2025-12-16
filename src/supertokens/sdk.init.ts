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
    apiDomain: process.env["AWS_EBS_DOMAIN"] ?? "http://localhost:8080",
    websiteDomain: process.env["AWS_AMP_DOMAIN"] ?? "http://localhost:3000",
    apiBasePath: "/auth",
    websiteBasePath: "/auth",
  },
  recipeList: [
    EmailPassword.init(), // initializes signin / sign up features
    Session.init(), // initializes session features
  ],
});
