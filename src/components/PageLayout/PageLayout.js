import { Button, Grid, Page, Text, useMediaQuery } from '@geist-ui/react';
import { Activity, Moon, Sun } from '@geist-ui/react-icons';
import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Bar from '../Bar/Bar';

import Login from '../Login/Login';
import Registration from '../Registration/Registration';
import Home from '../Home/Home';
import Passport from '../Passport/Passport';
import FavColor from '../FavColor/FavColor';
import { checkCookie, setCookie } from '../../http/cookies';

const PageLayout = ({ switchThemes, themeType }) => {
  const isXS = useMediaQuery('xs', { match: 'down' });
  const history = useHistory();
  const [user, setUser] = useState(JSON.parse(checkCookie('user')));

  useEffect(() => {
    if (!user) {
      history.push('/login');
    }
  }, [history, user]);

  const handleLogOut = (e) => {
    e.preventDefault();
    setCookie('user', {}, -1);
    history.push('/login');
  };

  return (
    <Page>
      <Page.Header>
        <Bar
          left={
            <Text h4 style={{ margin: 0 }}>
              Karrtopelka
            </Text>
          }
          right={
            <>
              {user ? (
                <Button
                  style={{ marginRight: 15 }}
                  onClick={(e) => handleLogOut(e)}
                >
                  Log out
                </Button>
              ) : (
                <></>
              )}
              <Button
                type={themeType === 'light' ? 'success' : 'warning'}
                ghost
                iconRight={themeType === 'light' ? <Moon /> : <Sun />}
                auto
                size="small"
                onClick={switchThemes}
              />
            </>
          }
          switchThemes={switchThemes}
          themeType={themeType}
        />
      </Page.Header>
      <Page.Content>
        <Switch>
          <Route path="/login">
            <Login history={history} />
          </Route>
          <Route path="/registration">
            <Registration history={history} />
          </Route>
          <Route path="/passport">
            <Passport history={history} user={user} />
          </Route>
          <Route path="/favcolor">
            <FavColor history={history} user={user} />
          </Route>
          <Route path="/">
            <Home user={user} />
          </Route>
        </Switch>
      </Page.Content>
      {!isXS && (
        <Page.Footer>
          <Bar
            left={
              <Text p style={{ margin: 0 }}>
                {new Date().getFullYear()}
              </Text>
            }
            right={
              <Text p style={{ margin: 0 }}>
                Sigma{' '}
                <span>
                  <Activity size={16} />
                </span>{' '}
                Karrtopelka
              </Text>
            }
          />
        </Page.Footer>
      )}
    </Page>
  );
};

export default PageLayout;
