import React, { useState, useEffect } from 'react';
import { ChevronDown, Mail, Phone, MapPin, Award, BookOpen, Briefcase, User, Code, Globe, Star, Download, ExternalLink, Calendar, Building, GraduationCap, FileText, Image, Menu, X, Send } from 'lucide-react';
import './App.css';

const Portfolio: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showConsultationForm, setShowConsultationForm] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const scrollToSection = (sectionId: string): void => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          borderTop: '2px solid white',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '24px'
        }}></div>
        <div style={{
          fontSize: '14px',
          fontWeight: '400',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          opacity: 0.8
        }}>
          Carregando Portfólio Executivo
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif' }}>
      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(20px)',
        zIndex: 1000,
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        transition: 'all 0.3s ease'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: isMobile ? '0 20px' : '0 40px',
          height: isMobile ? '70px' : '80px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{
            fontSize: isMobile ? '16px' : '18px',
            fontWeight: '700',
            color: '#0f172a',
            letterSpacing: '-0.02em'
          }}>
            {isMobile ? 'Dr. Edmilson' : 'Dr. Edmilson Delfim Praia'}
          </div>
          
          {/* Desktop Menu */}
          {!isMobile && (
            <div style={{ display: 'flex', gap: '48px' }}>
              {[
                { key: 'home', label: 'Início' },
                { key: 'about', label: 'Perfil' },
                { key: 'experience', label: 'Experiência' },
                { key: 'education', label: 'Formação' },
                { key: 'publications', label: 'Publicações' },
                { key: 'awards', label: 'Reconhecimentos' },
                { key: 'gallery', label: 'Galeria' },
                { key: 'contact', label: 'Contato' }
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.key)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: activeSection === item.key ? '#1e40af' : '#64748b',
                    transition: 'all 0.3s ease',
                    letterSpacing: '0.02em',
                    position: 'relative',
                    padding: '8px 0'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.color = '#1e40af'}
                  onMouseOut={(e) => {
                    if (activeSection !== item.key) {
                      e.currentTarget.style.color = '#64748b';
                    }
                  }}
                >
                  {item.label}
                  {activeSection === item.key && (
                    <div style={{
                      position: 'absolute',
                      bottom: '-20px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '4px',
                      height: '4px',
                      backgroundColor: '#1e40af',
                      borderRadius: '50%'
                    }}></div>
                  )}
                </button>
              ))}
            </div>
          )}
          
          {/* Mobile Menu Button */}
          {isMobile && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                color: '#0f172a'
              }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>
        
        {/* Mobile Menu */}
        {isMobile && mobileMenuOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            {[
              { key: 'home', label: 'Início' },
              { key: 'about', label: 'Perfil' },
              { key: 'experience', label: 'Experiência' },
              { key: 'education', label: 'Formação' },
              { key: 'publications', label: 'Publicações' },
              { key: 'awards', label: 'Reconhecimentos' },
              { key: 'gallery', label: 'Galeria' },
              { key: 'contact', label: 'Contato' }
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  scrollToSection(item.key);
                  setMobileMenuOpen(false);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '500',
                  color: activeSection === item.key ? '#1e40af' : '#64748b',
                  textAlign: 'left',
                  padding: '12px 0',
                  borderBottom: '1px solid #f1f5f9'
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: isMobile ? '90px' : '80px'
      }}>
        {/* Geometric Background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(34, 197, 94, 0.2) 0%, transparent 50%)
          `
        }}></div>
        
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: isMobile ? '40px 20px' : '0 40px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: isMobile ? 'center' : 'flex-start',
          position: 'relative',
          zIndex: 10,
          textAlign: isMobile ? 'center' : 'left'
        }}>
          <div style={{ width: '100%', maxWidth: isMobile ? '100%' : '700px' }}>
            <div style={{
              display: 'inline-block',
              backgroundColor: 'rgba(59, 130, 246, 0.15)',
              border: '2px solid rgba(59, 130, 246, 0.4)',
              borderRadius: '50px',
              padding: isMobile ? '10px 20px' : '12px 24px',
              marginBottom: isMobile ? '32px' : '40px',
              fontSize: isMobile ? '12px' : '13px',
              fontWeight: '600',
              color: '#60a5fa',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              boxShadow: '0 4px 20px rgba(59, 130, 246, 0.2)',
              backdropFilter: 'blur(10px)'
            }}>
              {isMobile ? 'Especialista em Geociências' : 'Especialista em Geociências de Petróleo'}
            </div>
            
            <h1 style={{
              fontSize: isMobile ? '36px' : '56px',
              fontWeight: '700',
              color: 'white',
              lineHeight: '1.1',
              letterSpacing: '-0.02em',
              marginBottom: isMobile ? '20px' : '24px'
            }}>
              Dr. Edmilson
              <br />
              <span style={{ color: '#60a5fa' }}>Delfim Praia</span>
            </h1>
            
            <p style={{
              fontSize: isMobile ? '16px' : '18px',
              color: '#cbd5e1',
              lineHeight: '1.7',
              marginBottom: isMobile ? '32px' : '40px',
              maxWidth: isMobile ? '100%' : '600px'
            }}>
              {isMobile 
                ? 'Especialista em geologia aplicada e geofísica. Pioneiro em soluções de IA para análise de reservatórios de petróleo.'
                : 'Especialista em geologia aplicada e geofísica com doutorado avançado em geofísica aplicada. Pioneiro em soluções baseadas em IA para análise de reservatórios de petróleo e interpretação de dados petrofísicos.'
              }
            </p>
            
            <div style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: '16px',
              marginBottom: isMobile ? '40px' : '48px',
              width: '100%'
            }}>
              <button
                onClick={() => scrollToSection('about')}
                style={{
                  background: '#1e40af',
                  border: 'none',
                  color: 'white',
                  padding: isMobile ? '16px 24px' : '16px 32px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
                  width: isMobile ? '100%' : 'auto',
                  minHeight: '48px',
                  boxShadow: '0 4px 15px rgba(30, 64, 175, 0.3)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#1d4ed8';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(30, 64, 175, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = '#1e40af';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(30, 64, 175, 0.3)';
                }}
              >
                Ver Perfil Completo
              </button>
              
              <button style={{
                background: 'transparent',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                color: 'white',
                padding: isMobile ? '14px 24px' : '14px 32px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                width: isMobile ? '100%' : 'auto',
                minHeight: '48px',
                backdropFilter: 'blur(10px)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = 'white';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
                <Download size={16} />
                Baixar CV
              </button>
            </div>
            
            <div style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: isMobile ? '16px' : '32px',
              fontSize: isMobile ? '14px' : '14px',
              color: '#94a3b8',
              alignItems: isMobile ? 'center' : 'flex-start'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                backgroundColor: isMobile ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                padding: isMobile ? '8px 12px' : '0',
                borderRadius: isMobile ? '6px' : '0',
                backdropFilter: isMobile ? 'blur(10px)' : 'none'
              }}>
                <Mail size={16} />
                <span style={{ 
                  wordBreak: isMobile ? 'break-all' : 'normal',
                  fontSize: isMobile ? '12px' : '14px'
                }}>
                  {isMobile ? 'edmilsondelfimp45@gmail.com' : 'edmilsondelfimp45@gmail.com'}
                </span>
              </div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                backgroundColor: isMobile ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                padding: isMobile ? '8px 12px' : '0',
                borderRadius: isMobile ? '6px' : '0',
                backdropFilter: isMobile ? 'blur(10px)' : 'none'
              }}>
                <Phone size={16} />
                +7 996 100 74 08
              </div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                backgroundColor: isMobile ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                padding: isMobile ? '8px 12px' : '0',
                borderRadius: isMobile ? '6px' : '0',
                backdropFilter: isMobile ? 'blur(10px)' : 'none'
              }}>
                <MapPin size={16} />
                Ufa, Rússia
              </div>
            </div>
          </div>
          
          {/* Professional Stats Card - Hidden on Mobile */}
          {!isMobile && (
            <div style={{
              position: 'absolute',
              top: '50%',
              right: '40px',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '40px',
              color: 'white',
              width: '350px'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                marginBottom: '32px',
                color: '#f1f5f9'
              }}>
                Resumo Profissional
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {[
                  { label: 'Anos de Experiência', value: '5+' },
                  { label: 'Publicações Científicas', value: '5+' },
                  { label: 'Prêmios Internacionais', value: '2' },
                  { label: 'Idiomas', value: '3' },
                  { label: 'Especializações', value: '4' }
                ].map((stat, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingBottom: '16px',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    <span style={{ fontSize: '14px', color: '#cbd5e1' }}>{stat.label}</span>
                    <span style={{ fontSize: '16px', fontWeight: '600', color: '#60a5fa' }}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {!isMobile && (
          <div style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            animation: 'bounce 2s infinite',
            zIndex: 10
          }}>
            <ChevronDown size={24} style={{ color: '#94a3b8' }} />
          </div>
        )}
      </section>

      {/* About Section */}
      <section id="about" style={{
        padding: isMobile ? '60px 20px' : '120px 40px',
        backgroundColor: '#f8fafc'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '400px 1fr',
            gap: isMobile ? '40px' : '80px',
            alignItems: 'start'
          }}>
            {/* Left Column - Professional Summary */}
            <div>
              <div style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: isMobile ? '24px' : '40px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                marginBottom: '32px'
              }}>
                <div style={{
                  width: isMobile ? '60px' : '80px',
                  height: isMobile ? '60px' : '80px',
                  backgroundColor: '#1e40af',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px'
                }}>
                  <User size={isMobile ? 30 : 40} style={{ color: 'white' }} />
                </div>
                
                <h3 style={{
                  fontSize: isMobile ? '18px' : '20px',
                  fontWeight: '600',
                  color: '#0f172a',
                  marginBottom: '16px'
                }}>
                  Resumo Profissional
                </h3>
                
                <p style={{
                  fontSize: '14px',
                  color: '#64748b',
                  lineHeight: '1.6',
                  marginBottom: '24px'
                }}>
                  Geocientista de petróleo com expertise em modelagem de reservatórios baseada em IA e análise petrofísica.
                </p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { label: 'Posição Atual', value: 'Fundador & Consultor Principal' },
                    { label: 'Especialização', value: 'Geofísica Aplicada' },
                    { label: 'Formação', value: 'Doutorado em Geofísica Aplicada' },
                    { label: 'Localização', value: 'Ufa, Rússia' }
                  ].map((item, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: isMobile ? '12px' : '13px'
                    }}>
                      <span style={{ color: '#94a3b8', fontWeight: '500' }}>{item.label}</span>
                      <span style={{ color: '#0f172a', fontWeight: '600', textAlign: 'right', flex: 1, marginLeft: '8px' }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Core Competencies */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '32px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}>
                <h4 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#0f172a',
                  marginBottom: '20px'
                }}>
                  Competências Principais
                </h4>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    'Machine Learning & IA',
                    'Modelagem de Reservatórios',
                    'Análise Petrofísica',
                    'Interpretação de Dados',
                    'Treinamento Acadêmico'
                  ].map((skill, index) => (
                    <div key={index} style={{
                      padding: '8px 12px',
                      backgroundColor: '#f1f5f9',
                      borderRadius: '6px',
                      fontSize: '13px',
                      color: '#475569',
                      fontWeight: '500'
                    }}>
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right Column - Detailed Profile */}
            <div>
              <div style={{ marginBottom: '48px' }}>
                <h2 style={{
                  fontSize: '32px',
                  fontWeight: '700',
                  color: '#0f172a',
                  marginBottom: '16px',
                  letterSpacing: '-0.02em'
                }}>
                  Perfil Profissional
                </h2>
                <div style={{
                  width: '40px',
                  height: '4px',
                  backgroundColor: '#1e40af',
                  borderRadius: '2px',
                  marginBottom: '32px'
                }}></div>
              </div>
              
              <div style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '48px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                marginBottom: '32px'
              }}>
                <p style={{
                  fontSize: '17px',
                  color: '#374151',
                  lineHeight: '1.8',
                  marginBottom: '24px'
                }}>
                  <strong>Especialista em Geologia Aplicada ao Petróleo e Gás</strong> com doutorado em Geofísica Aplicada, 
                  combinando sólida formação acadêmica com experiência prática em análise de dados e educação técnica.
                </p>
                
                <p style={{
                  fontSize: '17px',
                  color: '#374151',
                  lineHeight: '1.8',
                  marginBottom: '24px'
                }}>
                  <strong>Fundador da Justificações Acadêmicas</strong> e Analista de Dados na WellDesk, com expertise comprovada 
                  em modelagem geológica e de reservatórios, interpretação de perfis de poço e processamento de dados geofísicos.
                </p>
                
                <p style={{
                  fontSize: '17px',
                  color: '#374151',
                  lineHeight: '1.8'
                }}>
                  <strong>Desenvolvedor da plataforma Well Log Web Pro</strong>, especializada em análise, imputação e predição 
                  de dados petrofísicos utilizando inteligência artificial, atendendo profissionais da Sonangol, Chevron e ANPG.
                </p>
              </div>
              
              {/* Key Achievements Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px'
              }}>
                {[
                  { 
                    icon: Code, 
                    title: 'Inovação em IA', 
                    desc: 'Algoritmos avançados de ML para análise petrofísica',
                    color: '#1e40af'
                  },
                  { 
                    icon: Globe, 
                    title: 'Alcance Global', 
                    desc: 'Consultoria internacional em 4 países',
                    color: '#059669'
                  },
                  { 
                    icon: BookOpen, 
                    title: 'Excelência Acadêmica', 
                    desc: 'Doutorado em Geofísica Aplicada',
                    color: '#7c3aed'
                  },
                  { 
                    icon: Award, 
                    title: 'Reconhecimento', 
                    desc: 'Prêmios e honrarias internacionais',
                    color: '#dc2626'
                  }
                ].map((achievement, index) => (
                  <div key={index} style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    padding: '24px',
                    textAlign: 'center',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
                  }}>
                    <achievement.icon size={28} style={{ color: achievement.color, marginBottom: '12px' }} />
                    <h4 style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#0f172a',
                      marginBottom: '8px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      {achievement.title}
                    </h4>
                    <p style={{
                      fontSize: '12px',
                      color: '#64748b',
                      lineHeight: '1.5'
                    }}>
                      {achievement.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" style={{
        padding: isMobile ? '80px 20px' : '120px 40px',
        backgroundColor: 'white'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ marginBottom: '64px' }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#0f172a',
              marginBottom: '16px',
              letterSpacing: '-0.02em'
            }}>
              Experiência Profissional
            </h2>
            <div style={{
              width: '40px',
              height: '4px',
              backgroundColor: '#1e40af',
              borderRadius: '2px',
              marginBottom: '16px'
            }}></div>
            <p style={{
              fontSize: '16px',
              color: '#64748b',
              maxWidth: '600px'
            }}>
              Liderando organizações em inovação em geociências de petróleo e excelência acadêmica
            </p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: '32px'
          }}>
            {[
              {
                title: 'Professor e Consultor Acadêmico',
                company: 'Justificações Acadêmicas',
                period: '2020 - Presente',
                type: 'Fundador & CEO',
                icon: BookOpen,
                color: '#1e40af',
                achievements: [
                  'Fundei e lidero programas especializados de treinamento em geociências, engenharia de petróleo e programação Python',
                  'Atendo grandes empresas petrolíferas incluindo Sonangol, Chevron e ANPG com soluções de treinamento personalizadas',
                  'Ofereço educação acadêmica complementar a estudantes das principais instituições (UAN, UCAN, ISPTEC)',
                  'Atuo como consultor internacional para profissionais no Brasil, Líbia e Moçambique em modelagem de reservatórios'
                ]
              },
              {
                title: 'Analista de Dados',
                company: 'WellDesk',
                period: 'Atual',
                type: 'Líder Técnico',
                icon: Code,
                color: '#059669',
                achievements: [
                  'Desenvolvo soluções avançadas de Machine Learning para análise de dados petrofísicos e geofísicos',
                  'Criei a plataforma Well Log Web Pro, integrando IA com visualização interativa para suporte à decisão',
                  'Aplico ferramentas avançadas incluindo Python, Petrel e ECLIPSE em projetos de modelagem geológica',
                  'Lidero iniciativas de análise, imputação e predição de dados para otimização de reservatórios de petróleo'
                ]
              }
            ].map((experience, index) => (
              <div key={index} style={{
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '40px',
                transition: 'all 0.3s ease',
                height: 'fit-content'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = experience.color;
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = `0 8px 25px ${experience.color}20`;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.backgroundColor = '#f8fafc';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: experience.color,
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '16px'
                  }}>
                    <experience.icon size={24} style={{ color: 'white' }} />
                  </div>
                  <div>
                    <div style={{
                      fontSize: '12px',
                      fontWeight: '600',
                      color: experience.color,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginBottom: '4px'
                    }}>
                      {experience.type}
                    </div>
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: '700',
                      color: '#0f172a',
                      marginBottom: '4px'
                    }}>
                      {experience.title}
                    </h3>
                    <div style={{
                      fontSize: '14px',
                      color: '#64748b',
                      fontWeight: '500'
                    }}>
                      {experience.company} • {experience.period}
                    </div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {experience.achievements.map((achievement, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px'
                    }}>
                      <div style={{
                        width: '6px',
                        height: '6px',
                        backgroundColor: experience.color,
                        borderRadius: '50%',
                        marginTop: '8px',
                        flexShrink: 0
                      }}></div>
                      <p style={{
                        fontSize: '14px',
                        color: '#374151',
                        lineHeight: '1.6',
                        margin: 0
                      }}>
                        {achievement}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" style={{
        padding: isMobile ? '80px 20px' : '120px 40px',
        backgroundColor: '#f8fafc'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ marginBottom: '64px' }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#0f172a',
              marginBottom: '16px',
              letterSpacing: '-0.02em'
            }}>
              Formação Acadêmica
            </h2>
            <div style={{
              width: '40px',
              height: '4px',
              backgroundColor: '#1e40af',
              borderRadius: '2px',
              marginBottom: '16px'
            }}></div>
            <p style={{
              fontSize: '16px',
              color: '#64748b',
              maxWidth: '600px'
            }}>
              Formação avançada em instituições prestigiadas em geofísica aplicada e geologia de petróleo
            </p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '24px'
          }}>
            {[
              {
                degree: 'Doutor em Filosofia (PhD)',
                field: 'Geofísica Aplicada',
                institution: 'Universidade de Ciência e Tecnologia de Ufa',
                year: '2025 (Em andamento)',
                icon: GraduationCap,
                color: '#1e40af',
                status: 'current'
              },
              {
                degree: 'Certificado de Especialização',
                field: 'Geologia Aplicada ao Petróleo e Gás',
                institution: 'Universidade Tecnológica do Petróleo do Estado de Ufa',
                year: '2022',
                icon: Star,
                color: '#059669',
                status: 'completed'
              },
              {
                degree: 'Curso Universitário',
                field: 'Química Laboratorial',
                institution: 'Instituição Acadêmica',
                year: '2019',
                icon: BookOpen,
                color: '#7c3aed',
                status: 'completed'
              }
            ].map((education, index) => (
              <div key={index} style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '32px',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                border: '1px solid #e2e8f0',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.borderColor = education.color;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = '#e2e8f0';
              }}>
                {education.status === 'current' && (
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    backgroundColor: '#10b981',
                    color: 'white',
                    fontSize: '11px',
                    fontWeight: '600',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Em Andamento
                  </div>
                )}
                
                <div style={{
                  width: '64px',
                  height: '64px',
                  backgroundColor: `${education.color}15`,
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px'
                }}>
                  <education.icon size={32} style={{ color: education.color }} />
                </div>
                
                <div style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  color: education.color,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '8px'
                }}>
                  {education.degree}
                </div>
                
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#0f172a',
                  marginBottom: '12px',
                  lineHeight: '1.3'
                }}>
                  {education.field}
                </h3>
                
                <p style={{
                  fontSize: '14px',
                  color: '#64748b',
                  fontWeight: '500',
                  marginBottom: '8px'
                }}>
                  {education.institution}
                </p>
                
                <p style={{
                  fontSize: '13px',
                  color: '#94a3b8',
                  fontWeight: '500'
                }}>
                  {education.year}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section id="publications" style={{
        padding: isMobile ? '80px 20px' : '120px 40px',
        backgroundColor: 'white'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ marginBottom: '64px' }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#0f172a',
              marginBottom: '16px',
              letterSpacing: '-0.02em'
            }}>
              Publicações e Pesquisa
            </h2>
            <div style={{
              width: '40px',
              height: '4px',
              backgroundColor: '#1e40af',
              borderRadius: '2px',
              marginBottom: '16px'
            }}></div>
            <p style={{
              fontSize: '16px',
              color: '#64748b',
              maxWidth: '600px'
            }}>
              Artigos revisados por pares e publicações técnicas avançando o campo das geociências de petróleo
            </p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '16px'
          }}>
            {[
              {
                title: 'Previsão de Propriedades Petrofísicas de Rochas Utilizando Algoritmos de Aprendizado de Máquina',
                journal: 'Scientific-Technical Journal OILFIELD ENGINEERING',
                date: 'Abril 2024',
                type: 'Artigo Revisado por Pares',
                category: 'research'
              },
              {
                title: 'Aplicação de Métodos de Aprendizado de Máquina para Construir Modelos Litológicos Volumétricos',
                journal: 'Scientific-Technical Journal OILFIELD ENGINEERING',
                date: 'Maio 2024',
                type: 'Artigo Revisado por Pares',
                category: 'research'
              },
              {
                title: 'Estimulação Ácida na Produção Moderna de Petróleo',
                journal: 'Plataforma Técnica WellDesk',
                date: '2024',
                type: 'Artigo Técnico',
                category: 'technical'
              },
              {
                title: 'Operações de Acidificação com Coiled Tubing na Estimulação de Poços',
                journal: 'Plataforma Técnica WellDesk',
                date: '2024',
                type: 'Artigo Técnico',
                category: 'technical'
              },
              {
                title: 'Modelagem Multi-Escala de Mecanismos de Dano de Formação e Resposta de Ácido Matricial',
                journal: 'Plataforma Técnica WellDesk',
                date: '2024',
                type: 'Artigo Técnico',
                category: 'technical'
              },
              {
                title: 'Importando Dados de Poços no Petrel - eBook Técnico',
                journal: 'Amazon Publishing Digital',
                date: '2024',
                type: 'Publicação Digital',
                category: 'book'
              }
            ].map((publication, index) => (
              <div key={index} style={{
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '24px',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.borderColor = '#1e40af';
                e.currentTarget.style.transform = 'translateX(4px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#f8fafc';
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.transform = 'translateX(0)';
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '12px'
                    }}>
                      <FileText size={20} style={{ color: '#1e40af' }} />
                      <span style={{
                        fontSize: '11px',
                        fontWeight: '600',
                        color: publication.category === 'research' ? '#059669' : 
                               publication.category === 'technical' ? '#1e40af' : '#7c3aed',
                        backgroundColor: publication.category === 'research' ? '#059669' + '15' : 
                                       publication.category === 'technical' ? '#1e40af' + '15' : '#7c3aed' + '15',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        {publication.type}
                      </span>
                    </div>
                    
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: '700',
                      color: '#0f172a',
                      marginBottom: '8px',
                      lineHeight: '1.4'
                    }}>
                      {publication.title}
                    </h3>
                    
                    <p style={{
                      fontSize: '14px',
                      color: '#1e40af',
                      fontWeight: '600',
                      marginBottom: '4px'
                    }}>
                      {publication.journal}
                    </p>
                    
                    <p style={{
                      fontSize: '13px',
                      color: '#64748b'
                    }}>
                      {publication.date}
                    </p>
                  </div>
                  
                  <ExternalLink size={16} style={{ color: '#94a3b8', flexShrink: 0 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section id="awards" style={{
        padding: isMobile ? '80px 20px' : '120px 40px',
        backgroundColor: '#f8fafc'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ marginBottom: '64px' }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#0f172a',
              marginBottom: '16px',
              letterSpacing: '-0.02em'
            }}>
              Prêmios e Reconhecimentos
            </h2>
            <div style={{
              width: '40px',
              height: '4px',
              backgroundColor: '#1e40af',
              borderRadius: '2px',
              marginBottom: '16px'
            }}></div>
            <p style={{
              fontSize: '16px',
              color: '#64748b',
              maxWidth: '600px'
            }}>
              Reconhecimento internacional por contribuições excepcionais às geociências de petróleo e inovação
            </p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: '32px'
          }}>
            {[
              {
                title: 'Medalha de Honra',
                subtitle: 'Embaixada da República de Angola na Rússia',
                description: 'Reconhecimento prestigioso por contribuições notáveis às geociências, incluindo o desenvolvimento da inovadora plataforma de inteligência artificial LogPro para análise de dados petrolíferos.',
                date: '5 de Agosto de 2025',
                location: 'Salão Oval da Embaixada, Rússia',
                icon: Award,
                color: '#dc2626',
                level: 'Honra Internacional'
              },
              {
                title: 'Prêmio de 2º Lugar',
                subtitle: 'Conferência de Jovens Cientistas',
                description: 'Reconhecimento por desenvolvimento inovador de software usando a plataforma WellLog Pro, apresentando algoritmos avançados de Machine Learning para recuperação e tratamento de dados petrofísicos.',
                date: '2024',
                location: 'Universidade de Ciência e Tecnologia de Ufa',
                icon: Star,
                color: '#1e40af',
                level: 'Excelência Acadêmica'
              }
            ].map((award, index) => (
              <div key={index} style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '40px',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                border: '1px solid #e2e8f0',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = `0 20px 40px ${award.color}20`;
                e.currentTarget.style.borderColor = award.color;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = '#e2e8f0';
              }}>
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  backgroundColor: `${award.color}15`,
                  color: award.color,
                  fontSize: '11px',
                  fontWeight: '600',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {award.level}
                </div>
                
                <div style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: `${award.color}15`,
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px'
                }}>
                  <award.icon size={40} style={{ color: award.color }} />
                </div>
                
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  color: '#0f172a',
                  marginBottom: '8px'
                }}>
                  {award.title}
                </h3>
                
                <h4 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: award.color,
                  marginBottom: '20px'
                }}>
                  {award.subtitle}
                </h4>
                
                <p style={{
                  fontSize: '14px',
                  color: '#374151',
                  lineHeight: '1.7',
                  marginBottom: '20px',
                  textAlign: 'left'
                }}>
                  {award.description}
                </p>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  fontSize: '13px',
                  color: '#64748b',
                  fontWeight: '500'
                }}>
                  <Calendar size={14} />
                  {award.date} • {award.location}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" style={{
        padding: isMobile ? '60px 20px' : '120px 40px',
        backgroundColor: 'white'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ marginBottom: isMobile ? '40px' : '64px' }}>
            <h2 style={{
              fontSize: isMobile ? '28px' : '32px',
              fontWeight: '700',
              color: '#0f172a',
              marginBottom: '16px',
              letterSpacing: '-0.02em'
            }}>
              Galeria Profissional
            </h2>
            <div style={{
              width: '40px',
              height: '4px',
              backgroundColor: '#1e40af',
              borderRadius: '2px',
              marginBottom: '16px'
            }}></div>
            <p style={{
              fontSize: '16px',
              color: '#64748b',
              maxWidth: '600px'
            }}>
              Momentos importantes da trajetória acadêmica e profissional
            </p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: isMobile ? '20px' : '24px'
          }}>
            {[
              {
                title: 'Medalha de Honra da Embaixada de Angola',
                description: 'Cerimônia de entrega da prestigiosa Medalha de Honra no Salão Oval da Embaixada da República de Angola na Rússia.',
                date: 'Agosto 2025',
                category: 'award',
                color: '#dc2626',
                image: 'https://res.cloudinary.com/dzmeorljk/image/upload/v1755791252/WhatsApp_Image_2025-08-08_at_01.29.41_fsodk4.jpg'
              },
              {
                title: 'Certificado da Medalha de Honra',
                description: 'Momento oficial do recebimento da Medalha de Honra da Embaixada da República de Angola, reconhecendo contribuições excepcionais.',
                date: 'Agosto 2025',
                category: 'award',
                color: '#dc2626',
                image: 'https://res.cloudinary.com/dzmeorljk/image/upload/v1755791249/WhatsApp_Image_2025-08-05_at_20.16.39_iymgo6.jpg'
              },
              {
                title: '2º Lugar na Conferência de Jovens Cientistas',
                description: 'Reconhecimento pelo desenvolvimento do software WellLog Pro com algoritmos avançados de Machine Learning na Universidade de Ufa.',
                date: '2024',
                category: 'achievement',
                color: '#1e40af',
                image: 'https://res.cloudinary.com/dzmeorljk/image/upload/v1755791415/499701102_1093970506085460_7670705655743374160_n_rdww1z.jpg'
              },
              {
                title: 'Formação em Modelagem e Simulações no ISPTEC',
                description: 'Treinamento especializado em modelagem e simulações de reservatórios de petróleo e gás no ISPTEC, Angola.',
                date: '2023',
                category: 'training',
                color: '#059669',
                image: 'https://res.cloudinary.com/dzmeorljk/image/upload/v1755791235/002.46a997cbdb1d90cc027b_hgxx5s.jpg'
              },
              {
                title: 'Apresentação da IA PetroChat e Well Log Pro',
                description: 'Demonstração das inovadoras soluções de inteligência artificial para análise de dados petrofísicos na Universidade de Ufa.',
                date: '2024',
                category: 'presentation',
                color: '#7c3aed',
                image: 'https://res.cloudinary.com/dzmeorljk/image/upload/v1755791281/4.1e84e9e16734b2ade429_lncxef.jpg'
              },
              {
                title: 'Aulas de Modelagem Estática na Rússia',
                description: 'Ministração de aulas especializadas em modelagem estática de reservatórios de petróleo e gás na Universidade de Ufa.',
                date: '2023-2024',
                category: 'education',
                color: '#ea580c',
                image: 'https://res.cloudinary.com/dzmeorljk/image/upload/v1755791783/imag03.210074906fd6d7f0b513_f8c9jv.jpg'
              }
            ].map((item, index) => (
              <div key={index} style={{
                backgroundColor: '#f8fafc',
                borderRadius: '16px',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                border: '1px solid #e2e8f0',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                e.currentTarget.style.borderColor = item.color;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = '#e2e8f0';
              }}>
                {/* Real Image */}
                <div style={{
                  height: '250px',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <img 
                    src={item.image} 
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    backgroundColor: item.color,
                    color: 'white',
                    fontSize: '11px',
                    fontWeight: '600',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    backdropFilter: 'blur(10px)'
                  }}>
                    {item.category === 'award' ? 'Prêmio' :
                     item.category === 'achievement' ? 'Conquista' :
                     item.category === 'training' ? 'Formação' :
                     item.category === 'presentation' ? 'Apresentação' : 'Educação'}
                  </div>
                  <div style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '12px',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: '500',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    backdropFilter: 'blur(10px)'
                  }}>
                    {item.date}
                  </div>
                  {/* Overlay gradient for better text readability */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '50%',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.3), transparent)',
                    pointerEvents: 'none'
                  }}></div>
                </div>
                
                <div style={{ padding: '24px' }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#0f172a',
                    marginBottom: '12px',
                    lineHeight: '1.3'
                  }}>
                    {item.title}
                  </h3>
                  
                  <p style={{
                    fontSize: '14px',
                    color: '#64748b',
                    lineHeight: '1.6'
                  }}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{
        padding: isMobile ? '60px 20px' : '120px 40px',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        color: 'white'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ marginBottom: isMobile ? '40px' : '64px', textAlign: 'center' }}>
            <h2 style={{
              fontSize: isMobile ? '28px' : '32px',
              fontWeight: '700',
              marginBottom: '16px',
              letterSpacing: '-0.02em'
            }}>
              Contato Profissional
            </h2>
            <div style={{
              width: '40px',
              height: '4px',
              backgroundColor: '#60a5fa',
              borderRadius: '2px',
              margin: '0 auto 16px'
            }}></div>
            <p style={{
              fontSize: '16px',
              color: '#cbd5e1',
              maxWidth: '500px',
              margin: '0 auto'
            }}>
              Pronto para colaborar no seu próximo projeto de geociências de petróleo
            </p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: isMobile ? '20px' : '32px',
            marginBottom: isMobile ? '32px' : '48px'
          }}>
            {[
              {
                icon: Mail,
                title: 'Email',
                primary: 'edmilsondelfimp45@gmail.com',
                secondary: 'edmilsonp@mail.ru',
                color: '#60a5fa'
              },
              {
                icon: Phone,
                title: 'Telefone',
                primary: '+7 996 100 74 08',
                secondary: 'Disponível para consultorias',
                color: '#34d399'
              },
              {
                icon: MapPin,
                title: 'Localização',
                primary: 'Ufa, Rússia',
                secondary: 'Consultoria internacional disponível',
                color: '#f87171'
              }
            ].map((contact, index) => (
              <div key={index} style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '32px',
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.borderColor = contact.color;
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
                <contact.icon size={32} style={{ color: contact.color, marginBottom: '16px' }} />
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  marginBottom: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {contact.title}
                </h3>
                <p style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  color: contact.color,
                  marginBottom: '4px'
                }}>
                  {contact.primary}
                </p>
                <p style={{
                  fontSize: '13px',
                  color: '#94a3b8'
                }}>
                  {contact.secondary}
                </p>
              </div>
            ))}
          </div>
          
          <div style={{
            textAlign: 'center',
            padding: '32px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '8px'
            }}>
              Disponível para Consultoria Profissional
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#cbd5e1',
              marginBottom: '20px'
            }}>
              Especializado em geociências de petróleo, modelagem de reservatórios e análise de dados baseada em IA
            </p>
            <button 
              onClick={() => setShowConsultationForm(true)}
              style={{
                background: '#1e40af',
                border: 'none',
                color: 'white',
                padding: '12px 32px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase',
                letterSpacing: '0.02em'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#1d4ed8';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = '#1e40af';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Agendar Consultoria
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#0f172a',
        padding: '40px 40px 24px',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div>
            <div style={{
              fontSize: '16px',
              fontWeight: '600',
              color: 'white',
              marginBottom: '4px'
            }}>
              Dr. Edmilson Delfim Praia
            </div>
            <div style={{
              fontSize: '13px',
              color: '#64748b'
            }}>
              Especialista em Geociências de Petróleo & Inovação em IA
            </div>
          </div>
          <div style={{
            fontSize: '13px',
            color: '#64748b'
          }}>
            © 2025 Todos os direitos reservados. Portfólio profissional.
          </div>
        </div>
      </footer>

      {/* Consultation Form Modal */}
      {showConsultationForm && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}
        onClick={() => setShowConsultationForm(false)}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: isMobile ? '24px' : '40px',
            maxWidth: '600px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            position: 'relative'
          }}
          onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowConsultationForm(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '50%',
                color: '#64748b'
              }}
            >
              <X size={20} />
            </button>
            
            <h2 style={{
              fontSize: isMobile ? '24px' : '28px',
              fontWeight: '700',
              color: '#0f172a',
              marginBottom: '8px',
              textAlign: 'center'
            }}>
              Agendar Consultoria
            </h2>
            
            <p style={{
              fontSize: '14px',
              color: '#64748b',
              textAlign: 'center',
              marginBottom: '24px'
            }}>
              Preencha o formulário abaixo e entrarei em contato em até 24 horas
            </p>
            
            <div style={{
              backgroundColor: '#eff6ff',
              border: '1px solid #3b82f6',
              borderRadius: '8px',
              padding: '12px 16px',
              marginBottom: '24px'
            }}>
              <p style={{
                fontSize: '13px',
                color: '#1e40af',
                margin: 0,
                textAlign: 'center'
              }}>
                ℹ️ <strong>Primeiro envio:</strong> Você receberá um email de confirmação do Formspree para ativar o formulário.
              </p>
            </div>
            
            <form 
              action="https://formspree.io/f/manbrwvn" 
              method="POST"
              style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
            >
              {/* 
                ✅ FORMSPREE TOTALMENTE CONFIGURADO!
                
                O formulário agora envia diretamente para:
                https://formspree.io/f/manbrwvn
                
                Todas as mensagens serão enviadas para seu email automaticamente!
              */}
              {/* 
                CONFIGURAÇÃO DO FORMSPREE:
                1. Vá para https://formspree.io e crie uma conta
                2. Crie um novo projeto chamado "Consulta"
                3. Substitua "YOUR_FORM_ID" pelo ID do seu formulário
                4. Para produção, remova onSubmit={handleFormSubmit} 
                   e deixe apenas action e method
                5. O formulário enviará automaticamente para seu email
              */}
              
              {/* Campos ocultos para melhor integração com Formspree */}
              <input type="hidden" name="_subject" value="Nova Solicitação de Consultoria - Dr. Edmilson Delfim Praia" />
              <input type="hidden" name="_replyto" value="email" />
              <input type="hidden" name="_next" value="https://seu-site.com/obrigado" />
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    name="nome"
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontFamily: 'inherit',
                      transition: 'border-color 0.3s ease'
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = '#1e40af'}
                    onBlur={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
                  />
                </div>
                
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontFamily: 'inherit',
                      transition: 'border-color 0.3s ease'
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = '#1e40af'}
                    onBlur={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
                  />
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Telefone
                  </label>
                  <input
                    type="tel"
                    name="telefone"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontFamily: 'inherit',
                      transition: 'border-color 0.3s ease'
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = '#1e40af'}
                    onBlur={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
                  />
                </div>
                
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Empresa/Instituição
                  </label>
                  <input
                    type="text"
                    name="empresa"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontFamily: 'inherit',
                      transition: 'border-color 0.3s ease'
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = '#1e40af'}
                    onBlur={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
                  />
                </div>
              </div>
              
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Tipo de Consultoria *
                </label>
                <select
                  name="tipo_consultoria"
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    backgroundColor: 'white',
                    transition: 'border-color 0.3s ease'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#1e40af'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
                >
                  <option value="">Selecione o tipo de consultoria</option>
                  <option value="modelagem_reservatorios">Modelagem de Reservatórios</option>
                  <option value="analise_dados">Análise de Dados Petrofísicos</option>
                  <option value="machine_learning">Machine Learning e IA</option>
                  <option value="treinamento_equipe">Treinamento de Equipe</option>
                  <option value="interpretacao_perfis">Interpretação de Perfis de Poço</option>
                  <option value="outros">Outros</option>
                </select>
              </div>
              
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Descrição do Projeto *
                </label>
                <textarea
                  name="descricao"
                  required
                  rows={4}
                  placeholder="Descreva brevemente seu projeto, objetivos e como posso ajudar..."
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    transition: 'border-color 0.3s ease'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#1e40af'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
                />
              </div>
              
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Prazo Preferencial
                </label>
                <select
                  name="prazo"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    backgroundColor: 'white',
                    transition: 'border-color 0.3s ease'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#1e40af'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
                >
                  <option value="">Selecione o prazo</option>
                  <option value="urgente">Urgente (até 1 semana)</option>
                  <option value="1_mes">Até 1 mês</option>
                  <option value="3_meses">Até 3 meses</option>
                  <option value="6_meses">Até 6 meses</option>
                  <option value="flexivel">Flexível</option>
                </select>
              </div>
              
              <div style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: '12px',
                justifyContent: 'flex-end',
                marginTop: '8px'
              }}>
                <button
                  type="button"
                  onClick={() => setShowConsultationForm(false)}
                  style={{
                    padding: '12px 24px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    backgroundColor: 'white',
                    color: '#374151',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  onClick={() => {
                    // Fechar modal após pequeno delay para permitir o envio
                    setTimeout(() => setShowConsultationForm(false), 100);
                  }}
                  style={{
                    padding: '12px 24px',
                    border: 'none',
                    borderRadius: '8px',
                    backgroundColor: '#1e40af',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    justifyContent: 'center'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1e40af'}
                >
                  <Send size={16} />
                  Enviar Solicitação
                </button>
              </div>
              
              <p style={{
                fontSize: '11px',
                color: '#9ca3af',
                textAlign: 'center',
                marginTop: '16px',
                lineHeight: '1.4'
              }}>
                Ao enviar este formulário, você concorda que seus dados sejam utilizados exclusivamente para responder à sua solicitação de consultoria. Não compartilhamos informações com terceiros.
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;