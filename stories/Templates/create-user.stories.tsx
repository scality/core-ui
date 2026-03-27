import React, { useState } from 'react';
import { Button } from '../../src/lib/components/buttonv2/Buttonv2.component';
import { Checkbox } from '../../src/lib/components/checkbox/Checkbox.component';
import {
  Form,
  FormGroup,
  FormSection,
} from '../../src/lib/components/form/Form.component';
import { Icon } from '../../src/lib/components/icon/Icon.component';
import { Input } from '../../src/lib/components/inputv2/inputv2';
import { Select } from '../../src/lib/components/selectv2/Selectv2.component';
import { Toggle } from '../../src/lib/components/toggle/Toggle.component';
import { Stack } from '../../src/lib/spacing';

export default {
  title: 'Templates/CreateUser',
  component: Form,
};

type FormErrors = {
  username?: string;
  email?: string;
  role?: string;
  password?: string;
  confirmPassword?: string;
};

export const CreateUser = {
  render: () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('');
    const [sendInvite, setSendInvite] = useState(false);
    const [isActive, setIsActive] = useState(true);
    const [errors, setErrors] = useState<FormErrors>({});

    const validate = (): FormErrors => {
      const newErrors: FormErrors = {};
      if (!username) newErrors.username = 'Username is required.';
      if (!email) newErrors.email = 'Email is required.';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        newErrors.email = 'Invalid email format.';
      if (!role) newErrors.role = 'Please select a role.';
      if (!password) newErrors.password = 'Password is required.';
      else if (password.length < 8)
        newErrors.password = 'Password must be at least 8 characters.';
      if (confirmPassword !== password)
        newErrors.confirmPassword = 'Passwords do not match.';
      return newErrors;
    };

    const isFormValid =
      username.trim() !== '' &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
      password.length >= 8 &&
      confirmPassword === password &&
      role !== '';

    const handleSubmit = () => {
      const validationErrors = validate();
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length === 0) {
        alert(`User "${username}" created successfully.`);
      }
    };

    const handleCancel = () => {
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setRole('');
      setSendInvite(false);
      setIsActive(true);
      setErrors({});
    };

    return (
      <Form
        layout={{ kind: 'page', title: 'Create user', icon: 'Account' }}
        requireMode="partial"
        rightActions={
          <Stack gap="r16">
            <Button variant="outline" label="Cancel" onClick={handleCancel} />
            <Button
              variant="primary"
              label="Create user"
              icon={<Icon name="Save" />}
              onClick={handleSubmit}
              disabled={!isFormValid}
            />
          </Stack>
        }
      >
        <FormSection title={{ name: 'Account information', icon: 'Account' }} forceLabelWidth="25%">
          <FormGroup
            direction="horizontal"
            label="Username"
            id="username"
            required
            error={errors.username}
            helpErrorPosition="bottom"
            content={
              <Input
                id="username"
                placeholder="john.doe"
                leftIcon="Account"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (errors.username) setErrors((prev) => ({ ...prev, username: undefined }));
                }}
                onBlur={() => {
                  if (!username.trim()) setErrors((prev) => ({ ...prev, username: 'Username is required.' }));
                }}
              />
            }
          />
          <FormGroup
            direction="horizontal"
            label="Email address"
            id="email"
            required
            error={errors.email}
            helpErrorPosition="bottom"
            content={
              <Input
                id="email"
                type="email"
                placeholder="john.doe@example.com"
                leftIcon="Mail"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                onBlur={() => {
                  if (!email.trim()) setErrors((prev) => ({ ...prev, email: 'Email is required.' }));
                  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
                    setErrors((prev) => ({ ...prev, email: 'Invalid email format.' }));
                }}
              />
            }
          />
          <FormGroup
            direction="horizontal"
            label="Role"
            id="role"
            required
            error={errors.role}
            help={!errors.role ? "Defines the user's access level." : undefined}
            helpErrorPosition="bottom"
            content={
              <Select
                id="role"
                placeholder="Select a role..."
                value={role}
                onChange={(val) => {
                  setRole(val as string);
                  if (errors.role) setErrors((prev) => ({ ...prev, role: undefined }));
                }}
                onBlur={() => {
                  if (!role) setErrors((prev) => ({ ...prev, role: 'Please select a role.' }));
                }}
              >
                <Select.Option value="admin">Administrator</Select.Option>
                <Select.Option value="editor">Editor</Select.Option>
                <Select.Option value="viewer">Viewer</Select.Option>
                <Select.Option value="guest" disabled disabledReason="Contact your admin to enable this role.">
                  Guest
                </Select.Option>
              </Select>
            }
          />
        </FormSection>

        <FormSection title={{ name: 'Security', icon: 'Lock' }} forceLabelWidth="25%">
          <FormGroup
            direction="horizontal"
            label="Password"
            id="password"
            required
            error={errors.password}
            helpErrorPosition="bottom"
            content={
              <Input
                id="password"
                type="password"
                placeholder="Min. 8 characters"
                leftIcon="Lock"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                }}
                onBlur={() => {
                  if (password.length > 0 && password.length < 8) {
                    setErrors((prev) => ({ ...prev, password: 'Password must be at least 8 characters.' }));
                  }
                }}
              />
            }
          />
          <FormGroup
            direction="horizontal"
            label="Confirm password"
            id="confirm-password"
            required
            error={errors.confirmPassword}
            helpErrorPosition="bottom"
            content={
              <Input
                id="confirm-password"
                type="password"
                placeholder="Repeat password"
                leftIcon="Lock"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
                }}
                onBlur={() => {
                  if (confirmPassword && confirmPassword !== password)
                    setErrors((prev) => ({ ...prev, confirmPassword: 'Passwords do not match.' }));
                }}
              />
            }
          />
        </FormSection>

        <FormSection title={{ name: 'Settings' }} forceLabelWidth="25%">
          <FormGroup
            direction="horizontal"
            label="Active account"
            id="is-active"
            help="Inactive users cannot log in."
            helpErrorPosition="right"
            content={
              <Toggle
                name="is-active"
                toggle={isActive}
                label={isActive ? 'Active' : 'Inactive'}
                onChange={() => setIsActive(!isActive)}
              />
            }
          />
          <FormGroup
            direction="horizontal"
            label="Send invitation email"
            id="send-invite"
            help="The user will receive an email to set their password."
            helpErrorPosition="bottom"
            content={
              <Checkbox
                label="Send an invitation email to the user"
                checked={sendInvite}
                onChange={(e) => setSendInvite(e.target.checked)}
              />
            }
          />
        </FormSection>
      </Form>
    );
  },
};
