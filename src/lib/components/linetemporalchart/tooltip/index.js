//@flow
import { stringify } from 'vega-lite';
import { isArray, isObject, isString } from 'vega-util';
import { spacing } from '../../../style/theme';
import type { Series } from '../LineTemporalChart.component';

/**
 * Format the value to be shown in the tooltip.
 *
 * @param value The value to show in the tooltip.
 * @param valueToHtml Function to convert a single cell value to an HTML string
 */
export function formatValue(
  series: Series,
  colorRange: string[],
  unitLabel: string | null,
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

          const serieIndex = series.findIndex(
            (serie) =>
              serie.getTooltipLabel(serie.metricPrefix, serie.resource) === key,
          );

          content += `<tr>
            <td class="color">
            ${
              serieIndex !== -1
                ? `<span style='background: ${
                    series[serieIndex].isLineDashed
                      ? `repeating-linear-gradient(to right,${colorRange[serieIndex]} 0,${colorRange[serieIndex]} ${spacing.sp1},transparent ${spacing.sp1},transparent ${spacing.sp2})`
                      : colorRange[serieIndex]
                  };width: ${spacing.sp8};height:${
                    spacing.sp2
                  };display: inline-block;vertical-align: middle;'></span>`
                : ''
            }
            </td>
            <td class="key" style="text-align: left;">
                ${valueToHtml(key)}:
            </td>
            <td class="value" style="text-align: right;">
                ${
                  val !== 'NaN'
                    ? `${valueToHtml(val)} ${unitLabel ? unitLabel : ''}`
                    : '-'
                }
            </td>
          </tr>`;
        }
        content += `</table>`;
      }

      return content || '{}'; // show empty object if there are no properties
    }

    return valueToHtml(value);
  };
}
