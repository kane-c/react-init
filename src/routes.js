import About from 'components/About';
import Home from 'containers/Home';

const routes = [
  {
    component: Home,
    exact: true,
    path: '/',
  },
  {
    component: About,
    exact: true,
    path: '/about',
  },
];

export default routes;
