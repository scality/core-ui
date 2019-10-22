//@flow
import React, { useEffect } from "react";
import styled from "styled-components";
import vegaEmbed from "vega-embed";

type Props = {
  id: string,
  data: any,
  encoding: any
};

const TestchartContainer = styled.div``;

function Testchart(props: Props) {
  useEffect(() => {
    vegaEmbed(props.id, spec, { tooltip: { theme: "dark" } });
  }, [props]);

  //const { x, y, ...rest } = props.encoding;

  const spec = {
    $schema: "https://vega.github.io/schema/vega-lite/v4.json",
    width: 1000,
    height: 300,
    data: {
      values: [
        { time: "2019-10-01 00:00:00", total_space: 210, used_space: 10 },
        { time: "2019-10-01 00:15:00", total_space: 89, used_space: 10 },
        { time: "2019-10-01 00:30:00", total_space: 90, used_space: 12 },
        { time: "2019-10-01 00:45:00", total_space: 87, used_space: 30 },
        { time: "2019-10-01 01:00:00", total_space: 89, used_space: 47 },
        { time: "2019-10-01 01:15:00", total_space: 99, used_space: 22 },
        { time: "2019-10-01 01:30:00", total_space: 85, used_space: 15 },
        { time: "2019-10-01 01:45:00", total_space: 93, used_space: 22 },
        { time: "2019-10-01 02:00:00", total_space: 98, used_space: 19 },
        { time: "2019-10-01 02:15:00", total_space: 97, used_space: 43 },
        { time: "2019-10-01 02:30:00", total_space: 95, used_space: 45 },
        { time: "2019-10-01 02:45:00", total_space: 98, used_space: 23 },
        { time: "2019-10-01 03:00:00", total_space: 93, used_space: 21 },
        { time: "2019-10-01 03:15:00", total_space: 88, used_space: 34 },
        { time: "2019-10-01 03:30:00", total_space: 94, used_space: 44 },
        { time: "2019-10-01 03:45:00", total_space: 95, used_space: 18 },
        { time: "2019-10-01 04:00:00", total_space: 85, used_space: 19 },
        { time: "2019-10-01 04:15:00", total_space: 82, used_space: 20 },
        { time: "2019-10-01 04:30:00", total_space: 90, used_space: 24 },
        { time: "2019-10-01 04:45:00", total_space: 92, used_space: 13 },
        { time: "2019-10-01 05:00:00", total_space: 93, used_space: 47 },
        { time: "2019-10-01 05:15:00", total_space: 82, used_space: 41 },
        { time: "2019-10-01 05:30:00", total_space: 82, used_space: 39 },
        { time: "2019-10-01 05:45:00", total_space: 91, used_space: 39 },
        { time: "2019-10-01 06:00:00", total_space: 219, used_space: 44 },
        { time: "2019-10-01 06:15:00", total_space: 91, used_space: 40 },
        { time: "2019-10-01 06:30:00", total_space: 83, used_space: 46 },
        { time: "2019-10-01 06:45:00", total_space: 89, used_space: 17 },
        { time: "2019-10-01 07:00:00", total_space: 80, used_space: 22 },
        { time: "2019-10-01 07:15:00", total_space: 299, used_space: 48 },
        { time: "2019-10-01 07:30:00", total_space: 89, used_space: 48 },
        { time: "2019-10-01 07:45:00", total_space: 99, used_space: 10 },
        { time: "2019-10-01 08:00:00", total_space: 99, used_space: 27 },
        { time: "2019-10-01 08:15:00", total_space: 200, used_space: 22 },
        { time: "2019-10-01 08:30:00", total_space: 100, used_space: 31 },
        { time: "2019-10-01 08:45:00", total_space: 86, used_space: 15 },
        { time: "2019-10-01 09:00:00", total_space: 80, used_space: 31 },
        { time: "2019-10-01 09:15:00", total_space: 99, used_space: 37 },
        { time: "2019-10-01 09:30:00", total_space: 89, used_space: 18 },
        { time: "2019-10-01 09:45:00", total_space: 100, used_space: 10 },
        { time: "2019-10-01 10:00:00", total_space: 95, used_space: 32 },
        { time: "2019-10-01 10:15:00", total_space: 88, used_space: 40 },
        { time: "2019-10-01 10:30:00", total_space: 82, used_space: 13 },
        { time: "2019-10-01 10:45:00", total_space: 97, used_space: 39 },
        { time: "2019-10-01 11:00:00", total_space: 95, used_space: 33 },
        { time: "2019-10-01 11:15:00", total_space: 96, used_space: 28 },
        { time: "2019-10-01 11:30:00", total_space: 91, used_space: 36 },
        { time: "2019-10-01 11:45:00", total_space: 92, used_space: 38 },
        { time: "2019-10-01 12:00:00", total_space: 85, used_space: 18 },
        { time: "2019-10-01 12:15:00", total_space: 100, used_space: 34 },
        { time: "2019-10-01 12:30:00", total_space: 86, used_space: 30 }
      ]
    },
    // transform: {
    //   calculate: "datum['total_space'].join('GB')",
    //   as: "total_space_GB"
    // },
    signals: { name: "tooltipUnit", update: "aaa" },
    encoding: {
      x: {
        field: "time",
        type: "temporal",
        timeUnit: "yearmonthdatehoursminutes",
        title: "time"
      },
      tooltip: [
        {
          field: "time",
          type: "temporal",
          timeUnit: "yearmonthdatehoursminutes"
        },
        {
          field: "total_space",
          type: "quantitative",
          title: "TOTAL SPACE"
        },
        {
          field: "used_space",
          type: "quantitative",
          title: "USED SPACE"
        }
      ]
    },
    layer: [
      {
        mark: { type: "line", color: "green" },
        encoding: {
          y: {
            field: "total_space",
            type: "quantitative",
            title: "TOTAL SPACE (/GB)"
          }
        }
      },
      {
        mark: { type: "line", color: "orange" },
        encoding: {
          y: {
            field: "used_space",
            type: "quantitative",
            title: "USED SPACE (/GB)"
          }
        }
      },
      {
        mark: "rule",
        selection: {
          index: {
            type: "single",
            on: "mousemove",
            encodings: ["x"],
            nearest: true
          }
        },
        encoding: {
          color: {
            condition: {
              selection: { not: "index" },
              value: "transparent"
            }
          }
        }
      }
    ]
  };

  return (
    <TestchartContainer className="sc-testchart">
      <div id={props.id.substr(1)}></div>
    </TestchartContainer>
  );
}

export default Testchart;
