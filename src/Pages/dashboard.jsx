import React, { useState, useEffect } from 'react';
import NavbarComponent from '../components/Navbar';
import UserProfile from '../components/user'; // Import UserProfile from the components folder
import { useNavigate, useLocation } from 'react-router-dom';

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [cores, setCores] = useState([]); // State for managing multiple cores
  const navigate = useNavigate();
  const location = useLocation();

  // Load cores from localStorage when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      // Optionally, fetch user data
      // setUser(fetchedUserData);
    } else {
      setIsLoggedIn(false);
      setUser({});
      navigate('/login');
    }

    // Load cores from localStorage
    const storedCores = localStorage.getItem('cores');
    if (storedCores) {
      setCores(JSON.parse(storedCores));
    }

    // Add core passed from navigation state to the cores array
    if (location.state && location.state.core) {
      const newCore = location.state.core;
      setCores(prevCores => {
        const updatedCores = [...prevCores, newCore];
        localStorage.setItem('cores', JSON.stringify(updatedCores)); // Save updated cores to localStorage
        return updatedCores;
      });
    }
  }, [navigate, location.state]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser({});
    localStorage.removeItem('token'); // Clear token from localStorage
    navigate('/login'); // Redirect to login page
  };

  const handleAddCore = (newCore) => {
    setCores(prevCores => {
      const updatedCores = [...prevCores, newCore];
      localStorage.setItem('cores', JSON.stringify(updatedCores)); // Save updated cores to localStorage
      return updatedCores;
    });
  };

  const handleDeleteCore = (index) => {
    setCores(prevCores => {
      const updatedCores = prevCores.filter((_, i) => i !== index);
      localStorage.setItem('cores', JSON.stringify(updatedCores)); // Save updated cores to localStorage
      return updatedCores;
    });
  };

  return (
    <div>
      <NavbarComponent isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />
      <UserProfile /> {/* Add UserProfile component */}

      {/* Display all cores */}
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Your Cores</h2>
        {cores.length > 0 ? (
          cores.map((core, index) => (
            <div key={index} className="mb-4">
              <img 
                src={core.image} 
                alt="Core" 
                className="w-64 h-80 object-cover mb-4" // Adjusted size here
              />
              <h3 className="text-xl font-semibold">{core.title}</h3>
              <p className="text-gray-700">{core.description}</p>
              <a href={core.link} className="text-blue-500 hover:underline">{core.link}</a>
              <p className="text-gray-500 mt-2">Hashtag: {core.hashtag}</p>
              <button 
                onClick={() => handleDeleteCore(index)}
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-md transition-colors duration-300"
              >
                Delete Core
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No cores created yet.</p>
        )}
      </div>

      {/* Add other components or layout elements as needed */}
    </div>
  );
};

export default Dashboard;
