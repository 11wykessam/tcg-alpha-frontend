import React, {ReactElement, useState} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {setToken} from "../app/appSlice";
import {AuthApiClient} from "../api/auth/AuthApiClient";
import {LoginResponseV1} from "../api/auth/authTypes";
import {ResponseEntity} from "../api/ApiClient";

interface LoginProps {
    authAPIClient: AuthApiClient
}

function Login({
                   authAPIClient
               }: LoginProps): ReactElement {

    const [validated, setValidated] = useState<boolean>(false);
    const [success, setSuccess] = useState(true);
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
                .then((response: ResponseEntity<LoginResponseV1>) => {
                    if (response.statusCodeValue == 200) {
                        dispatch(setToken(response.body.token));
                    } else {
                        setSuccess(false);
                    }
                })
        }
        setValidated(true);
    }

    return (
        <div style={{width: '500px', height: '40px'}}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2" style={{paddingRight: '15px'}}>
                        Email:
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control
                            defaultValue="email@example.com"
                            required
                            onChange={handleEmailChange}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="2" style={{paddingRight: '15px'}}>
                        Password:
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
                <Row>
                    <Col sm="10">
                        <Button type="submit">Login</Button>
                    </Col>
                    <Col sm="10">
                        <Form.Label>
                            {!success ? 'Invalid Credentials' : ''}
                        </Form.Label>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default Login;