import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import styled, { keyframes } from 'styled-components';
import { Navbar } from '../../src/lib/components/navbar/Navbar.component';
import { ScrollbarWrapper } from '../../src/lib/components/scrollbarwrapper/ScrollbarWrapper.component';
import { Stack, spacing } from '../../src/lib/spacing';
import { Text } from '../../src/lib/components/text/Text.component';
import { TextBadge } from '../../src/lib/components/textbadge/TextBadge.component';
import { Icon } from '../../src/lib/components/icon/Icon.component';
import { Button } from '../../src/lib/components/buttonv2/Buttonv2.component';
import { getThemePropSelector } from '../../src/lib/utils';

// ─── Guardian brand ───────────────────────────────────────────────────────────

const GUARDIAN_PURPLE = '#A78BFA';
const GUARDIAN_PURPLE_DIM = 'rgba(167, 139, 250, 0.12)';
const GUARDIAN_PURPLE_GLOW = 'rgba(167, 139, 250, 0.06)';

// ─── Animations ───────────────────────────────────────────────────────────────

const pulse = keyframes`
  0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
  50%       { opacity: 0.85; box-shadow: 0 0 0 6px rgba(239, 68, 68, 0); }
`;

// ─── Page layout ──────────────────────────────────────────────────────────────

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${getThemePropSelector('backgroundLevel1')};
  color: ${getThemePropSelector('textPrimary')};
`;

const BodyArea = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const IconRail = styled.div`
  flex: 0 0 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: ${spacing.r20};
  gap: ${spacing.r12};
  border-right: 1px solid ${getThemePropSelector('backgroundLevel2')};
`;

const IconRailButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: ${spacing.r8};
  border-radius: ${spacing.r8};
  color: ${getThemePropSelector('textTertiary')};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s, color 0.15s;

  &:hover {
    background: ${getThemePropSelector('backgroundLevel2')};
    color: ${getThemePropSelector('textPrimary')};
  }
`;

const MainArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

// ─── Scrollable content ───────────────────────────────────────────────────────

const CenteredContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 72px ${spacing.r24} ${spacing.r40};
  overflow-y: auto;

  /* Subtle brand glow behind the greeting */
  background: radial-gradient(
    ellipse 60% 30% at 50% 0%,
    ${GUARDIAN_PURPLE_GLOW} 0%,
    transparent 70%
  );
`;

const ContentColumn = styled.div`
  width: 100%;
  max-width: 660px;
  display: flex;
  flex-direction: column;
  gap: ${spacing.r32};
`;

// ─── Greeting ─────────────────────────────────────────────────────────────────

const GreetingBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.r12};
`;

const GreetingHeadline = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.r12};
  flex-wrap: wrap;
`;

const GreetingH1 = styled.h1`
  margin: 0;
  font-size: 1.85rem;
  font-weight: 700;
  line-height: 1.25;
  color: ${getThemePropSelector('textPrimary')};
`;

const GreetingName = styled.span`
  color: ${GUARDIAN_PURPLE};
`;

const DeploymentPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${spacing.r6};
  padding: ${spacing.r4} ${spacing.r10};
  border-radius: 999px;
  border: 1px solid ${getThemePropSelector('backgroundLevel3')};
  background: ${getThemePropSelector('backgroundLevel2')};
  font-size: 0.78rem;
  font-weight: 500;
  color: ${getThemePropSelector('textSecondary')};
  white-space: nowrap;
  cursor: default;
  transition: border-color 0.15s;

  &:hover {
    border-color: ${GUARDIAN_PURPLE};
  }
`;

// ─── Alert card ───────────────────────────────────────────────────────────────

const AlertCard = styled.div`
  border-radius: 12px;
  border: 1px solid ${getThemePropSelector('backgroundLevel3')};
  background: ${getThemePropSelector('backgroundLevel2')};
  padding: ${spacing.r20};
  display: flex;
  flex-direction: column;
  gap: ${spacing.r20};

  /* Red glow on critical alerts */
  box-shadow:
    0 0 0 1px rgba(239, 68, 68, 0.15),
    0 4px 24px rgba(239, 68, 68, 0.08),
    0 1px 3px rgba(0, 0, 0, 0.3);
`;

const AlertCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.r10};
`;

const AlertDot = styled.div`
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: ${getThemePropSelector('statusCritical')};
  flex-shrink: 0;
  animation: ${pulse} 2.4s ease-in-out infinite;
`;

const AgentAnalysisBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.r12};
  background: ${getThemePropSelector('backgroundLevel3')};
  border-radius: ${spacing.r8};
  padding: ${spacing.r14} ${spacing.r16};
`;

const AgentAnalysisHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.r8};
`;

const AgentLabel = styled.span`
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${GUARDIAN_PURPLE};
`;

const AlertItemRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${spacing.r10};
  padding: ${spacing.r8} 0;
  border-bottom: 1px solid ${getThemePropSelector('backgroundLevel2')};

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  &:first-child {
    padding-top: 0;
  }
`;

const SeverityChip = styled.span`
  flex-shrink: 0;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${getThemePropSelector('statusCritical')};
  background: rgba(239, 68, 68, 0.12);
  padding: 2px ${spacing.r6};
  border-radius: 4px;
  line-height: 1.6;
`;

const AlertMessage = styled.span`
  font-size: 0.85rem;
  color: ${getThemePropSelector('textSecondary')};
  line-height: 1.5;
`;

const AlertNodeId = styled.code`
  font-size: 0.78rem;
  font-family: 'Courier New', monospace;
  color: ${getThemePropSelector('textTertiary')};
  background: ${getThemePropSelector('backgroundLevel2')};
  padding: 1px ${spacing.r4};
  border-radius: 3px;
  white-space: nowrap;
`;

// ─── Suggested actions ────────────────────────────────────────────────────────

const SuggestedActionsBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.r8};
`;

const SuggestedChip = styled.button`
  display: flex;
  align-items: center;
  gap: ${spacing.r10};
  padding: ${spacing.r10} ${spacing.r14};
  border-radius: 999px;
  border: 1px solid ${getThemePropSelector('backgroundLevel3')};
  background: ${GUARDIAN_PURPLE_DIM};
  color: ${getThemePropSelector('textPrimary')};
  font-size: 0.875rem;
  font-weight: 400;
  cursor: pointer;
  text-align: left;
  transition: border-color 0.15s, background 0.15s;
  width: 100%;

  &:hover {
    border-color: ${GUARDIAN_PURPLE};
    background: rgba(167, 139, 250, 0.18);
  }
`;

const ChipIconWrap = styled.span`
  color: ${GUARDIAN_PURPLE};
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

// ─── Chat input bar ───────────────────────────────────────────────────────────

const ChatBarWrapper = styled.div`
  padding: ${spacing.r12} ${spacing.r24} ${spacing.r20};
  display: flex;
  justify-content: center;
  background: ${getThemePropSelector('backgroundLevel1')};
`;

const ChatBarInner = styled.div`
  width: 100%;
  max-width: 660px;
  background: ${getThemePropSelector('backgroundLevel2')};
  border-radius: 16px;
  border: 1px solid ${getThemePropSelector('backgroundLevel3')};
  padding: ${spacing.r12} ${spacing.r14};
  display: flex;
  flex-direction: column;
  gap: ${spacing.r10};
  transition: border-color 0.15s, box-shadow 0.15s;

  &:focus-within {
    border-color: ${GUARDIAN_PURPLE};
    box-shadow: 0 0 0 3px ${GUARDIAN_PURPLE_DIM};
  }
`;

const ChipsRow = styled.div`
  display: flex;
  gap: ${spacing.r6};
  flex-wrap: wrap;
`;

const ContextChip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${spacing.r6};
  padding: ${spacing.r4} ${spacing.r10};
  border-radius: 999px;
  background: rgba(167, 139, 250, 0.15);
  border: 1px solid rgba(167, 139, 250, 0.3);
  font-size: 0.75rem;
  font-family: 'Courier New', monospace;
  color: ${GUARDIAN_PURPLE};
`;

const ChipCloseButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: rgba(167, 139, 250, 0.6);
  display: flex;
  align-items: center;
  line-height: 1;
  transition: color 0.15s;

  &:hover {
    color: ${GUARDIAN_PURPLE};
  }
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.r8};
`;

const ChatPlaceholder = styled.span`
  flex: 1;
  font-size: 0.9rem;
  color: ${getThemePropSelector('textTertiary')};
  user-select: none;
`;

const SendButton = styled.button`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: none;
  background: ${GUARDIAN_PURPLE};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.15s, transform 0.1s;

  &:hover {
    background: #c4b5fd;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.97);
  }
`;

// ─── Navbar logo ──────────────────────────────────────────────────────────────

const GuardianLogoWrap = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.r8};
  padding: 0 ${spacing.r16};
`;

const GuardianIcon = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 5px;
  background: linear-gradient(135deg, #6366f1 0%, #a78bfa 50%, #38bdf8 100%);
  flex-shrink: 0;
`;

const GuardianWordmark = styled.span`
  font-weight: 800;
  font-size: 0.95rem;
  letter-spacing: 0.1em;
  color: ${getThemePropSelector('textPrimary')};
`;

// ─── Data ─────────────────────────────────────────────────────────────────────

type AlertEntry = {
  severity: 'High';
  message: string;
  nodeId: string;
};

const activeAlerts: AlertEntry[] = [
  { severity: 'High', message: 'One or more vital scores dropped below acceptable threshold on', nodeId: 'a128Z00000bDz7IQAC' },
  { severity: 'High', message: 'One or more vital scores dropped below acceptable threshold on', nodeId: 'a121W00000Q0ba5QAR' },
  { severity: 'High', message: 'Storage capacity threshold exceeded on one or more volumes on', nodeId: 'a128Z00000LweOkQAJ' },
  { severity: 'High', message: 'One or more vital scores dropped below acceptable threshold on', nodeId: 'a128Z00000LweOkQAJ' },
  { severity: 'High', message: 'One or more vital scores dropped below acceptable threshold on', nodeId: 'a12PK000001sRnRYAU' },
];

