import { Button, Card, CardActions, CardContent, CardHeader, InputAdornment, Snackbar, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import UserActions from "../../actions/user-actions";

import './registration.css';
import { Link } from "react-router-dom";

const initialState = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    isButtonDisabled: true,
    inputErrors: {
        firstNameValidationText: '',
        lastNameValidationText: '',
        emailValidationText: '',
        passwordValidationText: ''
    }
};

function Registration() {

    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.usersData);
    const [registerationState, setRegistrationState] = useState(initialState);
    const [registerationError, setError] = useState({ error: true, errorMessage: '' });
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        let tempState = { ...registerationState };
        if (registerationState.email.trim().length > 3 && registerationState.password.trim().length > 3) {
            tempState.isButtonDisabled = false;
        } else {
            tempState.isButtonDisabled = true;
        }
        // console.log("registerationState::", tempState);
        setRegistrationState(tempState);
    }, [registerationState.email, registerationState.password]);

    useEffect(() => {
        if (userInfo.error) {

            setError({ error: true, errorMessage: userInfo.errorMessage });
        }
    }, [userInfo.error]);

    useEffect(() => {
        if (userInfo.user?.id) {

            // navigate to user list component;
            console.log("NavigateToUserList::", userInfo.user || '');
        }
    }, [userInfo.user]);


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        let errors = { ...registerationState.inputErrors };
        const validEmailRegex = new RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
        switch (name) {
            case 'firstName':
                errors.firstNameValidationText =
                    !value || value.length <= 0
                        ? 'First Name is mandatory!'
                        : value.length < 3 ? 'First name must be min 3 characters long!' : "";
                break;

            case 'lastName':
                errors.lastNameValidationText =
                    !value || value.length <= 0
                        ? 'First Name is mandatory!'
                        : value.length < 3 ? 'Last name must be min 3 characters long!' : '';
                break;
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
        let tmpState = { ...registerationState, [name]: value, inputErrors: errors };

        setRegistrationState(tmpState);
    };

    const handleKeyPress = (event) => {
        if (event.keyCode === 13 || event.which === 13) {
            registerationState.isButtonDisabled || handleRegistration();
        }
    };


    const handleRegistration = async () => {

        let payload = {
            email: registerationState.email,
            password: registerationState.password,
            first_name: registerationState.firstName,
            last_name: registerationState.lastName,
            avatar: "https://reqres.in/img/faces/4-image.jpg",
        }
        UserActions.userRegistration(dispatch, payload);
        
    };


    const handleErrorClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setError({ error: false, errorMessage: '' });
    };

    const ErrorContainer = () => {

        return (
            <div>
                {registerationError.errorMessage !== '' ?
                    <Snackbar
                        open={registerationError.error}
                        autoHideDuration={6000}
                        message={registerationError.errorMessage}
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

    const renderRegisterConponent = () => {
        return (
            <>
                <form className="container" noValidate autoComplete="off">
                    <Card className="card">
                        <CardHeader className="header" title="User Registration" />
                        <CardContent>
                            <div>
                                <TextField
                                    error={registerationState.inputErrors.firstNameValidationText !== ''}
                                    fullWidth
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    label="First Name"
                                    placeholder=""
                                    margin="normal"
                                    onChange={handleInputChange}
                                    onKeyPress={handleKeyPress}
                                    helperText={registerationState.inputErrors.firstNameValidationText}
                                />

                                <TextField
                                    error={registerationState.inputErrors.lastNameValidationText !== ''}
                                    fullWidth
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    label="Last Name"
                                    placeholder=""
                                    margin="normal"
                                    onChange={handleInputChange}
                                    onKeyPress={handleKeyPress}
                                    helperText={registerationState.inputErrors.firstNameValidationText}
                                />

                                <TextField
                                    error={registerationState.inputErrors.emailValidationText !== ''}
                                    fullWidth
                                    id="email"
                                    name="email"
                                    type="email"
                                    label="Email"
                                    placeholder="test@email.com"
                                    margin="normal"
                                    onChange={handleInputChange}
                                    onKeyPress={handleKeyPress}
                                    helperText={registerationState.inputErrors.emailValidationText}
                                />
                                <TextField
                                    error={registerationState.inputErrors.passwordValidationText !== ''}
                                    fullWidth
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    label="Password"
                                    placeholder="Password"
                                    margin="normal"
                                    helperText={registerationState.inputErrors.passwordValidationText}
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
                                onClick={handleRegistration}
                                disabled={registerationState.isButtonDisabled}>
                                Register
                            </Button>
                        </CardActions>
                        <div className="text-center">Already have an account? <Link to="/">Login now.</Link></div>
                    </Card>
                </form>

            </>
        )
    }

    return (
        <>
            {renderRegisterConponent()}
            {/* {userInfo.error ? showError(userInfo.errorMessage) : null} */}
            <ErrorContainer />
        </>

    );
}

export default Registration;