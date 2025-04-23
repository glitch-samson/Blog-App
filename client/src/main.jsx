
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/home/Home.jsx';
import SingleBlog from './pages/blogs/SingleBlog.jsx';
import BlogsPage from './pages/BlogsPage.jsx';
import Create from './pages/Create.jsx';
import SearchPage from './components/SearchPage.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/blogs",
        element: <BlogsPage/>
      },
      {
        path: "/create",
        element: <Create/>
      },
      {
        path: "/search",
        element: <SearchPage/>
      },
      {
        path: "/blogs/:id",
        element: <SingleBlog/>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />,
)
