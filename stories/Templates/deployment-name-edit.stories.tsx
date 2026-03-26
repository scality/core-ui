import React, { useEffect, useRef, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import styled, { createGlobalStyle } from 'styled-components';
import { Navbar } from '../../src/lib/components/navbar/Navbar.component';
import { Modal } from '../../src/lib/components/modal/Modal.component';
import { Tooltip } from '../../src/lib/components/tooltip/Tooltip.component';
import { Button } from '../../src/lib/components/buttonv2/Buttonv2.component';
import { Icon } from '../../src/lib/components/icon/Icon.component';
import { Loader } from '../../src/lib/components/loader/Loader.component';
import { Stack, spacing } from '../../src/lib/spacing';
import { Text, SecondaryText } from '../../src/lib/components/text/Text.component';
import { TextBadge } from '../../src/lib/components/textbadge/TextBadge.component';
import { InfoMessage } from '../../src/lib/components/infomessage/InfoMessage.component';
import { Logo } from '../../src/lib/icons/branding';

const PROPAGATION_DURATION_MS = 15_000;

const ModalSizeOverride = createGlobalStyle`
  .sc-modal-content {
    max-width: min(720px, 90vw);
    min-width: 480px;
  }
`;

// ─── Styles ──────────────────────────────────────────────────────────────────

const PageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.backgroundLevel1};
`;

const LogoArea = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.r8};
`;

