import { axiosInstance } from "../../network/axios";
import {
    Grid,
    Paper,
    TextField,
    Button
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

export default function AddTickets() {
    const { auth } = useSelector((state) => ({ ...state }));
    const [ticket, setTicket] = useState({
        title: '',
        state: 'pending',
        userId: auth.userId
    });
    const [ticketErrors, setTicketError] = useState({
        titleErr: null,
    });

    const handelFormChange = (e) => {
        if (e.target.name === 'title') {
            setTicket({
                ...ticket,
                title: e.target.value
            });
            setTicketError({
                ...ticketErrors,
                titleErr:
                    e.target.value.length === 0
                        ? 'this filed is required'
                        : null
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
            await axiosInstance.post('/ticket', ticket)
            setMassage({
                text: "Create Ticket Success",
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
                        <TextField
                            type="text"
                            fullWidth
                            label="Ticket Title"
                            placeholder="Enter Ticket Title"
                            variant="outlined"
                            name="title"
                            value={ticket.title}
                            aria-describedby="title"
                            error={!!ticketErrors.titleErr}
                            helperText={ticketErrors.titleErr}
                            onChange={(e) => handelFormChange(e)}
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            fullWidth
                            variant="contained"
                            type="submit"
                            disabled={!!ticketErrors.titleErr}>
                            Create Ticket
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
}

