import React from 'react';
import {
  ErrorPageContainer,
  Row,
  Title,
  Description,
  DescriptionContent,
  Link,
} from './ErrorPageStyle';
import { Button } from '../buttonv2/Buttonv2.component';
import { Icon } from '../icon/Icon.component';
const translations = {
  en: {
    unexpected_error: 'Not authorized',
    error_desc: `You don't have permission to view this page using the credentials you have supplied.`,
    may_also_contact: 'You can contact ',
    to_report_issue: ' to report this issue.',
    return_home: 'Return Home',
  },
  fr: {
    unexpected_error: `Accès refusé`,
    error_desc: `Les identifiants fournis ne vous permettent pas de consulter cette page.`,
    may_also_contact: 'Vous pouvez contacter le ',
    to_report_issue: ' pour signaler le problème.',
    return_home: "Retour à l'accueil",
  },
};
type Props = {
  supportLink?: string;
  locale?: string;
  onReturnHomeClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

function ErrorPage401({
  supportLink = undefined,
  locale = 'en',
  onReturnHomeClick,
  ...rest
}: Props) {
  if (!translations[locale]) locale = 'en';
  // Ensure the locale formatting is consistent
  locale = locale.toLowerCase();
  return (
    <ErrorPageContainer className="sc-error-page401" {...rest}>
      <Row>
        <Icon name="Exclamation-triangle" size="2x" color="statusWarning" />
        <Title>{translations[locale].unexpected_error}</Title>
      </Row>
      <Row>
        <Description>
          <DescriptionContent>
            {translations[locale].error_desc}
          </DescriptionContent>
          {supportLink && (
            <DescriptionContent>
              {translations[locale].may_also_contact}
              <Link href={supportLink}>
                support <Icon name="External-link" />
              </Link>
              {translations[locale].to_report_issue}
            </DescriptionContent>
          )}
        </Description>
      </Row>

      {onReturnHomeClick && (
        <Button
          label={translations[locale].return_home}
          variant="secondary"
          onClick={onReturnHomeClick}
        />
      )}
    </ErrorPageContainer>
  );
}

export { ErrorPage401 };
