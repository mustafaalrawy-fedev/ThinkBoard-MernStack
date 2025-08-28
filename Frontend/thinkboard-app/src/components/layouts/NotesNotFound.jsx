import { LuFilePlus2 } from 'react-icons/lu';
import { Link } from 'react-router';

const NotesNotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center p-8 bg-base-200 rounded-lg shadow-lg'>
      <div className='bg-primary/10 p-4 rounded-full mb-4'>
        <LuFilePlus2 size={64} className='text-primary' />
      </div>
      <h3 className='text-2xl font-bold tracking-wide text-primary'>
        No Notes Found
      </h3>
      <p className='text-center text-base-content/50 md:max-w-md mt-8'>
        Start creating your first note by clicking the "Create Note" button in
        the navigation bar.
      </p>
      <Link
        to={'/create'}
        className='btn btn-primary mt-8 max-w-fit ml-auto flex items-center gap-1.5'
      >
        Create Your First Note
      </Link>
    </div>
  );
};

export default NotesNotFound;
