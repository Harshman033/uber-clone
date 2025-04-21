import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export const useAnimations = (isExpanded, currentPanel, formContainerRef, panelRefs) => {
    useGSAP(() => {
    const { locationPanelRef, vehiclePanelRef, confirmRidePanelRef } = panelRefs;
    
    if (isExpanded) {
      // Expand the container
      gsap.to(formContainerRef.current, {
        height: '90vh',
        bottom: 0,
        duration: 0.5,
        ease: 'power3.out'
      });
      
      // Hide all panels first
      hideAllPanels();
      
      // Show current panel
      if (currentPanel === 'location' && locationPanelRef.current) {
        showPanel(locationPanelRef.current);
      } else if (currentPanel === 'vehicle' && vehiclePanelRef.current) {
        showPanel(vehiclePanelRef.current);
      } else if (currentPanel === 'confirm' && confirmRidePanelRef.current) {
        showPanel(confirmRidePanelRef.current);
      }
    } else {
      // Collapse the container
      gsap.to(formContainerRef.current, {
        height: 'auto',
        bottom: 0,
        duration: 0.5,
        ease: 'power3.inOut'
      });
      
      // Hide all panels
      hideAllPanels();
    }
    
    function hideAllPanels() {
      const hidePanel = (ref) => {
        if (ref && ref.current) {
          gsap.to(ref.current, {
            height: 0,
            opacity: 0,
            duration: 0.3,
            ease: 'power3.inOut'
          });
        }
      };
      
      hidePanel(locationPanelRef);
      hidePanel(vehiclePanelRef);
      hidePanel(confirmRidePanelRef);
    }
    
    function showPanel(panelRef) {
      gsap.to(panelRef, {
        height: 'auto',
        opacity: 1,
        duration: 0.4,
        ease: 'power3.out'
      });
    }
  }, [isExpanded, currentPanel, formContainerRef, panelRefs]);
};