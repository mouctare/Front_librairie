import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory, Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { LoginPage } from './pages/login/LoginPage';
import { RegisterPage } from './pages/register/RegisterPage';
import { ProfilePage } from './pages/profile/ProfilePage';
import { HomePage } from './pages/home/HomePage';
import { NotFound } from './pages/errors/NotFound';
import { Unauthorized } from './pages/errors/Unauthorized';

import AuthGuard from './guards/AuthGuard';
import { Role } from './models/role';

import UserService from './services/user.service';
import { useDispatch, useSelector } from 'react-redux';
import { clearCurrentUser } from './store/actions/user';
import ListBooks from './pages/ListBooks';


function Content() {
    const history = useHistory();
    //const [currentUser, setCurrentUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user);

    /*
    useEffect(() => {
        UserService.currentUser.subscribe(data => {
            setCurrentUser(data);
        });
    }, []);

     */

    const logout = () => {
        UserService.logOut()
            .then(
                data => {
                    dispatch(clearCurrentUser());
                    history.push('/login');
                },
                error => {
                    setErrorMessage('Unexpected error occurred.');
                },
            );
    }

        return (
            <div>
                <div>
                    {currentUser &&
                    <nav className="navbar navbar-expand navbar-dark bg-dark">
                        
                        <div className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/home">
                                    <span className="fa fa-home"/>
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/allBooks">
                                    
                                    Catalogue
                                </Link>
                            </li>
                        </div>
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/profile">
                                    <span className="fa fa-user"/>
                                    {currentUser.name}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="#" onClick={() => logout()}>
                                    <span className="fa fa-sign-out"/>
                                    LogOut
                                </Link>
                            </li>
                        </div>
                    </nav>
                    }
                </div>

                <div>
                    {!currentUser &&
                    <nav className="navbar navbar-expand navbar-dark bg-dark">
                    
                        <div className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" href="/home">
                                    <span className="fa fa-home"/>
                                    Home
                                </Link>
                            </li>
                        </div>
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">
                                    <span className="fa fa-user-plus"/>
                                    &nbsp;
                                    Register
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">
                                    <span className="fa fa-sign-in"/>
                                    Login
                                </Link>
                            </li>
                        </div>
                    </nav>
                    }
                </div>
            </div>
        );

    }

    
    function App() {
        return (
            <Router>
                <Content/>
                <div className="container">
                    <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/allBooks" component={ListBooks}/>
                        {/* <Route exact path="/" component={LoginPage}/> */}
                        <Route exact path="/login" component={LoginPage}/>
                        <Route exact path="/register" component={RegisterPage}/>
                        <AuthGuard
                            path="/profile"
                            roles={[Role.ADMIN, Role.USER]}
                            component={ProfilePage}/>
                        {/* <AuthGuard
                            path="/home"
                            roles={[Role.ADMIN]}
                            component={HomePage}/>
                        <Route exact path="/404" component={NotFound}/>
                        <Route exact path="/401" component={Unauthorized}/>
                        <Redirect from="*" to="/404"/> */}
                    </Switch>
                </div>
            </Router>
        );
    }



    export default App;
