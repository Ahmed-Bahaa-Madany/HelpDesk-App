import { useRef, useState } from 'react';

import {
  Box,
  Button,
  Divider,
  Hidden,
  Popover,
  styled
} from '@mui/material';

import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const UserBoxButton = styled(Button)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);


function HeaderUserbox() {

  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { auth } = useSelector((state) => ({ ...state }));
  const userName = auth.userEmail

  const dispatch = useDispatch()
  const logout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null
    })
    window.localStorage.removeItem("auth")
  }

  return (
    <>
      <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
        <Hidden mdDown>
          <UserBoxText>
            {userName}
          </UserBoxText>
        </Hidden>
        <Hidden smDown>
          <ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
        </Hidden>
      </UserBoxButton>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuUserBox sx={{ minWidth: 210 }} display="flex">
          <UserBoxText>
            {userName}
          </UserBoxText>
        </MenuUserBox>
        <Divider />
        <Box sx={{ m: 1 }}>
          <Button color="primary" fullWidth>
            <LockOpenTwoToneIcon sx={{ mr: 1 }} />
            <Link style={{ textDecoration: "none" }} onClick={logout} to='/'>SIGN OUT</Link>
          </Button>
        </Box>
      </Popover>
    </>
  );
}

export default HeaderUserbox;
