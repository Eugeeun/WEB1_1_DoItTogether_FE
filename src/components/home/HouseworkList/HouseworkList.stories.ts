import type { Meta, StoryObj } from '@storybook/react';
import HouseworkList, { HouseworkListProps } from '@/components/home/HouseworkList/HouseworkList';
import { fn } from '@storybook/test';

const meta = {
  title: 'components/home/HouseworkList',
  component: HouseworkList,
  tags: ['autodocs'],
} satisfies Meta<typeof HouseworkList>;

export default meta;

type Story = StoryObj<HouseworkListProps>;

export const Default: Story = {
  args: {
    handleAction: fn(houseworkId => {
      console.log('Action triggered for housework:', houseworkId);
    }),
    handleEdit: fn(houseworkId => {
      console.log('Edit triggered for housework:', houseworkId);
    }),
    handleDelete: fn(houseworkId => {
      console.log('Delete triggered for housework:', houseworkId);
    }),
  },
};
