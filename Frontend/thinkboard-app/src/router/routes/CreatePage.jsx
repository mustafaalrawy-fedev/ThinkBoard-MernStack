import { useRef } from 'react';
import { LuMoveLeft } from 'react-icons/lu';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router';
import { usePost } from '../../hooks/useFetch';
import CreateNoteForm from '../../components/layouts/CreateNoteForm';

const CreatePage = () => {
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const { isLoading, handlePost } = usePost();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const content = contentRef.current.value;

    if (!title.trim() || !content.trim()) {
      toast.error('Please Fill All The Fields', {
        icon: '✍️',
      });
      return;
    }
    if (title.length < 3) {
      toast.error('Title Should Be At least 3 Characters Long');
      return;
    }

    try {
      await handlePost({ title, content });
      titleRef.current.value = '';
      contentRef.current.value = '';
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className='py-10 container'>
      <Link to={'/'} className='btn btn-ghost btn-md'>
        <LuMoveLeft size={24} />
        <span>Back To Notes</span>
      </Link>
      <CreateNoteForm
        contentRef={contentRef}
        titleRef={titleRef}
        isLoading={isLoading}
        handleSubmit={(e) => handleSubmit(e)}
      />
    </section>
  );
};

export default CreatePage;
