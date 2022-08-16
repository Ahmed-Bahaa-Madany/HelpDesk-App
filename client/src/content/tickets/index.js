import './index.css'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container, Grid } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import Button from '@mui/material/Button';
import { Typography, Box } from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { axiosInstance } from '../../network/axios';
import { Tooltip, IconButton, useTheme } from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import moment from 'moment';


export default function index() {
  const theme = useTheme();
  const { auth } = useSelector((state) => ({ ...state }));
  const [tickets, setTickets] = useState([]);
  useEffect(async () => {
    if (auth.role === "customer") {
      await axiosInstance
        .get(`/tickets/${auth.userId}`)
        .then((res) => {
          setTickets(res.data)
        })
        .catch((err) => console.log(err));
    } else {
      await axiosInstance
        .get("/tickets")
        .then((res) => {
          setTickets(res.data)
        })
        .catch((err) => console.log(err));
    }
  }, [])

  const momentAgo = (date) => {
    const timeAgo = moment(date).fromNow();
    return timeAgo
  }

  return (
    <>
      <Box className='title-box'>
        <Container maxWidth="lg">
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h3" component="h3" gutterBottom>
                Tickets Management
              </Typography>
            </Grid>
            <Grid item>
              <Button
                sx={{ mt: { xs: 2, md: 0 } }}
                variant="contained"
                href='/dashboards/addTickets'
                startIcon={<AddTwoToneIcon fontSize="small" />}
              >
                Add New Ticket
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Container maxWidth="lg">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Ticket ID</TableCell>
                <TableCell align="center">Title</TableCell>
                <TableCell align="center">Customer</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Last Update</TableCell>
                <TableCell align="center">Reply</TableCell>
                {auth.role === "admin" && (
                  <TableCell align="center">Edit</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {tickets.map((ticket) => (
                <TableRow
                  key={ticket.ticketId}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {ticket.ticketId}
                  </TableCell>
                  <TableCell align="center" scope="row">
                    {ticket.title}
                  </TableCell>
                  <TableCell align="center" scope="row">
                    {ticket.userId.userName}
                  </TableCell>
                  <TableCell align="center" scope="row" className={ticket.state === 'pending' ? "color-yellow" : ticket.state === 'active' ? "color-green" : "color-red"}>
                    {ticket.state}
                  </TableCell>
                  <TableCell align="center">{momentAgo(ticket.updatedAt)}</TableCell>
                  <TableCell align="center">
                    <Button variant="contained" href={`/dashboards/ticketReplies/${ticket._id}`} disabled={ticket.state === "pending" || ticket.state === "closed"}>
                      Replies
                    </Button>
                  </TableCell>
                  {auth.role === "admin" && (
                    <TableCell align="center">
                      <Tooltip title="Edit Order" arrow>
                        <IconButton
                          sx={{
                            '&:hover': {
                              background: theme.colors.primary.lighter
                            },
                            color: theme.palette.primary.main
                          }}
                          color="inherit"
                          size="small"
                          href={`/dashboards/editTicket/${ticket._id}`}
                        >
                          <EditTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  )
}

