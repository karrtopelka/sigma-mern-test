import { Grid } from '@geist-ui/react';
import React from 'react';
import InputItem from '../InputItem/InputItem';

const InputGrid = (props) => {
  return (
    <Grid
      xs={24}
      justify="space-around"
      direction={props.isXS ? 'column' : 'row'}
      alignItems="center"
      style={!props.isXS ? { padding: '0 5em 0 5em' } : {}}
    >
      <InputItem {...props} />
    </Grid>
  );
};

export default InputGrid;
