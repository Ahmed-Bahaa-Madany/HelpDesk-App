import './index.css';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { Tooltip, IconButton, useTheme } from '@mui/material';
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
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

export default function index() {
  const theme = useTheme();
  const { auth } = useSelector((state) => ({ ...state }));
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(async () => {
    await axiosInstance
      .get('/admin/users', {
        headers: { authorization: auth.token }
      })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDeleteUser = async (id) => {
    await axiosInstance.delete(`/admin/users/${id}`, {
      headers: { authorization: auth.token }
    });
    setOpen(false);
    window.location.reload(false);
  };


  return (
    <>
      <Box className="title-box">
        <Container maxWidth="md">
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h3" component="h3" gutterBottom>
                Users Management
              </Typography>
            </Grid>
            <Grid item>
              <Button
                sx={{ mt: { xs: 2, md: 0 } }}
                variant="contained"
                href="/dashboards/addUser"
                startIcon={<AddTwoToneIcon fontSize="small" />}
              >
                Add New User
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Container maxWidth="md">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell align="center">Username</TableCell>
                <TableCell align="center">Role</TableCell>
                <TableCell align="right">Edit</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.userEmail}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {user.userEmail}
                  </TableCell>
                  <TableCell align="center">{user.userName}</TableCell>
                  <TableCell align="center">{user.role}</TableCell>
                  <TableCell align="right">
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
                        href={`/dashboards/editUser/${user._id}`}
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Delete Order" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => setOpen(true)}
                      // onClick={() => handleDeleteUser(user._id)}
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <Modal
                    open={open}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography
                        id="modal-modal-title"
                        variant="h3"
                        component="h2"
                      >
                        Are you sure to delete this user ?
                      </Typography>
                      <Typography align='right'>
                        <Button
                          variant="outlined"
                          onClick={() => handleDeleteUser(user._id)}
                        >
                          yes
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => setOpen(false)}

                        >
                          No
                        </Button>
                      </Typography>
                    </Box>
                  </Modal>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
