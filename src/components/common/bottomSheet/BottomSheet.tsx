import { Sheet } from 'react-modal-sheet';
import React, { useCallback, useMemo } from 'react';
import BottomSheetTitle from '@/components/common/bottomSheet/BottomSheetTitle/BottomSheetTitle';
import CloseBtn from '@/components/common/bottomSheet/CloseBtn/CloseBtn';
import useAddHouseWorkStore from '@/store/useAddHouseWorkStore';

interface BottomSheetProps {
  /** 바텀시트 오픈 여부 */
  isOpen: boolean;
  /** isOpen 바꾸는 set함수 */
  setOpen: (isOpen: boolean) => void;
  /**바텀시트 타이틀 */
  title: string;
  /**바텀시트 close 버튼 */
  closeBtn?: boolean;
  /**바텀시트 컨텐츠 */
  children: React.ReactNode;
  selectedDate?: Date | undefined;
  setSelectedDate?: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  setOpen,
  title,
  closeBtn = true,
  children,
  setSelectedDate,
  selectedDate,
}) => {
  const { targetHousework } = useAddHouseWorkStore();

  const handleClick = useCallback(() => {
    if (selectedDate) {
      setSelectedDate?.(undefined);
    }
    if (targetHousework?.startDate) {
      const date = new Date(targetHousework.startDate);
      setSelectedDate?.(date);
    }
    setOpen(false);
  }, [selectedDate, targetHousework?.startDate]);

  const memoizedTitle = useMemo(() => title, [title]);

  const SheetHeader = useMemo(
    () => (
      <Sheet.Header>
        <BottomSheetTitle title={memoizedTitle} />
      </Sheet.Header>
    ),
    [memoizedTitle]
  );

  return (
    <>
      <Sheet
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        detent='content-height'
        disableDrag={true}
      >
        <div className='relative mx-auto h-full w-full max-w'>
          <Sheet.Container>
            {closeBtn && <CloseBtn handleClick={handleClick} />}
            {SheetHeader}
            <Sheet.Content>{children}</Sheet.Content>
          </Sheet.Container>
        </div>
        <Sheet.Backdrop />
      </Sheet>
    </>
  );
};

export default BottomSheet;
