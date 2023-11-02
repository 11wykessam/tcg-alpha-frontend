import React, {ReactElement, useState} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {setToken} from "../app/appSlice";
import {AuthApiClient} from "../api/auth/AuthApiClient";

interface LoginProps {
    authAPIClient: AuthApiClient
}

function Login({
                   authAPIClient
               }: LoginProps): ReactElement {

    const [validated, setValidated] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const dispatch = useDispatch();

    function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value);
    }

    function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }

    function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>): void {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();

        if (form.checkValidity()) {
            authAPIClient.login({
                username: email,
                password: password
            })
                .then((response) => {
                    dispatch(setToken(response.token));
                })
        }

        setValidated(true);
    }

    return (
        <div>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        Email
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control
                            plaintext
                            defaultValue="email@example.com"
                            required
                            onChange={handleEmailChange}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        Password
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            required
                            onChange={handlePasswordChange}
                        />
                    </Col>
                </Form.Group>
                <Button type="submit">Submit form</Button>
            </Form>
        </div>
    )
}

export default Login;