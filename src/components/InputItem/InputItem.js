import { Input, Spacer, Text } from '@geist-ui/react';
import React from 'react';

const InputItem = (props) => {
  return (
    <>
      <Text p>{props.title}</Text>
      {!props.isXS && <Spacer x={0.5} />}
      <Input
        type={props.type}
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}
      />
    </>
  );
};

export default InputItem;
