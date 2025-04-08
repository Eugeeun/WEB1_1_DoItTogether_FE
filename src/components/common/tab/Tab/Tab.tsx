import { memo } from 'react';
import { Tabs, TabsList } from '@/components/common/ui/tabs';
import TabItem from '@/components/common/tab/Tab/TabItem';

interface Charger {
  name: string;
}

export interface TabProps {
  activeTab: string;
  handleSetActiveTab: (newActiveTab: string) => void;
  chargers: Charger[] | undefined;
}

const Tab = ({ activeTab, handleSetActiveTab, chargers }: TabProps) => {
  return (
    <Tabs defaultValue={activeTab} onValueChange={handleSetActiveTab} value={activeTab}>
      <TabsList className='flex justify-start w-full p-0 overflow-x-auto overflow-y-hidden bg-white rounded-none h-15 no-scrollbar'>
        {chargers?.map(charger => (
          <TabItem key={charger.name} name={charger.name} value={charger.name} />
        ))}
      </TabsList>
    </Tabs>
  );
};

export default memo(Tab);
