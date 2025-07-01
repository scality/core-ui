import { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { StackedBarChart } from '../src/lib/components/stackedbarchart/StackedBarChart.component';

import { Stack, Wrap } from '../src/lib';
import { Button } from '../src/lib/components/buttonv2/Buttonv2.component';
import { Wrapper } from './common';

type Story = StoryObj<typeof StackedBarChart>;

const meta: Meta<typeof StackedBarChart> = {
  title: 'Components/Data Display/Charts/StackedBarChart',
  component: StackedBarChart,
  decorators: [
    (story) => (
      <Wrapper style={{ height: '100vh', width: '100vw' }}>{story()}</Wrapper>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

const sampleData = [
  { date: 'Mon', value1: 30, value2: 20 },
  { date: 'Tue', value1: 45, value2: 25 },
  { date: 'Wed', value1: 35, value2: 30 },
  { date: 'Thu', value1: 50, value2: 40 },
  { date: 'Fri', value1: 40, value2: 35 },
  { date: 'Sat', value1: 20, value2: 15 },
  { date: 'Sun', value1: 10, value2: 10 },
];

export const Playground: Story = {
  render: () => {
    return (
      <div style={{ width: '850px', height: '600px' }}>
        <StackedBarChart
          data={sampleData}
          title="Stacked Bar Chart"
          rightContent={<Button label="Test" />}
          dataSchema={{
            xValueKey: 'date',
            yValues: [
              { key: 'value1', color: '#0AADA6', label: 'Success' },
              { key: 'value2', color: '#E84855', label: 'Failure' },
            ],
          }}
        />
      </div>
    );
  },
};

// Sample volume capacity data in TB
const volumeCapacityData = [
  { volume: 'vol-01', used: 120, free: 180 },
  { volume: 'vol-02', used: 75, free: 225 },
  { volume: 'vol-03', used: 200, free: 100 },
  { volume: 'vol-04', used: 50, free: 250 },
  { volume: 'vol-05', used: 150, free: 150 },
  { volume: 'vol-06', used: 220, free: 80 },
  { volume: 'vol-07', used: 100, free: 200 },
  { volume: 'vol-08', used: 170, free: 130 },
  { volume: 'vol-09', used: 90, free: 210 },
  { volume: 'vol-10', used: 180, free: 120 },
];

export const VolumeCapacity: Story = {
  render: () => {
    return (
      <StackedBarChart
        style={{ width: '500px', height: '300px' }}
        data={volumeCapacityData}
        title="Volume Storage Capacity"
        dataSchema={{
          xValueKey: 'volume',
          yValues: [
            { key: 'used', color: '#346774', label: 'Used Capacity' },
            { key: 'free', color: '#8fd3e6', label: 'Free Capacity' },
          ],
        }}
        yUnit=" TB"
      />
    );
  },
};

// Sample volume performance data with read/write IOPS
const volumePerformanceData = [
  { volume: 'vol-prod-db', read: 2800, write: 1200 },
  { volume: 'vol-analytics', read: 3500, write: 500 },
  { volume: 'vol-backup', read: 800, write: 2200 },
  { volume: 'vol-web-server', read: 1500, write: 800 },
  { volume: 'vol-app-server', read: 2000, write: 1000 },
  { volume: 'vol-cache', read: 4500, write: 300 },
  { volume: 'vol-logs', read: 700, write: 1800 },
  { volume: 'vol-media', read: 3000, write: 600 },
  { volume: 'vol-tmp', read: 1200, write: 1400 },
  { volume: 'vol-user-data', read: 1800, write: 1600 },
];

export const VolumePerformance: Story = {
  render: () => {
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    const toggleSortOrder = () => {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    return (
      <StackedBarChart
        data={volumePerformanceData}
        style={{
          width: '80%',
          height: '80%',
        }}
        rightContent={
          <Button
            onClick={toggleSortOrder}
            variant="outline"
            label={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          ></Button>
        }
        title="Volume I/O Performance"
        dataSchema={{
          xValueKey: 'volume',
          yValues: [
            { key: 'read', color: '#6abe39', label: 'Read IOPS' },
            { key: 'write', color: '#f5a623', label: 'Write IOPS' },
          ],
        }}
        sortBy={sortOrder}
        yUnit=" IOPS"
      />
    );
  },
};

// Sample data for cloud resource allocation with multiple data types
const resourceAllocationData = [
  {
    region: 'US-East',
    compute: 45,
    storage: 80,
    network: 25,
    management: 15,
  },
  {
    region: 'US-West',
    compute: 35,
    storage: 65,
    network: 20,
    management: 10,
  },
  {
    region: 'EU-Central',
    compute: 55,
    storage: 90,
    network: 30,
    management: 20,
  },
  {
    region: 'EU-West',
    compute: 40,
    storage: 70,
    network: 25,
    management: 15,
  },
  {
    region: 'Asia-Pacific',
    compute: 30,
    storage: 60,
    network: 20,
    management: 10,
  },
  {
    region: 'South America',
    compute: 20,
    storage: 40,
    network: 15,
    management: 5,
  },
  {
    region: 'Australia',
    compute: 25,
    storage: 50,
    network: 15,
    management: 8,
  },
];

export const ResourceAllocation: Story = {
  render: () => {
    const theme = useTheme();
    const [typeToDisplay, setTypeToDisplay] = useState<string | undefined>(
      undefined,
    );

    return (
      <div style={{ width: '800px', height: '600px' }}>
        <Wrap
          gap="r16"
          justifyContent="flex-end"
          style={{ marginBottom: '16px' }}
        >
          <Button
            onClick={() => setTypeToDisplay(undefined)}
            variant={typeToDisplay === undefined ? 'primary' : 'outline'}
            label="All Resources"
          />
          <Button
            onClick={() => setTypeToDisplay('infrastructure')}
            variant={typeToDisplay === 'infrastructure' ? 'primary' : 'outline'}
            label="Infrastructure"
          />
          <Button
            onClick={() => setTypeToDisplay('services')}
            variant={typeToDisplay === 'services' ? 'primary' : 'outline'}
            label="Services"
          />
        </Wrap>
        <StackedBarChart
          data={resourceAllocationData}
          style={{ width: '50%', height: '50%' }}
          title="Cloud Resource Allocation by Region"
          dataSchema={{
            xValueKey: 'region',
            yValues: [
              {
                key: 'compute',
                color: '#e74c3c',
                label: 'Compute',
                type: 'infrastructure',
              },
              {
                key: 'storage',
                color: '#3498db',
                label: 'Storage',
                type: 'infrastructure',
              },
              {
                key: 'network',
                color: '#2ecc71',
                label: 'Network',
                type: 'services',
              },
              {
                key: 'management',
                color: '#f39c12',
                label: 'Management',
                type: 'services',
              },
            ],
          }}
          typeToDisplay={typeToDisplay}
          yUnit="%"
        />
      </div>
    );
  },
};
export const MultiChart: Story = {
  render: () => {
    return (
      <Stack
        direction="vertical"
        gap="r16"
        style={{ width: '100%', height: '100%' }}
      >
        <StackedBarChart
          data={sampleData}
          title="Stacked Bar Chart"
          dataSchema={{
            xValueKey: 'date',
            yValues: [
              { key: 'value1', color: '#0AADA6', label: 'Success' },
              { key: 'value2', color: '#E84855', label: 'Failure' },
            ],
          }}
        />
        <StackedBarChart
          data={sampleData}
          title="Stacked Bar Chart"
          dataSchema={{
            xValueKey: 'date',
            yValues: [
              { key: 'value1', color: '#0AADA6', label: 'Success' },
              { key: 'value2', color: '#E84855', label: 'Failure' },
            ],
          }}
        />
        <StackedBarChart
          data={sampleData}
          title="Stacked Bar Chart"
          dataSchema={{
            xValueKey: 'date',
            yValues: [
              { key: 'value1', color: '#0AADA6', label: 'Success' },
              { key: 'value2', color: '#E84855', label: 'Failure' },
            ],
          }}
        />
      </Stack>
    );
  },
};

export const NoData: Story = {
  render: () => {
    return (
      <StackedBarChart
        title="No Data"
        data={[]}
        dataSchema={{ xValueKey: '', yValues: [] }}
      />
    );
  },
};

export const NoDataSchema: Story = {
  render: () => {
    return (
      <StackedBarChart
        data={sampleData}
        dataSchema={{ xValueKey: '', yValues: [] }}
      />
    );
  },
};
