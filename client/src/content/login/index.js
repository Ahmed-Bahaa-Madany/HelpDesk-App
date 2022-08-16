import { Helmet } from 'react-helmet-async';
import { Box, styled } from '@mui/material';
import { Container, Grid, Tab } from '@mui/material';
import { useState } from 'react';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import SignIn from './SignIn';
import SignUp from './SignUp';


const OverviewWrapper = styled(Box)(
  () => `
    overflow: auto;
    flex: 1;
    overflow-x: hidden;
    align-items: center;
`
);

export default function Login() {

  const [value, setValue] = useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <OverviewWrapper>
      <Helmet>
        <title>Help Desk App</title>
      </Helmet>
      <Container maxWidth="sm">
        <Grid
          container
          direction="column"
          justifyContent="center"
          style={{ minHeight: '100vh' }}
        >
          <Box>
            <h2>Note</h2>
            <h3>Email: admin@a.com - PW: Admin@123</h3>
            <h3>Email: agent@a.com - PW: Agent@123</h3>
            <h3>Email: customer@a.com - PW: Customer@123</h3>
          </Box>
          <Box>
            <TabContext value={value}>
              <Box>
                <TabList
                  onChange={handleChange}
                  variant="fullWidth"
                  aria-label="lab API tabs example"
                >
                  <Tab label="SIGN IN" value="1" />
                  <Tab label="SIGN UP" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <SignIn />
              </TabPanel>
              <TabPanel value="2">
                <SignUp />
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>
      </Container>
    </OverviewWrapper>
  );
}

