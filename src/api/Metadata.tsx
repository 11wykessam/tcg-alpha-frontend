import {Buffer} from "buffer";
import {
    encodeAndAddCustomMetadata,
    encodeBearerAuthMetadata,
    encodeRoute,
    MESSAGE_RSOCKET_AUTHENTICATION,
    MESSAGE_RSOCKET_ROUTING
} from "rsocket-core";

export function toMetadata(route: string, auth: string | undefined = undefined) {
    let metadata: Buffer = Buffer.alloc(0);
    metadata = encodeAndAddCustomMetadata(
        metadata,
        MESSAGE_RSOCKET_ROUTING.string,
        encodeRoute(route)
    );
    if (auth) {
        metadata = encodeAndAddCustomMetadata(
            metadata,
            MESSAGE_RSOCKET_AUTHENTICATION.string,
            encodeBearerAuthMetadata(auth)
        );
    }
    return metadata;
}