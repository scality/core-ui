import React, { useState } from 'react';
import { Editor, EditorProps } from '../src/lib/next';

const sampleJson = JSON.stringify(
  {
    Version: '2012-10-17',
    Statement: [
      {
        Sid: 'ExampleStatement',
        Effect: 'Allow',
        Principal: '*',
        Action: 's3:GetObject',
        Resource: 'arn:aws:s3:::my-bucket/*',
      },
    ],
  },
  null,
  2,
);

const invalidJson = JSON.stringify(
  {
    Version: 'invalid-version',
    Statement: [
      {
        Sid: 'Test',
        Effect: 'InvalidEffect',
        Principal: '*',
        Action: 's3:GetObject',
        Resource: 'arn:aws:s3:::my-bucket/*',
      },
    ],
  },
  null,
  2,
);

const policySchema = {
  type: 'object' as const,
  required: ['Version', 'Statement'],
  properties: {
    Version: {
      type: 'string' as const,
      enum: ['2012-10-17', '2008-10-17'],
    },
    Statement: {
      type: 'array' as const,
      minItems: 1,
      items: {
        type: 'object' as const,
        required: ['Effect', 'Principal', 'Action', 'Resource'],
        properties: {
          Sid: { type: 'string' as const },
          Effect: { type: 'string' as const, enum: ['Allow', 'Deny'] },
          Principal: { type: 'string' as const },
          Action: { type: 'string' as const },
          Resource: { type: 'string' as const },
        },
        additionalProperties: false,
      },
    },
  },
};

export default {
  title: 'Components/Inputs/Editor',
  component: Editor,
  argTypes: {
    readOnly: { control: 'boolean' },
    height: { control: 'text' },
    width: { control: 'text' },
  },
};

const EditorWithState = (args: EditorProps) => {
  const [value, setValue] = useState(args.value || sampleJson);
  return <Editor {...args} value={value} onChange={setValue} />;
};

export const Default = {
  render: (args: EditorProps) => <EditorWithState {...args} />,
  args: {
    value: sampleJson,
    height: '400px',
    width: '100%',
  },
};

export const ReadOnly = {
  render: (args: EditorProps) => <EditorWithState {...args} />,
  args: {
    value: sampleJson,
    readOnly: true,
    height: '400px',
  },
};

/**
 * Pass `language` as an object with a `schema` to enable
 * validation, autocompletion, and hover tooltips from the schema.
 *
 * Hover over the red-underlined values to see error messages.
 */
export const WithSchemaValidation = {
  render: (args: EditorProps) => <EditorWithState {...args} />,
  args: {
    value: invalidJson,
    language: { name: 'json', schema: policySchema },
    height: '400px',
  },
};

/**
 * Valid JSON with schema — no errors shown, but autocompletion is active.
 */
export const ValidWithSchema = {
  render: (args: EditorProps) => <EditorWithState {...args} />,
  args: {
    value: sampleJson,
    language: { name: 'json', schema: policySchema },
    height: '400px',
  },
};

export const CustomDimensions = {
  render: (args: EditorProps) => <EditorWithState {...args} />,
  args: {
    value: '{\n  "compact": true\n}',
    height: '200px',
    width: '400px',
  },
};
