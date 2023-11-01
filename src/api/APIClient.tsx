import {ReactiveSocket} from "rsocket-types";

interface APIClient {
    sendMessage: (message: string) => void;
}

function APIClient(rSocket: ReactiveSocket<any, any>): APIClient {

    function sendMessage(message: string): void {
        console.log(message);
    }

    return {
        sendMessage
    }

}

export default APIClient;