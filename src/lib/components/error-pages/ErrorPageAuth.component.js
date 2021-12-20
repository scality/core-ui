//@flow
import React from 'react';
import {
  ErrorPageContainer,
  Row,
  InfoIcon,
  Title,
  Description,
  DescriptionContent,
  Link,
} from './ErrorPageStyle';

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
    to_report_issue: ' pour signaler le problème.',
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
    </ErrorPageContainer>
  );
}

export default ErrorPageAuth;
