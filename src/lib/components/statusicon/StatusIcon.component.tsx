import { Icon, IconName } from '../icon/Icon.component';
import {
  STATUS_WARNING,
  STATUS_CRITICAL,
  STATUS_HEALTHY,
} from '../../components/constants';
import { CoreUITheme } from '../../style/theme';
import { Loader } from '../loader/Loader.component';

export enum Status {
  HEALTHY = 'healthy',
  WARNING = 'warning',
  CRITICAL = 'critical',
  UNKNOWN = 'unknown',
  LOADING = 'loading',
}

export const StatusIcon = ({ status }: { status: Status }) => {
  if (status === 'loading') {
    return <Loader />;
  }
  const icon: { color: keyof CoreUITheme; name: IconName; label: string } =
    (() => {
      switch (status) {
        case STATUS_HEALTHY:
          return {
            color: 'statusHealthy',
            name: 'Check-circle',
            label: 'Healthy status',
          };

        case STATUS_WARNING:
          return {
            color: 'statusWarning',
            name: 'Times-circle',
            label: 'Warning status',
          };

        case STATUS_CRITICAL:
          return {
            color: 'statusCritical',
            name: 'Times-circle',
            label: 'Critical status',
          };
        default:
          return {
            color: 'textTertiary',
            name: 'Info',
            label: 'Information status',
          };
      }
    })();

  return <Icon color={icon.color} name={icon.name} ariaLabel={icon.label} />;
};
