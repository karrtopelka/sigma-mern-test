import {
  Button,
  Text,
  Grid,
  Spacer,
  useMediaQuery,
  useToasts,
} from '@geist-ui/react';
import {} from '@geist-ui/react-icons';
import React, { useState } from 'react';
import InputGrid from '../InputGrid/InputGrid';
import { setCookie } from '../../http/cookies';
import { login } from '../../http/userAPI';
import InputWrapper from '../InputWrapper/InputWrapper';

const Login = ({ history }) => {
  const isXS = useMediaQuery('xs', { match: 'down' });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [, setToast] = useToasts();

  const enterSystem = () => {
    login(username, password)
      .then((r) => {
        setCookie(
          'user',
          {
            username: username,
            ...r,
          },
          1,
        );
        setToast({
          text: 'Succesfully logged in',
          type: 'success',
          delay: 3000,
        });
        history.push('/');
      })
      .catch((err) => setError(err));
  };

  const handleClick = (e, type) => {
    e.preventDefault();
    type === 'registration' ? history.push('/registration') : enterSystem();
  };

  return (
    <InputWrapper title="Login">
      <form>
        <Grid.Container>
          <InputGrid
            isXS={isXS}
            title="username"
            type="text"
            value={username}
            setValue={setUsername}
          />
          <Spacer y={0.5} />
          <InputGrid
            isXS={isXS}
            title="password"
            type="password"
            value={password}
            setValue={setPassword}
          />
          {error && (
            <>
              <Spacer y={0.5} />
              <Grid xs={24} gap={0.8} justify="center">
                <Text p type="error" style={{ margin: 0 }}>
                  {error}
                </Text>
              </Grid>
            </>
          )}
          <Spacer y={0.5} />
          <Grid xs={24} gap={0.8} justify="center">
            <Button onClick={(e) => handleClick(e, 'registration')}>
              Registration
            </Button>
            {!isXS && <Spacer x={0.5} />}
            <Button
              htmlType="submit"
              type="success-light"
              onClick={(e) => handleClick(e, 'login')}
            >
              Login
            </Button>
          </Grid>
        </Grid.Container>
      </form>
    </InputWrapper>
  );
};

export default Login;
