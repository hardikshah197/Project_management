import { Button, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { actionTypes } from '../auth/reducer';
import { useStateValue } from '../application/state-provider';
import { authService } from '../application/services';
import { ROUTES } from '../application/constants';

const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [, dispatch] = useStateValue();
    const history = useHistory();

    const signInWithGoogle = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            // const result = await auth.signInWithPopup(provider);
            dispatch({
                type: actionTypes.SET_USER,
                // user: result.user,
            });
            history.push(ROUTES.BOARDS);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const onFinish = async () => {
        try {
            setLoading(true);
            await authService.signInWithEmailAndPassword(email, password);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    return (
        <div>
            <h1 className={`text-xl mb-3 text-center`}>Sign In</h1>

            <Form onFinish={onFinish}>
                <Form.Item name="email">
                    <Input
                        prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Email"
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </Form.Item>

                <Form.Item name="password">
                    <Input
                        prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        onChange={(event) => setPassword(event.target.value)}
                        type="password"
                        placeholder="Password"
                    />

                    <div className={`text-red-500`}>{error}</div>
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className={`w-full my-2`}
                        disabled={loading}
                    >
                        Sign in
                    </Button>
                    <Button
                        type="danger"
                        htmlType="submit"
                        className={`w-full mb-2`}
                        onClick={signInWithGoogle}
                        disabled={loading}
                    >
                        Continue with Google
                    </Button>
                    <p>
                        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
                    </p>
                </Form.Item>
            </Form>
        </div>
    );
};

export const SignInPage = ({ history }) => (
    <div className={`flex h-full`}>
        <div className={`w-64 m-auto`}>
            <SignInForm history={history} />
        </div>
    </div>
);
