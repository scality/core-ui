//@flow
import React, { useEffect } from "react";
import styled from "styled-components";
import vegaEmbed from "vega-embed";
type Props = {};

const SparklineContainer = styled.div``;
const id = "#vis";
function Sparkline(props: Props) {
  useEffect(() => {
    vegaEmbed(id, spec, { tooltip: { theme: "dark" } });
  }, [props]);

  //const { x, y, ...rest } = props.encoding;

  const spec = {
    $schema: "https://vega.github.io/schema/vega-lite/v4.json",
    // title: {
    //   text: "Healthy Monitoring"
    // },
    width: 300,
    height: 40,
    data: {
      values: [
        { date: "2019-10-10 00:00:00", y: 33, symbol: "Operation per sec" },
        {
          date: "2019-10-10 01:00:00",
          y: 100,
          symbol: "Operation per sec"
        },
        {
          date: "2019-10-10 02:00:00",
          y: 103,
          symbol: "Operation per sec"
        },
        {
          date: "2019-10-10 03:00:00",
          y: 333,
          symbol: "Operation per sec"
        },
        { date: "2019-10-10 00:00:00", y: 32, symbol: "Latency" },
        { date: "2019-10-10 01:00:00", y: 11, symbol: "Latency" },
        { date: "2019-10-10 02:00:00", y: 33, symbol: "Latency" },
        { date: "2019-10-10 00:00:00", y: 13, symbol: "Bandwidth" },
        { date: "2019-10-10 01:00:00", y: 243, symbol: "Bandwidth" },
        { date: "2019-10-10 02:00:00", y: 333, symbol: "Bandwidth" }
      ]
    },
    mark: "area",
    encoding: {
      x: {
        field: "date",
        type: "temporal",
        axis: {
          title: "Time",
          grid: false
        }
      },
      y: {
        field: "y",
        type: "quantitative",
        axis: {
          title: null,
          grid: false
        }
      },
      color: {
        field: "symbol",
        type: "nominal",
        legend: null
      },
      row: {
        field: "symbol",
        type: "nominal",
        title: null
      }
    }
  };

  return (
    <SparklineContainer className="sc-sparkline">
      <div id={id.substr(1)}></div>
    </SparklineContainer>
  );
}

export default Sparkline;
