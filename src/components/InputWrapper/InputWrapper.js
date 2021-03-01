import { Card, Grid, Text, useMediaQuery } from '@geist-ui/react';
import React from 'react';

const InputWrapper = ({ title, children }) => {
  const isXS = useMediaQuery('xs', { match: 'down' });
  return (
    <Grid.Container>
      <Grid xs={24} justify="center">
        <Text h1>{title}</Text>
      </Grid>
      <Grid xs={24} justify="center">
        <Card shadow width={!isXS && '75%'}>
          {children}
        </Card>
      </Grid>
    </Grid.Container>
  );
};

export default InputWrapper;
