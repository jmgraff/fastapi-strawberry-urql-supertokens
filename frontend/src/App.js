import { Provider } from "urql";
import { urqlClient } from "./utils";
import { BrowserRouter } from "react-router-dom";

import SuperTokens from "supertokens-auth-react";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";
import { SuperTokensWrapper } from "supertokens-auth-react";

import Main from "./Main";

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


function App() {
    return (
        <SuperTokensWrapper>
            <Provider value={urqlClient}>
                <BrowserRouter>
                    <Main />
                </BrowserRouter>
            </Provider>
        </SuperTokensWrapper>
    );
}

export default App;
