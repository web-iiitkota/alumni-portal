// src/App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp'
import Directory from './pages/Directory';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import About from './pages/About';
import Gallery from './pages/Gallery';
import ProminentAlumni from './pages/ProminentAlumni';
import Events from './pages/Events';
import ContactUs from './pages/ContactUs';
import JobsPosting from './pages/JobsPosting';
import Loading from './pages/Loading';
import NotFound from './pages/NotFound';
import JobDetails from './pages/JobDetails';
import EventDetails from './pages/EventDetails';
import News from './pages/News';
import Sitemap from './pages/Sitemap';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust delay as needed

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Router>
      {/* <AuthProvider> */}
        <div className="w-screen h-screen bg-[#19194D]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/directory" element={<Directory />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/about" element={<About />} />
            <Route path="/alumni/gallery" element={<Gallery />} />
            <Route path="/alumni/prominent-alumni" element={<ProminentAlumni />} />
            <Route path="/alumni/job-postings" element={<JobsPosting />} />
            <Route path="/alumni/contact" element={<ContactUs />} />
            <Route path="/events" element={<Events />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:newsId" element={<News />} />
            <Route path="/alumni/job-postings/:id" element={<JobDetails />} />
            <Route path="/events/:title" element={<EventDetails />} />
            <Route path="/sitemap" element={<Sitemap />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      {/* </AuthProvider> */}
    </Router>
  );
}

export default App;
