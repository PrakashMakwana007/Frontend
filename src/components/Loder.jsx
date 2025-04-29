  import { FaSpinner } from 'react-icons/fa';

  const Loder = () => {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-blue-800 via-gray-800 to-blue-900 flex flex-col items-center justify-center z-50">
        <div className="bg-white bg-opacity-10 p-6 rounded-full shadow-xl backdrop-blur-sm">
          <FaSpinner className="animate-spin text-5xl text-white drop-shadow" />
        </div>
        <p className="mt-4 text-white text-base font-medium tracking-wide animate-pulse">
          Loading, please wait...
        </p>
      </div>
    );
  };

  export default Loder;
