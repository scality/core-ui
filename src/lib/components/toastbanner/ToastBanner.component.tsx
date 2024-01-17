import styled, { useTheme } from 'styled-components';
import { BasicText } from '../text/Text.component';
import {
  DefaultIcon,
  ToastStatus,
  useGetRgbBackgroundColor,
} from '../toast/Toast.component';

export type ToastBannerProps = {
  icon?: React.ReactNode;
  status?: ToastStatus;
  message: React.ReactNode;
};

const BannerWrapper = styled.div<{ bgColor: string; border: string }>`
  align-items: flex-end;
  background-color: ${(props) => props.bgColor};
  border: ${(props) => props.border};
  border-radius: 4px;
  display: flex;
`;

const IconContainer = styled.div<{ bgColor: string }>`
  align-items: center;
  align-self: stretch;
  border-radius: 3px 0px 0px 3px;
  display: flex;
  justify-content: center;
  width: 32px;
  background-color: ${(props) => props.bgColor};
`;

const ContentContainer = styled.div`
  align-items: center;
  align-self: stretch;
  display: flex;
  flex: 1;
  flex-grow: 1;
  padding: 4px 8px 4px 8px;
`;

function ToastBanner({
  status = 'info',
  icon = <DefaultIcon status={status} />,
  message,
}: ToastBannerProps) {
  const rgbBgColor = useGetRgbBackgroundColor(status);
  const theme = useTheme();

  return (
    <BannerWrapper
      bgColor={theme.backgroundLevel1}
      border={`1px solid ${theme.border}`}
    >
      <IconContainer bgColor={rgbBgColor}>{icon}</IconContainer>
      <ContentContainer>
        <BasicText>{message}</BasicText>
      </ContentContainer>
    </BannerWrapper>
  );
}

export { ToastBanner };
