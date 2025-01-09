import { useEffect, useRef, useState } from 'react';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import Avatar from "../assets/avatar.png"

// Modal Component
const Modal = ({ isOpen, onClose, imageSrc }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    // Handler to close modal when clicking outside of the modal content
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    // Add event listener to document
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        ref={modalRef}
        className="relative w-80 h-80 md:w-96 md:h-96 bg-white rounded-lg shadow-lg overflow-hidden"
      >
        <img src={imageSrc} alt="Full size" className="w-full h-full object-cover" loading="lazy" />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-800 text-white p-2 rounded-full"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

const AlumniCard = ({ alumniData }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate(`/profile/${alumniData._id}`); // Navigate to the profile page
  };

  if (!alumniData) {
    return <div className="text-center text-gray-500">No data available</div>;
  }

  const openModal = (imageSrc) => {
    setSelectedImage(imageSrc);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage('');
  };

  const getLowQualityImageUrl = (url) => {
    if (!url) return Avatar; // Use Avatar as the default image
    const parts = url.split('/upload/');
    return `${parts[0]}/upload/q_auto:low/${parts[1]}`;
  };

  return (
    <>
      <div className="bg-white h-48 p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out flex gap-4">
        <div className='w-1/3 flex flex-col items-center justify-center'>
          <div className='w-24 h-24 border border-teal-500 rounded-full overflow-hidden flex items-center justify-center cursor-pointer shadow-md' onClick={() => openModal(alumniData.profilePicture || Avatar)}>
            <img src={getLowQualityImageUrl(alumniData.profilePicture)} alt="Profile" className='w-full h-full object-cover' />
          </div>
          <div className='mt-4 flex w-full gap-1'>
            <a href={alumniData.linkedin} target="_blank" rel="noopener noreferrer" className='w-1/2 flex justify-center'>
              <button className='flex items-center justify-center w-full rounded-lg h-10 bg-blue-600 hover:bg-blue-500 text-white'>
                <LinkedInIcon />
              </button>
            </a>
            <a href={`/profile/${alumniData._id}`} rel="noopener noreferrer" className='w-1/2 flex justify-center'>
              <button className='flex items-center justify-center w-full rounded-lg h-10 bg-teal-600 hover:bg-teal-500  text-white'>
                <PersonIcon />
              </button>
            </a>
          </div>
        </div>
        <div className='w-2/3 flex flex-col justify-center gap-1 px-4'>
          <div className='text-xl font-semibold text-gray-800'>{alumniData.name}</div>
          <div className='text-sm text-gray-700'>{alumniData.instituteId}</div>
          <div className='text-sm text-gray-700'>{alumniData.branch}, {alumniData.graduationYear}</div>
          <div className='text-sm text-gray-700'>{alumniData.role}</div>
          <div className='text-sm text-gray-700'>{alumniData.currentCompany}, {alumniData.city}</div>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={modalOpen} onClose={closeModal} imageSrc={selectedImage} />
    </>
  );
};

export default AlumniCard;
