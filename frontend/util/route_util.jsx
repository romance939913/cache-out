import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Redirect } from 'react-router-dom';

const Auth = ({ component: Component, path, loggedIn, exact }) => (
    <Route
        path={path}
        exact={exact}
        render={props =>
            !loggedIn ? <Component {...props} /> : <Redirect to="/feed" />
        }
    />
);

const ProtectedAuth = ({ component: Component, path, loggedIn, exact }) => (
    <Route
        path={path}
        exact={exact}
        render={props =>
            loggedIn ? <Component {...props} /> : <Redirect to="/" />
        }
    />
);


const mSTP = state => {
    return { loggedIn: Boolean(state.session.id) };
};

export const AuthRoute = withRouter(connect(mSTP,null)(Auth));
export const ProtectedRoute = withRouter(connect(mSTP, null)(ProtectedAuth));