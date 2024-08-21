import HomePage from './routes/HomePage/HomePage';
import ListPage from './routes/ListPage/ListPage';
import { Layout,RequireAuth } from './routes/Layout/Layout.jsx';
import SinglePage from './routes/SinglePage/SinglePage';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import ProfilePage from './routes/ProfilePage/ProfilePage';
import Login from './routes/login/Login';
import Register from './routes/Register/Register';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children:[
        {
          path:"/",
          element:<HomePage/>
        },
        {
          path:"/list",
          element:<ListPage/>
        },
        {
          path:"/:id",
          element:<SinglePage/>
        },
        {
          path:"/login",
          element:<Login/>
        },
        {
          path:'/register',
          element:<Register/>
        }
      ]
    },
    {
      path:"/",
      element:<RequireAuth/>,
      children:[
        {
          path:"/profile",
          element:<ProfilePage/>
        },
      ]
    },
  ]);

  return (
    <RouterProvider router={router}/>
  )
}

export default App