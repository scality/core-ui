import { Dropzone } from '../src/lib/components/dropzone/Dropzone';
import { Wrapper, Title } from './common';
export default {
  title: 'Components/Dropzone',
  component: Dropzone,
};

export const Default = ({}) => {
  return (
    <Wrapper className="storybook-dropzone">
      <Title>Single file/ inline</Title>
      <Dropzone variant="inline" multiple={false} />
      <Title>Multiple file/ inline</Title>
      <Dropzone variant="inline" multiple={true} />
      <Title>Single file/ large</Title>
      <Dropzone variant="large" multiple={false} />
      <Title>Multiple file/ large</Title>
      <Dropzone variant="large" multiple={true} />
      <Title>Only accepts images</Title>
      <Dropzone
        variant="large"
        multiple={true}
        accept={{
          'image/jpeg': [],
          'image/png': [],
        }}
      />
    </Wrapper>
  );
};
