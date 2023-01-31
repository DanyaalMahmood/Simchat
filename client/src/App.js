import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Landingpage from './components/Landingpage';
import Signin from './components/Signin';
import Signup from './components/Signup';

function App() {
  return (
    <BrowserRouter>
      <Routes path="/">
        <Route index element={<Landingpage/>}/>
        <Route path="signup" element={<Signup/>}/>
        <Route path="signin" element={<Signin/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
