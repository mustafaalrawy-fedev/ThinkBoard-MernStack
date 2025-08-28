import { LuNotebookTabs, LuSaveAll } from 'react-icons/lu';
import LoadingInputs from '../ui/LoadingInputs';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
// import Loader from '../ui/Loader';
import NotesNotFound from '../layouts/NotesNotFound';

const DetailedNoteForm = ({ isLoading, NoteData, handlePut }) => {
  const { _id, title, content } = NoteData || {};
  const [titleValue, setTitleValue] = useState('');
  const [contentValue, setContentValue] = useState('');

  useEffect(() => {
    if (title && content) {
      setTitleValue(title);
      setContentValue(content);
    }
  }, [title, content]);

  const handleUpdateNote = async (e) => {
    e.preventDefault();
    try {
      if (!titleValue.trim() || !contentValue.trim()) {
        toast.error('Please Fill All The Fields', {
          icon: '✍️',
        });
        return;
      }
      if (titleValue.length < 3) {
        toast.error('Title Should Be At least 3 Characters Long');
        return;
      }
      await handlePut(_id, { title: titleValue, content: contentValue });
    } catch (error) {
      console.log(error);
    }
  };

  // if (isLoading) return <Loader />;
  if (!NoteData) return <NotesNotFound />;

  return (
    <div className='w-full max-w-3xl mx-auto bg-base-300 rounded-lg p-6 md:p-8 mt-10'>
      <h1 className='text-xl md:text-2xl font-bold mb-4 flex items-center gap-2.5'>
        <span>Note Detail</span>
        <LuNotebookTabs size={24} className='text-primary' />
      </h1>
      <form onSubmit={handleUpdateNote}>
        <div className='form-control w-full'>
          <label className='label mb-2.5'>
            <LoadingInputs isLoading={isLoading} />
            <span className='label-text'>Title</span>
          </label>
          <input
            type='text'
            placeholder='Note Title'
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
            className='input rounded-lg input-bordered outline-none border-none input-primary w-full'
          />
        </div>
        <div className='form-control w-full mt-4 flex flex-col'>
          <label className='label mb-2.5'>
            <LoadingInputs isLoading={isLoading} />
            <span className='label-text'>Content</span>
          </label>
          <textarea
            className='textarea rounded-lg textarea-bordered h-48 w-full resize-none outline-none border-none textarea-primary'
            placeholder='Write Your Note Here...'
            value={contentValue}
            onChange={(e) => setContentValue(e.target.value)}
          />
        </div>
        <div className='card-actions justify-end'>
          <button
            type='submit'
            disabled={isLoading}
            className='btn btn-primary mt-5 flex gap-1.5 items-center'
          >
            {isLoading ? (
              <>
                <LoadingInputs isLoading={isLoading} />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <LuSaveAll size={16} /> <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DetailedNoteForm;
