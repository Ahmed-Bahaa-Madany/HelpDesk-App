import {
    Grid,
    Paper,
    TextField,
    Button,
    IconButton,
    InputAdornment
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { axiosInstance } from '../../network/axios';

export default function SignIn() {
    const [values, setValues] = useState({
        showPass: false
    });
    const emailPattern = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
    const [userForm, setUserForm] = useState({
        userEmail: '',
        password: ''
    });
    useEffect(() => { }, [userForm]);
    const [userFormErrors, setUserFormError] = useState({
        userEmailErr: null,
        passwordErr: null
    });

    const handlePassVisibility = () => {
        setValues({
            ...values,
            showPass: !values.showPass
        });
    };
    const handelFormChange = (e) => {
        if (e.target.name === 'userEmail') {
            setUserForm({
                ...userForm,
                userEmail: e.target.value
            });
            setUserFormError({
                ...userFormErrors,
                userEmailErr:
                    e.target.value.length === 0
                        ? 'this filed is requird'
                        : !emailPattern.test(e.target.value)
                            ? 'email not valid'
                            : null
            });
        } else if (e.target.name === 'password') {
            setUserForm({
                ...userForm,
                password: e.target.value
            });
            setUserFormError({
                ...userFormErrors,
                passwordErr:
                    e.target.value.length === 0
                        ? 'this filed is requird'
                        : e.target.value.length < 8
                            ? 'must be 8 char'
                            : null
            });
        }
    };

    const [massage, setMassage] = useState({
        text: '',
        state: ''
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.post('/login', userForm)
            if (res?.data) {
                setMassage({
                    text: 'Success Login',
                    state: 'success'
                });
                console.log('here');
                window.localStorage.setItem('auth', JSON.stringify(res.data));
                dispatch({
                    type: 'LOGGED_IN_USER',
                    payload: res.data
                });
                navigate('/dashboards/tickets');
            }
        } catch (err) {
            setMassage({
                text: err.response.data,
                state: 'failed'
            });
        }
    };

    return (
        <Paper elevation={2} sx={{ padding: 5 }}>
            <div
                style={{
                    color: massage.state === 'success' ? 'green' : 'red',
                    fontSize: '20px',
                    textAlign: 'center',
                    marginBottom: '20px'
                }}
            >
                {massage.text}
            </div>
            <form onSubmit={(e) => handleFormSubmit(e)}>
                <Grid container direction="column" spacing={2}>
                    <Grid item>
                        <TextField
                            type="email"
                            fullWidth
                            label="Enter your Email"
                            placeholder="Email Address"
                            variant="outlined"
                            onChange={(e) => handelFormChange(e)}
                            name="userEmail"
                            value={userForm.userEmail}
                            error={!!userFormErrors.userEmailErr}
                            helperText={userFormErrors.userEmailErr}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            type={values.showPass ? 'text' : 'password'}
                            fullWidth
                            label="Enter your password"
                            placeholder="password"
                            variant="outlined"
                            onChange={(e) => handelFormChange(e)}
                            name="password"
                            value={userForm.password}
                            error={!!userFormErrors.passwordErr}
                            helperText={userFormErrors.passwordErr}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password"
                                            edge="end"
                                            onClick={handlePassVisibility}
                                        >
                                            {values.showPass ? (
                                                <VisibilityIcon />
                                            ) : (
                                                <VisibilityOffIcon />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={
                                !!userFormErrors.userEmailErr || !!userFormErrors.passwordErr
                            }
                        >
                            SIGN IN
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
}
