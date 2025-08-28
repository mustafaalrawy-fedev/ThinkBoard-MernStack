import { LuSquarePen, LuTrash2 } from 'react-icons/lu';
import { Link, useNavigate } from 'react-router';
import { formatDate } from '../../lib/utils';
import { useDelete } from '../../hooks/useFetch';

const NoteCard = ({ note, setNotesData }) => {
  const { _id, title, content, createdAt } = note;
  const navigate = useNavigate();
  const { handleDelete } = useDelete();

  function handleDeleteNote(e, id) {
    e.preventDefault();
    // if (!window.confirm('Are You Sure You Want To Delete This Note?')) return;
    handleDelete(id);
    setNotesData((prev) => prev.filter((note) => note._id !== id));
  }

  return (
    <Link
      to={`/note/${_id}`}
      //   className='card bg-base-300 border-t-6 border-primary shadow-primary/10  transform hover:shadow-xl hover:translate-y-[-5px] main-transition'
      className='card bg-base-300 border-t-6 border-primary/50 hover:border-primary shadow-primary/10 hover:shadow-xl main-transition'
    >
      <div className='card-body'>
        <h3 className='text-lg md:text-xl font-bold card-title text-base-content tracking-wide'>
          {title}
        </h3>
        <p className='text-sm text-base-content/50 tracking-wider mb-4'>
          {content}
        </p>
        <div className='card-actions justify-between items-center gap-3'>
          <p className='text-xs tracking-wider text-base-content/50'>
            {formatDate(createdAt)}
          </p>
          {/* Button / actions */}
          <div className='flex items-center gap-1'>
            <button
              onClick={() => navigate(`/note/${_id}`)}
              type='button'
              className='btn btn-ghost btn-xs'
            >
              <LuSquarePen size={16} />
            </button>
            <button
              onClick={(e) => handleDeleteNote(e, _id)}
              type='button'
              className='text-error btn btn-ghost btn-xs'
            >
              <LuTrash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
