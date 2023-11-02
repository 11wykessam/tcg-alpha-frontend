import {ApiClient} from "../ApiClient";
import {LoginRequestV1, LoginResponseV1} from "./authTypes";
import {LOGIN} from "../endpoints";

export interface AuthApiClient {
    login: (loginRequest: LoginRequestV1) => Promise<LoginResponseV1>
}

function createAuthApiClient(apiClient: ApiClient): AuthApiClient {

    function login(loginRequest: LoginRequestV1): Promise<LoginResponseV1> {
        return apiClient.requestResponse<LoginRequestV1, LoginResponseV1>(LOGIN, loginRequest);
    }

    return {
        login
    };

}

export default createAuthApiClient;