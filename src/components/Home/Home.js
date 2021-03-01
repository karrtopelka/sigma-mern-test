import { Col, Row, Text, Grid, Button, Spacer } from '@geist-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ user }) => {
  return (
    <Row>
      <Col span={8}>
        <Link to="/passport">
          <Button>Passport</Button>
        </Link>
        <Spacer y={0.5} />
        <Link to="/favcolor">
          <Button>Fav Color</Button>
        </Link>
      </Col>
      <Col span={16}>
        <Grid.Container>
          <Grid xs={24} justify="center" style={{ padding: 10 }}>
            <Text h1>User Information</Text>
          </Grid>
          {Object.entries(user).map(
            (u) =>
              u[0] !== 'token' &&
              u[0] !== 'userId' &&
              u[1] && (
                <Grid xs={24} key={u[0]} justify="space-between">
                  <Text h3>{u[0]}:</Text>
                  <Text h3>{u[1]}</Text>
                </Grid>
              ),
          )}
        </Grid.Container>
      </Col>
    </Row>
  );
};

export default Home;
