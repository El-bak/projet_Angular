import { Meta, StoryObj } from '@storybook/angular';
import { LoginFormComponent } from '../app/ui/login-form.component';

const meta: Meta<LoginFormComponent> = {
  title: 'UI/Login Form',
  component: LoginFormComponent,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<LoginFormComponent>;

export const Default: Story = {
  args: {},
};

export const Prefilled: Story = {
  args: {
    username: 'demo-user',
    password: 'secret123',
  } as any,
};
