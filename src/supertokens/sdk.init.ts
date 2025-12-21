import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import config from "../config/";

const appInfo = {
  appName: "project-management",
  apiDomain: process.env["AWS_EBS_DOMAIN"] ?? "http://localhost:8080",
  websiteDomain: process.env["AWS_AMP_DOMAIN"] ?? "http://localhost:3000",
  apiBasePath: "/auth",
  websiteBasePath: "/auth",
};

supertokens.init({
  framework: "express",
  supertokens: config.supertokens,
  appInfo,
  recipeList: [
    EmailPassword.init(),
    Session.init({
      cookieSecure: true,
    }),
  ],
  debug: true,
});
