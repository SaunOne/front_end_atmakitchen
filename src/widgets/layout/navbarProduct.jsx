import { NavLink } from 'react-router-dom';
import routes from './routes'; 

const Sidebar = () => {
  return (
    <div>
      {routes.map((routeGroup) => (
        routeGroup.pages.map((route) => (
          <NavLink key={route.path} to={`/${route.layout}${route.path}`} activeClassName="font-bold">
            {route.icon}
            {route.name}
          </NavLink>
        ))
      ))}
    </div>
  );
};

export default Sidebar;
