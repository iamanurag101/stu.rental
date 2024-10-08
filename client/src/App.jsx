import HomePage from './routes/HomePage/HomePage';
import ListPage from './routes/ListPage/ListPage';
import { Layout,RequireAuth } from './routes/Layout/Layout.jsx';
import SinglePage from './routes/SinglePage/SinglePage';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import ProfilePage from './routes/ProfilePage/ProfilePage';
import ProfileUpdatePage from './routes/ProfileUpdatePage/ProfileUpdatePage.jsx';
import Login from './routes/login/Login';
import Register from './routes/Register/Register';
import NewPostPage from './routes/NewPostPage/NewPostPage.jsx';
import { listPageLoader, profilePageLoader, singlePageLoader } from './lib/loaders.js';
import AboutPage from './routes/AboutPage/AboutPage.jsx';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children:[
        {
          path:"/",
          element:<HomePage/>,
          loader: listPageLoader,
        },
        {
          path:"/list",
          element:<ListPage/>,
          loader: listPageLoader,
        },
        {
          path:"/about",
          element: <AboutPage/>
        },
        {
          path:"/:id",
          element:<SinglePage/>,
          loader: singlePageLoader,
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
          element:<ProfilePage/>,
          loader: profilePageLoader
        },
        {
          path:"/profile/update",
          element:<ProfileUpdatePage/>
        },
        {
          path:"/add",
          element:<NewPostPage/>
        },
      ],
    },
  ]);

  return <RouterProvider router={router}/>
  
}

export default App