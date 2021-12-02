//@flow
import { stringify } from 'vega-lite';
// $FlowFixMe Options is defined as a typescript type and is not recongized by flow
import { Handler, type Options } from 'vega-tooltip';
import { isArray, isObject, isString } from 'vega-util';
import { spacing } from '../../../style/theme';
import type { Serie } from '../LineTemporalChart.component';

export function defaultRenderTooltipSerie({
  color,
  isLineDashed,
  name,
  value,
  key,
}: {
  color?: string,
  isLineDashed?: boolean,
  name: string,
  value: string,
  key: string,
}) {
  return `<tr>
    <td class="color">
    ${
      color !== undefined
        ? `<span style='background: ${
            isLineDashed
              ? `repeating-linear-gradient(to right,${color} 0,${color} ${spacing.sp1},transparent ${spacing.sp1},transparent ${spacing.sp2})`
              : color
          };width: ${spacing.sp8};height:${
            spacing.sp2
          };display: inline-block;vertical-align: middle;'></span>`
        : ''
    }
    </td>
    <td class="key" style="text-align: left;">
        ${name}
    </td>
    <td class="value" style="text-align: right;">
      ${value}
    </td>
  </tr>`;
}

export class TooltipHandlerWithPaint extends Handler {
  constructor(options?: Options, onHover?: (datum: any) => void) {
    super(options);
    this.prevCall = this.call;
    this.onHover = onHover;
    this.call = this.newCall.bind(this);
  }

  newCall(handler: any, event: MouseEvent, item: any, value: any) {
    if (this.onHover && JSON.stringify(value) !== JSON.stringify(this.value)) {
      this.onHover(item.datum.datum);
    }
    this.handler = handler;
    this.event = event;
    this.item = item;
    this.value = value;

    this.prevCall(handler, event, item, value);
  }

  paint() {
    this.prevCall(this.handler, this.event, this.item, this.value);
  }
}

/**
 * Format the value to be shown in the tooltip.
 *
 * @param value The value to show in the tooltip.
 * @param valueToHtml Function to convert a single cell value to an HTML string
 */
export function formatValue(
  series: Serie[],
  customizedColorRange: string[],
  colorRange: string[],
  unitLabel: string,
  yAxisType?: 'default' | 'percentage' | 'symmetrical',
  renderTooltipSerie?: (
    {
      color?: string,
      isLineDashed?: boolean,
      name: string,
      value: string,
      key: string,
      unitLabel: string,
    },
    tooltipData: any,
  ) => string = defaultRenderTooltipSerie,
) {
  return (
    value: any,
    valueToHtml: (value: any) => string,
    maxDepth: number,
  ): string => {
    if (isArray(value)) {
      return `[${value
        .map((v) => valueToHtml(isString(v) ? v : stringify(v, maxDepth)))
        .join(', ')}]`;
    }

    if (isObject(value)) {
      let content = '';

      const { title, image, ...rest } = value;

      if (title) {
        content += `<h2 style="text-align: center;">${valueToHtml(title)}</h2>`;
      }

      if (image) {
        content += `<img src="${valueToHtml(image)}">`;
      }

      const keys = Object.keys(rest);
      if (keys.length > 0) {
        content += '<table>';
        for (const key of keys) {
          let val = rest[key];

          // ignore undefined properties
          if (val === undefined) {
            continue;
          }

          if (isObject(val)) {
            val = stringify(val, maxDepth);
          }

          const currentSerie = series.find(
            (serie) =>
              serie.getTooltipLabel(serie.metricPrefix, serie.resource) === key,
          );

          const currentSerieIndex = series.findIndex(
            (serie) =>
              serie.getTooltipLabel(serie.metricPrefix, serie.resource) === key,
          );

          const serieIndex =
            yAxisType === 'symmetrical' && !customizedColorRange.length
              ? // $FlowFixMe
                [...new Set(series.map((serie) => serie.resource))].findIndex(
                  (serieResource) =>
                    serieResource ===
                    (currentSerie ? currentSerie.resource : null),
                )
              : currentSerieIndex;

          const serieColorRange = customizedColorRange.length
            ? customizedColorRange
            : colorRange;

          content += renderTooltipSerie(
            {
              key,
              color:
                serieIndex !== -1 ? serieColorRange[serieIndex] : undefined,
              isLineDashed:
                serieIndex !== -1 ? series[serieIndex].isLineDashed : undefined,
              name: valueToHtml(key),
              value: val !== 'NaN' ? `${valueToHtml(val)} ${unitLabel}` : '-',
              unitLabel,
            },
            value,
          );
        }
        content += `</table>`;
      }

      return content || '{}'; // show empty object if there are no properties
    }

    return valueToHtml(value);
  };
}
