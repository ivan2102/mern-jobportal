import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Register, Landing, NotFound, ProtectedRoute } from './pages';
import {AddJob, AllJobs, Profile, SharedLayout, Stats } from './pages/dashboard';

function App() {
  return (
    <BrowserRouter>
    <Routes>
     <Route path='/' element={
      <ProtectedRoute>

     <SharedLayout />
     
     </ProtectedRoute>
     }>
      <Route index element={<Stats />} />
      <Route path='add-job' element={<AddJob />} />
      <Route path='all-jobs' element={<AllJobs />} />
      <Route path='profile' element={<Profile />} />
      
     </Route>
     <Route path="/register" element={ <Register/> } />
     <Route path="/landing" element={ <Landing /> } />
     <Route path="*" element={ <NotFound/> } />
    </Routes>

      
   
    </BrowserRouter>
  );
}

export default App;
