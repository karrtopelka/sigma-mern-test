import { Grid } from '@geist-ui/react';
import React from 'react';
import Input from '../Input/Input';

const InputGrid = ({ isXS, ...props }) => {
  return (
    <Grid
      xs={24}
      justify="center"
      direction={isXS ? 'column' : 'row'}
      alignItems="center"
    >
      {/* <Input isXS={isXS} /> */}
    </Grid>
  );
};

export default InputGrid;
