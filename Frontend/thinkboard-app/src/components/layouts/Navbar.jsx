import { LuPlus } from 'react-icons/lu';
import { Link } from 'react-router';

const Navbar = () => {
  return (
    <nav className='container h-28 flex items-center bg-base-200 border-b border-base-content/20'>
      <ul className='flex items-center justify-between gap-10 w-full'>
        <li>
          {/* Logo */}
          <h1 className='text-primary font-black text-lg sm:text-2xl tracking-wider'>
            ThinkBoard
          </h1>
        </li>
        <li>
          <Link to={'/create'} className='btn btn-primary font-bold text-sm'>
            <LuPlus size={16} /> <span>New Note</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
