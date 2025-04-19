import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import LocationSearchPanel from '../components/LocationSearchPanel';
import { BsChevronCompactDown } from "react-icons/bs";
import VehiclePanel from '../components/VehiclePanel';


function UserHome() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showLocationPanel, setShowLocationPanel] = useState(true);
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const formContainerRef = useRef(null);
  const locationPanelRef = useRef(null);
  const vehiclePanelRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleLocationSelect = (location) => {
    // If picking up location is empty, set it first
    if (!pickup) {
      setPickup(location);
    } else {
      // Otherwise set destination
      setDestination(location);
    }
    
    // Show vehicle panel and hide location panel
    setShowLocationPanel(false);
    
    // Animate the transition
    gsap.to(locationPanelRef.current, {
      height: 0,
      opacity: 0,
      duration: 0.3,
      ease: 'power3.inOut',
      onComplete: () => {
        gsap.to(vehiclePanelRef.current, {
          height: 'auto',
          opacity: 1,
          duration: 0.4,
          ease: 'power3.out'
        });
      }
    });
  };

  const handleDownArrowClick = () => {
    // Show location panel again
    setShowLocationPanel(true);
    
    // Animate the transition
    gsap.to(vehiclePanelRef.current, {
      height: 0,
      opacity: 0,
      duration: 0.3,
      ease: 'power3.inOut',
      onComplete: () => {
        gsap.to(locationPanelRef.current, {
          height: 'auto',
          opacity: 1,
          duration: 0.4,
          ease: 'power3.out'
        });
      }
    });
  };

  useGSAP(() => {
    if (isExpanded) {
      gsap.to(formContainerRef.current, {
        height: '90vh',
        bottom: 0,
        duration: 0.5,
        ease: 'power3.out'
      });
      
      if (showLocationPanel) {
        gsap.to(locationPanelRef.current, {
          height: 'auto',
          opacity: 1,
          duration: 0.4,
          ease: 'power3.out'
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          height: 'auto',
          opacity: 1,
          duration: 0.4,
          ease: 'power3.out'
        });
      }
    } else {
      gsap.to(formContainerRef.current, {
        height: 'auto',
        bottom: 0,
        duration: 0.5,
        ease: 'power3.inOut'
      });
      
      gsap.to(locationPanelRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power3.inOut'
      });
      
      gsap.to(vehiclePanelRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power3.inOut'
      });
    }
  }, [isExpanded, showLocationPanel]);

  return (
    <div className='h-screen relative'>
      <Link to='/'><img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber logo" className='w-16 absolute left-5 top-5' /></Link>
      <div className=''>
        <img className='w-full h-screen object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_rbrCDbss3kRmbeiZoslsXiTdENOYg9iXCA&s" alt="map img" />
      </div>
      <div className='h-screen w-full absolute top-0 flex flex-col justify-end'>
        <div
          ref={formContainerRef}
          className="absolute bg-white w-full p-6 bottom-0 overflow-auto"
          style={{ maxHeight: isExpanded ? '90vh' : 'auto' }}
        >
          <form onSubmit={handleSubmit} className='relative'>
            {isExpanded && (
              <div className="flex justify-center mb-2">
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <BsChevronCompactDown className='h-8 w-full'></BsChevronCompactDown>
                </button>
              </div>
            )}
            <div className="flex flex-col gap-4 mt-4 w-full bg-white">
              <h4 className='text-2xl font-semibold'>Find a trip</h4>
              {!isExpanded && (<div className="line absolute h-16 w-[0.2rem] top-[45%] left-3 bg-gray-900"></div>)}
              <input
                type="text"
                placeholder="Add a pick-up location"
                className="bg-gray-100 px-8 py-2 rounded-md w-full"
                onFocus={() => {
                  setIsExpanded(true);
                  setShowLocationPanel(true);
                }}
                onChange={(e) => setPickup(e.target.value)}
                value={pickup}
              />
              <input
                type="text"
                placeholder="Enter your destination"
                className="bg-gray-100 px-8 py-2 rounded-md w-full"
                onFocus={() => {
                  setIsExpanded(true);
                  setShowLocationPanel(true);
                }}
                onChange={(e) => setDestination(e.target.value)}
                value={destination}
              />
            </div>
  
            <div
              ref={locationPanelRef}
              className="mt-4 bg-white overflow-hidden opacity-0"
              style={{ height: 0, display: showLocationPanel ? 'block' : 'none' }}
            >
              <LocationSearchPanel onLocationSelect={handleLocationSelect} />
            </div>
            
            <div
              ref={vehiclePanelRef}
              className="mt-4 bg-white overflow-hidden opacity-0"
              style={{ height: 0, display: !showLocationPanel ? 'block' : 'none' }}
            >
              <VehiclePanel onDownArrowClick={handleDownArrowClick} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserHome;