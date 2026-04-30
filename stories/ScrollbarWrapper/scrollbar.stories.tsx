import { Meta, StoryObj } from '@storybook/react-webpack5';
import React from 'react';
import styled from 'styled-components';
import { ScrollbarWrapper } from '../../src/lib/components/scrollbarwrapper/ScrollbarWrapper.component';
import { Wrapper, Title, SubTitle } from '../common';

const meta: Meta<typeof ScrollbarWrapper> = {
  title: 'Components/Navigation/ScrollbarWrapper',
  component: ScrollbarWrapper,
};

export default meta;

type Story = StoryObj<typeof ScrollbarWrapper>;

const Demo = styled.div`
  height: 200px;
  overflow: auto;
`;

const Row = styled.div`
  display: flex;
  gap: 2rem;
`;

const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const List = styled.ul`
  height: 240px;
  overflow-y: auto;
  margin: 0;
  padding: 0;
  list-style: none;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
`;

const Item = styled.li`
  padding: 0.6rem 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.backgroundLevel2};
  &:last-child {
    border-bottom: none;
  }
`;

export const Default: Story = {
  render: () => (
    <Wrapper>
      <Title>Wrapper for custom scrollbar</Title>
      <ScrollbarWrapper>
        <Demo>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          varius urna sed rutrum blandit. Nunc neque libero, gravida at
          pharetra id, fringilla eget tortor. Proin ut nunc auctor, aliquet
          neque ut, dignissim nisl. Mauris ut odio nibh. Cras et faucibus
          mauris, non tincidunt est. Ut sed dolor arcu. Proin sollicitudin
          ante ac lectus faucibus, vitae ullamcorper mi convallis. Sed at
          porttitor nunc. Vestibulum est leo, ornare ut tellus vitae, dictum
          posuere quam. Ut vitae lectus a metus consequat scelerisque. Mauris
          feugiat pretium dui non blandit. Mauris ut consequat nisi, at
          aliquam purus. Vivamus a pretium urna, ut rutrum libero. Etiam
          gravida sed nisi lobortis tincidunt. Aenean mauris urna, varius quis
          aliquam ac, consequat quis elit. Phasellus rhoncus ipsum vitae
          fermentum suscipit. Sed purus diam, venenatis ut quam eget,
          venenatis pretium mi. Vivamus aliquam orci eu ante bibendum tempus.
          Donec ullamcorper sapien velit, et fermentum massa rhoncus sit amet.
          Quisque est tortor, pellentesque eu hendrerit non, placerat sed
          odio. Proin id nisi cursus odio convallis pretium. Sed non nibh
          quam. Proin accumsan mi ac orci convallis aliquam ac eu neque.
          Suspendisse lorem ligula, aliquet vel dictum in, imperdiet nec
          mauris. Vivamus consequat mattis est eu scelerisque. Class aptent
          taciti sociosqu ad litora torquent per conubia nostra, per inceptos
          himenaeos. Fusce et quam id quam eleifend auctor. Ut ultrices
          placerat leo vitae tristique. Nulla sit amet eleifend eros, et
          vestibulum mauris. Sed fringilla orci vitae arcu feugiat, eu
          tincidunt tortor tempus. Aliquam facilisis purus in nisi gravida
          sagittis. Donec dictum finibus purus nec luctus. Nullam ultrices
          bibendum risus condimentum sollicitudin. Quisque ac ultricies dolor.
          In dictum vel ipsum at porta. Aenean id mi at orci ultrices faucibus
          eu id odio. Morbi non vehicula lorem. Ut aliquet molestie sagittis.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
          lacinia odio a arcu ultricies, ut mollis nisl suscipit. Etiam sem
          lectus, cursus in ultrices ut, aliquet id libero. Aliquam at lorem
          scelerisque, tempor ligula eu, congue eros. Maecenas vel enim eget
          odio venenatis viverra. Morbi eu magna tincidunt, ultrices urna id,
          varius mauris. Suspendisse lorem purus, hendrerit vel leo eu, dictum
          fermentum mauris. Donec a convallis orci. Morbi est nisi, sodales id
          scelerisque ac, sollicitudin et ex. Sed consequat interdum semper.
          Integer imperdiet eleifend sem eu vulputate. Nunc porttitor aliquet
          sem, nec tempus ipsum eleifend nec. Duis accumsan pulvinar
          ultricies. Cras vel commodo diam, id tempor urna. Aliquam in
          ultrices justo, vitae condimentum sapien. Maecenas viverra nisl ut
          ante fermentum vehicula. Duis ultrices, orci a fringilla posuere,
          ante diam laoreet velit, vitae condimentum mi turpis sed ipsum.
          Nullam rhoncus erat turpis, at interdum ligula venenatis non.
          Maecenas auctor sapien ac sem maximus vestibulum. Proin eget congue
          tellus. Suspendisse metus eros, egestas in nisl in, viverra feugiat
          orci. Maecenas sodales lorem libero, a maximus ex malesuada
          sagittis. Etiam tempor, tellus id suscipit congue, mauris nulla
          fermentum nibh, quis fringilla mi tellus at ex. Nam mattis placerat
          lacus, nec laoreet libero faucibus et.
        </Demo>
      </ScrollbarWrapper>
    </Wrapper>
  ),
};

const ITEMS = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`);
const FEW_ITEMS = Array.from({ length: 4 }, (_, i) => `Item ${i + 1}`);

export const ScrollFadeUtility: Story = {
  render: () => (
    <ScrollbarWrapper>
      <Wrapper>
        <Title>scroll-fade utility class</Title>
        <Row>
          <Column>
            <SubTitle>Without scroll-fade</SubTitle>
            <List>
              {ITEMS.map((item) => (
                <Item key={item}>{item}</Item>
              ))}
            </List>
          </Column>
          <Column>
            <SubTitle>With scroll-fade</SubTitle>
            <List className="scroll-fade">
              {ITEMS.map((item) => (
                <Item key={item}>{item}</Item>
              ))}
            </List>
          </Column>
          <Column>
            <SubTitle>With scroll-fade (no overflow)</SubTitle>
            <List className="scroll-fade">
              {FEW_ITEMS.map((item) => (
                <Item key={item}>{item}</Item>
              ))}
            </List>
          </Column>
        </Row>
      </Wrapper>
    </ScrollbarWrapper>
  ),
};
