import React, { useEffect, useState } from 'react';
import { Grid } from '@geist-ui/react';
import { checkCookie } from '../../http/cookies';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from 'react-router-dom';

const Content = () => {
  // const [user, setUser] = useState(null);
  // let history = useLocation();

  // useEffect(() => {
  //   const checker = checkCookie('user');
  //   if (checker) {
  //     setUser(checker);
  //   } else {
  //     console.log(history);
  //   }
  // }, []);

  return <></>;
};

export default Content;
