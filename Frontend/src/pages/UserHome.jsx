import { useState } from 'react';
// import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

function UserHome() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className='relative h-screen w-screen'>
     <Link to='/'><img src="https://stackoverflow.com/questions/40650366/move-the-annotation-on-map-like-uber-ios-application" alt="Uber logo" className='w-16 h-auto mt-4  mb-8' /></Link>
    <div
      className={`
        fixed left-0 w-full bg-white transition-all duration-500 ease-in-out z-50
        ${isExpanded ? 'top-0 h-full' : 'bottom-0 h-[150px]'}
        shadow-2xl rounded-t-3xl p-4
      `}
    >
      {isExpanded && (
        <div className="flex justify-end">
          <button onClick={() => setIsExpanded(false)}>
            X
          </button>
        </div>
      )}

      <div className="flex flex-col gap-4 mt-4">
        <input
          type="text"
          placeholder="Add a pick-up location"
          className="border border-gray-300 p-3 rounded-lg w-full"
          onFocus={() => setIsExpanded(true)}
        />
        <input
          type="text"
          placeholder="Enter your destination"
          className="border border-gray-300 p-3 rounded-lg w-full"
          onFocus={() => setIsExpanded(true)}
        />

        {isExpanded && (
          <div className="mt-6">
            <p className="text-gray-500 mb-2">Popular locations</p>
            <ul className="space-y-2">
              <li className="p-3 border rounded-md cursor-pointer hover:bg-gray-100">
                Krishna Rajendra Market
              </li>
              <li className="p-3 border rounded-md cursor-pointer hover:bg-gray-100">
                National College
              </li>
              <li className="p-3 border rounded-md cursor-pointer hover:bg-gray-100">
                Bangalore Fort
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

export default UserHome;