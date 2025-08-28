import { createBrowserRouter } from 'react-router';
import { HomePage, CreatePage, NoteDetailsPage } from './routes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/create',
    element: <CreatePage />,
  },
  {
    path: '/note/:id',
    element: <NoteDetailsPage />,
  },
]);

export default router;
