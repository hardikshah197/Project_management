import React, { useEffect, useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { AuthUserContext } from './auth-user-context';
import { ROUTES } from '../application/constants';

export const withAuthentication = (Component) => (props) => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
       
    }, []);

    return (
        <AuthUserContext.Provider value={authUser}>
            <Component {...props} />
        </AuthUserContext.Provider>
    );
};

export const withAuthorization = (authCondition) => (Component) =>
    withRouter((props) => {
        useEffect(() => {
            
        }, [props.history]);
        const authUser = useContext(AuthUserContext);

        return authUser ? <Component {...props} /> : null;
    });
