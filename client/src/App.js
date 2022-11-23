import TextEditor from "./TextEditor";
import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { v4 as uuidv4 } from 'uuid';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={`/documents/${uuidv4()}`} replace={true}  /> ,
  },
  {
    path: "/documents/:id",
    element: <TextEditor />
  }
]);

function App() {
  return (
    <>
  
    <RouterProvider router={router} />
   
    </>
  );
}

export default App;
