import styled from 'styled-components';
import { spacing } from '../../style/theme';
type SpacingValue = 0 | 1 | 2 | 4 | 8 | 12 | 14 | 16 | 20 | 24 | 28 | 32;
export type Props = {
  m?: SpacingValue;
  mt?: SpacingValue;
  mr?: SpacingValue;
  mb?: SpacingValue;
  ml?: SpacingValue;
  mx?: SpacingValue;
  my?: SpacingValue;
  p?: SpacingValue;
  pt?: SpacingValue;
  pr?: SpacingValue;
  pb?: SpacingValue;
  pl?: SpacingValue;
  px?: SpacingValue;
  py?: SpacingValue;
};
type PropsName =
  | 'm'
  | 'mt'
  | 'mr'
  | 'mb'
  | 'ml'
  | 'mx'
  | 'my'
  | 'p'
  | 'pt'
  | 'pr'
  | 'pb'
  | 'pl'
  | 'px'
  | 'py';
type CSSField =
  | 'margin'
  | 'margin-top'
  | 'margin-right'
  | 'margin-bottom'
  | 'margin-left'
  | 'padding'
  | 'padding-top'
  | 'padding-right'
  | 'padding-bottom'
  | 'padding-left';
const validValue = [0, 1, 2, 4, 8, 12, 14, 16, 20, 24, 28, 32];

const createSpacingFn = (
  propsName: PropsName,
  spacingFields: Array<CSSField>,
) => (props: Props) => {
  if (!props[propsName] && props[propsName] !== 0) {
    return null;
  }

  let value: SpacingValue = props[propsName];

  if (!validValue.includes(value)) {
    console.warn(
      `'${propsName}' props should be a number in this list: ` +
        '0, 1, 2, 4, 8, 12, 14, 16, 20, 24, 28, 32',
    );
    return null;
  }

  const result = spacingFields
    .map((param: CSSField) => `${param}: ${spacing[`sp${value}`]}`)
    .join(';');
  return result;
};

const m = createSpacingFn('m', ['margin']);
const mt = createSpacingFn('mt', ['margin-top']);
const mr = createSpacingFn('mr', ['margin-right']);
const mb = createSpacingFn('mb', ['margin-bottom']);
const ml = createSpacingFn('ml', ['margin-left']);
const mx = createSpacingFn('mx', ['margin-left', 'margin-right']);
const my = createSpacingFn('my', ['margin-top', 'margin-bottom']);
const p = createSpacingFn('p', ['padding']);
const pt = createSpacingFn('pt', ['padding-top']);
const pr = createSpacingFn('pr', ['padding-right']);
const pb = createSpacingFn('pb', ['padding-bottom']);
const pl = createSpacingFn('pl', ['padding-left']);
const px = createSpacingFn('px', ['padding-left', 'padding-right']);
const py = createSpacingFn('py', ['padding-top', 'padding-bottom']);

/**
 * Most common use cases:
 *
 * `<SpacedBox m={14}><Component /></SpacedBox>`
 *
 * `<SpacedBox as={SpanComponent}><Component /></SpacedBox>`
 *
 * Props : m, mt, mr, mb, ml, mx, my, p, pt, pr, pb, pl, px, py
 *
 * Values: 0, 1, 2, 4, 8, 12, 14, 16, 20, 24, 28, 32
 */
const SpacedBox = styled.div`
  ${m};
  ${mt};
  ${mr};
  ${mb};
  ${ml};
  ${mx};
  ${my};
  ${p};
  ${pt};
  ${pr};
  ${pb};
  ${pl};
  ${px};
  ${py};
`;
export default SpacedBox;