const NameText = styled.span<{ $hovered: boolean; $disabled: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${spacing.r4};
  font-size: 1rem;
  font-family: 'Lato';
  color: ${(props) => props.theme.textPrimary};
  padding: ${spacing.r4} ${spacing.r8};
  border-radius: ${spacing.r4};
  border: 1px solid
    ${(props) =>
      props.$disabled
        ? 'transparent'
        : props.$hovered
          ? props.theme.infoPrimary
          : 'transparent'};
  cursor: ${(props) => (props.$disabled ? 'default' : 'pointer')};
  white-space: nowrap;
  transition: border-color 0.15s ease;
  opacity: ${(props) => (props.$disabled ? 0.6 : 1)};
`;

const ModalDivider = styled.hr`
  border: none;
  border-top: 1px solid ${(props) => props.theme.backgroundLevel3};
  margin: 0;
`;

const InlineLoaderWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  svg {
    width: 1.25em;
    height: 1.25em;
  }
`;

const NameInput = styled.input`
  font-size: 1rem;
  font-family: 'Lato';
  color: ${(props) => props.theme.textPrimary};
  background: ${(props) => props.theme.backgroundLevel2};
  border: 1px solid ${(props) => props.theme.infoPrimary};
  border-radius: ${spacing.r4};
  padding: ${spacing.r4} ${spacing.r8};
  outline: none;
  min-width: 180px;

  &:focus {
    border-color: ${(props) => props.theme.selectedActive};
    box-shadow: 0 0 0 2px ${(props) => props.theme.selectedActive}33;
  }
`;


const KeyValueGrid = styled.dl`
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: ${spacing.r8} ${spacing.r16};
  margin: 0;
`;

const KeyLabel = styled.dt`
  color: ${(props) => props.theme.textSecondary};
  margin: 0;
`;

const KeyValue = styled.dd`
  color: ${(props) => props.theme.textPrimary};
  margin: 0;
`;

// ─── Editable Deployment Name ─────────────────────────────────────────────────

function EditableDeploymentName({
  name,
  isPropagating,
  onChange,
}: {
  name: string;
  isPropagating: boolean;
  onChange: (newName: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [pendingName, setPendingName] = useState(name);
  const [modalOpen, setModalOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      setPendingName(name);
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing, name]);

  const handleEditStart = () => {
    if (isPropagating) return;
    setIsEditing(true);
    setIsHovered(false);
  };

  const trySubmit = () => {
    const trimmed = pendingName.trim();
    if (trimmed && trimmed !== name) {
      setIsEditing(false);
      setModalOpen(true);
    } else {
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') trySubmit();
    else if (e.key === 'Escape') setIsEditing(false);
  };

  const handleConfirm = () => {
    onChange(pendingName.trim());
    setModalOpen(false);
  };

  const handleModalCancel = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Stack gap="r4" style={{ alignItems: 'center' }}>
        {isEditing ? (
          <NameInput
            ref={inputRef}
            value={pendingName}
            onChange={(e) => setPendingName(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={trySubmit}
            aria-label="Deployment name"
          />
        ) : (
          <Tooltip
            overlay={
              isPropagating
                ? 'Cannot edit while propagating'
                : 'Edit deployment name'
            }
            placement="bottom"
          >
            <NameText
              $hovered={isHovered && !isPropagating && !modalOpen}
              $disabled={isPropagating || modalOpen}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={handleEditStart}
              role={isPropagating ? undefined : 'button'}
              tabIndex={isPropagating ? undefined : 0}
              onKeyDown={(e) =>
                !isPropagating && e.key === 'Enter' && handleEditStart()
              }
            >
              {modalOpen ? pendingName.trim() : name}
              {isPropagating && (
                <InlineLoaderWrapper>
                  <Loader size="smaller" />
                </InlineLoaderWrapper>
              )}
            </NameText>
          </Tooltip>
        )}
      </Stack>

      <Modal
        isOpen={modalOpen}
        close={handleModalCancel}
        title="Rename deployment?"
        footer={
          <Stack gap="r8" direction="horizontal" style={{ justifyContent: 'flex-end' }}>
            <Button
              variant="outline"
              label="Cancel"
              onClick={handleModalCancel}
            />
            <Button
              variant="primary"
              label="Rename"
              onClick={handleConfirm}
            />
          </Stack>
        }
      >
        <Stack direction="vertical" gap="r24">
          <InfoMessage
            title="About deployment names"
            content="The deployment name uniquely identifies this ARTESCA instance. It is auto-generated by default but can be changed. It appears in alerts, in MFA to identify which ARTESCA your credentials apply to, and in Maestro to reference this deployment across orchestration workflows."
          />
          <Text>Are you sure you want to rename this deployment?</Text>
          <KeyValueGrid>
            <KeyLabel>Current name</KeyLabel>
            <KeyValue>{name}</KeyValue>
            <KeyLabel>New name</KeyLabel>
            <KeyValue>{pendingName.trim()}</KeyValue>
          </KeyValueGrid>
          <ModalDivider />
          <SecondaryText style={{ fontStyle: 'italic' }}>
            This change may take a few minutes to propagate across all services.
          </SecondaryText>
        </Stack>
      </Modal>
    </>
  );
}

// ─── Story component ──────────────────────────────────────────────────────────

function DeploymentNameEditTemplate() {
  const [deploymentName, setDeploymentName] = useState('magic-sandbox');
  const [isPropagating, setIsPropagating] = useState(false);
  const [alerts] = useState([{ id: 1 }, { id: 2 }]);

  const handleRename = (newName: string) => {
    setDeploymentName(newName);
    setIsPropagating(true);
    setTimeout(() => setIsPropagating(false), PROPAGATION_DURATION_MS);
  };

  return (
    <PageWrapper>
      <ModalSizeOverride />
      <Navbar
        tabs={[
          { title: 'Overview', selected: true },
          { title: 'Identity' },
          { title: 'Platform' },
          { title: 'Storage Services' },
          { title: 'Data Services' },
          {
            render: (
              <Stack gap="r4" style={{ alignItems: 'center' }}>
                <span>Alerts</span>
                {alerts.length > 0 && (
                  <TextBadge
                    text={String(alerts.length)}
                    variant="statusWarning"
                  />
                )}
              </Stack>
            ),
          },
        ]}
        rightActions={[
          {
            type: 'dropdown',
            icon: <i className="fas fa-user-cog" style={{ fontSize: 14 }} />,
            text: 'Sid Heller',
            items: [
              { label: 'My account', onClick: () => {} },
              { label: 'Sign out', onClick: () => {} },
            ],
          },
        ]}
        logo={
          <LogoArea>
            <Logo />
            <EditableDeploymentName
              name={deploymentName}
              isPropagating={isPropagating}
              onChange={handleRename}
            />
          </LogoArea>
        }
      />
    </PageWrapper>
  );
}

// ─── Style Proposals ─────────────────────────────────────────────────────────

const ProposalsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.backgroundLevel1};
`;

const ProposalRow = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProposalLabel = styled.div`
  padding: ${spacing.r8} ${spacing.r16};
  font-family: 'Lato';
  font-size: 0.75rem;
  color: ${(props) => props.theme.textSecondary};
  background: ${(props) => props.theme.backgroundLevel2};
  border-bottom: 1px solid ${(props) => props.theme.backgroundLevel3};
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

// Shared hover wrapper — interaction only, no text style
const HoverWrapper = styled.span<{ $hovered: boolean; $pill?: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: ${spacing.r4} ${spacing.r8};
  border-radius: ${(props) => (props.$pill ? spacing.r16 : spacing.r4)};
  border: 1px solid ${(props) => (props.$hovered ? props.theme.infoPrimary : 'transparent')};
  background: ${(props) =>
    props.$pill
      ? props.$hovered
        ? props.theme.highlight
        : props.theme.backgroundLevel3
      : 'transparent'};
  cursor: pointer;
  white-space: nowrap;
  transition: border-color 0.15s ease, background 0.15s ease;
`;

const MonospaceText = styled.span`
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.875rem;
  color: ${(props) => props.theme.textPrimary};
`;

const VerticalDivider = styled.span`
  width: 1px;
  height: 1rem;
  background: ${(props) => props.theme.textSecondary};
  opacity: 0.3;
  flex-shrink: 0;
`;

function PreviewName({
  secondary = false,
  pill = false,
  monospace = false,
}: {
  secondary?: boolean;
  pill?: boolean;
  monospace?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <Tooltip overlay="Edit deployment name" placement="bottom">
      <HoverWrapper
        $hovered={hovered}
        $pill={pill}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {monospace
          ? <MonospaceText>magic-sandbox</MonospaceText>
          : secondary
            ? <SecondaryText>magic-sandbox</SecondaryText>
            : <Text>magic-sandbox</Text>
        }
      </HoverWrapper>
    </Tooltip>
  );
}

const TABS = [
  { title: 'Overview', selected: true },
  { title: 'Identity' },
  { title: 'Platform' },
  { title: 'Storage Services' },
  { title: 'Data Services' },
];

const RIGHT_ACTIONS = [
  {
    type: 'dropdown' as const,
    icon: <i className="fas fa-user-cog" style={{ fontSize: 14 }} />,
    text: 'Sid Heller',
    items: [
      { label: 'My account', onClick: () => {} },
      { label: 'Sign out', onClick: () => {} },
    ],
  },
];

function StyleProposalsTemplate() {
  return (
    <ProposalsWrapper>
      <ProposalRow>
        <ProposalLabel>A — Primary text (reference — current state)</ProposalLabel>
        <Navbar tabs={TABS} rightActions={RIGHT_ACTIONS}
          logo={<LogoArea><Logo /><PreviewName /></LogoArea>}
        />
      </ProposalRow>

      <ProposalRow>
        <ProposalLabel>B — Monospace</ProposalLabel>
        <Navbar tabs={TABS} rightActions={RIGHT_ACTIONS}
          logo={<LogoArea><Logo /><PreviewName monospace /></LogoArea>}
        />
      </ProposalRow>

      <ProposalRow>
        <ProposalLabel>C — Pill with background</ProposalLabel>
        <Navbar tabs={TABS} rightActions={RIGHT_ACTIONS}
          logo={<LogoArea><Logo /><PreviewName pill /></LogoArea>}
        />
      </ProposalRow>

      <ProposalRow>
        <ProposalLabel>D — Secondary text + divider after name</ProposalLabel>
        <Navbar tabs={TABS} rightActions={RIGHT_ACTIONS}
          logo={<LogoArea><Logo /><PreviewName secondary /><VerticalDivider /></LogoArea>}
        />
      </ProposalRow>
    </ProposalsWrapper>
  );
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Templates/Deployment Name Edit',
  component: DeploymentNameEditTemplate,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export const Default: StoryObj = {
  render: () => <DeploymentNameEditTemplate />,
};

export const StyleProposals: StoryObj = {
  render: () => <StyleProposalsTemplate />,
};
