import { useState } from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { spacing, Stack, Wrap } from '../../spacing';

import { Button } from '../buttonv2/Buttonv2.component';
import { Icon } from '../icon/Icon.component';
import { Text } from '../text/Text.component';

const DropzoneContainer = styled.div<{
  isDragActive: boolean;
  variant: 'inline' | 'large';
}>`
  padding: ${spacing.r24};
  border: ${spacing.f2} dashed
    ${(props) =>
      !props.isDragActive
        ? props.theme.textSecondary
        : props.theme.selectedActive};
  box-sizing: border-box;
  display: flex;
  ${(props) => (props.variant === 'large' ? `text-align: center;` : ``)}
`;

const FileList = styled.div`
  max-height: 100px;
  overflow-y: auto;
  flex: 1;
  width: 100%;
`;
const FileListItem = styled(Wrap)`
  align-items: baseline;
  &:hover {
    background: ${(props) => props.theme.selectedActive};
  }
`;

const defaultDropzoneLabels = {
  doesnt_meet_our_requirements: "doesn't meet our requirements",
  or: 'OR',
  label: 'Drag and drop files and folders here',
  buttonLabel: 'Add files',
  buttonAddMoreLabel: 'Add more files',
};

export function Dropzone({
  labels,
  onChange,
  variant,
  ...dropzoneOptions
}: DropzoneOptions & {
  variant: 'inline' | 'large';
  labels?: Partial<typeof defaultDropzoneLabels>;
  onChange?: (files: File[]) => void;
}) {
  labels = { ...defaultDropzoneLabels, ...labels };
  const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);
  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      ...dropzoneOptions,
      onDrop: (acceptedFiles, rejectedFiles, e) => {
        const { multiple } = dropzoneOptions;

        setAcceptedFiles((alreadyAcceptedFiles) => {
          const singleFileAlreadyHasFile =
            !multiple && alreadyAcceptedFiles.length === 1;

          const newAcceptedFiles = singleFileAlreadyHasFile
            ? alreadyAcceptedFiles
            : [...alreadyAcceptedFiles, ...acceptedFiles];

          if (onChange) {
            onChange(newAcceptedFiles);
          }
          return newAcceptedFiles;
        });
        if (dropzoneOptions.onDrop) {
          dropzoneOptions.onDrop(acceptedFiles, rejectedFiles, e);
        }
      },
    });
  const { multiple } = dropzoneOptions;

  const { onClick, ...rootProps } = getRootProps();

  const removeFile = (fileIndex: number) => {
    setAcceptedFiles((alreadyAcceptedFiles) => {
      const newAcceptedFiles = [...alreadyAcceptedFiles];
      newAcceptedFiles.splice(fileIndex, 1);
      if (onChange) {
        onChange(newAcceptedFiles);
      }
      return newAcceptedFiles;
    });
  };

  return (
    <Stack direction="vertical">
      <DropzoneContainer
        {...rootProps}
        isDragActive={isDragActive}
        variant={variant}
      >
        <input {...getInputProps()} />
        <div style={{ flex: '1' }}>
          {!multiple && acceptedFiles.length === 1 ? (
            <FileListItem>
              <Text>{acceptedFiles[0].name}</Text>
              <Button
                icon={<Icon name="Close" />}
                tooltip={{ overlay: 'Remove' }}
                aria-label={`Remove ${acceptedFiles[0].name}`}
                type="button"
                onClick={() => {
                  removeFile(0);
                }}
              />
            </FileListItem>
          ) : multiple && acceptedFiles.length > 0 ? (
            <Stack direction="vertical">
              <Button
                icon={
                  variant === 'large' ? <Icon name="Create-add" /> : undefined
                }
                variant="secondary"
                type="button"
                label={labels.buttonAddMoreLabel}
                onClick={onClick}
              />
              <FileList>
                {acceptedFiles.map((file, index) => (
                  <FileListItem key={index}>
                    <Text>{file.name}</Text>
                    <Button
                      icon={<Icon name="Close" />}
                      tooltip={{ overlay: 'Remove' }}
                      aria-label={`Remove ${file.name}`}
                      type="button"
                      onClick={() => {
                        removeFile(index);
                      }}
                    />
                  </FileListItem>
                ))}
              </FileList>
            </Stack>
          ) : (
            <Stack
              direction={variant === 'large' ? 'vertical' : 'horizontal'}
              gap={'f16'}
            >
              <Text>
                <Icon name="Upload" size="3x" />
              </Text>
              <Text>{labels.label}</Text>
              {variant === 'large' && <Text>{labels.or}</Text>}
              <Button
                icon={
                  variant === 'large' ? <Icon name="Create-add" /> : undefined
                }
                label={labels.buttonLabel}
                variant="secondary"
                type="button"
                onClick={onClick}
              />
            </Stack>
          )}
        </div>
      </DropzoneContainer>
      <Text variant="Smaller" isEmphazed color="statusCritical">
        {fileRejections.length > 0 ? (
          fileRejections.map((rejection) => rejection.file.name) +
          ' ' +
          labels.doesnt_meet_our_requirements
        ) : (
          <>&nbsp;</>
        )}
      </Text>
    </Stack>
  );
}
