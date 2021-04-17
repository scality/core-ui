//@flow
import React from 'react';
import styled from 'styled-components';
import * as defaultTheme from '../../style/theme';
import { getTheme, getThemePropSelector } from '../../utils';
import Button from '../button/Button.component';

const ErrorPageContainer = styled.div`
  background-color: ${getThemePropSelector('primaryDark1')};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Title = styled.h2`
  color: ${(props) => getTheme(props).textPrimary};
  margin: 0;
  margin-left: ${defaultTheme.padding.large};
`;

const Description = styled.div`
  color: ${(props) => getTheme(props).textPrimary};
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
  color: ${(props) => getTheme(props).secondary};
  text-decoration: none;
`;

const translations = {
  en: {
    unexpected_error: 'Unexpected Error',
    error_desc: 'An error occured and your request cannot be completed.',
    should_do:
      'You might check the url, or contact your admin if the error remains.',
    return_home: 'Return Home',
    may_also_contact: 'You may also contact ',
    to_report_issue: ' to report this issue.',
  },
  fr: {
    unexpected_error: 'Erreur inattendue',
    error_desc:
      "Une erreur s'est produite et votre demande ne peut être complétée.",
    should_do:
      "Vous pouvez vérifier l'url, ou contacter votre administrateur si l'erreur persiste.",
    return_home: "Retour à l'accueil",
    may_also_contact: 'Vous pouvez également contacter le ',
    to_report_issue: ' pour signaler ce problème.',
  },
};

type Props = {
  btnLink?: string,
  supportLink?: string,
  locale?: string,
};

function ErrorPage500({
  btnLink = '/',
  supportLink = null,
  locale = 'en',
  ...rest
}: Props) {
  if (!translations[locale]) locale = 'en';

  return (
    <ErrorPageContainer className="sc-error-page500" {...rest}>
      <Row>
        <WarningIcon className="fas fa-exclamation-triangle fa-2x" />
        <Title>{translations[locale].unexpected_error}</Title>
      </Row>
      <Row>
        <Description>
          <DescriptionContent>
            {translations[locale].error_desc}
          </DescriptionContent>
          <DescriptionContent>
            {translations[locale].should_do}
          </DescriptionContent>
          {supportLink && (
            <DescriptionContent>
              {translations[locale].may_also_contact}
              <Link href={supportLink}>
                support <i className="fas fa-external-link-alt" />
              </Link>
              {translations[locale].to_report_issue}
            </DescriptionContent>
          )}
        </Description>
      </Row>
      <Button
        text={translations[locale].return_home}
        size="large"
        type="button"
        variant="buttonSecondary"
        href={btnLink}
      />
    </ErrorPageContainer>
  );
}

export default ErrorPage500;
