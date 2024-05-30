import { Meta } from '@storybook/react';
import { spacing, useMutationsHandler } from '../../src/lib';

import { Button } from '../../src/lib/components/buttonv2/Buttonv2.component';

import { useMutation } from 'react-query';

const meta: Meta = {
  title: 'Hooks/useMutationsHandler',
};
const successMutation = () => {
  return useMutation({
    mutationFn: async () => {
      return Promise.resolve('success');
    },
  });
};
const errorMutation = () => {
  return useMutation({
    mutationFn: () => {
      const res = Promise.reject("Don't worry, this is an expected error");
      return res;
    },
  });
};

export const Default = {
  render: () => {
    const mainMutation = errorMutation();

    const dependantMut1 = successMutation();
    const dependantMutations = [
      { mutation: dependantMut1, name: 'Dependant Mutation 1' },
    ];
    const { mutate: test1, reset } = mainMutation;
    const { mutate: test2 } = dependantMut1;

    useMutationsHandler({
      mainMutation: { mutation: mainMutation, name: 'Main Mutation' },
      dependantMutations,
      messageDescriptionBuilder: (mutations) => {
        const mutationsStatus = mutations.map(({ status }) => status);
        const mutationsAllSuccess = mutationsStatus.every(
          (status) => status === 'success',
        );

        if (mutationsAllSuccess) {
          return `All mutations were successful`;
        } else {
          return `One or more mutations failed`;
        }
      },

      onMainMutationSuccess: () => {
        reset();
      },
    });
    const handleClick = () => {
      // test1(null, {
      //   onSuccess: () => test2(),
      // });
      test2();
    };

    return (
      <div>
        <Button onClick={() => handleClick()} label="Click Me" />
      </div>
    );
  },
  argTypes: {
    mainMutation: {
      description:
        'The object containing the main mutation to be executed and its name',
    },
    dependantMutations: {
      description:
        'An array of objects containing the dependant mutations to be executed and their names',
    },
    messageDescriptionBuilder: {
      description:
        'A function that takes an array of mutations and returns a ReactNode use to build the toast message',
    },
    toastProps: {
      description: 'Props to customize the toast',
    },
    onMainMutationSuccess: {
      description:
        'Callback to be executed when the main mutation is successful',
    },
    onAllMutationsSuccess: {
      description: 'Callback to be executed when all mutations are successful',
    },
  },
};

export default meta;

// use onSuccess to call the dependent mutations
// after the main mutation is successful
// if the main mutation is an error, the dependent mutations will not be called
// resulting in an error meassage (one or more mutations failed)
export const MainMutationSuccess = {
  render: ({ args }) => {
    const mainMutation = successMutation();
    const { mutate } = mainMutation;
    useMutationsHandler({
      mainMutation: { mutation: mainMutation, name: 'Main Mutation' },
      messageDescriptionBuilder: (mutations) => {
        const mutationSuccess = mutations.every(
          (mutation) => mutation.status === 'success',
        );
        if (mutationSuccess) {
          return `Mutation succeeded`;
        } else {
          return `Mutation failed`;
        }
      },
    });

    const handleClick = () => {
      mutate();
    };

    return (
      <div>
        <Button onClick={() => handleClick()} label="Click Me" />
      </div>
    );
  },
};

export const CustomToastStyle = {
  render: ({ position, autoDismiss, duration, withProgressBar }) => {
    const mainMutation = successMutation();

    const { mutate, reset } = mainMutation;

    useMutationsHandler({
      mainMutation: { mutation: mainMutation, name: 'Main Mutation' },
      messageDescriptionBuilder: (mutations) => {
        console.log('mutations', mutations);

        const mutationsStatus = mutations.map(({ status }) => status);
        const mutationsAllSuccess = mutationsStatus.every(
          (status) => status === 'success',
        );

        if (mutationsAllSuccess) {
          return `All mutations were successful`;
        } else {
          return `One or more mutations failed`;
        }
      },
      toastProps: {
        position,
        autoDismiss,
        duration,
        withProgressBar,
      },
      onMainMutationSuccess: () => {
        reset();
      },
    });
    const handleClick = () => {
      mutate();
    };

    return (
      <div
        style={{
          height: '10rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button onClick={() => handleClick()} label="Click Me" />
      </div>
    );
  },
  args: {
    position: 'top-right',
    autoDismiss: true,
    duration: 5000,
    withProgressBar: false,
  },
  argTypes: {
    autoDismiss: {
      control: 'boolean',
      description: 'Whether the toast should dismiss automatically',
    },
    duration: {
      control: 'number',
      description: 'The duration before the toast dismisses',
      if: { arg: 'autoDismiss' },
    },
    withProgressBar: {
      control: 'boolean',
      description: 'Whether the toast should display a progress bar',
    },
    position: {
      control: {
        type: 'select',
      },
      options: [
        'top-left',
        'top-right',
        'top-center',
        'bottom-left',
        'bottom-right',
        'bottom-center',
      ],
      description: 'The position of the toast',
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export const CustomMessageDescriptionBuilder = {
  render: () => {
    const mainMutation = successMutation();
    const dependantMut1 = successMutation();
    const dependantMut2 = errorMutation();
    const dependantMutations = [
      { mutation: dependantMut1, name: 'Dependant Mutation 1' },
      { mutation: dependantMut2, name: 'Dependant Mutation 2' },
    ];

    const { mutate, reset } = mainMutation;
    const { mutate: dependantMutate1 } = dependantMut1;
    const { mutate: dependantMutate2 } = dependantMut2;

    useMutationsHandler({
      mainMutation: { mutation: mainMutation, name: 'Main Mutation' },
      dependantMutations,
      messageDescriptionBuilder: (mutations) => {
        console.log('mutations', mutations);

        const mutationsStatus = mutations.map(({ status }) => status);
        const mutationsAllSuccess = mutationsStatus.every(
          (status) => status === 'success',
        );

        if (mutationsAllSuccess) {
          return `All mutations were successful`;
        } else {
          const failedMutations = mutations.filter(
            (mutation) => mutation.status === 'error',
          );
          return (
            <div style={{ padding: spacing.r8 }}>
              You can adapt this text to provide more info to the user <br />
              For example with a list of the failed mutations:
              <ul>
                {failedMutations.map((mutation) => (
                  <li key={mutation.name}>
                    {mutation.name} failed: {mutation.error}
                  </li>
                ))}
              </ul>
            </div>
          );
        }
      },

      onMainMutationSuccess: () => {
        reset();
      },
      toastProps: {
        style: { width: '40rem' },
      },
    });
    const handleClick = () => {
      mutate(void 0, {
        onSuccess() {
          dependantMutate1();
          dependantMutate2();
        },
      });
    };

    return (
      <div style={{ height: '15rem' }}>
        <Button onClick={() => handleClick()} label="Click Me" />
      </div>
    );
  },
};
