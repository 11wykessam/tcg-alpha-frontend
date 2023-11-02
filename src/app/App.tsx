import React, {ReactElement, useEffect, useState} from 'react';
import {connect} from "../api/RSocket";
import createAPIClient, {ApiClient} from "../api/ApiClient";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./store";
import Login from "../auth/Login";
import createAuthApiClient from "../api/auth/AuthApiClient";

function App(): ReactElement {

    const [apiClient, setApiClient] = useState<ApiClient | undefined>(undefined);

    const token = useSelector((state: RootState) => state.app.token);
    const dispatch = useDispatch();

    useEffect(() => {
        connect()
            .then((reactiveSocket) => {
                setApiClient(createAPIClient(reactiveSocket));
            })
    }, []);

    function renderConnectionFailed(): ReactElement {
        return (
            <div>
                Connection Failed!
            </div>
        );
    }

    function renderMainContent(): ReactElement {
        return (
            <div>
                <p>
                    {token?.toString()}
                </p>
            </div>
        )
    }

    function renderContent() {
        if (apiClient !== undefined) {
            return token
                ? renderMainContent()
                : <Login authAPIClient={createAuthApiClient(apiClient)}/>
        } else return renderConnectionFailed();
    }

    return (
        <div className="App">
            {renderContent()}
        </div>
    );
}

export default App;
