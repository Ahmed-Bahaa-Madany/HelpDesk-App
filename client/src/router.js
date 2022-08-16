import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';

const Loader = (Component) => (props) =>
(
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

// Pages

const Login = Loader(lazy(() => import('src/content/login')));

// Dashboards

const Tickets = Loader(lazy(() => import('src/content/tickets')));
const AddTickets = Loader(lazy(() => import('src/content/tickets/AddTickets')));
const EditTicket = Loader(lazy(() => import('src/content/tickets/EditTicket')));
const TicketReplies = Loader(lazy(() => import('src/content/tickets/TicketReplies')));
const UserSettings = Loader(lazy(() => import('src/content/users/index')));
const AddUser = Loader(lazy(() => import('src/content/users/AddUser')));
const EditUser = Loader(lazy(() => import('src/content/users/EditUser')));

// Status

const Status404 = Loader(
  lazy(() => import('src/content/Status404'))
);

const routes = [
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <Login />
      },
      {
        path: 'Login',
        element: <Navigate to="/" replace />
      },
      {
        path: 'status',
        children: [
          {
            path: '',
            element: <Navigate to="404" replace />
          }
        ]
      },
      {
        path: '*',
        element: <Status404 />
      }
    ]
  },
  {
    path: 'dashboards',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="tickets" replace />
      },
      {
        path: 'tickets',
        element: <Tickets />
      },
      {
        path: 'addTickets',
        element: <AddTickets />
      },
      {
        path: 'editTicket/:id',
        element: <EditTicket />
      },
      {
        path: 'ticketReplies/:id',
        element: <TicketReplies />
      },
      {
        path: 'users',
        element: <UserSettings />
      },
      {
        path: 'addUser',
        element: <AddUser />
      },
      {
        path: 'editUser/:id',
        element: <EditUser />
      }
    ]
  }
];

export default routes;
