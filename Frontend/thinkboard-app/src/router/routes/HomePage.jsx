import Navbar from '../../components/layouts/Navbar';
import NoteCard from '../../components/layouts/NoteCard';
import Loader from '../../components/ui/Loader';
import RateLimitedUi from '../../components/ui/RateLimitedUi';
import { useGet } from '../../hooks/useFetch';
import NotesNotFound from '../../components/layouts/NotesNotFound';
import ErrorFetching from '../../components/layouts/ErrorFetching';

const HomePage = () => {
  const { isRateLimited, isLoading, NotesData, setNotesData, isError } =
    useGet();

  return (
    <section className='min-h-screen'>
      <Navbar />
      <article className='py-5 my-5 container'>
        {isRateLimited && <RateLimitedUi />}
        {NotesData.length > 0 && !isRateLimited && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {NotesData.map((note) => {
              return (
                <NoteCard
                  key={note._id}
                  note={note}
                  setNotesData={setNotesData}
                />
              );
            })}
          </div>
        )}
        {NotesData.length === 0 && !isLoading && !isRateLimited && !isError && (
          <NotesNotFound />
        )}
        {isLoading && <Loader />}
        {isError && !isLoading && !isRateLimited && <ErrorFetching />}
      </article>
    </section>
  );
};

export default HomePage;
