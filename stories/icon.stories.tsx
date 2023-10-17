import React from 'react';
import { Icon, iconTable, IconName } from '../src/lib/components/icon/Icon.component';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';


export default {
  title: 'Components/Icon',
  component: Icon,
};

/** 
 * #### Subtitle
 * This is the description 
 * */
export const Playground = {
  args:{
    name:'Exclamation-triangle'
  }
}

export const Size = {
  render:(args) => {
    const NameSizes:SizeProp[] = ["xs","sm","lg"]
    const MultiplicatorSizes:SizeProp[] = ["1x","2x","3x","4x","5x","6x","7x","8x","9x","10x"]
    return (
      <>
      <h3>Size Name</h3>
      <div style={{display:"flex",alignItems:"flex-end"}}>
        {NameSizes.map(size => (
        <div style={{paddingInline:"1rem"}}>
          <Icon size={size} {...args}/>
          <h5 style={{textAlign:"center"}}>{size}</h5>
          </div>))}
      </div>
      <h3>Size Multiplicator</h3>
      <div style={{display:"flex",alignItems:"flex-end", flexWrap:'wrap'}}>
        {MultiplicatorSizes.map(size => (
        <div style={{paddingInline:"1rem"}}>
          <Icon size={size} {...args}/>
          <h5 style={{textAlign:"center"}}>{size}</h5>
          </div>))}
      </div>
      </>
    )
  },
  args:{
    name:"Exclamation-triangle",
  },
  parameters:{
    docs:{
      source:{
        code:null
      }
    }
  }
}

export const Statuses = {
  render:() => {
    return (
      <table style={{width:"70%", textAlign:'center'}}>
        <thead>
          <tr>
            <th>Status</th>
            <th>Visual</th>
            <th>Code</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Unknown</td>
            <td><Icon name='Dot-circle' color='infoPrimary' size='2x' /></td>
            <td>&lt;Icon name='Dot-circle' color='infoPrimary' /&gt;</td>
          </tr>
          <tr>
            <td>Healthy</td>
            <td><Icon name='Check-circle' color='statusHealthy' size='2x' /></td>
            <td>&lt;Icon name='Check-circle' color='statusHealthy' /&gt;</td>
          </tr>
          <tr>
            <td>Warning</td>
            <td><Icon name='Exclamation-circle' color='statusWarning' size='2x' /></td>
            <td>&lt;Icon name='Exclamation-circle' color='statusWarning' /&gt;</td>
          </tr>
          <tr>
            <td>Critical</td>
            <td><Icon name='Times-circle' color='statusCritical' size='2x' /></td>
            <td>&lt;Icon name='Times-circle' color='statusCritical' /&gt;</td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export const AllIcons = {
  render:() => (
    <table>
          <thead>
            <td>Visual</td>
            <td>Name</td>
          </thead>
          <tbody>
            {
            (Object.keys(iconTable) as IconName[]).map((key, index) => (
              <tr key={key}>
                <td style={{paddingRight:"2rem"}} >
                  <Icon key={index} name={key} size={'2x'} />
                </td>
                <td>
                  {key}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
  )
}
