import { Button } from '@/components/common/ui/button';

interface OpenSheetBtnWithLabelProps {
  /**버튼 타이틀 */
  title: string;
  /**선택된 value */
  selected: string;
  /** 클릭하는 이벤트 */
  handleClick: () => void;
}
const OpenSheetBtnWithLabel: React.FC<OpenSheetBtnWithLabelProps> = ({
  title,
  selected,
  handleClick,
}: OpenSheetBtnWithLabelProps) => {
  return (
    <div className='flex items-center gap-x-11'>
      <div className='w-auto whitespace-nowrap'>{title}</div>
      <Button variant='select' size='full' className='text-gray02' onClick={handleClick}>
        {selected}
      </Button>
    </div>
  );
};

export default OpenSheetBtnWithLabel;
