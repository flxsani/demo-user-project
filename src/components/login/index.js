import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Button, Card, CardActions, CardContent, CardHeader, InputAdornment, Snackbar, TextField } from "@mui/material";
import { useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import UserActions from "../../actions/user-actions";
import ApiService from '../../utils/api';

import './login.css';

const initialState = {
    email: '',
    password: '',
    isButtonDisabled: true,
    inputErrors: {
        emailValidationText: '',
        passwordValidationText: ''
    }
};

function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userInfo = useSelector((state) => state.usersData);
    const [loginState, setLoginState] = useState(initialState);
    const [loginError, setError] = useState({ error: true, errorMessage: '' });
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        let tempState = { ...loginState };
        if (loginState.email.trim().length > 3 && loginState.password.trim().length > 3) {
            tempState.isButtonDisabled = false;
        } else {
            tempState.isButtonDisabled = true;
        }
        // console.log("LoginState::", tempState);
        setLoginState(tempState);
    }, [loginState.email, loginState.password]);

    useEffect(() => {
        if (userInfo.error) {

            setError({ error: true, errorMessage: userInfo.errorMessage });
        }
    }, [userInfo.error]);

    useEffect(() => {
        if (userInfo.user?.token) {

            // navigate to user list component;
            console.log("NavigateToUserList::", userInfo.user.token || '');
            navigate('/profile');

        }
    }, [userInfo.user]);


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        let errors = { ...loginState.inputErrors };
        const validEmailRegex = new RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
        switch (name) {
            case 'email':
                errors.emailValidationText =
                    // value.match(validEmailRegex)
                    !validEmailRegex.test(value)
                        ? 'Please enter a valid email!'
                        : '';

                console.log("EMAILALLALLL::", validEmailRegex.test(value))
                break;
            case 'password':
                errors.passwordValidationText =
                    !value || value.length <= 0
                        ? 'Password is mandatory!'
                        : value.length < 4 ? 'Password must be min 3 characters long!' : '';
                break;
        }
        let tmpState = { ...loginState, [name]: value, inputErrors: errors };

        setLoginState(tmpState);
    };

    const handleKeyPress = (event) => {
        if (event.keyCode === 13 || event.which === 13) {
            loginState.isButtonDisabled || handleLogin();
        }
    };


    const handleLogin = async () => {

        let payload = {
            email: loginState.email,
            password: loginState.password
        }
        let userList = UserActions.userLogin(dispatch, payload);
        console.log("UserList::", userList);
    };


    const handleErrorClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setError({ error: false, errorMessage: '' });
    };

    const ErrorContainer = () => {
        // console.log("InErrorContainer::", loginError);
        return (
            <div>
                {loginError.errorMessage !== '' ?
                    <Snackbar
                        open={loginError.error}
                        autoHideDuration={6000}
                        message={loginError.errorMessage}
                        onClose={handleErrorClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    />
                    : null
                }
            </div>
        );
    };

    const changePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const renderLoginConponent = () => {
        return (
            <>
                <form className="container" noValidate autoComplete="off">
                    <Card className="card">
                        <CardHeader className="header" title="User Login" />
                        <CardContent>
                            <div>
                                <TextField
                                    error={loginState.inputErrors.emailValidationText !== ''}
                                    fullWidth
                                    id="email"
                                    name="email"
                                    type="email"
                                    label="Email"
                                    placeholder="test@email.com"
                                    margin="normal"
                                    onChange={handleInputChange}
                                    onKeyPress={handleKeyPress}
                                    helperText={loginState.inputErrors.emailValidationText}
                                />
                                <TextField
                                    error={loginState.inputErrors.passwordValidationText !== ''}
                                    fullWidth
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    label="Password"
                                    placeholder="Password"
                                    margin="normal"
                                    helperText={loginState.inputErrors.passwordValidationText}
                                    onChange={handleInputChange}
                                    onKeyPress={handleKeyPress}

                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end" onClick={changePasswordVisibility}>
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>
                        </CardContent>
                        <CardActions>
                            <Button
                                variant="contained"
                                size="large"
                                color="secondary"
                                className="loginBtn"
                                onClick={handleLogin}
                                disabled={loginState.isButtonDisabled}>
                                Login
                            </Button>
                        </CardActions>
                        <div className="text-center">Don't have account? <Link to="/register">Register now.</Link></div>
                    </Card>
                </form>

            </>
        )
    }

    return (
        <>
            {renderLoginConponent()}
            {/* {userInfo.error ? showError(userInfo.errorMessage) : null} */}
            <ErrorContainer />
        </>

    );
}

export default Login;