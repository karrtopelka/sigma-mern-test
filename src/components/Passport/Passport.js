import {
  Button,
  Grid,
  Spacer,
  Text,
  useMediaQuery,
  useToasts,
} from '@geist-ui/react';
import React, { useState } from 'react';
import InputGrid from '../InputGrid/InputGrid';
import InputWrapper from '../InputWrapper/InputWrapper';
import { setPassport } from '../../http/userAPI';
import { setCookie } from '../../http/cookies';

const Passport = ({ history, user }) => {
  const isXS = useMediaQuery('xs', { match: 'down' });
  const [error, setError] = useState(null);
  const [, setToast] = useToasts();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [passportNumber, setPassportNumber] = useState('');

  const enterSystem = () => {
    setPassport(user.userId, firstName, lastName, passportNumber)
      .then((r) => {
        setCookie(
          'user',
          {
            ...user,
            firstName,
            lastName,
            passportNumber,
          },
          1,
        );
        setToast({
          text: r.message,
          type: 'success',
          delay: 3000,
        });
        history.push('/');
      })
      .catch((err) => setError(err));
  };

  const handleClick = (e, type) => {
    e.preventDefault();
    type === 'login' ? history.push('/login') : enterSystem();
  };
  return (
    <InputWrapper title="Passport">
      <form>
        <Grid.Container>
          <InputGrid
            isXS={isXS}
            title="first name"
            type="text"
            value={firstName}
            setValue={setFirstName}
          />
          <Spacer y={0.5} />
          <InputGrid
            isXS={isXS}
            title="last name"
            type="text"
            value={lastName}
            setValue={setLastName}
          />
          <Spacer y={0.5} />
          <InputGrid
            isXS={isXS}
            title="passport num"
            type="text"
            value={passportNumber}
            setValue={setPassportNumber}
          />
          <Spacer y={0.5} />
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
            <Button
              htmlType="submit"
              type="success-light"
              onClick={(e) => handleClick(e, 'registration')}
            >
              Save passport
            </Button>
          </Grid>
        </Grid.Container>
      </form>
    </InputWrapper>
  );
};

export default Passport;
