import { createGlobalStyle, css } from 'styled-components';

type Props = {
  children: React.ReactNode;
};

const GlobalStyle = createGlobalStyle`
  /**
   * Global scroll-fade — automatic bottom fade on every scrollable element.
   *
   * No class or wrapper needed. The scroll-driven animation only activates
   * when animation-timeline: scroll(self) has a non-zero range, i.e. only
   * on elements whose content overflows. Non-scrollable elements keep an
   * inactive timeline → @property initial-value 0rem → mask is identity
   * (black 100%) → no compositing, no content clipping.
   *
   * How the property cascade works:
   *   • 0rem  — initial-value; used when timeline is inactive (no overflow)
   *   • 2.5rem — fill-mode:both holds this from scroll-top until near-bottom
   *   • 0rem  — fill-mode:both holds this once fully scrolled to the bottom
   *
   * animation-duration: 1ms
   *   Gecko quirk: Firefox requires a non-zero time duration to initialise
   *   the animation sampling loop, even for scroll-driven animations where
   *   time is irrelevant. Harmless on Blink/WebKit. Can be removed once
   *   Firefox 151+ (targeting stable ~May 2026, Interop 2026 focus area)
   *   removes this requirement.
   *
   * @supports guard: mask-image creates a CSS stacking context, which
   * resets the containing block of position:fixed descendants. Limiting
   * the rule to browsers that understand animation-timeline means
   * Firefox/Safari stable never receive mask-image. In practice,
   * position:fixed elements in this codebase are portalled to <body> so
   * the issue doesn't arise even in supported browsers.
   *
   * Individual animation-* longhand properties are used (not the shorthand)
   * so that component-level animation declarations on more-specific selectors
   * are never overridden.
   */
  @property --scroll-fade-bottom {
    syntax: '<length>';
    inherits: false;
    initial-value: 0rem;
  }

  @keyframes scroll-fade-out {
    from { --scroll-fade-bottom: 2.5rem; }
    to   { --scroll-fade-bottom: 0rem; }
  }

  @supports (animation-timeline: scroll()) {
    * {
      animation-name: scroll-fade-out;
      animation-duration: 1ms; /* Firefox activation quirk — see note above */
      animation-timing-function: linear;
      animation-fill-mode: both;
      animation-timeline: scroll(self);
      /* Dissolve the fade over the final 2.5rem of scroll range. */
      animation-range: calc(100% - 2.5rem) 100%;
      /* mask-image uses the content's own alpha — no background-colour
         knowledge required; whatever sits behind the element shows through. */
      mask-image: linear-gradient(
        to bottom,
        black calc(100% - var(--scroll-fade-bottom)),
        transparent 100%
      );
      -webkit-mask-image: linear-gradient(
        to bottom,
        black calc(100% - var(--scroll-fade-bottom)),
        transparent 100%
      );
    }
  }

${(props) => {
  const brand = props.theme;
  return css`
    // Custom scrollbar
    * {
      // Chrome / Safari / Edge
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }

      ::-webkit-scrollbar-track {
        background: ${brand.backgroundLevel3};
      }

      ::-webkit-scrollbar-thumb {
        width: 4px;
        height: 4px;
        min-height: 20px;
        background: ${brand.border}; // fallback for gradient themes
        background: ${brand.buttonSecondary};
        border-radius: 4px;
        -webkit-border-radius: 4px;
        background-clip: padding-box;
        border: 2px solid rgba(0, 0, 0, 0);
      }

      ::-webkit-scrollbar-thumb:vertical:hover,
      ::-webkit-scrollbar-thumb:horizontal:hover {
        background-color: rgba(89, 90, 120, 0.5);
      }

      ::-webkit-scrollbar-button {
        width: 0;
        height: 0;
        display: none;
      }
      ::-webkit-scrollbar-corner {
        background-color: transparent;
      }

      // Firefox
      scrollbar-color: ${brand.border} ${brand.backgroundLevel3}; // fallback for gradient themes
      scrollbar-color: ${brand.buttonSecondary} ${brand.backgroundLevel3};
      scrollbar-width: thin;
    }
  `;
}}
`;

function ScrollbarWrapper({ children }: Props) {
  return (
    <>
      <GlobalStyle />
      {children}
    </>
  );
}

export { ScrollbarWrapper };
