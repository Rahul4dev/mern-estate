import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { About, Home, Profile, SignIn, SignOut } from './pages';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-out" element={<SignOut />} />
      </Routes>
    </BrowserRouter>
  );
}
