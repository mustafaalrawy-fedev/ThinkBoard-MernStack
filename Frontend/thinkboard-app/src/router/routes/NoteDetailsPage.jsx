import { LuMoveLeft, LuTrash2 } from 'react-icons/lu';
import { Link, useNavigate, useParams } from 'react-router';
import DetailedNoteForm from '../../components/layouts/DetailedNoteForm';
import { useDelete, useGetNoteById, usePut } from '../../hooks/useFetch';

const NoteDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { handlePut, isSaving } = usePut();
  const { handleDelete } = useDelete();
  const { NoteData, isLoading: isFetching } = useGetNoteById(id);

  const handleDeleteBtn = async (e) => {
    e.preventDefault();
    // if (window.confirm('Are You Sure You Want To Delete This Note?'))
    navigate('/');
    await handleDelete(id);
  };

  return (
    <section className='py-10 container'>
      <div className='flex items-center justify-between gap-5'>
        <Link to={'/'} className='btn btn-ghost btn-md'>
          <LuMoveLeft size={24} />
          <span>Back To Notes</span>
        </Link>
        <button
          onClick={handleDeleteBtn}
          className='btn btn-error btn-outline btn-md'
        >
          <LuTrash2 size={16} />
          <span>Delete Note</span>
        </button>
      </div>
      <DetailedNoteForm
        isLoading={isFetching || isSaving}
        NoteData={NoteData}
        handlePut={handlePut}
      />
    </section>
  );
};

export default NoteDetailsPage;
