import { LuBadgeInfo, LuBadgeX } from 'react-icons/lu';

const ErrorFetching = () => {
  return (
    <div className='flex flex-col items-center justify-center p-8 bg-base-200 rounded-lg shadow-lg'>
      <h3 className='text-2xl font-bold tracking-wide text-error flex items-center gap-2.5'>
        <span>Error Fetching Data</span>
        <LuBadgeX size={32} className='text-error' />
      </h3>
      <p className='text-center text-base-content/50 md:max-w-md mt-8 flex items-center gap-1.5'>
        <LuBadgeInfo size={24} className='text-info' />
        <span>
          There was an error fetching the data. Please try again later.
        </span>
      </p>
    </div>
  );
};

export default ErrorFetching;
