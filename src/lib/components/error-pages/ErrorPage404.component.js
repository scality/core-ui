//@flow
import React from 'react';
import {
  ErrorPageContainer,
  Row,
  WarningIcon,
  Title,
  Description,
  DescriptionContent,
} from './ErrorPageStyle';
import Button from '../buttonv2/Buttonv2.component';

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
  locale?: string,
  onReturnHomeClick?: (event: SyntheticMouseEvent<HTMLButtonElement>) => void,
};

function ErrorPage404({ locale = 'en', onReturnHomeClick, ...rest }: Props) {
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
      {onReturnHomeClick && (
        <Button
          label={translations[locale].return_home}
          variant="secondary"
          onReturnHomeClick={onReturnHomeClick}
        />
      )}
    </ErrorPageContainer>
  );
}

export default ErrorPage404;
