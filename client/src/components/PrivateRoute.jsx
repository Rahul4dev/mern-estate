import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
  const currentUser = useSelector((state) => state.user.user.currentUser);
  //   console.log(currentUser);

  return currentUser &&
    currentUser.message !== 'User has been deleted' &&
    currentUser.message !== 'User has been signed out successfully!.' ? (
    <Outlet />
  ) : (
    <Navigate to={'/sign-in'} />
  );
};

export default PrivateRoute;
