import { Icon, IconName } from '../icon/Icon.component';

import {
  STATUS_WARNING,
  STATUS_CRITICAL,
  STATUS_HEALTH,
} from '../tablev2/TableUtils';

export enum StatusCluster {
  HEALTHY = 'healthy',
  WARNING = 'warning',
  CRITICAL = 'critical',
  UNKNOWN = 'unknown',
}

export const StatusIcon = ({ status }: { status: StatusCluster }) => {
  const icon: { status: string; name: IconName } = (() => {
    switch (status) {
      case STATUS_HEALTH:
        return { status: 'statusHealthy', name: 'Check-circle' };

      case STATUS_WARNING:
        return { status: 'statusWarning', name: 'Times-circle' };

      case STATUS_CRITICAL:
        return { status: 'statusCritical', name: 'Times-circle' };

      default:
        return { status: 'textTertiary', name: 'Info' };
    }
  })();

  return <Icon color={icon.status} name={icon.name} />;
};
