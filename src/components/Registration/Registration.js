import {
  Button,
  Grid,
  Spacer,
  Text,
  useMediaQuery,
  useToasts,
} from '@geist-ui/react';
import React, { useState } from 'react';
import { registration } from '../../http/userAPI';
import InputGrid from '../InputGrid/InputGrid';
import InputWrapper from '../InputWrapper/InputWrapper';
import { setCookie } from '../../http/cookies';

const Registration = ({ history }) => {
  const isXS = useMediaQuery('xs', { match: 'down' });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState(null);
  const [, setToast] = useToasts();

  const enterSystem = () => {
    try {
      if (password !== passwordConfirm) {
        throw new Error('Password not match');
      } else {
        registration(username, password)
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
              text: 'Succesfully registered',
              type: 'success',
              delay: 3000,
            });
            history.push('/');
          })
          .catch((err) => setError(err));
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleClick = (e, type) => {
    e.preventDefault();
    type === 'login' ? history.push('/login') : enterSystem();
  };

  return (
    <InputWrapper title="Sing Up">
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
          <Spacer y={0.5} />
          <InputGrid
            isXS={isXS}
            title="password confirm"
            type="password"
            value={passwordConfirm}
            setValue={setPasswordConfirm}
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
            <Button onClick={(e) => handleClick(e, 'login')}>Login</Button>
            {!isXS && <Spacer x={0.5} />}
            <Button
              htmlType="submit"
              type="success-light"
              onClick={(e) => handleClick(e, 'registration')}
            >
              Sign Up
            </Button>
          </Grid>
        </Grid.Container>
      </form>
    </InputWrapper>
  );
};

export default Registration;
