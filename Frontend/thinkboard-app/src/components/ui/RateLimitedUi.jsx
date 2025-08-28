import { LuActivity } from 'react-icons/lu';

const RateLimitedUi = () => {
  return (
    <div className='container py-8'>
      <main className='bg-primary/10 p-8 rounded-lg border border-primary/30 flex flex-col md:flex-row gap-5 shadow-md'>
        {/* Icon */}
        <div className='flex justify-center flex-1 md:flex-0'>
          <LuActivity
            size={96}
            className='bg-primary/20 text-primary p-3 rounded-full '
          />
        </div>
        <aside className='flex flex-col text-center md:text-left'>
          <h3 className='text-2xl font-bold md:mb-1 mb-5'>
            Rate Limit Reached
          </h3>
          <p className='mb-4 md:mb-2 text-md'>
            You've made to many requests in a short period. Please wait a
            moment.
          </p>
          <p className='text-sm opacity-80 tracking-wide'>
            Try again in a few seconds for the best experience.
          </p>
        </aside>
      </main>
    </div>
  );
};

export default RateLimitedUi;
