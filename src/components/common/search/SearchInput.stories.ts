import SearchInput, { SearchInputProps } from '@/components/common/search/SearchInput';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/common/search/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
} satisfies Meta<typeof SearchInput>;

export default meta;

type Story = StoryObj<SearchInputProps>;

export const Default: Story = {
  args: {
    // SearchInputProps에 맞는 값이 있으면 여기에 작성
  },
};
