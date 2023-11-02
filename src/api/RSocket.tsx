import RSocketWebSocketClient from "rsocket-websocket-client";
import {IdentitySerializer, JsonSerializer, RSocketClient} from 'rsocket-core';
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
        serializers: {
            data: JsonSerializer,
            metadata: IdentitySerializer
        },
        setup: {
            keepAlive: 30000,
            lifetime: 90000,
            dataMimeType: 'application/json',
            metadataMimeType: 'message/x.rsocket.routing.v0'
        },
        transport: new RSocketWebSocketClient({
            url: urlFromLocation()
        })
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