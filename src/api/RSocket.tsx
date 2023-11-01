import RSocketWebSocketClient from "rsocket-websocket-client";
import {BufferEncoders, MESSAGE_RSOCKET_COMPOSITE_METADATA, RSocketClient} from 'rsocket-core';
import {Simulate} from "react-dom/test-utils";
import {ReactiveSocket} from "rsocket-types";

function urlFromLocation() {
    const port = window.location.port === '3000' ? `:${8080}` : `:${window.location.port}`;
    const isSecure = window.location.protocol === 'https:';
    const hostname = window.location.hostname;
    return `${isSecure ? 'wss' : 'ws'}://${hostname}${port}/rsocket`;
}

export function connect(): Promise<ReactiveSocket<any, any>> {
    console.log('connecting');
    const rSocketClient = new RSocketClient({
        setup: {
            keepAlive: 30000,
            lifetime: 90000,
            dataMimeType: 'application/json',
            metadataMimeType: MESSAGE_RSOCKET_COMPOSITE_METADATA.string
        },
        transport: new RSocketWebSocketClient({
            url: urlFromLocation()
        }, BufferEncoders)
    });
    return new Promise((resolve, reject) => {
        rSocketClient.connect()
            .subscribe({
                onComplete(rSocket) {
                    console.log('connected');
                    resolve(rSocket);
                },
                onError(error) {
                    console.log(error);
                    reject(error);
                }
            })
    })
}