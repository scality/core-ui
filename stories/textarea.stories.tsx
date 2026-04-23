import { action } from 'storybook/actions';
import { TextArea } from '../src/lib';
export default {
  title: 'Components/Inputs/TextArea',
  component: TextArea,
  args: {
    onChange: action('onChange'),
    name: 'TextArea',
  },
  argTypes: {
    name: {
      table: {
        disable: true,
      },
    },
    value: {
      type: 'string',
    },
    width: {
      type: 'string',
    },
    rows: {
      type: 'number',
    },
    cols: {
      type: 'number',
    },
  },
};

export const Playground = {};

export const DefaultTextArea = {
  args: {
    defaultValue: 'Some text',
  },
};

export const TextVariantTextArea = {
  args: {
    variant: 'text',
    defaultValue: 'Text area with "text" variant',
  },
};

export const DisabledTextArea = {
  args: {
    placeholder: 'This text area is disabled',
    disabled: true,
  },
};

export const WithWidthSet = {
  args: {
    placeholder: 'Text Area input',
    width: '300px',
  },
};

/**
 * The size of the textarea can also be set with 'rows' and 'cols' props
 */
export const RowsAndColsSet = {
  args: {
    rows: 20,
    cols: 40,
    placeholder: 'With rows = 20 and cols = 40',
  },
};

export const AutoGrowShortText = {
  args: {
    autoGrow: true,
    defaultValue: 'Hello World!',
    width: '400px',
  },
};

/**
 * Auto-growing textarea adjusts its height based on content
 * Perfect for displaying commands or long text where you want the entire content visible
 * Simply set autoGrow={true} and the textarea will grow to show all content
 */
export const AutoGrowTextArea = {
  args: {
    autoGrow: true,
    placeholder:
      'Type or paste content here...\nThe textarea will automatically grow to fit all the content.',
    defaultValue: `docker run -d \\
  --name my-container \\
  -p 8080:80 \\
  -v /host/path:/container/path \\
  -e ENV_VAR=value \\
  my-image:latest`,
    width: '500px',
  },
};

/**
 * Auto-growing textarea with long command example
 * The entire command is visible without scrolling
 */
export const AutoGrowWithLongCommand = {
  args: {
    autoGrow: true,
    variant: 'code',
    defaultValue: `kubectl apply -f - <<EOF
apiVersion: v1
kind: Pod
metadata:
  name: my-pod
  labels:
    app: myapp
spec:
  containers:
  - name: nginx
    image: nginx:1.14.2
    ports:
    - containerPort: 80
    env:
    - name: DATABASE_URL
      value: "postgresql://user:password@localhost:5432/db"
    - name: API_KEY
      valueFrom:
        secretKeyRef:
          name: api-secret
          key: api-key
EOF`,
    width: '600px',
  },
};
