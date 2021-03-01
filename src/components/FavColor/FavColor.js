import { Card, Grid, Text, useToasts } from '@geist-ui/react';
import React, { useState } from 'react';
import { setFavColor } from '../../http/userAPI';
import { setCookie } from '../../http/cookies';

const FavColor = ({ history, user }) => {
  const [, setToast] = useToasts();
  const [error, setError] = useState(null);
  const colors = [
    ['secondary', 'gray'],
    ['success', 'blue'],
    ['warning', 'orange'],
    ['error', 'red'],
    ['alert', 'pink'],
    ['dark', 'black'],
    ['purple', 'purple'],
    ['violet', 'violet'],
    ['cyan', 'cyan'],
  ];

  const handleClick = (color) => {
    setFavColor(user.userId, color)
      .then((r) => {
        setCookie(
          'user',
          {
            ...user,
            color: color,
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

  return (
    <>
      <Text h1 style={{ padding: 10, textAlign: 'center' }}>
        Choose your favourite color
      </Text>
      {error && (
        <Text type="error" h3 style={{ padding: 10, textAlign: 'center' }}>
          {error}
        </Text>
      )}
      <Grid.Container gap={2} justify="center">
        {colors.map((color) => (
          <Grid xs={6} style={{ cursor: 'pointer' }} key={color[0]}>
            <Card shadow type={color[0]} onClick={() => handleClick(color[1])}>
              {color[1]}
            </Card>
          </Grid>
        ))}
      </Grid.Container>
    </>
  );
};

export default FavColor;
