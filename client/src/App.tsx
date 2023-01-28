import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Register, Landing, Error, ProtectedRoute } from './pages';
import {
  Active,
  Past,
  Summary,
  Trial,
  SharedLayout,
  Profile,
  AddSubscription,
} from './pages/dashboard';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route path='summary' element={<Summary />} />
          <Route index element={<Active />} />
          <Route path='trial' element={<Trial />} />
          <Route path='past' element={<Past />} />
          <Route path='add-subscription' element={<AddSubscription />} />
          <Route path='profile' element={<Profile />} />
        </Route>
        <Route path='/register' element={<Register />} />
        <Route path='/landing' element={<Landing />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
