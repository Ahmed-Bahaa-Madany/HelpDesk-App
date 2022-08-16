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
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { axiosInstance } from '../../network/axios';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function AddUser() {
    // patterns
    const emailPattern = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/
    const namePattern = /^[a-z]*$/
    const passPattern = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/
    const [userForm, setUserForm] = useState({
        userName: '',
        userEmail: '',
        password: '',
        confirmPass: '',
        role: "customer"
    });

    const [userFormErrors, setUserFormError] = useState({
        userNameErr: null,
        userEmailErr: null,
        passwordErr: null,
        confirmPassErr: null
    });
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
                        ? 'this filed is required'
                        : !emailPattern.test(e.target.value)
                            ? 'email not valid'
                            : null
            });
        } else if (e.target.name === 'userName') {
            setUserForm({
                ...userForm,
                userName: e.target.value
            });
            setUserFormError({
                ...userFormErrors,
                userNameErr:
                    e.target.value.length === 0
                        ? 'this filed is required'
                        : !namePattern.test(e.target.value)
                            ? 'No space, no Uppercase and no numbers'
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
                        ? 'this filed is required'
                        : !passPattern.test(e.target.value)
                            ? 'password length not less than 8 characters , contains at least one uppercase and at least one sign like "@-$-*-&" '
                            : null
            });
        } else if (e.target.name === 'confirmpassword') {
            setUserForm({
                ...userForm,
                confirmPass: e.target.value
            });
            setUserFormError({
                ...userFormErrors,
                confirmPassErr:
                    e.target.value.length === 0
                        ? 'this filed is required'
                        : e.target.value !== userForm.password
                            ? "Doesn't Match"
                            : null
            });
        } else if (e.target.name === 'role') {
            setUserForm({
                ...userForm,
                role: e.target.value
            });
        };
    };

    // Send form Data or create New user
    const [massage, setMassage] = useState({
        text: "",
        state: ""
    })
    const navigate = useNavigate()
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/register', userForm)
            setMassage({
                text: "Register Success Please Login",
                state: "success"
            })
            setTimeout(() => {
                navigate("/dashboards/users")
            }, 2000)
        }
        catch (err) {
            setMassage({
                text: err.response.data,
                state: "failed"
            })
        }
    };

    // password Visibility
    const [values, setValues] = useState({
        showPass: false
    });
    const handlePassVisibility = () => {
        setValues({
            showPass: !values.showPass
        });
    };

    return (
        <Paper elevation={2} sx={{ padding: 5 }}>
            <div style={{ color: massage.state === "success" ? "green" : "red", fontSize: "20px", textAlign: "center", marginBottom: "20px" }}>
                {massage.text}
            </div>
            <form onSubmit={(e) => handleFormSubmit(e)}>
                <Grid container direction="column" spacing={2}>
                    <Grid item>
                        <TextField
                            type="text"
                            fullWidth
                            label="Enter your Username"
                            placeholder="Username"
                            variant="outlined"
                            name="userName"
                            value={userForm.userName}
                            aria-describedby="userName"
                            error={!!userFormErrors.userNameErr}
                            helperText={userFormErrors.userNameErr}
                            onChange={(e) => handelFormChange(e)}
                        />
                    </Grid>
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
                        <TextField
                            type={values.showPass ? 'text' : 'password'}
                            fullWidth
                            label="confirm password"
                            placeholder="confirm password"
                            variant="outlined"
                            onChange={(e) => handelFormChange(e)}
                            name="confirmpassword"
                            value={userForm.confirmPass}
                            error={!!userFormErrors.confirmPassErr}
                            helperText={userFormErrors.confirmPassErr}
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
                        <FormControl>
                            <FormLabel id="demo-controlled-radio-buttons-group">Role</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="role"
                                value={userForm.role}
                                onChange={(e) => handelFormChange(e)}
                            >
                                <FormControlLabel value="customer" control={<Radio />} label="Customer" />
                                <FormControlLabel value="agent" control={<Radio />} label="Agent" />
                                <FormControlLabel value="admin" control={<Radio />} label="Admin" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <Button
                            fullWidth
                            variant="contained"
                            type="submit"
                            disabled={
                                !!userFormErrors.userNameErr ||
                                !!userFormErrors.userEmailErr ||
                                !!userFormErrors.passwordErr ||
                                !!userFormErrors.confirmPassErr ||
                                !!userFormErrors.roleErr
                            }>
                            SIGN UP
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
}

