import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { BsChevronCompactDown } from "react-icons/bs"
import { MdAccessTime } from "react-icons/md";
import { BsSpeedometer2 } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import captainApi from '../api/captainApi';
import RidePopUp from '../components/RidePopUp';
import RideDetails from '../components/RideDetails';
import { gsap } from 'gsap';
import { CaptainContext } from '../context/CaptainContext';
import { useContext } from 'react';

const CaptainHome = () => {
  const [captain, setCaptain] = useState();
  const [showRidePopUp, setShowRidePopUp] = useState(false);
  const [showRideDetails, setShowRideDetails] = useState(false);
  const [isRideActive, setIsRideActive] = useState(true); // Hardcoded for now as requested
  const [animatingPopUp, setAnimatingPopUp] = useState(false);
  const [animatingDetails, setAnimatingDetails] = useState(false);
  
  const ridePopUpRef = useRef(null);
  const rideDetailsRef = useRef(null);
  const popUpTimeline = useRef(null);
  const detailsTimeline = useRef(null);
  
  useEffect(() => {
    const fetchCaptain = async() => {
      const res = await captainApi.get('captains/captain-profile')
      setCaptain(res.data.data)
    }
    fetchCaptain();
    
    // Initialize GSAP timelines
    popUpTimeline.current = gsap.timeline({ paused: true });
    detailsTimeline.current = gsap.timeline({ paused: true });
    
    // Show ride popup after a delay (simulating a new ride request)
    const timer = setTimeout(() => {
      setShowRidePopUp(true);
    }, 2000);
    
    return() => {
      clearTimeout(timer);
      if (popUpTimeline.current) popUpTimeline.current.kill();
      if (detailsTimeline.current) detailsTimeline.current.kill();
    }
  }, []);

  const [isExpanded, setIsExpanded] = useState(false);
  
  // Handle GSAP animations for ride popup
  useEffect(() => {
    if (!ridePopUpRef.current) return;
    
    if (showRidePopUp) {
      // Reset the panel position before animation starts
      gsap.set(ridePopUpRef.current, { y: '100%', opacity: 0, display: 'block' });
      
      // Create new animation
      popUpTimeline.current.clear()
        .to(ridePopUpRef.current, { 
          y: '0%', 
          opacity: 1, 
          duration: 0.7, 
          ease: "power2.out",
          onStart: () => setAnimatingPopUp(true),
          onComplete: () => setAnimatingPopUp(false)
        });
      
      popUpTimeline.current.play();
    }
  }, [showRidePopUp]);
  
  // Handle GSAP animations for ride details
  useEffect(() => {
    if (!rideDetailsRef.current) return;
    
    if (showRideDetails) {
      // Reset the panel position before animation starts
      gsap.set(rideDetailsRef.current, { y: '100%', opacity: 0, display: 'block' });
      
      // Create new animation
      detailsTimeline.current.clear()
        .to(rideDetailsRef.current, { 
          y: '0%', 
          opacity: 1, 
          duration: 0.7, 
          ease: "power2.out",
          onStart: () => setAnimatingDetails(true),
          onComplete: () => setAnimatingDetails(false)
        });
      
      detailsTimeline.current.play();
    }
  }, [showRideDetails]);
  
  // Functions to handle ride acceptance/rejection with smoother animations
  const handleAcceptRide = () => {
    if (animatingPopUp) return; // Prevent double clicks during animation
    
    popUpTimeline.current.clear()
      .to(ridePopUpRef.current, {
        y: '100%',
        opacity: 0,
        duration: 0.6,
        ease: "power2.in",
        onStart: () => setAnimatingPopUp(true),
        onComplete: () => {
          setAnimatingPopUp(false);
          setShowRidePopUp(false);
          setShowRideDetails(true);
        }
      });
    
    popUpTimeline.current.play();
  };
  
  const handleIgnoreRide = () => {
    if (animatingPopUp) return; // Prevent double clicks during animation
    
    popUpTimeline.current.clear()
      .to(ridePopUpRef.current, {
        y: '100%',
        opacity: 0,
        duration: 0.6,
        ease: "power2.in",
        onStart: () => setAnimatingPopUp(true),
        onComplete: () => {
          setAnimatingPopUp(false);
          setShowRidePopUp(false);
        }
      });
    
    popUpTimeline.current.play();
  };
  
  const handleCancelRide = () => {
    if (animatingDetails) return; // Prevent double clicks during animation
    
    detailsTimeline.current.clear()
      .to(rideDetailsRef.current, {
        y: '100%',
        opacity: 0,
        duration: 0.6,
        ease: "power2.in",
        onStart: () => setAnimatingDetails(true),
        onComplete: () => {
          setAnimatingDetails(false);
          setShowRideDetails(false);
          // If ride is still active, show popup again, otherwise go back to home
          if (isRideActive) {
            setTimeout(() => setShowRidePopUp(true), 100); // Small delay for smoother transition
          }
        }
      });
    
    detailsTimeline.current.play();
  };

  const {captainDetails} = useContext(CaptainContext);
  
  return (
    <div className='h-screen relative'>
      <Link to='/'><img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber logo" className='w-16 absolute left-5 top-5' /></Link>
      <div className=''>
        <img className='w-full h-screen object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_rbrCDbss3kRmbeiZoslsXiTdENOYg9iXCA&s" alt="map img" />
      </div>
      <div className='h-screen w-full absolute top-0 flex flex-col justify-end'>
        <div>
          {isExpanded && (
            <div className="flex justify-center mb-2">
              <button
                onClick={() => {setIsExpanded(false)}}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <BsChevronCompactDown className='h-8 w-full'></BsChevronCompactDown>
              </button>
            </div>
          )}
          <div className='flex flex-col items-center'>
            <div className="flex justify-between gap-2 mt-4 w-full bg-white">
              <div className='ml-10 flex gap-2'>
                <img className='h-14 w-14 rounded-full' src="https://static.vecteezy.com/system/resources/previews/018/865/413/non_2x/car-driver-simple-flat-icon-illustration-free-vector.jpg" alt="driver-illustration" />
                <h2 className='mt-3 text-black text-lg font-semibold'>{captain?.fullName?.firstName} {captain?.fullName?.lastName}
                </h2>
              </div>
              <div className='flex flex-col mr-10'>
                <h2 className='font-bold'>$50</h2>
                <p className='text-sm'>Earned</p>
              </div>
            </div>
            <div className="bg-white w-full flex justify-center p-4">
              <div className="bg-yellow-400 flex justify-around px-10 py-4 w-full rounded-md">
                <div className='flex flex-col justify-center items-center'>
                  <MdAccessTime />
                  <h4 className='font-bold'>10.2 hours</h4>
                  <p>Time spent</p>
                </div>
                <div className='flex flex-col justify-center items-center'>
                  <BsSpeedometer2 />
                  <h4 className='font-bold'>200 km</h4>
                  <p>distance covered</p>
                </div>
                <div className='flex flex-col justify-center items-center'>
                  <FaRegUser />
                  <h4 className='font-bold'>20</h4>
                  <p>customers served</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div 
        ref={ridePopUpRef} 
        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-xl z-20"
        style={{ 
          maxHeight: 'fit-content', 
          transform: 'translateY(100%)', 
          opacity: 0,
          display: showRidePopUp || animatingPopUp ? 'block' : 'none',
          willChange: 'transform, opacity'
        }}
      >
        <RidePopUp onAccept={handleAcceptRide} onIgnore={handleIgnoreRide} />
      </div>
      
      <div 
        ref={rideDetailsRef} 
        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-xl z-30"
        style={{ 
          height: '90vh', 
          transform: 'translateY(100%)', 
          opacity: 0,
          display: showRideDetails || animatingDetails ? 'block' : 'none',
          willChange: 'transform, opacity'
        }}
      >
        <RideDetails onCancel={handleCancelRide} />
      </div>
    </div>
  )
}

export default CaptainHome