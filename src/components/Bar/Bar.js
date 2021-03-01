import { Col, Row } from '@geist-ui/react';
import React from 'react';

const Bar = ({ left, right, ...props }) => {
  return (
    <Row justify="space-between" style={{ padding: 10 }}>
      <Col>{left}</Col>
      <Col style={{ textAlign: 'right' }}>{right}</Col>
    </Row>
  );
};

export default Bar;
