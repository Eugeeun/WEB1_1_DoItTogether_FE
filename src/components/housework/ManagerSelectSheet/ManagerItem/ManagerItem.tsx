import { CheckIcon, ProfileIcon } from '@/components/common/icon';
import React from 'react';

interface ManagerItemProps {
  /**멤버 이름 */
  name: string;
  /** 선택 상태 */
  selectState?: 'default' | 'selected';
  /**클릭 함수 */
  handleClick: () => void;
}

const ManagerItem = React.forwardRef<HTMLLIElement, ManagerItemProps>(
  ({ name, selectState = 'default', handleClick }, ref) => {
    const getStyle = () => {
      switch (selectState) {
        case 'selected':
          return {
            icon: 'bg-main',
            text: 'text-gray1',
          };
        default:
          return {
            icon: 'bg-gray3',
            text: 'text-gray3',
          };
      }
    };

    const styles = getStyle();

    return (
      <li
        ref={ref}
        className={`flex cursor-pointer items-center justify-between gap-x-3 border-b-[1px] border-solid border-gray3/30 px-5 py-4`}
        onClick={handleClick}
      >
        <div className='flex items-center gap-x-4'>
          <div className={`flex h-6 w-6 items-center justify-center rounded-full ${styles.icon}`}>
            <ProfileIcon
              width={16}
              height={16}
              className={selectState === 'selected' ? 'text-sub' : 'text-gray4'}
            />
          </div>
          <div className={`font-body ${styles.text}`}>{name}</div>
        </div>
        {selectState === 'selected' && <CheckIcon />}
      </li>
    );
  }
);

ManagerItem.displayName = 'ManagerItem';
export default React.memo(ManagerItem);
