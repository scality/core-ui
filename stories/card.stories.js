// @flow
import React from 'react';
import styled from 'styled-components';
import Card, {
  CardHeader,
  CardBody,
  CardBodyContainer,
} from '../src/lib/components/card/Card.component';
import CircularProgressBar from '../src/lib/components/circularprogressbar/CircularProgressBar.component';
import { Text, Title, Wrapper } from './common';
import { brand } from '../src/lib/style/theme';

export default {
  title: 'Components/Card',
  component: Card,
};

const Row = styled.div`
  display: flex;
  & > * {
    margin-left: 10px;
  }
`;

const defaultBody = (
  <CircularProgressBar
    color={brand.buttonSecondary}
    backgroundColor={brand.textSecondary}
    radius={30}
    strokeWidth={5}
    percent={60}
  >
    <Text
      className="sc-circularprogressbar-text"
      x="50%"
      y="50%"
      dominantBaseline="middle"
      textAnchor="middle"
    >
      60%
    </Text>
  </CircularProgressBar>
);

const defaultPropsCard = {
  width: '160px',
  height: '140px',
  onClick: () => console.log('Clicked!'),
};

const statuses = ['healthy', 'warning', 'critical'];

export const Default = () => {
  return (
    <Wrapper>
      <Title>
        Props for all cards: width: {defaultPropsCard.width}, height:{' '}
        {defaultPropsCard.height}
      </Title>
      <Title>Normal Card</Title>
      <Row>
        {statuses.map((status) => (
          <Card key={status} status={status} {...defaultPropsCard}>
            <CardHeader>
              <div>RINGXcore</div>
            </CardHeader>
            <CardBodyContainer>
              <CardBody>{defaultBody}</CardBody>
            </CardBodyContainer>
          </Card>
        ))}
      </Row>
      <Title>Normal Card Disabled</Title>
      <Row>
        {statuses.map((status) => (
          <Card key={status} disabled status={status} {...defaultPropsCard}>
            <CardHeader>
              <div>RINGXcore</div>
            </CardHeader>
            <CardBodyContainer>
              <CardBody>{defaultBody}</CardBody>
            </CardBodyContainer>
          </Card>
        ))}
      </Row>
      <Title>Normal Card - Active</Title>
      <Row>
        {statuses.map((status) => (
          <Card key={status} active status={status} {...defaultPropsCard}>
            <CardHeader>
              <div>RINGXcore</div>
            </CardHeader>
            <CardBodyContainer>
              <CardBody>{defaultBody}</CardBody>
            </CardBodyContainer>
          </Card>
        ))}
      </Row>
      <Title>No onClick props</Title>
      <Row>
        {statuses.map((status) => (
          <Card
            key={status}
            status={status}
            {...defaultPropsCard}
            onClick={null}
          >
            <CardHeader>
              <div>RINGXcore</div>
            </CardHeader>
            <CardBodyContainer>
              <CardBody>{defaultBody}</CardBody>
            </CardBodyContainer>
          </Card>
        ))}
      </Row>
    </Wrapper>
  );
};

export const Customized = () => {
  return (
    <Wrapper>
      <Title>No Header</Title>
      <Card status={'critical'} {...defaultPropsCard}>
        <CardBodyContainer>
          <CardBody>{defaultBody}</CardBody>
        </CardBodyContainer>
      </Card>
      <Title>No Body with {defaultPropsCard.height} height</Title>
      <Card status={'critical'} {...defaultPropsCard}>
        <CardHeader>
          <div>RINGXcore</div>
        </CardHeader>
      </Card>
      <Title>No Body with auto height</Title>
      <Card status={'critical'} {...defaultPropsCard} height="auto">
        <CardHeader>
          <div>RINGXcore</div>
        </CardHeader>
      </Card>
      <Title>Multiple Bodies</Title>
      <Card status={'critical'} {...defaultPropsCard}>
        <CardHeader>
          <div>RINGXcore</div>
        </CardHeader>
        <CardBodyContainer>
          <CardBody>{defaultBody}</CardBody>
          <CardBody>{defaultBody}</CardBody>
        </CardBodyContainer>
      </Card>
      <Title>Customized Card (Size / Colors)</Title>
      <Row>
        <Card
          {...defaultPropsCard}
          headerBackgroundColor={'buttonPrimary'}
          bodyBackgroundColor={'infoSecondary'}
          status={null}
          height={'200px'}
        >
          <CardHeader>
            <div>RINGXcore</div>
          </CardHeader>
          <CardBodyContainer>
            <CardBody>{defaultBody}</CardBody>
          </CardBodyContainer>
        </Card>
        <Card
          {...defaultPropsCard}
          headerBackgroundColor={'buttonPrimary'}
          bodyBackgroundColor={'infoSecondary'}
          status={null}
          height={'120px'}
          width={'500px'}
        >
          <CardHeader>
            <div>RINGXcore</div>
          </CardHeader>
          <CardBodyContainer>
            <CardBody>{defaultBody}</CardBody>
          </CardBodyContainer>
        </Card>
      </Row>
    </Wrapper>
  );
};
