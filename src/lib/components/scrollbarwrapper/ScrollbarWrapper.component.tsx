import { createGlobalStyle, css } from 'styled-components';

type Props = {
  children: React.ReactNode;
};

const GlobalStyle = createGlobalStyle`
  /**
   * scroll-fade utility
   *
   * Add class="scroll-fade" to any overflow-y: auto/scroll element to get a
   * bottom fade that auto-hides when the user reaches the end of the list.
   *
   * Technique: CSS Scroll-Driven Animations + mask-image (Chrome/Edge 115+).
   * The animated custom property --scroll-fade-bottom drives the mask stop:
   *   • 0 rem  → no mask   (initial-value, used when timeline is inactive = no overflow)
   *   • 2.5rem → full fade (fill-mode: both, held from scroll-top until near-bottom)
   *   • 0 rem  → no mask   (fill-mode: both, held at scroll-bottom)
   *
   * Graceful degradation: browsers without scroll-driven animations receive an
   * inactive timeline → initial-value 0rem → no mask at all (no clipped content,
   * just no fade effect).
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

  .scroll-fade {
    animation: scroll-fade-out linear both;
    animation-timeline: scroll(self);
    /* Fire in the last 2.5rem of scroll range so the fade dissolves smoothly. */
    animation-range: calc(100% - 2.5rem) 100%;
    /* mask-image makes the element's own content transparent at the bottom —
       no background-colour knowledge needed; whatever is behind shows through. */
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
