//@flow
import React from 'react';
import {
  ErrorPageContainer,
  Row,
  WarningIcon,
  Title,
  Description,
  DescriptionContent,
  Link,
} from './ErrorPageStyle';
import Button from '../buttonv2/Buttonv2.component';

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
  history?: Object,
};

function ErrorPage500({
  btnLink = '/',
  supportLink = null,
  locale = 'en',
  history,
  ...rest
}: Props) {
  if (!translations[locale]) locale = 'en';
  // Ensure the locale formatting is consistent
  locale = locale.toLowerCase();

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
      {history && (
        <Button
          label={translations[locale].return_home}
          variant="secondary"
          onClick={() => history.push(btnLink)}
        />
      )}
    </ErrorPageContainer>
  );
}

export default ErrorPage500;
