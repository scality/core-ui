import React from 'react';
import { CloudProgressBar } from '../src/lib/components/cloudprogressbar/CloudProgressBar.component';
import { Wrapper, Title, SubTitle } from './common';
export default {
  title: 'Components/Progress & loading/CloudProgressBar',
  component: CloudProgressBar,
  decorators:[(story) => (
    <Wrapper style={{minHeight:'10vh', padding:'3rem'}} >
        {story()}
    </Wrapper>) ],
  render: ({containerSize, percentage, ...args}) => (
    <div
      style={{
        width: containerSize,
        margin: '20px 0 20px 0',
      }}
    >
      <CloudProgressBar percentage={percentage} {...args} >
      <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
      }}
    >
      <Title>{percentage}%</Title>
      <SubTitle>of the quotas has been reached.</SubTitle>
    </div>
    </CloudProgressBar>
        </div>
    
  )
  ,
  args:{
    containerSize:"300px",
    percentage:30,
    borderSize:"1.5px",
    cloudColor:"yellow",
    progressCloudColor:"blue",
  },
  argTypes:{
    containerSize:{
      description:"The container width determines the cloud size"
    },
    cloudColor:{
      control:{
        type:'color'
      }
    },
    progressCloudColor:{
      control:{
        type:'color'
      }
    }
  }
}
export const Default ={
}

export const DifferentSize = {
  args:{
    containerSize:"400px",
    percentage:50,
    borderSize:"1.5px",
    cloudColor:"#ccc",
    progressCloudColor:"#000",
  }
}

export const DifferentColor ={
  args:{
    containerSize:'500px',
    percentage:80,
    borderSize:"2px",
    cloudColor:"#3d383a",
    progressCloudColor:"#83d136"
  }
}

export const HugeSize = {
  args:{
    containerSize:'700px',
    percentage:70,
    borderSize:"2.5px",
    cloudColor:"#BDFFB0",
    progressCloudColor:"#A3FFCB"
  }
}



// export const Default = {
//   render: ({}) => {
//     return (
//       <Wrapper>
//         <Title>CloudProgressBar</Title>
//         <div
//           style={{
//             width: '300px',
//             margin: '20px 0 20px 0',
//           }}
//         >
//           <CloudProgressBar
//             percentage={30}
//             borderSize="1.5px"
//             cloudColor="yellow"
//             progressCloudColor="blue"
//           >
//             <div
//               style={{
//                 position: 'absolute',
//                 top: '50%',
//                 left: '50%',
//                 transform: 'translate(-50%,-50%)',
//               }}
//             >
//               <Title>30%</Title>
//               <SubTitle>of the quotas has been reached.</SubTitle>
//             </div>
//           </CloudProgressBar>
//         </div>
//         <div
//           style={{
//             width: '400px',
//             margin: '20px 0 20px 0',
//           }}
//         >
//           <CloudProgressBar
//             percentage={50}
//             borderSize="1.5px"
//             cloudColor="#ccc"
//             progressCloudColor="#000"
//           >
//             <div
//               style={{
//                 position: 'absolute',
//                 top: '50%',
//                 left: '50%',
//                 transform: 'translate(-50%,-50%)',
//               }}
//             >
//               <Title>50%</Title>
//               <SubTitle>of the quotas has been reached</SubTitle>
//             </div>
//           </CloudProgressBar>
//         </div>
//         <div
//           style={{
//             width: '500px',
//             margin: '20px 0 20px 0',
//           }}
//         >
//           <CloudProgressBar
//             percentage={80}
//             borderSize="2px"
//             cloudColor="#3d383a"
//             progressCloudColor="#83d136"
//           >
//             <div
//               style={{
//                 position: 'absolute',
//                 top: '50%',
//                 left: '50%',
//                 transform: 'translate(-50%,-50%)',
//               }}
//             >
//               <Title>80%</Title>
//               <SubTitle>of the quotas has been reached</SubTitle>
//             </div>
//           </CloudProgressBar>
//         </div>
//         <div
//           style={{
//             width: '600px',
//             margin: '20px 0 20px 0',
//           }}
//         >
//           <CloudProgressBar
//             percentage={70}
//             borderSize="2px"
//             cloudColor="#BDFFB0"
//             progressCloudColor="#A3FFCB"
//           >
//             <div
//               style={{
//                 position: 'absolute',
//                 top: '50%',
//                 left: '50%',
//                 transform: 'translate(-50%,-50%)',
//               }}
//             >
//               <Title>70%</Title>
//               <SubTitle>of the quotas has been reached</SubTitle>
//             </div>
//           </CloudProgressBar>
//         </div>
//       </Wrapper>
//     );
//   },
// };
