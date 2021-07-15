import React from 'react';
import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'
import { Container } from 'react-bootstrap'
import PrivateRoute from './PrivateRoute'
import Dashboard from './Dashboard.js'
import Login from './Login.js'
import Signup from "./Signup"
import { AuthProvider } from '../contexts/AuthContext'
import { Create } from './Create.js'
import ForgotPassword from './ForgotPassword';
import { Read } from './Read.js';

export const App = () => (
  <Container className="d-flex  align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
    <div className="w-100" style={{ maxWidth: '400px' }}>
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute exact path="/create" component={Create} />
            <PrivateRoute exact path="/read" component={Read} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/forgot-password" component={ForgotPassword} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  </Container>
);
