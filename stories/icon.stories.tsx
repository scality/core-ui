import React from 'react';
import { Icon, iconTable } from '../src/lib/components/icon/Icon.component';
import { Title } from './common';
export default {
  title: 'Components/Icon',
  component: Icon,
};
export const Default = ({}) => {
  return (
    <>
      <Title>Size</Title>

      <table>
        <tr>
          <td>
            <Icon name={'Theme'} size={'xs'} />
          </td>
          <td>
            <Icon name={'Account'} size={'sm'} color={'statusWarning'} />
          </td>
          <td>
            <Icon name={'Backend'} size={'lg'} color={'infoPrimary'} />
          </td>
          <td>
            <Icon name={'Tape'} size={'1x'} color={'statusWarning'} />
          </td>
          <td>
            <Icon
              name={'Node-backend'}
              size={'2x'}
              color={'backgroundLevel1'}
            />
          </td>
          <td>
            <Icon
              name={'Volume-backend'}
              size={'4x'}
              color={'backgroundLevel4'}
            />
          </td>
          <td>
            <Icon name={'Node-pdf'} size={'6x'} color={'backgroundLevel1'} />
          </td>
          <td>
            <Icon name={'Volume-pdf'} size={'8x'} color={'selectedActive'} />
          </td>
          <td>
            <Icon name={'Network'} size={'9x'} color={'secondaryDark1'} />
          </td>
          <td>
            <Icon name={'Bucket'} size={'10x'} color={'secondaryDark2'} />
          </td>
        </tr>

        <tr>
          <td>xs</td>
          <td>sm</td>
          <td>lg</td>
          <td>1x</td>
          <td>2x</td>
          <td>4x</td>
          <td>6x</td>
          <td>8x</td>
          <td>9x</td>
          <td>10x</td>
        </tr>
      </table>

      <Title>Statuses</Title>

      <table>
        <thead>
          <td>Status</td>
          <td>Visual</td>
          <td>Code</td>
        </thead>
        <tbody>
          <tr>
            <td>Unknown</td>
            <td>
              <Icon name={'Dot-circle'} color={'infoPrimary'} />
            </td>
            <td>
              <code>
                &lt;Icon name={'Dot-circle'} color={'infoPrimary'} /&gt;
              </code>
            </td>
          </tr>
          <tr>
            <td>Healthy</td>
            <td>
              <Icon name={'Check-circle'} color={'statusHealthy'} />
            </td>
            <td>
              <code>
                &lt;Icon name={'Check-circle'} color={'statusHealthy'} /&gt;
              </code>
            </td>
          </tr>
          <tr>
            <td>Warning</td>
            <td>
              <Icon name={'Exclamation-circle'} color={'statusWarning'} />
            </td>
            <td>
              <code>
                &lt;Icon name={'Exclamation-circle'} color={'statusWarning'}{' '}
                /&gt;
              </code>
            </td>
          </tr>
          <tr>
            <td>Critical</td>
            <td>
              <Icon name={'Times-circle'} color={'statusCritical'} />
            </td>
            <td>
              <code>
                &lt;Icon name={'Times-circle'} color={'statusCritical'} /&gt;
              </code>
            </td>
          </tr>
        </tbody>
      </table>

      <Title>All Icons</Title>
      <table>
        <thead>
          <td>Name</td>
          <td>Visual</td>
        </thead>
        <tbody>
          {Object.keys(iconTable).map((key, index) => (
            <tr key={key}>
              <td>{key}</td>
              <td>
                <Icon key={index} name={key} size={'2x'} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
