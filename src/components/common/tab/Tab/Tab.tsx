import { memo } from 'react';
import { Tabs, TabsList } from '@/components/common/ui/tabs';
import TabItem from '@/components/common/tab/Tab/TabItem';

interface Charger {
  name: string;
  count?: number;
}

export interface TabProps {
  activeTab: string;
  handleSetActiveTab: (newActiveTab: string) => void;
  chargers: Charger[] | undefined;
}

const Tab = ({ activeTab, handleSetActiveTab, chargers }: TabProps) => {
  return (
    <Tabs defaultValue={activeTab} onValueChange={handleSetActiveTab} value={activeTab}>
      <TabsList className='h-15 flex w-full justify-start overflow-x-auto overflow-y-hidden rounded-none bg-white p-0 no-scrollbar'>
        {chargers?.map(charger => (
          <TabItem
            key={charger.name}
            name={charger.name}
            value={charger.name}
            count={charger.count}
          />
        ))}
      </TabsList>
    </Tabs>
  );
};

export default memo(Tab);
