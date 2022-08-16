import { axiosInstance } from "../../../../network/axios";
import { useContext, useEffect, useState } from 'react';
import {
  ListSubheader,
  alpha,
  Box,
  List,
  styled,
  Button,
  ListItem
} from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';
import { SidebarContext } from 'src/contexts/SidebarContext';
import BrightnessLowTwoToneIcon from '@mui/icons-material/BrightnessLowTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import { useSelector } from 'react-redux';

const MenuWrapper = styled(Box)(
  ({ theme }) => `
  .MuiList-root {
    padding: ${theme.spacing(1)};

    & > .MuiList-root {
      padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
    }
  }

    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      color: ${theme.colors.alpha.trueWhite[50]};
      padding: ${theme.spacing(0, 2.5)};
      line-height: 1.4;
    }
`
);

const SubMenuWrapper = styled(Box)(
  ({ theme }) => `
    .MuiList-root {

      .MuiListItem-root {
        padding: 1px 0;

        .MuiBadge-root {
          position: absolute;
          right: ${theme.spacing(3.2)};

          .MuiBadge-standard {
            background: ${theme.colors.primary.main};
            font-size: ${theme.typography.pxToRem(10)};
            font-weight: bold;
            text-transform: uppercase;
            color: ${theme.palette.primary.contrastText};
          }
        }
    
        .MuiButton-root {
          display: flex;
          color: ${theme.colors.alpha.trueWhite[70]};
          background-color: transparent;
          width: 100%;
          justify-content: flex-start;
          padding: ${theme.spacing(1.2, 3)};

          .MuiButton-startIcon,
          .MuiButton-endIcon {
            transition: ${theme.transitions.create(['color'])};

            .MuiSvgIcon-root {
              font-size: inherit;
              transition: none;
            }
          }

          .MuiButton-startIcon {
            color: ${theme.colors.alpha.trueWhite[30]};
            font-size: ${theme.typography.pxToRem(20)};
            margin-right: ${theme.spacing(1)};
          }
          
          .MuiButton-endIcon {
            color: ${theme.colors.alpha.trueWhite[50]};
            margin-left: auto;
            opacity: .8;
            font-size: ${theme.typography.pxToRem(20)};
          }

          &.active,
          &:hover {
            background-color: ${alpha(theme.colors.alpha.trueWhite[100], 0.06)};
            color: ${theme.colors.alpha.trueWhite[100]};

            .MuiButton-startIcon,
            .MuiButton-endIcon {
              color: ${theme.colors.alpha.trueWhite[100]};
            }
          }
        }

        &.Mui-children {
          flex-direction: column;

          .MuiBadge-root {
            position: absolute;
            right: ${theme.spacing(7)};
          }
        }

        .MuiCollapse-root {
          width: 100%;

          .MuiList-root {
            padding: ${theme.spacing(1, 0)};
          }

          .MuiListItem-root {
            padding: 1px 0;

            .MuiButton-root {
              padding: ${theme.spacing(0.8, 3)};

              .MuiBadge-root {
                right: ${theme.spacing(3.2)};
              }

              &:before {
                content: ' ';
                background: ${theme.colors.alpha.trueWhite[100]};
                opacity: 0;
                transition: ${theme.transitions.create([
    'transform',
    'opacity'
  ])};
                width: 6px;
                height: 6px;
                transform: scale(0);
                transform-origin: center;
                border-radius: 20px;
                margin-right: ${theme.spacing(1.8)};
              }

              &.active,
              &:hover {

                &:before {
                  transform: scale(1);
                  opacity: 1;
                }
              }
            }
          }
        }
      }
    }
`
);


function SidebarMenu() {
  const { auth } = useSelector((state) => ({ ...state }));
  const { closeSidebar } = useContext(SidebarContext);
  const [usersCount, setUsersCount] = useState([])
  const [ticketsCount, setTicketsCount] = useState([])
  useEffect(async () => {
    if (auth.role === 'admin') {
      await axiosInstance
        .get("/admin/userscount", {
          headers: { authorization: auth.token }
        })
        .then((res) => {
          setUsersCount(res.data)
        }
        )
        .catch((err) => console.log(err));
      await axiosInstance
        .get("/admin/ticketscount", {
          headers: { authorization: auth.token }
        })
        .then((res) => {
          setTicketsCount(res.data)
        }
        )
        .catch((err) => console.log(err));
    }
  }, [])

  return (
    <>
      <MenuWrapper>
        <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky style={{ fontSize: "25px", textAlign: "center" }}>
              HelpDesk
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/dashboards/tickets"
                  startIcon={<BrightnessLowTwoToneIcon />}
                >
                  Tickets Management
                </Button>
              </ListItem>
            </List>
            {auth.role === "admin" ?
              (<div>
                <List component="div">
                  <ListItem component="div">
                    <Button
                      disableRipple
                      component={RouterLink}
                      onClick={closeSidebar}
                      to="/dashboards/users"
                      startIcon={<AccountCircleTwoToneIcon />}
                    >
                      Account Management
                    </Button>
                  </ListItem>
                </List>
                <List component="div">
                  {usersCount.map((x) => (
                    <ListItem component="div" key={x._id}>
                      <Button disabled>
                        Number of Users : {x.count}
                      </Button>
                    </ListItem>
                  ))}
                </List>
                <List component="div">
                  {ticketsCount.map((y) => (
                    <ListItem component="div" key={y._id}>
                      <Button disabled>
                        Number of tickets : {y.count}
                      </Button>
                    </ListItem>
                  ))}
                </List>
              </div>) : null
            }
          </SubMenuWrapper>
        </List>
      </MenuWrapper>
    </>
  );
}

export default SidebarMenu;
