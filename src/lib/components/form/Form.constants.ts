import { spacing } from '../../spacing';

const PAGE_CONTENT_MAX_WIDTH = '45rem';

/**
 * How wide a `kind: 'page'` form's content gets, gutter included. Lives apart
 * from the component so a layout placing something beside the form can tell
 * whether the form still has the room it wants, without pulling the form in.
 */
export const PAGE_FORM_WIDTH = `calc(${PAGE_CONTENT_MAX_WIDTH} + ${spacing.f16})`;
