import styled from 'styled-components';
import { Button } from '../buttonv2/Buttonv2.component';
import { Icon } from '../icon/Icon.component';
import { Input, InputProps } from '../inputv2/inputv2';
import { Modal } from '../modal/Modal.component';
import { useToast } from '../toast/ToastProvider';
import { useForm } from 'react-hook-form';
import { UseMutationResult } from 'react-query';
import { Text } from '../text/Text.component';
import { useState } from 'react';
import { Stack, Wrap } from '../../spacing';

const UnderlinedText = styled(Text)`
  text-decoration-line: underline;
  text-decoration-style: dashed;
  cursor: text;
`;

type InlineInputForm = {
  value: string;
};
type InlineInputProps = {
  defaultValue?: string;
  confirmationModal?: {
    title: JSX.Element;
    body: JSX.Element;
  };
  changeMutation: UseMutationResult<unknown, unknown, InlineInputForm, unknown>;
} & InputProps;

export const InlineInput = ({
  defaultValue,
  confirmationModal,
  changeMutation,
  ...props
}: InlineInputProps) => {
  const { register, handleSubmit, watch, reset } = useForm<InlineInputForm>({
    defaultValues: {
      value: defaultValue,
    },
  });
  const [isConfirmationModalOpened, setIsConfirmationModalOpened] =
    useState(false);
  const handleSuccess = () => {
    setIsConfirmationModalOpened(false);
    setIsEditing(false);
    setIsHover(false);
  };
  const onSubmit = (data: InlineInputForm) => {
    if (confirmationModal) {
      setIsConfirmationModalOpened(true);
    } else {
      changeMutation.mutate(data, {
        onSuccess: () => {
          handleSuccess();
        },
        onError: () => {
          showToast({
            open: true,
            status: 'error',
            message: 'An error occurred while updating the value',
          });
        },
      });
    }
  };
  const { showToast } = useToast();
  const [isHover, setIsHover] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleReset = () => {
    reset();
    setIsEditing(false);
    setIsHover(false);
  };

  //handle esc key to cancel editing
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      handleReset();
    }
  };

  if (isEditing) {
    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            <Input
              {...register('value')}
              size="1/3"
              autoFocus
              onKeyDown={handleKeyDown}
              {...props}
            />
            <Button
              icon={<Icon name="Close" />}
              tooltip={{
                overlay: 'Cancel',
              }}
              type="reset"
              variant="outline"
              onClick={handleReset}
            />
            <Button
              icon={<Icon name="Check" />}
              tooltip={{
                overlay: 'Save',
              }}
              variant="primary"
              type="submit"
              isLoading={changeMutation.isLoading}
            />
          </Stack>
        </form>
        {confirmationModal && (
          <Modal
            isOpen={isConfirmationModalOpened}
            title={confirmationModal.title}
            footer={
              <Wrap>
                <p></p>
                <Stack>
                  <Button
                    label="Cancel"
                    variant="secondary"
                    onClick={() => setIsConfirmationModalOpened(false)}
                  />
                  <Button
                    label="Confirm"
                    variant="primary"
                    isLoading={changeMutation.isLoading}
                    onClick={() => {
                      changeMutation.mutate(watch(), {
                        onSuccess: () => {
                          handleSuccess();
                        },
                        onError: () => {
                          showToast({
                            open: true,
                            status: 'error',
                            message:
                              'An error occurred while updating the value',
                          });
                        },
                      });
                    }}
                  />
                </Stack>
              </Wrap>
            }
          >
            {confirmationModal.body}
          </Modal>
        )}
      </>
    );
  }

  return (
    <Stack
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onFocus={() => setIsHover(true)}
      onBlur={() => setIsHover(false)}
    >
      <UnderlinedText>{watch('value')}</UnderlinedText>
      <Button
        icon={<Icon name="Pencil" />}
        tooltip={{
          overlay: 'Edit',
        }}
        variant="primary"
        onClick={() => setIsEditing(true)}
        style={{ opacity: !isHover ? '0' : '1' }}
      />
    </Stack>
  );
};
