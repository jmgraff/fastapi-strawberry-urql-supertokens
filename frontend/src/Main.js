import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import { signOut } from "supertokens-auth-react/recipe/emailpassword";
import { SessionAuth, useSessionContext } from 'supertokens-auth-react/recipe/session';
import {
    Routes,
    Route,
    Link,
    useNavigate,
} from "react-router-dom";
import * as reactRouterDom from "react-router-dom";

import HomePage from "./HomePage";

export default function Main() {
    const {loading, doesSessionExist} = useSessionContext();
    const navigate = useNavigate();
    const onSignOut = async () => {
        await signOut();
        navigate("/auth");
    }

    return (
        <div id="main">
            <div id="menu">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li>
                        { !loading &&
                            doesSessionExist
                                ? <button onClick={onSignOut}>Sign Out</button>
                                : <Link to="/auth">Sign In</Link>
                        }
                    </li>
                </ul>
            </div>
            <Routes>
                    <Route path="/" element={
                        <SessionAuth>
                            <HomePage />
                        </SessionAuth>
                    } />
                {getSuperTokensRoutesForReactRouterDom(reactRouterDom)}
            </Routes>
        </div>
    );
}
