import {
    Grid,
    Paper,
    Button
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { axiosInstance } from "../../network/axios";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function EditTicket() {
    const { auth } = useSelector((state) => ({ ...state }));
    const params = useParams();
    const [ticket, setTicket] = useState({
        state: "",
        ticketId: "",
        title: "",
        userId: ""
    });

    useEffect(async () => {
        await axiosInstance.get(`/ticket/${params.id}`)
            .then((res) => {
                console.log(res.data)
                setTicket(res.data)
            })
            .catch((err) => console.log(err));
    }, [])

    const handelFormChange = (e) => {
        if (e.target.name === 'state') {
            setTicket({
                ...ticket,
                state: e.target.value
            });
        }
    }

    // Send form Data or create New user
    const [massage, setMassage] = useState({
        text: "",
        state: ""
    })

    const navigate = useNavigate()
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance
                .patch(`/tickets/${params.id}`, ticket, {
                    headers: { authorization: auth.token }
                })
            setMassage({
                text: "Edit Ticket Success",
                state: "success"
            })
            setTimeout(() => {
                navigate("/dashboards/tickets")
            }, 2000)
        }
        catch (err) {
            setMassage({
                text: err.response.data,
                state: "failed"
            })
        }
    };

    return (
        <Paper elevation={2} sx={{ padding: 5 }}>
            <div style={{ color: massage.state === "success" ? "green" : "red", fontSize: "20px", textAlign: "center", marginBottom: "20px" }}>
                {massage.text}
            </div>
            <form onSubmit={(e) => handleFormSubmit(e)}>
                < Grid container direction="column" spacing={2}>
                    <Grid item>
                        <FormControl>
                            <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="state"
                                value={ticket.state}
                                onChange={(e) => handelFormChange(e)}
                            >
                                <FormControlLabel value="pending" control={<Radio />} label="pending" />
                                <FormControlLabel value="active" control={<Radio />} label="active" />
                                <FormControlLabel value="closed" control={<Radio />} label="closed" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <Button
                            fullWidth
                            variant="contained"
                            type="submit">
                            Edit Ticket
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
}

