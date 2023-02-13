import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Landingpage from './components/Landingpage';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Test from './components/Test';
import Friends from './components/Friends';
import Addfriend from './components/Addfriend';
import Messages from './components/Messages';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Landingpage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/test" element={<Test />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/addfriend" element={<Addfriend />} />
            <Route path="/messages" element={<Messages />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
// testing

export default App;
