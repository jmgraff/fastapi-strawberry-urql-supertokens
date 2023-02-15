import { Provider } from "urql";
import { urqlClient } from "./utils";
import { BrowserRouter } from "react-router-dom";

import { SuperTokensWrapper } from "supertokens-auth-react";

import Main from "./Main";


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
