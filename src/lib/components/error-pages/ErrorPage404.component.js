//@flow
import React from 'react';
import styled from 'styled-components';
import * as defaultTheme from '../../style/theme';
import { getThemePropSelector } from '../../utils';
import Button from '../button/Button.component';

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

const WarningIcon = styled.i`
  color: ${getThemePropSelector('statusWarning')};
`;

const translations = {
  en: {
    not_exist: 'Error: this page does not exist',
    error_desc: 'It might be the wrong address or the page has moved.',
    should_do:
      'You might check the url, or contact your admin if the error remains.',
    return_home: 'Return Home',
  },
  fr: {
    not_exist: "Erreur: cette page n'existe pas",
    error_desc:
      'Il se peut que ce soit une mauvaise adresse ou que la page ait été déplacée.',
    should_do:
      "Vous pouvez vérifier l'url, ou contacter votre administrateur si l'erreur persiste.",
    return_home: "Retour à l'accueil",
  },
};

type Props = {
  btnLink?: string,
  locale?: string,
};

function ErrorPage404({ btnLink = '/', locale = 'en', ...rest }: Props) {
  if (!translations[locale]) locale = 'en';
  // Ensure the locale formatting is consistent
  locale = locale.toLowerCase();

  return (
    <ErrorPageContainer className="sc-error-page404" {...rest}>
      <Row>
        <WarningIcon className="fas fa-exclamation-triangle fa-2x" />
        <Title>{translations[locale].not_exist}</Title>
      </Row>
      <Row>
        <Description>
          <DescriptionContent>
            {translations[locale].error_desc}
          </DescriptionContent>
          <DescriptionContent>
            {translations[locale].should_do}
          </DescriptionContent>
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

export default ErrorPage404;
