import Landing from "./pages/Landing";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { AddJob, AllJobs, Profile, Stats, SharedLayout } from "./pages/dashboard";
import Register from "./pages/Register";
import Error from "./pages/Error";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
   
    <BrowserRouter>
    <Routes>
      <Route path='/' element={
        <ProtectedRoute>

         <SharedLayout />
        </ProtectedRoute>
     
    
    }
       >
        <Route index element={<Stats />} />
        <Route path='add-job' element={<AddJob />} />
        <Route path='all-jobs' element={<AllJobs />} />
        <Route path='profile' element={<Profile />} />
      </Route>
      <Route path='/register' element={<Register />} />
      <Route path='/landing' element={<Landing />} />
      <Route path='*' element={<Error />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
