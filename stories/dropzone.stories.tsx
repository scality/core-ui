import React from 'react';
import { Dropzone } from '../src/lib/components/dropzone/Dropzone';
import { Wrapper, Title } from './common';
export default {
  title: 'Components/Dropzone',
  component: Dropzone,
  decorators:[(story) => (
    <Wrapper style={{minHeight:"10vh"}} >
        {story()}
    </Wrapper>) ],
};

export const InlineSingleFile = {
  args:{
    variant:"inline",
    multiple:false
  }
}

export const InlineMultipleFiles = {
  args: {
    variant:"inline",
    multiple:true
  }
}

export const LargeSingleFile = {
  args:{
    variant:"large",
    multiple:false
  }
}

export const LargeMulipleFiles = {
  args:{
    variant:"large",
    multiple:true
  }
}

export const OnlyAcceptsImage = {
  ...LargeMulipleFiles,
  args:{
    ...LargeMulipleFiles.args,
    accept: {
      'image/jpeg':[],
      'image/png':[]
    }
  }
}
