import {Payload, ReactiveSocket} from "rsocket-types";
import {toMetadata} from "./Metadata";
import {toBuffer} from "rsocket-core";

export interface ApiClient {
    requestResponse: <T, U>(route: string, message: T, auth?: string | undefined) => Promise<ResponseEntity<U>>;
}

export interface ResponseEntity<T> {
    body: T;
    statusCodeValue: number;
    statusCode: string;
}

function createAPIClient(rSocket: ReactiveSocket<any, any>): ApiClient {

    function requestResponse<T, U>(
        route: string,
        message: T,
        auth: string | undefined = undefined
    ): Promise<ResponseEntity<U>> {
        return new Promise((resolve, reject) => {
            rSocket.requestResponse({
                metadata: toMetadata(route, auth),
                data: toBuffer(JSON.stringify(message))
            })
                .subscribe({
                    onComplete: (payload: Payload<any, any>) => {
                        resolve(JSON.parse(payload.data.toString()));
                    },
                    onError: (error: Error) => {
                        reject(error);
                    }
                });
        })
    }

    return {
        requestResponse
    }

}

export default createAPIClient;