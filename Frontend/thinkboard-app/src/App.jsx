import { RouterProvider } from 'react-router';
import router from './router/router';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <div className='relative min-h-screen w-full'>
        <div className='absolute insert-0 w-full h-full -z-10 items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00ff9d40_100%)]' />
        <Toaster />
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
