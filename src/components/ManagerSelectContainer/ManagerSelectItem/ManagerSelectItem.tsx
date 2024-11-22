import React from 'react';

interface ManagerSelectItemProps {
  /**멤버 이름 */
  name: string;
  /** 선택 상태 */
  selectState?: 'default' | 'person' | 'ai';
}

const ManagerSelectItem: React.FC<ManagerSelectItemProps> = ({
  name,
  selectState = 'default',
}: ManagerSelectItemProps) => {
  const getStyle = () => {
    switch (selectState) {
      case 'person':
        return {
          container: 'bg-gray03',
          icon: 'bg-gray02',
          text: 'text-white03',
        };
      case 'ai':
        return {
          container: 'bg-white03 shadow-md',
          icon: 'bg-white01',
          text: 'text-gray03',
        };
      default:
        return {
          container: 'bg-white03',
          icon: 'bg-white01',
          text: 'text-gray03',
        };
    }
  };

  const styles = getStyle();

  return (
    <li className={`flex cursor-pointer items-center gap-x-3 rounded-full p-2 ${styles.container}`}>
      <div className={`h-6 w-6 rounded-full ${styles.icon}`}></div>
      <div className={`text-14 ${styles.text}`}>{name}</div>
    </li>
  );
};

export default ManagerSelectItem;