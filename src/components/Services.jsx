import React, { useEffect, useRef, useState } from 'react';
import { Leaf, BarChart3, Shield, Zap, Package, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import QuickInspection from './QuickInspection';

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showAllServices, setShowAllServices] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);
  
  const featuredServices = [
    {
      icon: <Package size={40} />,
      title: "Sourcing Inspection",
      description: "Get your cargo inspected at time of loading or production with comprehensive quality checks and documentation.",
      features: [
        "Commodity quality inspection", 
        "Loading/stuffing inspections", 
        "Packaging, fumigation & more", 
        "Physical & chemical testing"
      ],
      whyFeatures: [
        "Maintaining quality at time of production",
        "Ensuring proper packaging and documentation", 
        "Better control of your cargo from production stage",
        "Ensure transparency & traceability for your cargo",
        "Competitive pricing"
      ]
    },
    {
      icon: <MapPin size={40} />,
      title: "Destination Inspection", 
      description: "Your cargo & commodity quality details at destination locations with comprehensive quality validation.",
      features: [
        "Unloading inspections",
        "Physical & chemical testing", 
        "Quality validation at destination",
        "Documentation & reporting"
      ],
      whyFeatures: [
        "Ensure commodity quality after reaching destinations",
        "A validation & proof of your cargo quality before any clause or discounts",
        "Better transparency and visibility", 
        "Add value to your cargo with quality proofs",
        "Ensure quality for better negotiations",
        "Competitive pricing"
      ]
    }
  ];

  const services = [
    {
      icon: <Shield size={40} />,
      title: "Pre-Shipment Inspection (PSI)",
      description: "Final quality verification before goods are shipped to ensure they meet all requirements and standards.",
      features: ["Final quality checks", "Packaging inspection", "Quantity verification", "Compliance certification"],
    },
    {
      icon: <BarChart3 size={40} />,
      title: "During Production Inspection (DUPRO)",
      description: "In-process quality monitoring to catch issues early and maintain consistent quality throughout production.",
      features: ["Real-time monitoring", "Process verification", "Quality control checks", "Progress reporting"],
    },
    {
      icon: <Zap size={40} />,
      title: "Container Loading Inspection (CLI)",
      description: "Supervision of container loading process to prevent damage and ensure proper handling of goods.",
      features: ["Loading supervision", "Container condition check", "Proper stowage verification", "Damage prevention"],
    },
    {
      icon: "🧪",
      title: "On-Site Laboratory Testing / Sampling",
      description: "Collects and tests samples to verify specifications, especially for agri-commodities, food, chemicals, and pharmaceuticals.",
      features: ["Moisture content analysis", "Purity verification", "Pesticide residue testing", "Technical parameter checks"],
    },
    {
      icon: "📦",
      title: "Post-Shipment Inspection",
      description: "Confirms that products match shipping documents and assess condition after arrival at destination.",
      features: ["Document verification", "Damage assessment", "Supplier performance evaluation", "Claims documentation"],
    },
    {
      icon: "✅",
      title: "Third-Party Inspection",
      description: "Independent inspection agencies provide objective evaluation of product quality, compliance, and documentation.",
      features: ["Neutral evaluation", "International buyer requirements", "Government compliance", "Objective quality assessment"],
    }
  ];

  const initialServices = services.slice(0, 3);
  const additionalServices = services.slice(3);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const servicesStyles = {
    services: {
      padding: '6rem 2rem',
      background: '#000000',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'Jost, sans-serif'
    },
    backgroundEffect: {
      position: 'absolute',
      top: '20%',
      right: '-20%',
      width: '40%',
      height: '60%',
      background: 'radial-gradient(circle, rgba(162, 155, 254, 0.1) 0%, transparent 70%)',
      animation: 'pulse 15s ease-in-out infinite'
    },
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      position: 'relative',
      zIndex: 10,
      padding: isMobile ? '0 1rem' : '0'
    },
    sectionHeader: {
      textAlign: 'center',
      marginBottom: '2rem'
    },
    badge: {
      display: 'inline-flex',
      alignItems: 'center',
      background: 'rgba(255, 255, 255, 0.1)',
      color: '#FFFFFF',
      padding: isMobile ? '0.8rem 1.5rem' : '1rem 2rem',
      borderRadius: '25px',
      fontWeight: '700',
      fontSize: isMobile ? '1rem' : '1.2rem',
      marginBottom: '2rem',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(10px)',
      fontFamily: 'Jost, sans-serif'
    },
    title: {
      fontSize: isMobile ? '2.2rem' : '5rem',
      fontWeight: '900',
      lineHeight: '1.1',
      marginBottom: '1rem',
      color: '#FFFFFF',
      fontFamily: 'Jost, sans-serif',
      letterSpacing: '-0.03em',
      textAlign: isMobile ? 'center' : 'center'
    },
    highlight: {
      background: 'linear-gradient(135deg, #6C5CE7, #FF6B35)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    description: {
      fontSize: isMobile ? '1.1rem' : '1.4rem',
      color: 'rgba(255, 255, 255, 0.8)',
      maxWidth: '800px',
      margin: '2rem auto',
      lineHeight: '1.6',
      fontWeight: '500',
      fontFamily: 'Jost, sans-serif',
      textAlign: 'center'
    },
    quickInspectionWrapper: {
      margin: '0.5 rem 0'
    },
    featuredGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: isMobile ? '1.5rem' : '2rem',
      marginBottom: '3rem',
      maxWidth: isMobile ? '350px' : '1200px',
      margin: isMobile ? '0 auto 2rem auto' : '0 auto 3rem auto'
    },
    servicesGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
      gap: isMobile ? '1rem' : '2rem',
      marginTop: '2rem',
      maxWidth: isMobile ? '350px' : 'none',
      margin: isMobile ? '2rem auto 0 auto' : '2rem 0 0 0'
    },
    additionalServicesGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
      gap: isMobile ? '1rem' : '2rem',
      marginTop: '2rem',
      opacity: showAllServices ? 1 : 0,
      maxHeight: showAllServices ? '2000px' : '0',
      overflow: 'hidden',
      transition: 'all 0.6s ease-in-out',
      maxWidth: isMobile ? '350px' : 'none',
      margin: isMobile 
        ? showAllServices 
          ? '2rem auto 0 auto' 
          : '2rem auto 0 auto'
        : '2rem 0 0 0'
    },
    viewAllButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      background: 'rgba(255, 255, 255, 0.1)',
      color: '#FFFFFF',
      padding: '1.3rem 2.8rem',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '25px',
      fontSize: '1.2rem',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      margin: '3rem auto',
      backdropFilter: 'blur(10px)',
      minWidth: '180px',
      fontFamily: 'Jost, sans-serif',
      outline: 'none'
    },
    serviceCard: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      padding: isMobile ? '1.2rem 1rem' : '2rem 1.5rem',
      borderRadius: isMobile ? '15px' : '20px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      height: isMobile ? 'auto' : '100%',
      maxWidth: isMobile ? '320px' : '100%',
      margin: isMobile ? '0 auto' : '0 auto',
      minHeight: isMobile ? 'auto' : 'auto'
    },
    featuredServiceCard: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      color: '#FFFFFF',
      padding: isMobile ? '1.2rem' : '2rem',
      borderRadius: isMobile ? '15px' : '25px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden',
      cursor: 'pointer',
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: isMobile ? '1rem' : '3rem',
      alignItems: 'center',
      minHeight: isMobile ? 'auto' : '280px',
      maxWidth: isMobile ? '320px' : '100%',
      margin: isMobile ? '0 auto 1rem auto' : '0 auto 1.5rem auto'
    },
    serviceIcon: {
      width: isMobile ? '45px' : '55px',
      height: isMobile ? '45px' : '55px',
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: isMobile ? '12px' : '15px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: isMobile ? '1rem' : '1.5rem',
      color: '#FFFFFF',
      transition: 'transform 0.3s ease',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    },
    featuredServiceIcon: {
      width: isMobile ? '50px' : '65px',
      height: isMobile ? '50px' : '65px',
      background: 'rgba(255, 255, 255, 0.15)',
      borderRadius: isMobile ? '15px' : '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: isMobile ? '1rem' : '1.5rem',
      color: '#FFFFFF',
      transition: 'transform 0.3s ease',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    },
    serviceTitle: {
      fontSize: isMobile ? '1.1rem' : '1.5rem',
      fontWeight: '700',
      marginBottom: isMobile ? '0.5rem' : '0.75rem',
      color: '#FFFFFF',
      lineHeight: '1.3',
      fontFamily: 'Jost, sans-serif'
    },
    featuredServiceTitle: {
      fontSize: isMobile ? '1.3rem' : '1.8rem',
      fontWeight: '800',
      marginBottom: isMobile ? '0.8rem' : '1rem',
      color: '#FFFFFF',
      lineHeight: '1.3',
      fontFamily:'Jost, sans-serif'
    },
    serviceDescription: {
      color: 'rgba(255, 255, 255, 0.7)',
      marginBottom: isMobile ? '1rem' : '1.5rem',
      lineHeight: '1.5',
      flex: '1',
      fontSize: isMobile ? '0.9rem' : '1.1rem',
      fontWeight: '500',
      fontFamily:'Jost, sans-serif'
    },
    featuredServiceDescription: {
      color: 'rgba(255, 255, 255, 0.8)',
      marginBottom: isMobile ? '1rem' : '1.5rem',
      lineHeight: '1.6',
      fontSize: isMobile ? '0.9rem' : '1.2rem',
      fontWeight: '500',
      fontFamily:'Jost, sans-serif'
    },
    featureList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      minHeight: isMobile ? 'auto' : '120px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start'
    },
    featuredFeatureList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start'
    },
    featureItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.6rem',
      marginBottom: isMobile ? '0.4rem' : '0.6rem',
      color: 'rgba(255, 255, 255, 0.8)',
      fontWeight: '600',
      fontSize: isMobile ? '0.8rem' : '1rem',
      fontFamily:'Jost, sans-serif'
    },
    featuredFeatureItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.6rem',
      marginBottom: isMobile ? '0.5rem' : '0.7rem',
      color: 'rgba(255, 255, 255, 0.9)',
      fontWeight: '600',
      fontSize: isMobile ? '0.8rem' : '1.1rem',
      fontFamily: 'Jost, sans-serif'
    },
    featureIcon: {
      width: isMobile ? '16px' : '18px',
      height: isMobile ? '16px' : '18px',
      background: 'rgba(255, 255, 255, 0.2)',
      color: '#FFFFFF',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.7rem',
      fontWeight: 'bold',
      flexShrink: 0
    },
    featuredFeatureIcon: {
      width: isMobile ? '16px' : '20px',
      height: isMobile ? '16px' : '20px',
      background: 'rgba(255, 255, 255, 0.2)',
      color: '#FFFFFF',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.7rem',
      fontWeight: 'bold',
      flexShrink: 0
    },
    whySection: {
      marginTop: '1rem',
      paddingTop: '1rem',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)'
    },
    featuredWhySection: {
      marginTop: '1rem',
      paddingTop: '1rem',
      borderTop: '1px solid rgba(255, 255, 255, 0.2)'
    },
    whyTitle: {
      fontSize: '1.2rem',
      fontWeight: '700',
      color: '#FFFFFF',
      marginBottom: '0.75rem',
      fontFamily:'Jost, sans-serif'
    },
    featuredWhyTitle: {
      fontSize: isMobile ? '1.1rem' : '1.3rem',
      fontWeight: '700',
      color: '#FFFFFF',
      marginBottom: '0.75rem',
      fontFamily: 'Jost, sans-serif'
    },
    whyList: {
      listStyle: 'none',
      padding: 0,
      margin: 0
    },
    whyItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.5rem',
      marginBottom: '0.5rem',
      color: 'rgba(255, 255, 255, 0.7)',
      fontWeight: '500',
      fontSize: '1rem',
      lineHeight: '1.4',
      fontFamily:'Jost, sans-serif'
    },
    featuredWhyItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.5rem',
      marginBottom: isMobile ? '0.4rem' : '0.6rem',
      color: 'rgba(255, 255, 255, 0.8)',
      fontWeight: '500',
      fontSize: isMobile ? '0.8rem' : '1rem',
      lineHeight: '1.4',
      fontFamily:'Jost, sans-serif'
    },
    whyIcon: {
      width: '16px',
      height: '16px',
      background: 'rgba(255, 255, 255, 0.2)',
      color: '#FFFFFF',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.6rem',
      fontWeight: 'bold',
      flexShrink: 0,
      marginTop: '0.1rem'
    },
    featuredWhyIcon: {
      width: '16px',
      height: '16px',
      background: 'rgba(255, 255, 255, 0.2)',
      color: '#FFFFFF',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.6rem',
      fontWeight: 'bold',
      flexShrink: 0,
      marginTop: '0.1rem'
    },
    featuredLeftColumn: {
      display: 'flex',
      flexDirection: 'column'
    },
    featuredRightColumn: {
      display: 'flex',
      flexDirection: 'column'
    },
    ctaSection: {
      textAlign: 'center',
      marginTop: '4rem',
      padding: isMobile ? '0 1rem' : '0'
    },
    ctaCard: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      padding: isMobile ? '2rem 1.5rem' : '3rem',
      borderRadius: isMobile ? '20px' : '25px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      maxWidth: isMobile ? '320px' : 'none',
      margin: isMobile ? '0 auto' : '0'
    },
    ctaTitle: {
      fontSize: isMobile ? '1.6rem' : '3rem',
      fontWeight: '800',
      marginBottom: '1rem',
      color: '#FFFFFF',
      fontFamily: 'Jost, sans-serif',
      letterSpacing: '-0.02em'
    },
    ctaDescription: {
      fontSize: isMobile ? '0.9rem' : '1.3rem',
      color: 'rgba(255, 255, 255, 0.7)',
      marginBottom: isMobile ? '1.5rem' : '2rem',
      maxWidth: isMobile ? '280px' : '600px',
      marginLeft: 'auto',
      marginRight: 'auto',
      fontWeight: '500',
      fontFamily:'Jost, sans-serif'
    },
    ctaButton: {
      background: 'rgba(255, 255, 255, 0.1)',
      color: '#FFFFFF',
      padding: isMobile ? '1rem 2rem' : '1.3rem 3rem',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: isMobile ? '25px' : '30px',
      fontSize: isMobile ? '1rem' : '1.2rem',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(10px)',
      fontFamily: 'Jost, sans-serif'
    }
  };

  useEffect(() => {
    if (!document.querySelector('#service-animations')) {
      const style = document.createElement('style');
      style.id = 'service-animations';
      style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700;800;900&family=Jost:wght@400;500;600;700;800;900&display=swap');
        
        @keyframes pulse {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.1) rotate(180deg); }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `;
      document.head.appendChild(style);
    }

    // Intersection Observer for scroll detection
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '-20px 0px -20px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    if (isMobile) {
      setIsVisible(true);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isMobile]);

  const handleButtonHover = (e) => {
    e.target.style.transform = 'translateY(-2px)';
    e.target.style.background = 'rgba(255, 255, 255, 0.15)';
    e.target.style.boxShadow = '0 8px 32px rgba(255, 255, 255, 0.1)';
  };

  const handleButtonLeave = (e) => {
    e.target.style.transform = 'translateY(0)';
    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
    e.target.style.boxShadow = 'none';
  };

  const renderServiceCard = (service, index, isAdditional = false) => {
    const animationDelay = isAdditional ? (index * 0.15) : ((index % 4) * 0.15);
    
    const shouldShowCard = isMobile ? true : (isAdditional && showAllServices) || (!isAdditional && isVisible);
    
    return (
      <div 
        key={isAdditional ? `additional-${index}` : index} 
        className={`service-card service-card-${index}`}
        style={{
          ...servicesStyles.serviceCard,
          opacity: shouldShowCard ? 1 : 0,
          transform: shouldShowCard 
            ? 'translateX(0)' 
            : isMobile ? 'translateX(0)' : 'translateX(-60px)',
          transition: isMobile ? 'all 0.3s ease' : `all 0.8s ease-out ${animationDelay}s`
        }}
        onMouseOver={(e) => {
          if (!isMobile) {
            e.currentTarget.style.transform = `translateX(0) translateY(-8px)`;
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
            e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.3)';
            const icon = e.currentTarget.querySelector('.service-icon');
            if (icon) icon.style.transform = 'scale(1.1)';
          }
        }}
        onMouseOut={(e) => {
          if (!isMobile) {
            e.currentTarget.style.transform = 'translateX(0) translateY(0)';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
            e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.1)';
            const icon = e.currentTarget.querySelector('.service-icon');
            if (icon) icon.style.transform = 'scale(1)';
          }
        }}
      >
        <div className="service-icon" style={servicesStyles.serviceIcon}>
          {typeof service.icon === 'string' ? (
            <span style={{ fontSize: isMobile ? '1.2rem' : '1.5rem' }}>{service.icon}</span>
          ) : (
            React.cloneElement(service.icon, { size: isMobile ? 24 : 28 })
          )}
        </div>
        
        <h3 className="service-title" style={servicesStyles.serviceTitle}>{service.title}</h3>
        <p className="service-description" style={servicesStyles.serviceDescription}>{service.description}</p>
        
        <ul style={servicesStyles.featureList}>
          {service.features.map((feature, idx) => (
            <li key={idx} className="feature-item" style={servicesStyles.featureItem}>
              <div style={servicesStyles.featureIcon}>✓</div>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {service.whyFeatures && (
          <div style={servicesStyles.whySection}>
            <h4 style={servicesStyles.whyTitle}>Why Choose This Service?</h4>
            <ul style={servicesStyles.whyList}>
              {service.whyFeatures.map((whyFeature, idx) => (
                <li key={idx} style={servicesStyles.whyItem}>
                  <div style={servicesStyles.whyIcon}>!</div>
                  <span>{whyFeature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  return (
    <section ref={sectionRef} style={servicesStyles.services} id="services">
      <div style={servicesStyles.backgroundEffect}></div>
      
      <div style={servicesStyles.container}>
        <div style={servicesStyles.sectionHeader}>
          <span className="badge" style={servicesStyles.badge}>Our Services</span>
          <h2 className="section-title" style={servicesStyles.title}>
            Comprehensive Quality
            <span> Inspection Services</span>
          </h2>
        </div>

        <div style={servicesStyles.quickInspectionWrapper}>
          <QuickInspection />
        </div>

        <p style={servicesStyles.description}>
          We offer a complete suite of quality inspection services designed to ensure your cargo meets the highest standards 
          and regulatory requirements across global markets.
        </p>

        <div style={servicesStyles.featuredGrid}>
          {featuredServices.map((service, index) => (
            <div 
              key={`featured-${index}`} 
              className={`service-card featured-service-card featured-service-card-${index}`}
              style={{
                ...servicesStyles.featuredServiceCard,
                opacity: isVisible ? 1 : 0,
                transform: isVisible 
                  ? 'translateX(0)' 
                  : index === 0 
                    ? 'translateX(-60px)' 
                    : 'translateX(60px)',
                transition: `all 0.8s ease-out ${index * 0.2}s`
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = `${isVisible ? 'translateX(0) ' : ''}translateY(-8px)`;
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.3)';
                const icon = e.currentTarget.querySelector('.service-icon');
                if (icon) icon.style.transform = 'scale(1.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = isVisible ? 'translateX(0) translateY(0)' : 'translateX(0)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.1)';
                const icon = e.currentTarget.querySelector('.service-icon');
                if (icon) icon.style.transform = 'scale(1)';
              }}
            >
              <div style={servicesStyles.featuredLeftColumn}>
                <div className="service-icon" style={servicesStyles.featuredServiceIcon}>
                  {React.cloneElement(service.icon, { size: isMobile ? 28 : 32 })}
                </div>
                
                <h3 style={servicesStyles.featuredServiceTitle}>{service.title}</h3>
                <p style={servicesStyles.featuredServiceDescription}>{service.description}</p>
                
                <ul style={servicesStyles.featuredFeatureList}>
                  {service.features.map((feature, idx) => (
                    <li key={idx} style={servicesStyles.featuredFeatureItem}>
                      <div style={servicesStyles.featuredFeatureIcon}>✓</div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={servicesStyles.featuredRightColumn}>
                <div style={servicesStyles.featuredWhySection}>
                  <h4 style={servicesStyles.featuredWhyTitle}>Why Choose This Service?</h4>
                  <ul style={servicesStyles.whyList}>
                    {service.whyFeatures.map((whyFeature, idx) => (
                      <li key={idx} style={servicesStyles.featuredWhyItem}>
                        <div style={servicesStyles.featuredWhyIcon}>!</div>
                        <span>{whyFeature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
          
        <div className="services-grid" style={servicesStyles.servicesGrid}>
          {initialServices.map((service, index) => renderServiceCard(service, index, false))}
        </div>

        {!showAllServices && (
          <button
            style={servicesStyles.viewAllButton}
            onClick={() => setShowAllServices(true)}
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
          >
            <span>View All Services</span>
            <ChevronDown size={20} />
          </button>
        )}

        <div className="additional-services-grid" style={servicesStyles.additionalServicesGrid}>
          {additionalServices.map((service, index) => renderServiceCard(service, index, true))}
        </div>

        {showAllServices && (
          <button
            style={{
              ...servicesStyles.viewAllButton,
              marginTop: '3rem'
            }}
            onClick={() => setShowAllServices(false)}
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
          >
            <span>Show Less</span>
            <ChevronUp size={20} />
          </button>
        )}

        <div style={servicesStyles.ctaSection}>
          <div style={servicesStyles.ctaCard}>
            <h3 className="cta-title" style={servicesStyles.ctaTitle}>Ready to Get Started?</h3>
            <p className="cta-description" style={servicesStyles.ctaDescription}>
              Raise your inspection query with a budget and get multiple quotes from verified global inspectors. 
              Choose the best for your cargo inspection needs.
            </p>
            <button 
              style={servicesStyles.ctaButton}
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
            >
              Request Inspection Quote
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;