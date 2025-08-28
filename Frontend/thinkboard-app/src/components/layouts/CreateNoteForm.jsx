import { LuNotebookTabs, LuPlus } from 'react-icons/lu';
import LoadingInputs from '../ui/LoadingInputs';

const CreateNoteForm = ({ titleRef, contentRef, isLoading, handleSubmit }) => {
  return (
    <div className='w-full max-w-3xl mx-auto bg-base-300 rounded-lg p-6 md:p-8 mt-10'>
      <h1 className='text-xl md:text-2xl font-bold mb-4 flex items-center gap-2.5'>
        <span>Create New Note </span>
        <LuNotebookTabs size={24} className='text-primary' />
      </h1>
      <form onSubmit={handleSubmit}>
        <div className='form-control w-full'>
          <label className='label mb-2.5'>
            <LoadingInputs isLoading={isLoading} />
            <span className='label-text'>Title</span>
          </label>
          <input
            type='text'
            ref={titleRef}
            placeholder='Note Title'
            className='input rounded-lg input-bordered outline-none border-none input-primary w-full'
          />
        </div>
        <div className='form-control w-full mt-4 flex flex-col'>
          <label className='label mb-2.5'>
            <LoadingInputs isLoading={isLoading} />
            <span className='label-text'>Content</span>
          </label>
          <textarea
            ref={contentRef}
            className='textarea rounded-lg textarea-bordered h-48 w-full resize-none outline-none border-none textarea-primary'
            placeholder='Write Your Note Here...'
          />
        </div>
        <div className='card-actions justify-end'>
          <button
            disabled={isLoading}
            type='submit'
            className='btn btn-primary mt-5 flex gap-1.5 items-center'
          >
            {isLoading ? (
              <>
                <LoadingInputs isLoading={isLoading} /> <span>Creating...</span>
              </>
            ) : (
              <>
                <LuPlus size={16} /> <span>Create Note</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNoteForm;
