import { LuLoaderPinwheel } from 'react-icons/lu';

const Loader = () => {
  return (
    <div className='flex items-center justify-center gap-2'>
      <LuLoaderPinwheel size={32} className='animate-spin text-primary' />
      <div className='text-xl font-black tracking-widest uppercase text-primary animate-pulse'>
        Loading...
      </div>
    </div>
  );
};

export default Loader;
