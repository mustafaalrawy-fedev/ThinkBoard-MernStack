import { LuLoaderPinwheel } from 'react-icons/lu';

const LoadingInputs = ({ isLoading }) => {
  return (
    isLoading && (
      <LuLoaderPinwheel size={16} className='animate-spin text-primary' />
    )
  );
};

export default LoadingInputs;
