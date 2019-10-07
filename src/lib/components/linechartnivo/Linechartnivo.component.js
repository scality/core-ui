//@flow
import React from "react";
import styled from "styled-components";
import { Line, ResponsiveLine } from "@nivo/line";
//import { chartdatalist } from "/Users/yanjin/Scality/core-ui/stories/data/chartdatalist";
type Props = {};

const LinechartnivoContainer = styled.div``;
const commonProperties = {
  width: 900,
  height: 400,
  margin: { top: 20, right: 20, bottom: 60, left: 80 }
};
const data = [
  {
    id: "hours",
    data: [
      { x: "00:15:00", y: 89, used_space: 10 },
      { x: "00:30:00", y: 90, used_space: 12 },
      { x: "00:45:00", y: 87, used_space: 30 },
      { x: "01:00:00", y: 89, used_space: 47 },
      { x: "01:15:00", y: 99, used_space: 22 },
      { x: "01:30:00", y: 85, used_space: 15 },
      { x: "01:45:00", y: 93, used_space: 22 },
      { x: "02:00:00", y: 98, used_space: 19 },
      { x: "02:15:00", y: 97, used_space: 43 },
      { x: "02:30:00", y: 95, used_space: 45 },
      { x: "02:45:00", y: 98, used_space: 23 },
      { x: "03:00:00", y: 93, used_space: 21 },
      { x: "03:15:00", y: 88, used_space: 34 },
      { x: "03:30:00", y: 94, used_space: 44 },
      { x: "03:45:00", y: 95, used_space: 18 },
      { x: "04:00:00", y: 85, used_space: 19 },
      { x: "04:15:00", y: 82, used_space: 20 },
      { x: "04:30:00", y: 90, used_space: 24 },
      { x: "04:45:00", y: 92, used_space: 13 },
      { x: "05:00:00", y: 93, used_space: 47 },
      { x: "05:15:00", y: 82, used_space: 41 },
      { x: "05:30:00", y: 82, used_space: 39 },
      { x: "05:45:00", y: 91, used_space: 39 },
      { x: "06:00:00", y: 219, used_space: 44 },
      { x: "06:15:00", y: 91, used_space: 40 },
      { x: "06:30:00", y: 83, used_space: 46 },
      { x: "06:45:00", y: 89, used_space: 17 },
      { x: "07:00:00", y: 80, used_space: 22 },
      { x: "07:15:00", y: 299, used_space: 48 },
      { x: "07:30:00", y: 89, used_space: 48 },
      { x: "07:45:00", y: 99, used_space: 10 },
      { x: "08:00:00", y: 99, used_space: 27 },
      { x: "08:15:00", y: 200, used_space: 22 },
      { x: "08:30:00", y: 100, used_space: 31 },
      { x: "08:45:00", y: 86, used_space: 15 },
      { x: "09:00:00", y: 80, used_space: 31 },
      { x: "09:15:00", y: 99, used_space: 37 },
      { x: "09:30:00", y: 89, used_space: 18 },
      { x: "09:45:00", y: 100, used_space: 10 },
      { x: "10:00:00", y: 95, used_space: 32 },
      { x: "10:15:00", y: 88, used_space: 40 },
      { x: "10:30:00", y: 82, used_space: 13 },
      { x: "10:45:00", y: 97, used_space: 39 },
      { x: "11:00:00", y: 95, used_space: 33 },
      { x: "11:15:00", y: 96, used_space: 28 },
      { x: "11:30:00", y: 91, used_space: 36 },
      { x: "11:45:00", y: 92, used_space: 38 },
      { x: "12:00:00", y: 85, used_space: 18 },
      { x: "12:15:00", y: 100, used_space: 34 },
      { x: "12:30:00", y: 86, used_space: 30 }
    ]
  }
];
function Linechartnivo(props: Props) {
  return (
    <LinechartnivoContainer className="sc-linechartnivo">
      <div className="App" style={{ height: 400 }}>
        <ResponsiveLine
          data={data}
          margin={{ top: 50, right: 60, bottom: 50, left: 120 }}
          xScale={{
            type: "time",
            format: "%H:%M:%S",
            precision: "second"
          }}
          axisBottom={{
            orient: "left",
            format: "%H:%M:%S",
            legendOffset: -80,
            legendPosition: "middle"
          }}
          xFormat="time:%H:%M:%S"
          pointSize={5}
          pointColor="white"
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          useMesh={true}
        />
      </div>
    </LinechartnivoContainer>
  );
}

export default Linechartnivo;
