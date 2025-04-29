import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import TripForm from '../components/TripForm';
import ConfirmRidePanel from '../components/ConfirmRidePanel';
import LookingForDriverPanel from '../components/LookingForDriverPanel';

function UserHome() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showLocationPanel, setShowLocationPanel] = useState(true);
  const [showConfirmRidePanel, setShowConfirmRidePanel] = useState(false);
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [activeField, setActiveField] = useState(null);
  const [lookingForDriverPanel, setLookingForDriverPanel] = useState(false)
  const [vehicle, setVehicle] = useState({});
  const formContainerRef = useRef(null);
  const locationPanelRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleLocationSelect = (location) => {
    if (activeField === 'pickup' && location === destination) {
      alert("Pickup and destination cannot be the same.");
      return;
    }
  
    if (activeField === 'destination' && location === pickup) {
      alert("Pickup and destination cannot be the same.");
      return;
    }
    if (activeField === 'pickup') {
      setPickup(location);
    } else if (activeField === 'destination') {
      setDestination(location);
    }
    setActiveField(null);
    setShowLocationPanel(false);
  
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
          ease: 'power3.out',
        });
      },
    });
  };

  const handleDownArrowClick = () => {
    setShowLocationPanel(true);
    
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
      if (!formContainerRef.current) return;
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
   
    
  }, [isExpanded, showLocationPanel, showConfirmRidePanel]);

  return (
    <div className='h-screen relative'>
      <Link to='/'><img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber logo" className='w-16 absolute left-5 top-5' /></Link>
      <div className=''>
        <img className='w-full h-screen object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_rbrCDbss3kRmbeiZoslsXiTdENOYg9iXCA&s" alt="map img" />
      </div>
      <div className='h-screen w-full absolute top-0 flex flex-col justify-end'>
        {!showConfirmRidePanel && (
          <div
            ref={formContainerRef}
            className="absolute bg-white w-full p-6 bottom-0 overflow-auto"
            style={{ maxHeight: isExpanded ? '90vh' : 'auto' }}
          >
            <form onSubmit={handleSubmit} className='relative'>
              <TripForm 
                pickup={pickup}
                setPickup={setPickup}
                destination={destination}
                setDestination={setDestination}
                isExpanded={isExpanded}
                setIsExpanded={setIsExpanded}
                setShowLocationPanel={setShowLocationPanel}
                setActiveField={setActiveField}
              />
    
              <div
                ref={locationPanelRef}
                className="mt-4 bg-white overflow-hidden opacity-0"
                style={{ height: 0, display: showLocationPanel ? 'block' : 'none' }}
              >
                <LocationSearchPanel onLocationSelect={handleLocationSelect} pickup={pickup} destination={destination} />
              </div>
              
              <div
                ref={vehiclePanelRef}
                className="mt-2 bg-white overflow-hidden opacity-0"
                style={{ height: 0, display: !showLocationPanel ? 'block' : 'none' }}
              >
                <VehiclePanel 
                  onDownArrowClick={handleDownArrowClick} 
                  pickUp={pickup} 
                  destination={destination} 
                  setVehicle={setVehicle} 
                  setShowConfirmRidePanel={setShowConfirmRidePanel} 
                />
              </div>
            </form>
          </div>
        )}
        
        {!lookingForDriverPanel && 
        <div
          ref={confirmRidePanelRef}
          className={`absolute bottom-0 left-0 right-0 bg-white z-50 overflow-auto ${showConfirmRidePanel ? 'block' : 'hidden'}`}
          style={{ 
            height: '90vh',
            opacity: showConfirmRidePanel ? 1 : 0, 
            transform: showConfirmRidePanel ? 'translateY(0)' : 'translateY(100%)'
          }}
        >
         <ConfirmRidePanel  {...{ pickup, destination, vehicle, setLookingForDriverPanel, setShowConfirmRidePanel}}  />
        </div>}

        {lookingForDriverPanel &&
        <div
         ref={confirmRidePanelRef}
         className={`absolute bottom-0 left-0 right-0 bg-white z-50 overflow-auto ${lookingForDriverPanel ? 'block' : 'hidden'}`}
         style={{ 
           height: '90vh',
           opacity: showConfirmRidePanel ? 1 : 0, 
           transform: showConfirmRidePanel ? 'translateY(0)' : 'translateY(100%)'
         }}
        >
       
          <LookingForDriverPanel {...{ pickup, destination, vehicle, setLookingForDriverPanel}} />
        </div>}
      </div>
    </div>
  );
}

export default UserHome;