const suggestedActions = [
  "What's the health of my deployment?",
  'Check Guardian alerts on my platform',
];

const contextChips = ['a12PK000001sRnRYAU', 'a121W00000JrOlFQAV'];

// ─── Story component ──────────────────────────────────────────────────────────

const GuardianHome = () => {
  const [chips, setChips] = React.useState(contextChips);

  return (
    <PageWrapper>
      <Navbar
        logo={
          <GuardianLogoWrap>
            <GuardianIcon />
            <GuardianWordmark>GUARDIAN</GuardianWordmark>
            <TextBadge text="Beta" variant="infoPrimary" />
          </GuardianLogoWrap>
        }
        rightActions={[
          {
            type: 'button',
            label: 'QuickStart',
            icon: <Icon name="Documentation" />,
            variant: 'secondary',
            onClick: () => {},
          },
          {
            type: 'dropdown',
            text: 'Valamir Miezelis',
            icon: <Icon name="Account" />,
            items: [
              { label: 'My account', onClick: () => {} },
              { label: 'Sign out', onClick: () => {} },
            ],
          },
        ]}
      />

      <BodyArea>
        <IconRail>
          <IconRailButton aria-label="Dashboard">
            <Icon name="Dashboard" size="larger" />
          </IconRailButton>
          <IconRailButton aria-label="Edit">
            <Icon name="Edit" size="larger" />
          </IconRailButton>
        </IconRail>

        <MainArea>
          <ScrollbarWrapper>
            <CenteredContent>
              <ContentColumn>

                {/* ── Greeting ── */}
                <GreetingBlock>
                  <GreetingHeadline>
                    <GreetingH1>
                      Good afternoon,{' '}
                      <GreetingName>Valamir Miezelis</GreetingName>.
                    </GreetingH1>
                    <DeploymentPill>
                      5 deployments
                      <Icon name="Info-circle" color="textTertiary" size="smaller" />
                    </DeploymentPill>
                  </GreetingHeadline>
                  <Text variant="Basic" color="textSecondary">
                    Learn more about Scality products, anticipate
                    capacity-related issues, and plan corrective actions through
                    predictive models and anomaly detection.
                  </Text>
                </GreetingBlock>

                {/* ── Alert card ── */}
                <AlertCard>
                  <AlertCardHeader>
                    <AlertDot />
                    <Text variant="Basic" isEmphazed>
                      5 active alerts
                    </Text>
                  </AlertCardHeader>

                  <AgentAnalysisBlock>
                    <AgentAnalysisHeader>
                      <Icon name="Alert" color="infoPrimary" size="smaller" />
                      <AgentLabel>Agent analysis</AgentLabel>
                    </AgentAnalysisHeader>

                    {activeAlerts.map((alert, i) => (
                      <AlertItemRow key={i}>
                        <SeverityChip>{alert.severity}</SeverityChip>
                        <AlertMessage>
                          {alert.message}{' '}
                          <AlertNodeId>{alert.nodeId}</AlertNodeId>
                        </AlertMessage>
                      </AlertItemRow>
                    ))}
                  </AgentAnalysisBlock>

                  <SuggestedActionsBlock>
                    {suggestedActions.map((action) => (
                      <SuggestedChip key={action} onClick={() => {}}>
                        <ChipIconWrap>
                          <Icon name="Arrow-right" size="smaller" />
                        </ChipIconWrap>
                        {action}
                      </SuggestedChip>
                    ))}
                  </SuggestedActionsBlock>
                </AlertCard>

              </ContentColumn>
            </CenteredContent>
          </ScrollbarWrapper>

          {/* ── Chat input bar ── */}
          <ChatBarWrapper>
            <ChatBarInner>
              {chips.length > 0 && (
                <ChipsRow>
                  {chips.map((chip) => (
                    <ContextChip key={chip}>
                      {chip}
                      <ChipCloseButton
                        aria-label={`Remove ${chip}`}
                        onClick={() => setChips((prev) => prev.filter((c) => c !== chip))}
                      >
                        <Icon name="Close" size="smaller" />
                      </ChipCloseButton>
                    </ContextChip>
                  ))}
                </ChipsRow>
              )}
              <InputRow>
                <ChatPlaceholder>Type your question or request…</ChatPlaceholder>
                <SendButton aria-label="Send">
                  <Icon name="Arrow-up" />
                </SendButton>
              </InputRow>
            </ChatBarInner>
          </ChatBarWrapper>
        </MainArea>
      </BodyArea>
    </PageWrapper>
  );
};

// ─── Storybook meta ───────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Templates/Guardian Home',
  parameters: {
    layout: 'fullscreen',
    fullPage: true,
  },
};

export default meta;
type Story = StoryObj;

export const WithActiveAlerts: Story = {
  render: () => <GuardianHome />,
};
