//@flow
import React from "react";
import styled from "styled-components";
import * as defaultTheme from "../../style/theme";
import { getTheme, getThemePropSelector } from '../../utils';
import Button from '../button/Button.component';

const ErrorPageContainer = styled.div`
  background-color: ${getThemePropSelector("primaryDark1")};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Title = styled.h2`
  color: ${props => getTheme(props).textPrimary};
  margin: 0;
  margin-left: ${defaultTheme.padding.large};
`;

const Description = styled.div`
  color: ${props => getTheme(props).textPrimary};
  font-size: ${defaultTheme.fontSize.larger};
  text-align: center;
  padding: ${defaultTheme.padding.larger};
`;

const DescriptionContent = styled.p`
  margin: 0;
  padding: ${defaultTheme.padding.smaller};
`;

const Row = styled.div`
  display: flex;
  align-items: baseline;
`;

const WarningIcon = styled.i`
  color: ${defaultTheme.yellow};
`;

const Link = styled.a`
  color: ${props => getTheme(props).secondary};
  text-decoration: none;
`;

type Props = {
  btnLink?: string,
  supportLink?: string,
};

function ErrorPage500({
  btnLink = "/",
  supportLink = null,
  ...rest
}: Props) {
  return (
    <ErrorPageContainer className="sc-error-page500" { ...rest }>
      <Row>
        <WarningIcon className="fas fa-exclamation-triangle fa-2x"/>
        <Title>Unexpected Error</Title>
      </Row>
      <Row>
        <Description>
          <DescriptionContent>An error occured and your request cannot be completed.</DescriptionContent>
          <DescriptionContent>You might check the url, or contact your admin if the error remains.</DescriptionContent>
          { supportLink && <DescriptionContent>
            You may also contact{' '}
            <Link href={ supportLink }>support <i className="fas fa-external-link-alt"/></Link>{' '}
            to report this issue.
          </DescriptionContent> }
        </Description>
      </Row>
      <Button
        text="Return Home"
        size="large"
        type="button"
        variant="secondaryDark1"
        href={ btnLink }
      />
    </ErrorPageContainer>
  );
}

export default ErrorPage500;
