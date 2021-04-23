//@flow
import React from 'react';
import styled from 'styled-components';
import * as defaultTheme from '../../style/theme';
import { getThemePropSelector } from '../../utils';

const ErrorPageContainer = styled.div`
  background-color: ${getThemePropSelector('backgroundLevel1')};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Title = styled.h2`
  color: ${getThemePropSelector('textPrimary')};
  margin: 0;
  margin-left: ${defaultTheme.padding.large};
`;

const Description = styled.div`
  color: ${getThemePropSelector('textPrimary')};
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

const InfoIcon = styled.i`
  color: ${getThemePropSelector('textPrimary')};
`;

const Link = styled.a`
  color: ${getThemePropSelector('textLink')};
  text-decoration: none;
`;

const translations = {
  en: {
    unexpected_error: 'Authenticating...',
    error_desc: 'The authentication is in progress.',
    should_do: 'If this message persist please try refreshing your page.',
    may_also_contact: 'You may also contact ',
    to_report_issue: ' to report this issue.',
  },
  fr: {
    unexpected_error: 'Authentification',
    error_desc: 'Authentification en cours.',
    should_do:
      "Si ce message persiste, vous pouvez essayer d'actualiser cette page.",
    may_also_contact: 'Vous pouvez également contacter le ',
    to_report_issue: ' pour signaler ce problème.',
  },
};

type Props = {
  supportLink?: string,
  locale?: string,
};

function ErrorPageAuth({ supportLink = null, locale = 'en', ...rest }: Props) {
  if (!translations[locale]) locale = 'en';
  // Ensure the locale formatting is consistent
  locale = locale.toLowerCase();

  return (
    <ErrorPageContainer className="sc-error-pageauth" {...rest}>
      <Row>
        <InfoIcon className="fas fa-info-circle fa-2x" />
        <Title>{translations[locale].unexpected_error}</Title>
      </Row>
      <Row>
        <Description>
          <DescriptionContent aria-label="authenticating">
            {translations[locale].error_desc}
          </DescriptionContent>
          <DescriptionContent aria-label="if message persist please refresh">
            {translations[locale].should_do}
          </DescriptionContent>
          {supportLink && (
            <DescriptionContent aria-label="support link">
              {translations[locale].may_also_contact}
              <Link href={supportLink}>
                support <i className="fas fa-external-link-alt" />
              </Link>
              {translations[locale].to_report_issue}
            </DescriptionContent>
          )}
        </Description>
      </Row>
    </ErrorPageContainer>
  );
}

export default ErrorPageAuth;
