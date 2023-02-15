import { createClient, defaultExchanges } from "urql";
import SuperTokens from "supertokens-auth-react";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";

SuperTokens.init({
    appInfo: {
        appName: "example",
        apiDomain: `http://${process.env.REACT_APP_HOSTNAME}:8000`,
        websiteDomain: `http://${process.env.REACT_APP_HOSTNAME}:3000`,
        apiBasePath: "/auth",
        websiteBasePath: "/auth",
    },
    recipeList: [
        EmailPassword.init(),
        Session.init()
    ]
});

export const urqlClient = createClient({
    url: `http://${process.env.REACT_APP_HOSTNAME}:8000/graphql`,
    exchanges: [...defaultExchanges]
});
