import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
import Loadable from 'ui-component/Loadable';
import { lazy } from 'react';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([AuthenticationRoutes, MainRoutes]);
}
