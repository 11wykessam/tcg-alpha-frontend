import {ReactiveSocket} from "rsocket-types";
import {PayloadAction} from "@reduxjs/toolkit";

interface APIClient {
    sendMessage: (message: string) => Promise<PayloadAction<any, any>>;
}

function APIClient(rSocket: ReactiveSocket<any, any>): APIClient {

    function sendMessage(message: string): Promise<PayloadAction<any, any>> {
        return new Promise((resolve, reject) => {
            rSocket.requestResponse({
                metadata: String.fromCharCode('send.message'.length) + 'send.message',
                data: {message: message}
            })
                .subscribe({
                    onComplete: (payload) => {
                        console.log(payload.data);
                        resolve(payload.data.message)
                    },
                    onError: (error) => {
                        console.log(error);
                        reject(error);
                    }
                })
        });
    }

    return {
        sendMessage
    }

}

export default APIClient;