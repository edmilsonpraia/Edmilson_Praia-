import React, { useState, useEffect } from 'react';
import { ChevronDown, Mail, Phone, MapPin, Award, BookOpen, User, Code, Globe, Star, Download, Calendar, Building, GraduationCap, FileText, Menu, X } from 'lucide-react';
import './App.css';

const Portfolio: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Scroll progress indicator — sets CSS variable --scroll on html
    const updateScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
      h.style.setProperty('--scroll', String(Math.max(0, Math.min(1, scrolled))));
    };
    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', updateScroll);
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
      {/* Scroll progress indicator */}
      <div className="scroll-progress"></div>

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
            <div style={{ display: 'flex', gap: '28px' }}>
              {[
                { key: 'home', label: 'Início' },
                { key: 'about', label: 'Perfil' },
                { key: 'experience', label: 'Experiência' },
                { key: 'speaking', label: 'Palestras' },
                { key: 'products', label: 'Produtos' },
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
              { key: 'speaking', label: 'Palestras' },
              { key: 'products', label: 'Produtos' },
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
          <div style={{ width: '100%', maxWidth: isMobile ? '100%' : '720px' }}>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              marginBottom: isMobile ? '28px' : '32px'
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(59, 130, 246, 0.15)',
                border: '1px solid rgba(59, 130, 246, 0.4)',
                borderRadius: '50px',
                padding: isMobile ? '8px 16px' : '10px 20px',
                fontSize: isMobile ? '11px' : '12px',
                fontWeight: '700',
                color: '#60a5fa',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                backdropFilter: 'blur(10px)'
              }}>
                Geociências de Petróleo · PhD Track
              </div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(124, 58, 237, 0.15)',
                border: '1px solid rgba(124, 58, 237, 0.4)',
                borderRadius: '50px',
                padding: isMobile ? '8px 16px' : '10px 20px',
                fontSize: isMobile ? '11px' : '12px',
                fontWeight: '700',
                color: '#c4b5fd',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                backdropFilter: 'blur(10px)'
              }}>
                <Building size={13} /> COPIA Group · Director R&D&T
              </div>
            </div>

            <h1 style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: isMobile ? '42px' : '72px',
              fontWeight: '700',
              color: 'white',
              lineHeight: '1.0',
              letterSpacing: '-0.025em',
              marginBottom: isMobile ? '16px' : '20px'
            }}>
              Dr. Edmilson
              <br />
              <span style={{
                background: 'linear-gradient(90deg, #60a5fa 0%, #c4b5fd 60%, #86efac 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontStyle: 'italic'
              }}>Delfim Praia</span>
            </h1>

            {/* Keynote speaker strip */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 14px',
              background: 'rgba(14,165,233,0.12)',
              border: '1px solid rgba(14,165,233,0.35)',
              borderRadius: '10px',
              marginBottom: isMobile ? '24px' : '28px',
              backdropFilter: 'blur(10px)'
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#22c55e',
                boxShadow: '0 0 10px #22c55e',
                animation: 'pulse 2s infinite'
              }}></span>
              <span style={{
                fontSize: isMobile ? '12px' : '13px',
                color: '#7dd3fc',
                fontWeight: '600',
                letterSpacing: '0.02em'
              }}>
                Keynote Speaker · 10 palcos continentais em 2026 · NIEC · MINEA · AIMCT · NOGC · Capital Humano · Huawei · AOG · AHTLS · AEW · AGLNG
              </span>
            </div>

            <p style={{
              fontSize: isMobile ? '16px' : '18px',
              color: '#cbd5e1',
              lineHeight: '1.7',
              marginBottom: isMobile ? '32px' : '40px',
              maxWidth: isMobile ? '100%' : '620px'
            }}>
              {isMobile
                ? 'Geocientista e executivo angolano. Lidero I&D em geociências aplicadas e IA na COPIA Group — com produtos próprios já em mercado e presença em palcos de energia da África.'
                : 'Geocientista-executivo angolano a liderar a soberania tecnológica africana em interpretação sísmica e modelagem de reservatórios. Director de I&D da COPIA Group of Companies, co-criador dos produtos COPIA Seis e COPIA DynamicSim, e speaker ativo nos maiores fóruns de energia do continente em 2026.'
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
                <a href="mailto:praiae180@gmail.com" style={{
                  wordBreak: isMobile ? 'break-all' : 'normal',
                  fontSize: isMobile ? '12px' : '14px',
                  color: 'inherit',
                  textDecoration: 'none'
                }}>
                  praiae180@gmail.com
                </a>
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
                <a href="https://wa.me/244933514132" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                  +244 933 514 132 · WhatsApp
                </a>
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
                Ufa, Rússia - Luanda, Angola
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
                  { label: 'Palcos Continentais em 2026', value: '10' },
                  { label: 'Produtos Tech Liderados', value: '5' },
                  { label: 'Publicações Científicas', value: '6+' },
                  { label: 'Países de Consultoria', value: '4' },
                  { label: 'Prêmios Internacionais', value: '2' },
                  { label: 'Idiomas', value: '3' }
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
                    { label: 'Localização', value: 'Ufa, Rússia - Luanda, Angola' }
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
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '32px'
          }}>
            {[
              {
                title: 'Director of Research, Development & Technology',
                company: 'COPIA Group of Companies',
                period: 'Atual',
                type: 'Executivo · I&D',
                icon: Building,
                color: '#7c3aed',
                achievements: [
                  'Lidero a agenda de I&D em geociências aplicadas, IA e transformação digital industrial em uma das maiores empresas angolanas de engenharia',
                  'Responsável pelo desenvolvimento dos produtos proprietários COPIA Seis (interpretação sísmica com IA), COPIA DynamicSim (modelagem dinâmica de reservatórios) e COPIA Quasar (análise de infraestruturas críticas)',
                  'Signatário do protocolo de cooperação com a Associação de Geofísica de Angola (ASGA) em Setembro de 2025',
                  'Apoio à expansão regional da COPIA para a África Austral, incluindo o novo escritório em Windhoek, Namíbia'
                ]
              },
              {
                title: 'Fundador',
                company: 'EDELPHIA',
                period: 'Atual · Lisboa',
                type: 'Founder',
                icon: Star,
                color: '#0ea5e9',
                achievements: [
                  'Fundei a EDELPHIA — empresa de data science e algoritmos sob a assinatura "Science · Algorithms · Intelligence"',
                  'Framework baseado em quatro pilares: precisão em estimação estatística, minimização de risco em machine learning, análise de inferência causal e acumulação contínua de conhecimento',
                  'Equação central Φ = ∫ knowledge · dt — modelo matemático que orienta a cultura e o método da empresa',
                  'Sede em Lisboa (38.7223° N · 9.1393° W) · site oficial em edelphia.vercel.app'
                ]
              },
              {
                title: 'Formador e Consultor Técnico Sénior',
                company: 'Justificações Acadêmicas',
                period: '2020 - Presente',
                type: 'Fundador & CEO',
                icon: BookOpen,
                color: '#1e40af',
                achievements: [
                  'Fundei e lidero programas especializados de formação profissional em geociências, engenharia de petróleo e programação Python',
                  'Atendo profissionais de grandes empresas petrolíferas incluindo Sonangol, Chevron e ANPG com soluções de treinamento personalizadas',
                  'Ministro formação avançada a quadros técnicos sénior de instituições de referência (UAN, UCAN, ISPTEC) — focada em profissionais, não em estudantes',
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
              <div key={index} className="experience-card" style={{
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '40px',
                transition: 'border-color 0.3s ease, background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
                height: 'fit-content',
                opacity: 0,
                transform: 'translateY(32px)',
                animation: 'fadeInUp 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards',
                animationDelay: `${index * 0.15}s`,
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = experience.color;
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = `0 20px 40px ${experience.color}25`;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.backgroundColor = '#f8fafc';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                {/* Subtle animated accent corner */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '140px',
                  height: '140px',
                  background: `radial-gradient(circle at top right, ${experience.color}25 0%, transparent 70%)`,
                  pointerEvents: 'none',
                  transition: 'opacity 0.4s ease'
                }}></div>
                {/* Left accent stripe */}
                <div style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: '4px',
                  background: `linear-gradient(180deg, ${experience.color} 0%, ${experience.color}40 100%)`,
                  borderTopLeftRadius: '16px',
                  borderBottomLeftRadius: '16px'
                }}></div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px', position: 'relative', zIndex: 2 }}>
                  <div className="exp-icon-wrap" style={{
                    width: '52px',
                    height: '52px',
                    background: `linear-gradient(135deg, ${experience.color} 0%, ${experience.color}cc 100%)`,
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '16px',
                    boxShadow: `0 8px 20px ${experience.color}40`,
                    transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }}>
                    <experience.icon size={26} style={{ color: 'white' }} />
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

                {(experience.company === 'EDELPHIA' || experience.company === 'Justificações Acadêmicas') && (
                  <a
                    href={experience.company === 'EDELPHIA' ? 'https://edelphia.vercel.app/' : 'https://www.justificacoesacademicas.org/'}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginTop: '20px',
                      padding: '10px 16px',
                      background: `linear-gradient(135deg, ${experience.color}15 0%, ${experience.color}25 100%)`,
                      border: `1px solid ${experience.color}40`,
                      borderRadius: '8px',
                      color: experience.color,
                      fontSize: '13px',
                      fontWeight: '700',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = experience.color;
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = `linear-gradient(135deg, ${experience.color}15 0%, ${experience.color}25 100%)`;
                      e.currentTarget.style.color = experience.color;
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <Globe size={14} />
                    {experience.company === 'EDELPHIA' ? 'Visitar edelphia.vercel.app' : 'Visitar justificacoesacademicas.org'}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Speaking Section — Palestras & Conferências Internacionais */}
      <section id="speaking" style={{
        padding: isMobile ? '80px 20px' : '120px 40px',
        background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ marginBottom: isMobile ? '40px' : '64px' }}>
            <div style={{
              display: 'inline-block',
              backgroundColor: 'rgba(124, 58, 237, 0.1)',
              color: '#7c3aed',
              fontSize: '12px',
              fontWeight: '600',
              padding: '6px 14px',
              borderRadius: '50px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '16px'
            }}>
              Keynote Speaker · 2026
            </div>
            <h2 style={{
              fontSize: isMobile ? '28px' : '32px',
              fontWeight: '700',
              color: '#0f172a',
              marginBottom: '16px',
              letterSpacing: '-0.02em'
            }}>
              Palestras & Conferências Internacionais
            </h2>
            <div style={{
              width: '40px',
              height: '4px',
              backgroundColor: '#7c3aed',
              borderRadius: '2px',
              marginBottom: '16px'
            }}></div>
            <p style={{
              fontSize: '16px',
              color: '#64748b',
              maxWidth: '720px',
              lineHeight: '1.7'
            }}>
              Dez palcos continentais em 2026 — de Windhoek a Maputo, passando por Luanda (Huawei Innovation Center, HCTA Talatona), Cape Town e múltiplas conferências ministeriais angolanas. Speaker, keynote, chairperson, masterclass lead e laureado com Certificate of Appreciation nos principais fóruns de energia e capital humano de África.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: isMobile ? '20px' : '24px'
          }}>
            {[
              {
                event: 'AGLNG 2026',
                fullName: 'Africa Gas & LNG Summit — Maputo',
                location: 'Joaquim Chissano Conf. Centre, Maputo',
                date: '11–13 Novembro 2026',
                role: 'Speaker · Session 3.1',
                session: '"Preparing Africa\'s Workforce for Gas and LNG Projects" (Dia 3) + demonstração técnica do COPIA DynamicSim com análise PVT (Peng-Robinson), declínio Arps no campo Volve e previsão LSTM. Sob patrocínio de H.E. Daniel Chapo, Presidente de Moçambique.',
                image: '/aglng/_Y2A6181.jpg',
                color: '#0ea5e9',
                badge: 'Mais recente'
              },
              {
                event: 'AEW 2026',
                fullName: 'African Energy Week',
                location: 'Cape Town, África do Sul',
                date: '12 Outubro 2026',
                role: 'Speaker & Chairperson',
                session: 'Keynote "Building Africa\'s Subsurface Intelligence Through AI-Driven Seismic Interpretation" (Sala 2.4B, 10:00). Chair adicional no Exhibition Hall Tech Stage da COPIA Group.',
                image: '/aew/aew-5.webp',
                color: '#eab308',
                badge: 'Speaker + Chair'
              },
              {
                event: 'AHTLS 2026',
                fullName: 'Angola Hub Transporte & Logística Summit',
                location: 'Talatona, Angola',
                date: '29 Setembro 2026',
                role: 'Workshop Lead',
                session: 'Workshop "Digitalização, Inteligência Artificial e Automação Logística: Aplicações Práticas" na Sala Porto do Namibe — CCTA.',
                image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80',
                color: '#059669',
                badge: 'Workshop'
              },
              {
                event: 'AOG 2026',
                fullName: 'Angola Oil & Gas',
                location: 'Luanda, Angola',
                date: '8–10 Setembro 2026',
                role: 'Painel · Pre-con · VIP Breakfast',
                session: 'Três participações: painel no palco principal, keynote técnica pre-con "Reconstruction of Missing RHOB and NPHI Well Logs Using ML Algorithms" (powered by COPIA), e VIP Breakfast onde discursou sobre os softwares COPIA ao lado do Secretário de Estado.',
                image: '/aog/55521840656_d5559eb914_z.jpg',
                color: '#dc2626',
                badge: '3 palcos'
              },
              {
                event: 'NOGC 2026',
                fullName: 'Namibia Oil & Gas Conference',
                location: 'Windhoek, Namíbia',
                date: '18–20 Agosto 2026',
                role: 'Speaker & Chairperson',
                session: 'Chair de sessão sobre modelagem estática de reservatórios através da integração de dados sísmicos e geológicos. Participação em painéis de appraisal, reservoir engineering e field development.',
                image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80',
                color: '#f59e0b',
                badge: 'Speaker + Chair'
              },
              {
                event: 'AIMCT 2026',
                fullName: 'Asset Integrity, Maintenance, Corrosion & Turnaround Conference',
                location: 'HCTA · Luanda, Angola',
                date: '14 Julho 2026',
                role: 'Speaker · Certificate of Appreciation',
                session: 'Apresentação técnica no AIMCT Angola 2026 sobre integridade de activos offshore, gestão de corrosão, confiabilidade e resiliência de engenharia para a infraestrutura envelhecida de Angola. Certificado oficial entregue pela Cogent Solutions.',
                image: '/asset/aimct-podium-2.jpeg',
                color: '#64748b',
                badge: 'Certificado'
              },
              {
                event: 'MINEA 2026',
                fullName: '2ª Conferência Internacional sobre Energia e Águas',
                location: 'HCTA · Luanda, Angola',
                date: '28–29 Maio 2026',
                role: 'Speaker · Patrocinador Platina',
                session: 'Palestra "Soberania Tecnológica na Análise de Infraestruturas Críticas Utilizando Software QUASAR" — apresentação pública do novo produto COPIA Quasar perante o Ministério da Energia e Águas de Angola.',
                image: '/minea/minea-08-poster.jpeg',
                color: '#16a34a',
                badge: 'Lançou Quasar'
              },
              {
                event: 'NIEC 2026',
                fullName: 'Namibia International Energy Conference',
                location: 'Windhoek, Namíbia',
                date: '14 Abril 2026',
                role: 'Speaker · Day 1',
                session: 'Palestra "Digital Transformation in Reservoir Engineering: Using AI for Integrated Seismic Interpretation and Dynamic Simulation" no Venue 3 às 15:15. Representando COPIA perante autoridades namibianas.',
                image: '/niec/niec-03.jpeg',
                color: '#7c3aed',
                badge: 'Speaker'
              },
              {
                event: 'Huawei Luanda',
                fullName: 'Huawei Innovation Center · Masterclass COPIA',
                location: 'Luanda, Angola',
                date: '2026',
                role: 'Masterclass Lead',
                session: 'Masterclass técnica de IA/ML/DL aplicada à ciência de dados do petróleo (Random Forest, XGBoost, ANN, CNN, kMeans, LSTM) no auditório Huawei Luanda, com formandos angolanos.',
                image: '/huawei/huawei-04-ia-ml-dl.jpeg',
                color: '#ef4444',
                badge: 'Masterclass'
              },
              {
                event: 'Capital Humano',
                fullName: 'Conferência Nacional sobre o Capital Humano · 50 Anos Angola',
                location: 'Luanda, Angola',
                date: '29 Agosto 2026',
                role: 'Participante · Cobertura mediática',
                session: 'Participação na Conferência Nacional sobre o Capital Humano e o Desenvolvimento de Angola (UTG/PNFQ · Governo de Angola), no âmbito das celebrações dos 50 anos da Independência Nacional. Cobertura TV dedicada.',
                image: '/ch/ch-05-group.jpeg',
                color: '#dc2626',
                badge: '50 Anos Angola'
              }
            ].map((talk, index) => (
              <div key={index} style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid #e2e8f0',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = `0 16px 40px ${talk.color}25`;
                e.currentTarget.style.borderColor = talk.color;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = '#e2e8f0';
              }}>
                <div style={{
                  position: 'relative',
                  height: '200px',
                  overflow: 'hidden'
                }}>
                  <img
                    src={talk.image}
                    alt={talk.fullName}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(135deg, ${talk.color}CC 0%, rgba(0,0,0,0.5) 100%)`
                  }}></div>
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    backgroundColor: 'rgba(255,255,255,0.95)',
                    color: talk.color,
                    fontSize: '11px',
                    fontWeight: '700',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    {talk.badge}
                  </div>
                  <div style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '20px',
                    right: '20px',
                    color: 'white'
                  }}>
                    <div style={{
                      fontSize: '28px',
                      fontWeight: '800',
                      letterSpacing: '-0.02em',
                      marginBottom: '4px'
                    }}>
                      {talk.event}
                    </div>
                    <div style={{
                      fontSize: '13px',
                      opacity: 0.95,
                      fontWeight: '500'
                    }}>
                      {talk.fullName}
                    </div>
                  </div>
                </div>

                <div style={{ padding: '24px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '8px',
                    fontSize: '13px',
                    color: '#64748b',
                    fontWeight: '500'
                  }}>
                    <Calendar size={14} />
                    {talk.date}
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '16px',
                    fontSize: '13px',
                    color: '#64748b',
                    fontWeight: '500'
                  }}>
                    <MapPin size={14} />
                    {talk.location}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    fontWeight: '700',
                    color: talk.color,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: '10px'
                  }}>
                    {talk.role}
                  </div>
                  <p style={{
                    fontSize: '14px',
                    color: '#374151',
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    {talk.session}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section — AGLNG 2026 Maputo Highlight */}
      <section id="aglng-featured" style={{
        padding: isMobile ? '60px 20px' : '100px 40px',
        background: 'linear-gradient(135deg, #020617 0%, #0c4a6e 50%, #0369a1 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative blobs */}
        <div style={{
          position: 'absolute',
          top: '-120px',
          right: '-120px',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(14,165,233,0.35) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-120px',
          left: '-120px',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,197,94,0.25) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}></div>

        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'flex-start' : 'center',
            gap: isMobile ? '16px' : '24px',
            marginBottom: isMobile ? '32px' : '48px'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: 'rgba(14,165,233,0.2)',
              border: '1px solid rgba(14,165,233,0.4)',
              color: '#7dd3fc',
              fontSize: '12px',
              fontWeight: '700',
              padding: '8px 16px',
              borderRadius: '50px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              backdropFilter: 'blur(10px)'
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#22c55e',
                boxShadow: '0 0 12px #22c55e',
                animation: 'pulse 2s infinite'
              }}></span>
              Destaque · Nov 2026
            </div>
            <div style={{
              fontSize: '13px',
              color: '#93c5fd',
              fontWeight: '500',
              letterSpacing: '0.05em'
            }}>
              Moçambique · LNG & Gas
            </div>
          </div>

          <h2 style={{
            fontSize: isMobile ? '32px' : '52px',
            fontWeight: '800',
            color: 'white',
            letterSpacing: '-0.03em',
            lineHeight: '1.05',
            marginBottom: '20px',
            maxWidth: '900px'
          }}>
            Africa Gas & LNG Summit 2026
            <br />
            <span style={{
              background: 'linear-gradient(90deg, #7dd3fc 0%, #22c55e 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Maputo · Session 3.1
            </span>
          </h2>

          <p style={{
            fontSize: isMobile ? '15px' : '17px',
            color: '#cbd5e1',
            lineHeight: '1.7',
            maxWidth: '820px',
            marginBottom: isMobile ? '36px' : '56px'
          }}>
            "Preparing Africa's Workforce for Gas and LNG Projects" — Dr. Edmilson Praia representou a COPIA Group of Companies no palco oficial do Africa Gas & LNG Summit no Centro Internacional de Conferências Joaquim Chissano, Maputo (11–13 Nov 2026). Evento sob alto patrocínio de H.E. Daniel Chapo, Presidente de Moçambique, com parceria ENH, INP e Ministério dos Recursos Minerais e Energia.
          </p>

          {/* Hero photo + stats grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1.6fr 1fr',
            gap: isMobile ? '20px' : '28px',
            marginBottom: isMobile ? '20px' : '28px'
          }}>
            <div style={{
              borderRadius: '20px',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
              position: 'relative'
            }}>
              <img
                src="/aglng/_Y2A6113.jpg"
                alt="Dr. Edmilson Praia · Session 3.1 · AGLNG 2026 Maputo"
                style={{
                  width: '100%',
                  height: isMobile ? '280px' : '480px',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '24px',
                background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
                color: 'white'
              }}>
                <div style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#7dd3fc',
                  marginBottom: '4px'
                }}>Session 3.1 · From Skills to Employment</div>
                <div style={{ fontSize: isMobile ? '16px' : '20px', fontWeight: '700' }}>
                  Preparing Africa's Workforce for Gas and LNG Projects
                </div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: isMobile ? '12px' : '16px'
            }}>
              {[
                { label: 'Evento', value: 'Africa Gas & LNG Summit 2026', color: '#7dd3fc' },
                { label: 'Localização', value: 'Joaquim Chissano Conf. Centre · Maputo', color: '#86efac' },
                { label: 'Sessão', value: '3.1 · Dia 3 · 13 Nov 2026', color: '#fcd34d' },
                { label: 'Representando', value: 'COPIA Group of Companies, S.A.', color: '#f0abfc' },
                { label: 'Patrono', value: 'H.E. Daniel Chapo · Presidente de Moçambique', color: '#fca5a5' }
              ].map((stat, i) => (
                <div key={i} style={{
                  padding: '18px 22px',
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '14px',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.borderColor = stat.color;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                }}>
                  <div style={{
                    fontSize: '10px',
                    fontWeight: '700',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: stat.color,
                    marginBottom: '6px'
                  }}>{stat.label}</div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: 'white', lineHeight: '1.4' }}>
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical highlights grid — 5 photos */}
          <div style={{
            marginTop: isMobile ? '40px' : '64px',
            marginBottom: '24px'
          }}>
            <div style={{
              fontSize: '11px',
              fontWeight: '700',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#7dd3fc',
              marginBottom: '8px'
            }}>Momentos técnicos</div>
            <h3 style={{
              fontSize: isMobile ? '22px' : '28px',
              fontWeight: '700',
              color: 'white',
              letterSpacing: '-0.02em',
              marginBottom: '28px'
            }}>
              Demonstração do COPIA DynamicSim no palco de Maputo
            </h3>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: isMobile ? '16px' : '20px'
          }}>
            {[
              {
                src: '/aglng/_Y2A6181.jpg',
                title: 'Apresentação oficial',
                caption: 'Slide institucional "Dr. Edmilson Praia · Director · Copia Group" no palco AGLNG.'
              },
              {
                src: '/aglng/_Y2A6027.jpg',
                title: 'Interpretação sísmica e petrofísica',
                caption: '"Que software produziu estas imagens?" — abertura mostrando capacidades do COPIA Seis.'
              },
              {
                src: '/aglng/_Y2A6089.jpg',
                title: 'PVT · Peng-Robinson',
                caption: 'Análise SPE3 de gás condensado · 24 componentes · dew point 3.428 psig · erro médio 2,7%.'
              },
              {
                src: '/aglng/_Y2A6091.jpg',
                title: 'Declínio Arps · Campo Volve',
                caption: 'Dados públicos Equinor · poço 15/9-F-14 (2008-2016) · R² = 0,93 em 91 pontos mensais.'
              },
              {
                src: '/aglng/_Y2A6098.jpg',
                title: 'Previsão LSTM',
                caption: 'Machine learning em 3 cenários (otimista/moderado/pessimista) · treino 24s · Campo A.'
              },
              {
                src: '/aglng/_Y2A6117.jpg',
                title: 'Audiência & Q&A',
                caption: 'Engajamento do público africano durante o bloco técnico da COPIA Group.'
              }
            ].map((photo, i) => (
              <div key={i} style={{
                borderRadius: '14px',
                overflow: 'hidden',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                transition: 'all 0.4s ease',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = 'rgba(125,211,252,0.5)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(14,165,233,0.25)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{
                  width: '100%',
                  height: '200px',
                  overflow: 'hidden'
                }}>
                  <img
                    src={photo.src}
                    alt={photo.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.6s ease'
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
                    onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                </div>
                <div style={{ padding: '18px' }}>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '700',
                    color: 'white',
                    marginBottom: '6px'
                  }}>{photo.title}</div>
                  <div style={{
                    fontSize: '12px',
                    color: '#cbd5e1',
                    lineHeight: '1.6'
                  }}>{photo.caption}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section — AOG 2026 Luanda · Three Stages */}
      <section id="aog-featured" style={{
        padding: isMobile ? '60px 20px' : '100px 40px',
        background: 'linear-gradient(135deg, #1c0a06 0%, #3f1710 45%, #7f1d1d 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative blobs */}
        <div style={{
          position: 'absolute',
          top: '-140px',
          right: '-100px',
          width: '440px',
          height: '440px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(239,68,68,0.3) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-150px',
          left: '-120px',
          width: '480px',
          height: '480px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(249,115,22,0.25) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}></div>

        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'flex-start' : 'center',
            gap: isMobile ? '16px' : '24px',
            marginBottom: isMobile ? '32px' : '48px'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: 'rgba(239,68,68,0.2)',
              border: '1px solid rgba(239,68,68,0.45)',
              color: '#fca5a5',
              fontSize: '12px',
              fontWeight: '700',
              padding: '8px 16px',
              borderRadius: '50px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              backdropFilter: 'blur(10px)'
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#f97316',
                boxShadow: '0 0 12px #f97316',
                animation: 'pulse 2s infinite'
              }}></span>
              Destaque · Set 2026
            </div>
            <div style={{
              fontSize: '13px',
              color: '#fecaca',
              fontWeight: '500',
              letterSpacing: '0.05em'
            }}>
              Angola · Oil & Gas
            </div>
          </div>

          <h2 style={{
            fontSize: isMobile ? '32px' : '52px',
            fontWeight: '800',
            color: 'white',
            letterSpacing: '-0.03em',
            lineHeight: '1.05',
            marginBottom: '20px',
            maxWidth: '920px'
          }}>
            Angola Oil & Gas 2026
            <br />
            <span style={{
              background: 'linear-gradient(90deg, #fca5a5 0%, #fdba74 50%, #fcd34d 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Três palcos · Uma mensagem
            </span>
          </h2>

          <p style={{
            fontSize: isMobile ? '15px' : '17px',
            color: '#fecaca',
            lineHeight: '1.7',
            maxWidth: '860px',
            marginBottom: isMobile ? '36px' : '56px'
          }}>
            Em Luanda, Dr. Edmilson Praia marcou presença em três momentos distintos do AOG 2026:
            um <strong style={{ color: 'white' }}>painel oficial</strong> no palco principal,
            uma <strong style={{ color: 'white' }}>apresentação técnica pre-conferência</strong> powered by COPIA,
            e um <strong style={{ color: 'white' }}>VIP Breakfast</strong> onde discursou sobre os softwares que desenvolveu, ao lado do Secretário de Estado.
          </p>

          {/* Hero photo + stats grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1.6fr 1fr',
            gap: isMobile ? '20px' : '28px',
            marginBottom: isMobile ? '48px' : '72px'
          }}>
            <div style={{
              borderRadius: '20px',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
              position: 'relative'
            }}>
              <img
                src="/aog/55522436114_246c464c39_z.jpg"
                alt="Dr. Edmilson Praia · AOG 2026 VIP Breakfast · COPIA Group"
                style={{
                  width: '100%',
                  height: isMobile ? '280px' : '480px',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '24px',
                background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)',
                color: 'white'
              }}>
                <div style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#fcd34d',
                  marginBottom: '4px'
                }}>VIP Breakfast · COPIA Group of Companies, S.A.</div>
                <div style={{ fontSize: isMobile ? '16px' : '20px', fontWeight: '700' }}>
                  "See Beyond The Surface" — apresentação dos softwares COPIA
                </div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: isMobile ? '12px' : '16px'
            }}>
              {[
                { label: 'Evento', value: 'Angola Oil & Gas 2026', color: '#fca5a5' },
                { label: 'Localização', value: 'Luanda, Angola', color: '#fdba74' },
                { label: 'Datas', value: '8–10 Setembro 2026', color: '#fcd34d' },
                { label: 'Participações', value: 'Painel · Pre-con técnica · VIP Breakfast', color: '#86efac' },
                { label: 'Softwares apresentados', value: 'COPIA Seis · COPIA DynamicSim · Well Log Pro', color: '#c4b5fd' }
              ].map((stat, i) => (
                <div key={i} style={{
                  padding: '18px 22px',
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '14px',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.borderColor = stat.color;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                }}>
                  <div style={{
                    fontSize: '10px',
                    fontWeight: '700',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: stat.color,
                    marginBottom: '6px'
                  }}>{stat.label}</div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: 'white', lineHeight: '1.4' }}>
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* === BLOCO 1: Pre-conference Technical Workshop === */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'auto 1fr',
            gap: isMobile ? '16px' : '32px',
            alignItems: 'baseline',
            marginBottom: '28px'
          }}>
            <div style={{
              fontSize: isMobile ? '72px' : '110px',
              fontWeight: '900',
              lineHeight: '1',
              background: 'linear-gradient(135deg, #fca5a5 0%, rgba(252,165,165,0.2) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.05em'
            }}>01</div>
            <div>
              <div style={{
                fontSize: '11px',
                fontWeight: '700',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#fca5a5',
                marginBottom: '10px'
              }}>Pre-Conference · COPIA Workshop</div>
              <h3 style={{
                fontSize: isMobile ? '22px' : '30px',
                fontWeight: '700',
                color: 'white',
                letterSpacing: '-0.02em',
                lineHeight: '1.2',
                marginBottom: '14px'
              }}>
                Reconstruction of Missing RHOB and NPHI Well Logs Using Machine Learning Algorithms
              </h3>
              <p style={{
                fontSize: isMobile ? '14px' : '15px',
                color: '#fed7aa',
                lineHeight: '1.7',
                margin: 0
              }}>
                Sessão técnica de 40 minutos no programa pre-con do AOG 2026, organizada pela Energy Capital & Power e powered by COPIA Group. Apresentação dedicada à imputação de perfis petrofísicos usando algoritmos de ML — tema em que a COPIA está na vanguarda africana. <em style={{ color: '#fef3c7' }}>6 photos · 35 views no álbum oficial da organização.</em>
              </p>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: isMobile ? '12px' : '16px',
            marginBottom: isMobile ? '56px' : '80px'
          }}>
            {[
              { src: '/aog/55515896186_249cc54f4f_b.jpg', caption: 'No palco técnico pre-con · Energy Capital & Power' },
              { src: '/aog/55516005483_b25a149bc3_z.jpg', caption: 'A explicar o pipeline de ML para RHOB/NPHI' },
              { src: '/aog/55516058004_bdbe5c26bb_z.jpg', caption: 'Momento de interação técnica com o auditório' }
            ].map((photo, i) => (
              <div key={i} style={{
                borderRadius: '14px',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.08)',
                transition: 'all 0.4s ease',
                position: 'relative'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = 'rgba(252,165,165,0.5)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(239,68,68,0.3)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <img src={photo.src} alt={photo.caption} style={{
                  width: '100%',
                  height: isMobile ? '240px' : '260px',
                  objectFit: 'cover',
                  display: 'block'
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '16px',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
                  fontSize: '12px',
                  color: '#fed7aa',
                  fontWeight: '500',
                  lineHeight: '1.5'
                }}>{photo.caption}</div>
              </div>
            ))}
          </div>

          {/* === BLOCO 2: Painel Oficial === */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'auto 1fr',
            gap: isMobile ? '16px' : '32px',
            alignItems: 'baseline',
            marginBottom: '28px'
          }}>
            <div style={{
              fontSize: isMobile ? '72px' : '110px',
              fontWeight: '900',
              lineHeight: '1',
              background: 'linear-gradient(135deg, #fdba74 0%, rgba(253,186,116,0.2) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.05em'
            }}>02</div>
            <div>
              <div style={{
                fontSize: '11px',
                fontWeight: '700',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#fdba74',
                marginBottom: '10px'
              }}>Painel Oficial · Palco Principal</div>
              <h3 style={{
                fontSize: isMobile ? '22px' : '30px',
                fontWeight: '700',
                color: 'white',
                letterSpacing: '-0.02em',
                lineHeight: '1.2',
                marginBottom: '14px'
              }}>
                Painelista no palco principal do Angola Oil & Gas
              </h3>
              <p style={{
                fontSize: isMobile ? '14px' : '15px',
                color: '#fed7aa',
                lineHeight: '1.7',
                margin: 0
              }}>
                Participação como painelista no palco oficial do AOG 2026, lado a lado com executivos seniores da indústria angolana e internacional. Discussão sobre o futuro das operações de exploração, produção e inovação tecnológica em Angola — representando a voz da nova geração de geocientistas africanos com produto nacional em mercado.
              </p>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1.5fr 1fr 1fr',
            gap: isMobile ? '12px' : '16px',
            marginBottom: isMobile ? '56px' : '80px'
          }}>
            {[
              { src: '/aog/55521840656_d5559eb914_z.jpg', caption: 'Painel completo no palco Angola Oil & Gas 2026', hero: true },
              { src: '/aog/55521994714_e59a5a82dc_z.jpg', caption: 'A intervir perante a audiência' },
              { src: '/aog/55522220275_937b118cd5_z.jpg', caption: 'Ao lado de executivos seniores do sector' }
            ].map((photo, i) => (
              <div key={i} style={{
                borderRadius: '14px',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.08)',
                transition: 'all 0.4s ease',
                position: 'relative'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = 'rgba(253,186,116,0.5)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(249,115,22,0.3)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <img src={photo.src} alt={photo.caption} style={{
                  width: '100%',
                  height: isMobile ? '240px' : (photo.hero ? '320px' : '260px'),
                  objectFit: 'cover',
                  display: 'block'
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '16px',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
                  fontSize: '12px',
                  color: '#fed7aa',
                  fontWeight: '500',
                  lineHeight: '1.5'
                }}>{photo.caption}</div>
              </div>
            ))}
          </div>

          {/* === BLOCO 3: VIP Breakfast === */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'auto 1fr',
            gap: isMobile ? '16px' : '32px',
            alignItems: 'baseline',
            marginBottom: '28px'
          }}>
            <div style={{
              fontSize: isMobile ? '72px' : '110px',
              fontWeight: '900',
              lineHeight: '1',
              background: 'linear-gradient(135deg, #fcd34d 0%, rgba(252,211,77,0.2) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.05em'
            }}>03</div>
            <div>
              <div style={{
                fontSize: '11px',
                fontWeight: '700',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#fcd34d',
                marginBottom: '10px'
              }}>VIP Breakfast · COPIA Group of Companies, S.A.
              </div>
              <h3 style={{
                fontSize: isMobile ? '22px' : '30px',
                fontWeight: '700',
                color: 'white',
                letterSpacing: '-0.02em',
                lineHeight: '1.2',
                marginBottom: '14px'
              }}>
                Discurso sobre os softwares COPIA — ao lado do Secretário de Estado
              </h3>
              <p style={{
                fontSize: isMobile ? '14px' : '15px',
                color: '#fef3c7',
                lineHeight: '1.7',
                margin: 0
              }}>
                No Pequeno-Almoço VIP da COPIA Group, sob a assinatura "See Beyond The Surface", Dr. Edmilson Praia discursou sobre os softwares que lidera no desenvolvimento — <strong style={{ color: 'white' }}>COPIA Seis</strong> (interpretação sísmica com IA) e <strong style={{ color: 'white' }}>COPIA DynamicSim</strong> (modelagem dinâmica de reservatórios) — ao lado do Secretário de Estado angolano. Um momento de afirmação institucional do produto tecnológico nacional perante stakeholders de alto nível.
              </p>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: isMobile ? '12px' : '16px'
          }}>
            {[
              { src: '/aog/55522280726_74ab1d31af_z.jpg', caption: 'Discurso perante slide institucional COPIA Group of Companies' },
              { src: '/aog/55522385448_dfb1aa93b3_z.jpg', caption: 'Ao púlpito VIP Breakfast · Angola Oil & Gas' },
              { src: '/aog/55522665125_c4910c9883_z.jpg', caption: 'A apresentar os softwares COPIA perante a audiência' }
            ].map((photo, i) => (
              <div key={i} style={{
                borderRadius: '14px',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.08)',
                transition: 'all 0.4s ease',
                position: 'relative'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = 'rgba(252,211,77,0.5)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(252,211,77,0.25)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <img src={photo.src} alt={photo.caption} style={{
                  width: '100%',
                  height: isMobile ? '240px' : '260px',
                  objectFit: 'cover',
                  display: 'block'
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '16px',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
                  fontSize: '12px',
                  color: '#fef3c7',
                  fontWeight: '500',
                  lineHeight: '1.5'
                }}>{photo.caption}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section — AEW 2026 Cape Town · African Energy Week */}
      <section id="aew-featured" style={{
        padding: isMobile ? '60px 20px' : '100px 40px',
        background: 'linear-gradient(135deg, #0c0a09 0%, #1e1b4b 40%, #78350f 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-140px',
          right: '-100px',
          width: '480px',
          height: '480px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(251,191,36,0.35) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-150px',
          left: '-120px',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}></div>

        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'flex-start' : 'center',
            gap: isMobile ? '16px' : '24px',
            marginBottom: isMobile ? '32px' : '48px'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: 'rgba(251,191,36,0.15)',
              border: '1px solid rgba(251,191,36,0.45)',
              color: '#fde68a',
              fontSize: '12px',
              fontWeight: '700',
              padding: '8px 16px',
              borderRadius: '50px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              backdropFilter: 'blur(10px)'
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#fbbf24',
                boxShadow: '0 0 12px #fbbf24',
                animation: 'pulse 2s infinite'
              }}></span>
              Destaque · Out 2026
            </div>
            <div style={{
              fontSize: '13px',
              color: '#fde68a',
              fontWeight: '500',
              letterSpacing: '0.05em'
            }}>
              Cape Town · "Making African Energy History by 2030"
            </div>
          </div>

          <h2 style={{
            fontSize: isMobile ? '32px' : '52px',
            fontWeight: '800',
            color: 'white',
            letterSpacing: '-0.03em',
            lineHeight: '1.05',
            marginBottom: '20px',
            maxWidth: '940px'
          }}>
            African Energy Week 2026
            <br />
            <span style={{
              background: 'linear-gradient(90deg, #fde68a 0%, #fbbf24 50%, #a5b4fc 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Speaker · Chair · COPIA Tech Stage
            </span>
          </h2>

          <p style={{
            fontSize: isMobile ? '15px' : '17px',
            color: '#fef3c7',
            lineHeight: '1.7',
            maxWidth: '860px',
            marginBottom: isMobile ? '36px' : '56px'
          }}>
            No maior palco de energia do continente, Dr. Edmilson Praia representou a COPIA Group of Companies com duplo papel: <strong style={{ color: 'white' }}>speaker na sessão oficial</strong> "Building Africa's Subsurface Intelligence Through AI-Driven Seismic Interpretation" (Sala 2.4B · 12 Out 2026) e <strong style={{ color: 'white' }}>chairperson no Exhibition Hall Tech Stage</strong>, onde apresentou as capacidades da COPIA perante o ecossistema energético africano.
          </p>

          {/* Hero + stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1.6fr 1fr',
            gap: isMobile ? '20px' : '28px',
            marginBottom: isMobile ? '48px' : '72px'
          }}>
            <div style={{
              borderRadius: '20px',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
              position: 'relative'
            }}>
              <img
                src="/aew/aew-5.webp"
                alt="Dr. Edmilson Praia · AEW 2026 Cape Town"
                style={{
                  width: '100%',
                  height: isMobile ? '280px' : '480px',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '24px',
                background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)',
                color: 'white'
              }}>
                <div style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#fde68a',
                  marginBottom: '4px'
                }}>African Energy Chamber · Cape Town</div>
                <div style={{ fontSize: isMobile ? '16px' : '20px', fontWeight: '700' }}>
                  "Affordable and Abundant Energy Additions for Africa" · AEW 2026
                </div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: isMobile ? '12px' : '16px'
            }}>
              {[
                { label: 'Evento', value: 'African Energy Week 2026', color: '#fde68a' },
                { label: 'Localização', value: 'Cape Town, África do Sul', color: '#fbbf24' },
                { label: 'Data', value: '12 Outubro 2026 · 10:00 · Sala 2.4B', color: '#a5b4fc' },
                { label: 'Papéis', value: 'Speaker (Keynote) + Chairperson (Tech Stage)', color: '#86efac' },
                { label: 'Representando', value: 'COPIA Group of Companies · Platinum Partner', color: '#c4b5fd' }
              ].map((stat, i) => (
                <div key={i} style={{
                  padding: '18px 22px',
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '14px',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.borderColor = stat.color;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                }}>
                  <div style={{
                    fontSize: '10px',
                    fontWeight: '700',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: stat.color,
                    marginBottom: '6px'
                  }}>{stat.label}</div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: 'white', lineHeight: '1.4' }}>
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* === BLOCO 1: Keynote === */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'auto 1fr',
            gap: isMobile ? '16px' : '32px',
            alignItems: 'baseline',
            marginBottom: '28px'
          }}>
            <div style={{
              fontSize: isMobile ? '72px' : '110px',
              fontWeight: '900',
              lineHeight: '1',
              background: 'linear-gradient(135deg, #fbbf24 0%, rgba(251,191,36,0.2) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.05em'
            }}>01</div>
            <div>
              <div style={{
                fontSize: '11px',
                fontWeight: '700',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#fbbf24',
                marginBottom: '10px'
              }}>Keynote · Sala 2.4B</div>
              <h3 style={{
                fontSize: isMobile ? '22px' : '30px',
                fontWeight: '700',
                color: 'white',
                letterSpacing: '-0.02em',
                lineHeight: '1.2',
                marginBottom: '14px'
              }}>
                Building Africa's Subsurface Intelligence Through AI-Driven Seismic Interpretation
              </h3>
              <p style={{
                fontSize: isMobile ? '14px' : '15px',
                color: '#fef3c7',
                lineHeight: '1.7',
                margin: 0
              }}>
                Palestra no palco oficial do AEW 2026 sobre como a IA está a transformar a interpretação sísmica e a exploração de hidrocarbonetos em África. Apresentação dos avanços do <strong style={{ color: 'white' }}>COPIA Seis</strong> enquadrados na agenda "Making African Energy History by 2030" da African Energy Chamber.
              </p>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: isMobile ? '12px' : '16px',
            marginBottom: isMobile ? '56px' : '80px'
          }}>
            {[
              { src: '/aew/aew-1.webp', caption: 'No palco oficial AEW 2026 · Cape Town' },
              { src: '/aew/aew-2.webp', caption: 'Branding "African Energy" visível no púlpito' },
              { src: '/aew/aew-6.webp', caption: 'Momento de interação com a audiência' },
              { src: '/aew/aew-8.webp', caption: 'Smile diplomático · comunicação técnica fluente' }
            ].map((photo, i) => (
              <div key={i} style={{
                borderRadius: '14px',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.08)',
                transition: 'all 0.4s ease',
                position: 'relative'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = 'rgba(251,191,36,0.5)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(251,191,36,0.3)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <img src={photo.src} alt={photo.caption} style={{
                  width: '100%',
                  height: isMobile ? '280px' : '300px',
                  objectFit: 'cover',
                  display: 'block'
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '16px',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
                  fontSize: '12px',
                  color: '#fef3c7',
                  fontWeight: '500',
                  lineHeight: '1.5'
                }}>{photo.caption}</div>
              </div>
            ))}
          </div>

          {/* === BLOCO 2: Chair COPIA Tech Stage === */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'auto 1fr',
            gap: isMobile ? '16px' : '32px',
            alignItems: 'baseline',
            marginBottom: '28px'
          }}>
            <div style={{
              fontSize: isMobile ? '72px' : '110px',
              fontWeight: '900',
              lineHeight: '1',
              background: 'linear-gradient(135deg, #a5b4fc 0%, rgba(165,180,252,0.2) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.05em'
            }}>02</div>
            <div>
              <div style={{
                fontSize: '11px',
                fontWeight: '700',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#a5b4fc',
                marginBottom: '10px'
              }}>Chairperson · Exhibition Hall Tech Stage
              </div>
              <h3 style={{
                fontSize: isMobile ? '22px' : '30px',
                fontWeight: '700',
                color: 'white',
                letterSpacing: '-0.02em',
                lineHeight: '1.2',
                marginBottom: '14px'
              }}>
                COPIA Group · apresentação dos softwares no Tech Stage
              </h3>
              <p style={{
                fontSize: isMobile ? '14px' : '15px',
                color: '#e0e7ff',
                lineHeight: '1.7',
                margin: 0
              }}>
                Chair de sessão adicional no Exhibition Hall Tech Stage, com púlpito próprio da COPIA Group of Companies. Apresentação directa das capacidades de interpretação sísmica (COPIA Seis) e modelagem dinâmica (COPIA DynamicSim) perante delegados internacionais.
              </p>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: isMobile ? '12px' : '16px',
            marginBottom: isMobile ? '56px' : '80px'
          }}>
            {[
              { src: '/aew/aew-copia-hero.jpeg', caption: 'Púlpito oficial COPIA Group of Companies, S.A' },
              { src: '/aew/aew-7.webp', caption: 'Apresentação tech no palco COPIA · AEW Expo' },
              { src: '/aew/aew-00.webp', caption: 'Explicação técnica dos produtos COPIA' },
              { src: '/aew/aew-4.webp', caption: 'Clicker em mão · demonstração interactiva' }
            ].map((photo, i) => (
              <div key={i} style={{
                borderRadius: '14px',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.08)',
                transition: 'all 0.4s ease',
                position: 'relative'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = 'rgba(165,180,252,0.5)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(99,102,241,0.3)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <img src={photo.src} alt={photo.caption} style={{
                  width: '100%',
                  height: isMobile ? '280px' : '300px',
                  objectFit: 'cover',
                  display: 'block'
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '16px',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
                  fontSize: '12px',
                  color: '#e0e7ff',
                  fontWeight: '500',
                  lineHeight: '1.5'
                }}>{photo.caption}</div>
              </div>
            ))}
          </div>

          {/* === BLOCO 3: Audience & Engagement === */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'auto 1fr',
            gap: isMobile ? '16px' : '32px',
            alignItems: 'baseline',
            marginBottom: '28px'
          }}>
            <div style={{
              fontSize: isMobile ? '72px' : '110px',
              fontWeight: '900',
              lineHeight: '1',
              background: 'linear-gradient(135deg, #fde68a 0%, rgba(253,230,138,0.2) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.05em'
            }}>03</div>
            <div>
              <div style={{
                fontSize: '11px',
                fontWeight: '700',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#fde68a',
                marginBottom: '10px'
              }}>Audiência & Networking</div>
              <h3 style={{
                fontSize: isMobile ? '22px' : '30px',
                fontWeight: '700',
                color: 'white',
                letterSpacing: '-0.02em',
                lineHeight: '1.2',
                marginBottom: '14px'
              }}>
                Engajamento com delegados internacionais
              </h3>
              <p style={{
                fontSize: isMobile ? '14px' : '15px',
                color: '#fef3c7',
                lineHeight: '1.7',
                margin: 0
              }}>
                Troca entre Dr. Edmilson Praia e os delegados do AEW 2026 — reguladores, operadores, investidores e pares africanos que moldam o futuro energético do continente.
              </p>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: isMobile ? '12px' : '16px'
          }}>
            {[
              { src: '/aew/aew-9.webp', caption: 'Painel ao vivo · delegados atentos' },
              { src: '/aew/aew-10.webp', caption: 'Executivos africanos na audiência' },
              { src: '/aew/aew-3.webp', caption: 'Delegadas do painel · diversidade & liderança' },
              { src: '/aew/aew-15.webp', caption: 'Networking entre participantes do AEW 2026' }
            ].map((photo, i) => (
              <div key={i} style={{
                borderRadius: '14px',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.08)',
                transition: 'all 0.4s ease',
                position: 'relative'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = 'rgba(253,230,138,0.5)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(251,191,36,0.25)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <img src={photo.src} alt={photo.caption} style={{
                  width: '100%',
                  height: isMobile ? '240px' : '260px',
                  objectFit: 'cover',
                  display: 'block'
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '16px',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
                  fontSize: '12px',
                  color: '#fef3c7',
                  fontWeight: '500',
                  lineHeight: '1.5'
                }}>{photo.caption}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section — AIMCT Angola 2026 · Asset Integrity, Maintenance, Corrosion & Turnaround */}
      <section id="aimct-featured" style={{
        padding: isMobile ? '60px 20px' : '100px 40px',
        background: 'linear-gradient(135deg, #020617 0%, #1e293b 55%, #334155 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-130px',
          right: '-100px',
          width: '440px',
          height: '440px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(252,211,77,0.25) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-140px',
          left: '-110px',
          width: '480px',
          height: '480px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(14,165,233,0.25) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}></div>

        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'flex-start' : 'center',
            gap: isMobile ? '16px' : '24px',
            marginBottom: isMobile ? '32px' : '48px'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: 'rgba(252,211,77,0.15)',
              border: '1px solid rgba(252,211,77,0.4)',
              color: '#fde68a',
              fontSize: '12px',
              fontWeight: '700',
              padding: '8px 16px',
              borderRadius: '50px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              backdropFilter: 'blur(10px)'
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#fcd34d',
                boxShadow: '0 0 12px #fcd34d',
                animation: 'pulse 2s infinite'
              }}></span>
              Destaque · Jul 2026
            </div>
            <div style={{
              fontSize: '13px',
              color: '#cbd5e1',
              fontWeight: '500',
              letterSpacing: '0.05em'
            }}>
              Angola · Asset Integrity & Offshore Reliability
            </div>
          </div>

          <h2 style={{
            fontSize: isMobile ? '32px' : '52px',
            fontWeight: '800',
            color: 'white',
            letterSpacing: '-0.03em',
            lineHeight: '1.05',
            marginBottom: '20px',
            maxWidth: '940px'
          }}>
            AIMCT Angola 2026
            <br />
            <span style={{
              background: 'linear-gradient(90deg, #fcd34d 0%, #e0e7ff 60%, #7dd3fc 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Speaker · Certificate of Appreciation
            </span>
          </h2>

          <p style={{
            fontSize: isMobile ? '15px' : '17px',
            color: '#cbd5e1',
            lineHeight: '1.7',
            maxWidth: '860px',
            marginBottom: isMobile ? '36px' : '56px'
          }}>
            Na <strong style={{ color: 'white' }}>Asset Integrity, Maintenance, Corrosion & Turnaround Conference Angola 2026</strong>, Dr. Edmilson Praia foi orador oficial representando a COPIA Group of Companies — trazendo a aplicação da IA e da análise avançada de dados para o tema crítico da <strong style={{ color: 'white' }}>integridade de activos offshore envelhecidos</strong> em Angola. Certificado de Appreciation entregue pela organização (Cogent Solutions).
          </p>

          {/* Hero + stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1.6fr 1fr',
            gap: isMobile ? '20px' : '28px',
            marginBottom: isMobile ? '48px' : '72px'
          }}>
            <div style={{
              borderRadius: '20px',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
              position: 'relative'
            }}>
              <img
                src="/asset/aimct-podium-2.jpeg"
                alt="Dr. Edmilson Praia · AIMCT Angola 2026 · TD Hotels HCTA Luanda"
                style={{
                  width: '100%',
                  height: isMobile ? '320px' : '520px',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block'
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '24px',
                background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)',
                color: 'white'
              }}>
                <div style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#fcd34d',
                  marginBottom: '4px'
                }}>TD Hotels · HCTA Luanda · 14 Jul 2026</div>
                <div style={{ fontSize: isMobile ? '16px' : '20px', fontWeight: '700' }}>
                  Apresentação técnica no AIMCT Angola 2026     
                </div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: isMobile ? '12px' : '16px'
            }}>
              {[
                { label: 'Evento', value: 'AIMCT Angola 2026', color: '#fcd34d' },
                { label: 'Localização', value: 'Hotel de Convenções de Talatona (HCTA)', color: '#7dd3fc' },
                { label: 'Data', value: '14 Julho 2026 · Luanda, Angola', color: '#a5b4fc' },
                { label: 'Papel', value: 'Speaker · COPIA Group of Companies', color: '#86efac' },
                { label: 'Reconhecimento', value: 'Certificate of Appreciation · Cogent Solutions', color: '#fda4af' }
              ].map((stat, i) => (
                <div key={i} style={{
                  padding: '18px 22px',
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '14px',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.borderColor = stat.color;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                }}>
                  <div style={{
                    fontSize: '10px',
                    fontWeight: '700',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: stat.color,
                    marginBottom: '6px'
                  }}>{stat.label}</div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: 'white', lineHeight: '1.4' }}>
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certificate + description block */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1.2fr',
            gap: isMobile ? '24px' : '48px',
            alignItems: 'center',
            marginBottom: isMobile ? '48px' : '72px',
            padding: isMobile ? '24px' : '40px',
            background: 'rgba(252,211,77,0.05)',
            border: '1px solid rgba(252,211,77,0.2)',
            borderRadius: '20px',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(252,211,77,0.3)',
              border: '2px solid rgba(252,211,77,0.3)'
            }}>
              <img
                src="/asset/aimct-certificate.jpeg"
                alt="Certificate of Appreciation · AIMCT Angola 2026"
                style={{
                  width: '100%',
                  display: 'block'
                }}
              />
            </div>
            <div>
              <div style={{
                fontSize: '11px',
                fontWeight: '700',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#fcd34d',
                marginBottom: '10px'
              }}>Reconhecimento Oficial</div>
              <h3 style={{
                fontSize: isMobile ? '22px' : '26px',
                fontWeight: '700',
                color: 'white',
                letterSpacing: '-0.02em',
                lineHeight: '1.3',
                marginBottom: '20px'
              }}>
                Certificate of Appreciation · AIMCT Angola 2026
              </h3>
              <p style={{
                fontSize: isMobile ? '14px' : '15px',
                color: '#e2e8f0',
                lineHeight: '1.8',
                marginTop: 0,
                marginBottom: '20px'
              }}>
                "In recognition of your valuable contribution as a <strong style={{ color: 'white' }}>Speaker</strong> at the Asset Integrity, Maintenance, Corrosion & Turnaround Conference Angola 2026. Your insights & technical expertise played a valuable role in advancing discussions on <strong style={{ color: 'white' }}>asset integrity, corrosion management, maintenance reliability, turnaround strategy, & engineering resilience for Angola's aging offshore assets</strong>."
              </p>
              <div style={{
                padding: '14px 18px',
                background: 'rgba(0,0,0,0.3)',
                borderRadius: '10px',
                borderLeft: '3px solid #fcd34d',
                fontSize: '13px',
                color: '#cbd5e1',
                fontStyle: 'italic',
                lineHeight: '1.6'
              }}>
                "We appreciate your contribution to advancing asset integrity, reliability and operational excellence across Angola's energy sector."
                <div style={{ marginTop: '10px', fontSize: '12px', color: '#94a3b8', fontStyle: 'normal' }}>
                  — Mohamed Nizamdeen Mohamed Ibrahim, CEO · Cogent Solutions
                </div>
              </div>
            </div>
          </div>

          {/* Technical presentation + social reach */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? '16px' : '24px'
          }}>
            {[
              {
                src: '/asset/aimct-podium-1.jpeg',
                title: 'Apresentação técnica ao auditório',
                caption: 'Dr. Edmilson Praia discursando no púlpito TD HOTELS · HCTA Luanda, trazendo IA e análise avançada ao debate sobre integridade de activos offshore angolanos.',
                accent: '#7dd3fc'
              },
              {
                src: '/asset/aimct-fb.jpeg',
                title: 'Alcance social · COPIA Group',
                caption: 'Publicação oficial da COPIA Group of Companies no Facebook sobre a apresentação técnica no AIMCT Angola 2026 — 2.100+ reactions, 55 comentários, 13 partilhas.',
                accent: '#fcd34d'
              }
            ].map((item, i) => (
              <div key={i} style={{
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.03)',
                transition: 'all 0.4s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = item.accent;
                e.currentTarget.style.boxShadow = `0 20px 40px ${item.accent}30`;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{
                  width: '100%',
                  height: isMobile ? '300px' : '400px',
                  overflow: 'hidden',
                  background: '#0f172a'
                }}>
                  <img src={item.src} alt={item.title} style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    display: 'block'
                  }} />
                </div>
                <div style={{ padding: '20px 22px' }}>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '700',
                    color: 'white',
                    marginBottom: '8px'
                  }}>{item.title}</div>
                  <div style={{
                    fontSize: '13px',
                    color: '#cbd5e1',
                    lineHeight: '1.6'
                  }}>{item.caption}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section — NIEC 2026 Windhoek · Namibia International Energy Conference */}
      <section id="niec-featured" style={{
        padding: isMobile ? '60px 20px' : '100px 40px',
        background: 'linear-gradient(135deg, #1e1b4b 0%, #4c1d95 50%, #7c3aed 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: '-130px', right: '-100px', width: '460px', height: '460px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(196,181,253,0.3) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}></div>
        <div style={{
          position: 'absolute', bottom: '-140px', left: '-110px', width: '480px', height: '480px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(251,191,36,0.2) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}></div>

        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'flex', flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'flex-start' : 'center',
            gap: isMobile ? '16px' : '24px', marginBottom: isMobile ? '32px' : '48px'
          }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              backgroundColor: 'rgba(196,181,253,0.2)', border: '1px solid rgba(196,181,253,0.45)',
              color: '#e9d5ff', fontSize: '12px', fontWeight: '700',
              padding: '8px 16px', borderRadius: '50px',
              letterSpacing: '0.12em', textTransform: 'uppercase', backdropFilter: 'blur(10px)'
            }}>
              <span style={{
                width: '8px', height: '8px', borderRadius: '50%',
                backgroundColor: '#fbbf24', boxShadow: '0 0 12px #fbbf24',
                animation: 'pulse 2s infinite'
              }}></span>
              Destaque · Abr 2026
            </div>
            <div style={{ fontSize: '13px', color: '#e9d5ff', fontWeight: '500', letterSpacing: '0.05em' }}>
              Namíbia · The Road to First & Beyond
            </div>
          </div>

          <h2 style={{
            fontSize: isMobile ? '32px' : '52px', fontWeight: '800', color: 'white',
            letterSpacing: '-0.03em', lineHeight: '1.05', marginBottom: '20px', maxWidth: '920px'
          }}>
            NIEC 2026 · Windhoek
            <br />
            <span style={{
              background: 'linear-gradient(90deg, #e9d5ff 0%, #fbbf24 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
            }}>
              Digital Transformation in Reservoir Engineering
            </span>
          </h2>

          <p style={{
            fontSize: isMobile ? '15px' : '17px', color: '#ede9fe',
            lineHeight: '1.7', maxWidth: '860px', marginBottom: isMobile ? '36px' : '56px'
          }}>
            Na <strong style={{ color: 'white' }}>Namibia International Energy Conference 2026</strong> — o maior fórum energético da Namíbia sob o tema "The Road to First & Beyond" — Dr. Edmilson Praia foi orador oficial no Dia 1 (14 Abr, 15:15, Venue 3) com a palestra <em>"Using Artificial Intelligence for Integrated Seismic Interpretation and Dynamic Simulation"</em>, representando a COPIA Group of Companies perante autoridades namibianas e investidores internacionais.
          </p>

          <div style={{
            display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.6fr 1fr',
            gap: isMobile ? '20px' : '28px', marginBottom: isMobile ? '40px' : '56px'
          }}>
            <div style={{
              borderRadius: '20px', overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
              position: 'relative'
            }}>
              <img src="/niec/niec-03.jpeg" alt="Dr. Edmilson Praia · NIEC 2026 Windhoek" style={{
                width: '100%', height: isMobile ? '320px' : '520px',
                objectFit: 'cover', display: 'block'
              }} />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px',
                background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)', color: 'white'
              }}>
                <div style={{
                  fontSize: '11px', fontWeight: '700', letterSpacing: '0.1em',
                  textTransform: 'uppercase', color: '#fbbf24', marginBottom: '4px'
                }}>African Energy Chamber · Strategic Partner</div>
                <div style={{ fontSize: isMobile ? '16px' : '20px', fontWeight: '700' }}>
                  No púlpito oficial do NIEC 2026 · representando COPIA
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '12px' : '16px' }}>
              {[
                { label: 'Evento', value: 'Namibia International Energy Conference 2026', color: '#e9d5ff' },
                { label: 'Localização', value: 'Windhoek, Namíbia · Venue 3', color: '#fbbf24' },
                { label: 'Data', value: '14 Abril 2026 · Dia 1 · 15:15', color: '#86efac' },
                { label: 'Papel', value: 'Speaker · Director R&D&T, COPIA Group', color: '#fda4af' },
                { label: 'Tema', value: 'AI for Seismic Interpretation + Dynamic Simulation', color: '#7dd3fc' }
              ].map((stat, i) => (
                <div key={i} style={{
                  padding: '18px 22px', background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '14px', transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = stat.color; }}
                onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}>
                  <div style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: stat.color, marginBottom: '6px' }}>{stat.label}</div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: 'white', lineHeight: '1.4' }}>{stat.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: isMobile ? '12px' : '16px'
          }}>
            {[
              { src: '/niec/niec-05-slide.jpeg', caption: 'Slide oficial: "Digital Transformation in Reservoir Engineering" · Session Day 1 · 15:15 · Venue 3' },
              { src: '/niec/niec-04.jpeg', caption: 'A discursar no púlpito NIEC · fundo com plataforma offshore' },
              { src: '/niec/niec-01.jpeg', caption: 'Autoridade namibiana no palco oficial do NIEC 2026' },
              { src: '/niec/niec-02.jpeg', caption: 'VIP audience · dignitários africanos e internacionais' }
            ].map((photo, i) => (
              <div key={i} style={{
                borderRadius: '14px', overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.08)', transition: 'all 0.4s ease', position: 'relative'
              }}
              onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.borderColor = 'rgba(196,181,253,0.5)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(124,58,237,0.3)'; }}
              onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.boxShadow = 'none'; }}>
                <img src={photo.src} alt={photo.caption} style={{ width: '100%', height: isMobile ? '260px' : '280px', objectFit: 'cover', display: 'block' }} />
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)',
                  fontSize: '12px', color: '#ede9fe', fontWeight: '500', lineHeight: '1.5'
                }}>{photo.caption}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section — MINEA 2026 · 2ª Conferência Internacional sobre Energia e Águas + COPIA Quasar */}
      <section id="minea-featured" style={{
        padding: isMobile ? '60px 20px' : '100px 40px',
        background: 'linear-gradient(135deg, #052e16 0%, #166534 45%, #78350f 100%)',
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: '-140px', right: '-110px', width: '460px', height: '460px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(74,222,128,0.3) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}></div>
        <div style={{
          position: 'absolute', bottom: '-150px', left: '-120px', width: '500px', height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(251,146,60,0.25) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}></div>

        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'flex', flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'flex-start' : 'center',
            gap: isMobile ? '16px' : '24px', marginBottom: isMobile ? '32px' : '48px'
          }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              backgroundColor: 'rgba(74,222,128,0.2)', border: '1px solid rgba(74,222,128,0.45)',
              color: '#bbf7d0', fontSize: '12px', fontWeight: '700',
              padding: '8px 16px', borderRadius: '50px',
              letterSpacing: '0.12em', textTransform: 'uppercase', backdropFilter: 'blur(10px)'
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4ade80', boxShadow: '0 0 12px #4ade80', animation: 'pulse 2s infinite' }}></span>
              Destaque · Mai 2026
            </div>
            <div style={{ fontSize: '13px', color: '#bbf7d0', fontWeight: '500', letterSpacing: '0.05em' }}>
              Angola · MINEA · 50 Anos · Patrocinador PLATINA
            </div>
          </div>

          <h2 style={{
            fontSize: isMobile ? '32px' : '52px', fontWeight: '800', color: 'white',
            letterSpacing: '-0.03em', lineHeight: '1.05', marginBottom: '20px', maxWidth: '950px'
          }}>
            MINEA 2026 · Conferência Internacional
            <br />
            <span style={{
              background: 'linear-gradient(90deg, #bbf7d0 0%, #fed7aa 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
            }}>
              Soberania Tecnológica · lançamento COPIA Quasar
            </span>
          </h2>

          <p style={{
            fontSize: isMobile ? '15px' : '17px', color: '#dcfce7',
            lineHeight: '1.7', maxWidth: '880px', marginBottom: isMobile ? '36px' : '56px'
          }}>
            Na <strong style={{ color: 'white' }}>2ª Conferência Internacional sobre Energia e Águas & Exposição</strong> promovida pelo Ministério da Energia e Águas de Angola (sob o tema "Servindo o País Rumo à Sustentabilidade · 50 Anos"), Dr. Edmilson Praia apresentou como speaker a palestra <em>"Soberania Tecnológica na Análise de Infraestruturas Críticas Utilizando Software QUASAR"</em> — marco de apresentação pública do mais novo produto COPIA, dedicado à análise de infraestruturas críticas nacionais.
          </p>

          <div style={{
            display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.3fr',
            gap: isMobile ? '20px' : '28px', marginBottom: isMobile ? '40px' : '56px'
          }}>
            <div style={{
              borderRadius: '20px', overflow: 'hidden',
              border: '2px solid rgba(74,222,128,0.4)',
              boxShadow: '0 25px 60px rgba(0,0,0,0.5)', position: 'relative',
              background: '#0f172a'
            }}>
              <img src="/minea/minea-08-poster.jpeg" alt="Session poster MINEA 2026 · COPIA Quasar" style={{
                width: '100%', height: isMobile ? '420px' : '600px',
                objectFit: 'cover', display: 'block'
              }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '12px' : '16px' }}>
              {[
                { label: 'Evento', value: '2ª Conferência Internacional MINEA 2026', color: '#bbf7d0' },
                { label: 'Localização', value: 'HCTA · Centro de Convenções de Talatona (CCTA)', color: '#fed7aa' },
                { label: 'Data', value: '28-29 Maio 2026 · 14h00 – 16h00', color: '#86efac' },
                { label: 'Tema da palestra', value: 'Soberania Tecnológica · COPIA Quasar', color: '#fcd34d' },
                { label: 'Papel', value: 'Speaker · Patrocinador Platina', color: '#fda4af' },
                { label: 'Organização', value: 'Governo de Angola · MINEA · Grupo Arena', color: '#7dd3fc' }
              ].map((stat, i) => (
                <div key={i} style={{
                  padding: '18px 22px', background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '14px', transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = stat.color; }}
                onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}>
                  <div style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: stat.color, marginBottom: '6px' }}>{stat.label}</div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: 'white', lineHeight: '1.4' }}>{stat.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: isMobile ? '12px' : '16px'
          }}>
            {[
              { src: '/minea/minea-01.jpeg', caption: 'No púlpito MINEA 2026 · bandeiras Angola' },
              { src: '/minea/minea-03.jpeg', caption: 'Momento de concentração · palco oficial MINEA' },
              { src: '/minea/minea-05.jpeg', caption: 'Postura institucional perante a audiência' },
              { src: '/minea/minea-06-wide.jpeg', caption: 'Vista ampla · plateia lotada e câmara TV' },
              { src: '/minea/minea-07-group.jpeg', caption: 'Painel de speakers · parceiros estratégicos' },
              { src: '/minea/minea-02-tpa.jpeg', caption: 'Entrevista à TPA Notícias no stand COPIA' }
            ].map((photo, i) => (
              <div key={i} style={{
                borderRadius: '14px', overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.08)', transition: 'all 0.4s ease', position: 'relative'
              }}
              onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.borderColor = 'rgba(74,222,128,0.5)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(34,197,94,0.3)'; }}
              onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.boxShadow = 'none'; }}>
                <img src={photo.src} alt={photo.caption} style={{ width: '100%', height: isMobile ? '260px' : '280px', objectFit: 'cover', display: 'block' }} />
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)',
                  fontSize: '12px', color: '#dcfce7', fontWeight: '500', lineHeight: '1.5'
                }}>{photo.caption}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section — Huawei Luanda Innovation Center · Masterclass COPIA de IA/ML */}
      <section id="huawei-featured" style={{
        padding: isMobile ? '60px 20px' : '100px 40px',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #450a0a 50%, #7f1d1d 100%)',
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: '-140px', right: '-110px', width: '460px', height: '460px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(239,68,68,0.3) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}></div>
        <div style={{
          position: 'absolute', bottom: '-150px', left: '-120px', width: '500px', height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(14,165,233,0.2) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}></div>

        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'flex', flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'flex-start' : 'center',
            gap: isMobile ? '16px' : '24px', marginBottom: isMobile ? '32px' : '48px'
          }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              backgroundColor: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.45)',
              color: '#fecaca', fontSize: '12px', fontWeight: '700',
              padding: '8px 16px', borderRadius: '50px',
              letterSpacing: '0.12em', textTransform: 'uppercase', backdropFilter: 'blur(10px)'
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444', boxShadow: '0 0 12px #ef4444', animation: 'pulse 2s infinite' }}></span>
              Destaque · Masterclass
            </div>
            <div style={{ fontSize: '13px', color: '#fecaca', fontWeight: '500', letterSpacing: '0.05em' }}>
              Luanda · Huawei Innovation Center · COPIA Tech Education
            </div>
          </div>

          <h2 style={{
            fontSize: isMobile ? '32px' : '52px', fontWeight: '800', color: 'white',
            letterSpacing: '-0.03em', lineHeight: '1.05', marginBottom: '20px', maxWidth: '920px'
          }}>
            Huawei Luanda Innovation Center
            <br />
            <span style={{
              background: 'linear-gradient(90deg, #fca5a5 0%, #7dd3fc 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
            }}>
              Masterclass COPIA · IA, ML & Deep Learning
            </span>
          </h2>

          <p style={{
            fontSize: isMobile ? '15px' : '17px', color: '#fecaca',
            lineHeight: '1.7', maxWidth: '870px', marginBottom: isMobile ? '36px' : '56px'
          }}>
            Masterclass técnica no <strong style={{ color: 'white' }}>Huawei Luanda Innovation Center</strong>, onde Dr. Edmilson Praia liderou a formação sobre Inteligência Artificial aplicada à ciência de dados do petróleo — da taxonomia IA/ML/DL (ANI, AGI, ASI; aprendizagem supervisionada, não-supervisionada, por reforço) até à implementação prática com Random Forest, XGBoost, ANN, CNN, kMeans e LSTM. Auditório Huawei lotado com formandos angolanos.
          </p>

          <div style={{
            display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.6fr 1fr',
            gap: isMobile ? '20px' : '28px', marginBottom: isMobile ? '40px' : '56px'
          }}>
            <div style={{
              borderRadius: '20px', overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
              position: 'relative'
            }}>
              <img src="/huawei/huawei-04-ia-ml-dl.jpeg" alt="Masterclass IA ML DL · Huawei Innovation Center" style={{
                width: '100%', height: isMobile ? '320px' : '520px',
                objectFit: 'cover', display: 'block'
              }} />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px',
                background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)', color: 'white'
              }}>
                <div style={{
                  fontSize: '11px', fontWeight: '700', letterSpacing: '0.1em',
                  textTransform: 'uppercase', color: '#fca5a5', marginBottom: '4px'
                }}>Slide master · Taxonomia completa IA/ML/DL</div>
                <div style={{ fontSize: isMobile ? '16px' : '20px', fontWeight: '700' }}>
                  Formação técnica de nível profissional para quadros angolanos
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '12px' : '16px' }}>
              {[
                { label: 'Local', value: 'Huawei Luanda Innovation Center', color: '#fca5a5' },
                { label: 'Formato', value: 'Masterclass · Treinamento técnico', color: '#fed7aa' },
                { label: 'Conteúdo', value: 'IA · ML · DL · Pipelines Reais em O&G', color: '#7dd3fc' },
                { label: 'Modelos abordados', value: 'RF · XGBoost · ANN · CNN · kMeans · LSTM', color: '#86efac' },
                { label: 'Apresentador', value: 'COPIA Group of Companies, S.A.', color: '#c4b5fd' }
              ].map((stat, i) => (
                <div key={i} style={{
                  padding: '18px 22px', background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '14px', transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = stat.color; }}
                onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}>
                  <div style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: stat.color, marginBottom: '6px' }}>{stat.label}</div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: 'white', lineHeight: '1.4' }}>{stat.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: isMobile ? '12px' : '16px'
          }}>
            {[
              { src: '/huawei/huawei-05-welllog.jpeg', caption: 'Demonstração técnica · Scatter Plot Correlation + Depth Plot Comparison em well logs' },
              { src: '/huawei/huawei-06-arps.jpeg', caption: 'Modelo de declínio Arps · óleo & gás com P50/P90 no púlpito HUAWEI' },
              { src: '/huawei/huawei-03-stage.jpeg', caption: 'A conduzir a masterclass com clicker e live demo' },
              { src: '/huawei/huawei-01-copia.jpeg', caption: 'Logotipo COPIA projectado · apresentação institucional' }
            ].map((photo, i) => (
              <div key={i} style={{
                borderRadius: '14px', overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.08)', transition: 'all 0.4s ease', position: 'relative'
              }}
              onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.borderColor = 'rgba(252,165,165,0.5)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(239,68,68,0.3)'; }}
              onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.boxShadow = 'none'; }}>
                <img src={photo.src} alt={photo.caption} style={{ width: '100%', height: isMobile ? '260px' : '280px', objectFit: 'cover', display: 'block' }} />
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)',
                  fontSize: '12px', color: '#fecaca', fontWeight: '500', lineHeight: '1.5'
                }}>{photo.caption}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section — Conferência Nacional sobre o Capital Humano e o Desenvolvimento de Angola */}
      <section id="ch-featured" style={{
        padding: isMobile ? '60px 20px' : '100px 40px',
        background: 'linear-gradient(135deg, #450a0a 0%, #7f1d1d 45%, #991b1b 100%)',
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: '-140px', right: '-110px', width: '460px', height: '460px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(252,211,77,0.3) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}></div>
        <div style={{
          position: 'absolute', bottom: '-150px', left: '-120px', width: '500px', height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(252,165,165,0.2) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}></div>

        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'flex', flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'flex-start' : 'center',
            gap: isMobile ? '16px' : '24px', marginBottom: isMobile ? '32px' : '48px'
          }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              backgroundColor: 'rgba(252,211,77,0.2)', border: '1px solid rgba(252,211,77,0.45)',
              color: '#fde68a', fontSize: '12px', fontWeight: '700',
              padding: '8px 16px', borderRadius: '50px',
              letterSpacing: '0.12em', textTransform: 'uppercase', backdropFilter: 'blur(10px)'
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#fcd34d', boxShadow: '0 0 12px #fcd34d', animation: 'pulse 2s infinite' }}></span>
              Destaque · Ago 2026
            </div>
            <div style={{ fontSize: '13px', color: '#fde68a', fontWeight: '500', letterSpacing: '0.05em' }}>
              Angola · 50 Anos de Independência Nacional
            </div>
          </div>

          <h2 style={{
            fontSize: isMobile ? '32px' : '52px', fontWeight: '800', color: 'white',
            letterSpacing: '-0.03em', lineHeight: '1.05', marginBottom: '20px', maxWidth: '960px'
          }}>
            Capital Humano & Desenvolvimento
            <br />
            <span style={{
              background: 'linear-gradient(90deg, #fde68a 0%, #fca5a5 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
            }}>
              Conferência Nacional de Angola 2026
            </span>
          </h2>

          <p style={{
            fontSize: isMobile ? '15px' : '17px', color: '#fecaca',
            lineHeight: '1.7', maxWidth: '880px', marginBottom: isMobile ? '36px' : '56px'
          }}>
            Dr. Edmilson Praia participou na <strong style={{ color: 'white' }}>Conferência Nacional sobre o Capital Humano e o Desenvolvimento de Angola</strong>, organizada pelo Governo de Angola através da UTG/PNFQ (Unidade Técnica de Gestão · Plano Nacional de Formação de Quadros), no âmbito das celebrações dos <strong style={{ color: 'white' }}>50 anos da Independência Nacional</strong>. Representou a nova geração angolana de executivos em ciência e tecnologia, com cobertura mediática dedicada.
          </p>

          <div style={{
            display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.6fr 1fr',
            gap: isMobile ? '20px' : '28px', marginBottom: isMobile ? '40px' : '56px'
          }}>
            <div style={{
              borderRadius: '20px', overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
              position: 'relative'
            }}>
              <img src="/ch/ch-05-group.jpeg" alt="Conferência Nacional Capital Humano · Grupo de participantes" style={{
                width: '100%', height: isMobile ? '320px' : '520px',
                objectFit: 'cover', display: 'block'
              }} />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px',
                background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)', color: 'white'
              }}>
                <div style={{
                  fontSize: '11px', fontWeight: '700', letterSpacing: '0.1em',
                  textTransform: 'uppercase', color: '#fde68a', marginBottom: '4px'
                }}>UTG/PNFQ · Governo de Angola · 29 Ago 2026</div>
                <div style={{ fontSize: isMobile ? '16px' : '20px', fontWeight: '700' }}>
                  Delegação nacional reunida · O Capital Humano e o Desenvolvimento de Angola
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '12px' : '16px' }}>
              {[
                { label: 'Evento', value: 'Conferência Nacional sobre o Capital Humano', color: '#fde68a' },
                { label: 'Localização', value: 'Luanda, Angola', color: '#fca5a5' },
                { label: 'Data', value: '29 Agosto 2026', color: '#86efac' },
                { label: 'Organização', value: 'UTG/PNFQ · Angola Capital Humano · Governo', color: '#7dd3fc' },
                { label: 'Contexto', value: '50 Anos Independência Nacional de Angola', color: '#c4b5fd' }
              ].map((stat, i) => (
                <div key={i} style={{
                  padding: '18px 22px', background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '14px', transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = stat.color; }}
                onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}>
                  <div style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: stat.color, marginBottom: '6px' }}>{stat.label}</div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: 'white', lineHeight: '1.4' }}>{stat.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: isMobile ? '12px' : '16px'
          }}>
            {[
              { src: '/ch/ch-02-delegation.jpeg', caption: 'Delegação multi-sectorial · "O Capital Humano e o Desenvolvimento de Angola"' },
              { src: '/ch/ch-01-interview.jpeg', caption: 'Entrevista no stand UTG/PNFQ · Angola Capital Humano' },
              { src: '/ch/ch-06-tv.jpeg', caption: 'Cobertura de TV · entrevista diante da câmara' },
              { src: '/ch/ch-04-medal.jpeg', caption: 'Momento oficial · colocação da medalha de representação' },
              { src: '/ch/ch-03-portrait.jpeg', caption: 'Portrait institucional no credenciamento' },
              { src: '/ch/ch-08-redcarpet.jpeg', caption: 'Red carpet · com dirigente sénior angolano' }
            ].map((photo, i) => (
              <div key={i} style={{
                borderRadius: '14px', overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.08)', transition: 'all 0.4s ease', position: 'relative'
              }}
              onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.borderColor = 'rgba(252,211,77,0.5)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(252,211,77,0.25)'; }}
              onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.boxShadow = 'none'; }}>
                <img src={photo.src} alt={photo.caption} style={{ width: '100%', height: isMobile ? '240px' : '260px', objectFit: 'cover', display: 'block' }} />
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)',
                  fontSize: '12px', color: '#fecaca', fontWeight: '500', lineHeight: '1.5'
                }}>{photo.caption}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section — Produtos & Tecnologias Desenvolvidas */}
      <section id="products" style={{
        padding: isMobile ? '80px 20px' : '120px 40px',
        backgroundColor: 'white'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ marginBottom: isMobile ? '40px' : '64px' }}>
            <div style={{
              display: 'inline-block',
              backgroundColor: 'rgba(30, 64, 175, 0.1)',
              color: '#1e40af',
              fontSize: '12px',
              fontWeight: '600',
              padding: '6px 14px',
              borderRadius: '50px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '16px'
            }}>
              Software proprietário
            </div>
            <h2 style={{
              fontSize: isMobile ? '28px' : '32px',
              fontWeight: '700',
              color: '#0f172a',
              marginBottom: '16px',
              letterSpacing: '-0.02em'
            }}>
              Produtos & Tecnologias Desenvolvidas
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
              maxWidth: '740px',
              lineHeight: '1.7'
            }}>
              Produtos de software proprietário desenvolvidos sob a minha responsabilidade directa — na COPIA Group lidero o desenvolvimento dos três produtos flagship (Seis, DynamicSim, Quasar); na WellDesk e em pesquisa própria criei plataformas de IA aplicadas à indústria angolana de óleo e gás.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: isMobile ? '20px' : '28px'
          }}>
            {[
              {
                name: 'COPIA Seis',
                tagline: 'AI Seismic Interpretation Platform',
                description: 'Plataforma de interpretação sísmica com IA desenvolvida na COPIA Group. Reduz em até 50% o tempo de interpretação (processos que levavam até 24 meses).',
                features: ['Geobody Probe', 'Seismic Horizons', 'Machine Learning'],
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
                company: 'COPIA Group',
                color: '#7c3aed'
              },
              {
                name: 'COPIA DynamicSim',
                tagline: 'Reservoir Dynamic Modeling',
                description: 'Simulador dinâmico de reservatórios de desenvolvimento 100% nacional. Interface em português e pagamento em kwanzas — alternativa competitiva aos softwares internacionais.',
                features: ['Simulação dinâmica', 'Interface PT', 'Pagamento AOA'],
                image: 'https://images.unsplash.com/photo-1545987796-200677ee1011?w=1200&q=80',
                company: 'COPIA Group',
                color: '#1e40af'
              },
              {
                name: 'COPIA Quasar',
                tagline: 'Critical Infrastructure Analysis',
                description: 'Software dedicado à análise de infraestruturas críticas nacionais. Apresentado publicamente por Dr. Edmilson Praia na MINEA 2026 (Ministério da Energia e Águas) sob o tema "Soberania Tecnológica".',
                features: ['Infraestrutura crítica', 'Soberania tecnológica', 'Lançamento MINEA 2026'],
                image: '/minea/minea-08-poster.jpeg',
                company: 'COPIA Group',
                color: '#16a34a'
              },
              {
                name: 'Well Log Web Pro',
                tagline: 'Petrophysical Analysis Platform',
                description: 'Plataforma web que integra IA com visualização interativa para análise petrofísica e suporte à decisão em projetos de reservatórios de óleo e gás.',
                features: ['Python · Petrel · ECLIPSE', 'Imputação ML', 'Visualização interativa'],
                image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80',
                company: 'WellDesk',
                color: '#059669'
              },
              {
                name: 'IA PetroChat',
                tagline: 'AI Assistant for Petroleum Geoscience',
                description: 'Assistente conversacional baseado em IA generativa para apoio a geocientistas e engenheiros de petróleo em interpretação de dados e tomada de decisão técnica.',
                features: ['IA Generativa', 'LLM aplicado', 'Suporte técnico'],
                image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80',
                company: 'Pesquisa Própria',
                color: '#dc2626'
              }
            ].map((product, index) => (
              <div key={index} style={{
                backgroundColor: '#f8fafc',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid #e2e8f0',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = `0 16px 40px ${product.color}25`;
                e.currentTarget.style.borderColor = product.color;
                e.currentTarget.style.backgroundColor = 'white';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.backgroundColor = '#f8fafc';
              }}>
                <div style={{
                  position: 'relative',
                  height: '180px',
                  overflow: 'hidden'
                }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(135deg, ${product.color}AA 0%, rgba(15,23,42,0.6) 100%)`
                  }}></div>
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    backgroundColor: 'rgba(255,255,255,0.95)',
                    color: product.color,
                    fontSize: '10px',
                    fontWeight: '700',
                    padding: '5px 10px',
                    borderRadius: '6px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em'
                  }}>
                    {product.company}
                  </div>
                  <div style={{
                    position: 'absolute',
                    bottom: '16px',
                    left: '20px',
                    right: '20px',
                    color: 'white'
                  }}>
                    <div style={{
                      fontSize: '22px',
                      fontWeight: '800',
                      letterSpacing: '-0.01em',
                      marginBottom: '2px'
                    }}>
                      {product.name}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      opacity: 0.95,
                      fontWeight: '500'
                    }}>
                      {product.tagline}
                    </div>
                  </div>
                </div>

                <div style={{ padding: '24px' }}>
                  <p style={{
                    fontSize: '14px',
                    color: '#374151',
                    lineHeight: '1.65',
                    marginTop: 0,
                    marginBottom: '18px'
                  }}>
                    {product.description}
                  </p>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px'
                  }}>
                    {product.features.map((feature, i) => (
                      <span key={i} style={{
                        fontSize: '11px',
                        fontWeight: '600',
                        color: product.color,
                        backgroundColor: `${product.color}15`,
                        padding: '5px 10px',
                        borderRadius: '6px',
                        letterSpacing: '0.02em'
                      }}>
                        {feature}
                      </span>
                    ))}
                  </div>
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
        background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ marginBottom: isMobile ? '40px' : '64px' }}>
            <div style={{
              display: 'inline-block',
              backgroundColor: 'rgba(30, 64, 175, 0.1)',
              color: '#1e40af',
              fontSize: '12px',
              fontWeight: '700',
              padding: '6px 14px',
              borderRadius: '50px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '16px'
            }}>
              Research · COPIA Seis
            </div>
            <h2 style={{
              fontSize: isMobile ? '28px' : '36px',
              fontWeight: '800',
              color: '#0f172a',
              marginBottom: '16px',
              letterSpacing: '-0.025em',
              lineHeight: '1.1'
            }}>
              Publicações & Pesquisa
            </h2>
            <div style={{
              width: '48px', height: '4px',
              background: 'linear-gradient(90deg, #1e40af, #7c3aed)',
              borderRadius: '2px', marginBottom: '16px'
            }}></div>
            <p style={{
              fontSize: isMobile ? '15px' : '17px',
              color: '#64748b',
              maxWidth: '740px',
              lineHeight: '1.7'
            }}>
              Trabalho de investigação original publicado sob a chancela <strong style={{ color: '#1e40af' }}>COPIA Seis</strong> em 2026 — três artigos consecutivos sobre interpretação sísmica, horizon tracking, cycle skipping e quantificação de incerteza em oil-water contact windows. Mais um conjunto de publicações técnicas internacionais.
            </p>
          </div>

          {/* === FLAGSHIP · 3 COPIA Seis Research Articles === */}
          <div style={{ marginBottom: isMobile ? '48px' : '72px' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px'
            }}>
              <div style={{
                fontSize: '11px', fontWeight: '700', color: '#1e40af',
                letterSpacing: '0.15em', textTransform: 'uppercase'
              }}>Flagship Research · 2026</div>
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, #1e40af, transparent)' }}></div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: isMobile ? '20px' : '24px'
            }}>
              {[
                {
                  pdf: '/articles/1.4m_of_certainty.pdf',
                  title: '1.4 m of Certainty',
                  subtitle: 'False Precision in Test-Based Oil-Water Contact Windows',
                  date: 'Novembro 2026',
                  tags: ['Petrophysics', 'Reservoir Engineering', 'Uncertainty'],
                  summary: 'Como testes mistos de óleo-água definem janelas OWC — e os limites do que os dados do teste podem realmente sustentar. Análise Bayesiana em 19 intervalos tabulados.',
                  stats: [
                    { k: '1.4 → 9.6 m', v: 'janela OWC sob regras diferentes' },
                    { k: '16.3 %', v: 'inversões sob σ=1m' },
                    { k: '≤ 26 %', v: 'matches no window exibido' }
                  ],
                  gradient: 'linear-gradient(135deg, #0c4a6e 0%, #1e3a8a 100%)',
                  accent: '#38bdf8'
                },
                {
                  pdf: '/articles/see_before_you_pick.pdf',
                  title: 'See Before You Pick',
                  subtitle: 'Volume Rendering as a Trackability Map',
                  date: 'Novembro 2026',
                  tags: ['Seismic Interpretation', 'Volume Visualisation', 'Algorithms'],
                  summary: 'O que o opacity volume render prevê sobre horizon tracking 3-D — e o que não prevê. Teste em purpose-built control volume no F3 North Sea.',
                  stats: [
                    { k: '1.8 %', v: 'cells transparentes rastreadas' },
                    { k: '72 → 90 %', v: 'coverage com render-guided seed' },
                    { k: '100 %', v: 'overlapping cells em one-loop conflict' }
                  ],
                  gradient: 'linear-gradient(135deg, #1e1b4b 0%, #7c3aed 100%)',
                  accent: '#c4b5fd'
                },
                {
                  pdf: '/articles/99-9_locally_right.pdf',
                  title: '99.9 % Locally Right',
                  subtitle: 'And Why That Is Not Enough',
                  date: 'Outubro 2026',
                  tags: ['Seismic Interpretation', 'Computer Vision', 'Algorithms'],
                  summary: 'O silent cycle skip em seeded 3-D seismic horizon tracking: comparison reference, growth order e access locality. Análise em 619,101 traces do F3.',
                  stats: [
                    { k: '99.9 %', v: 'cells em local extrema' },
                    { k: '600 → 3 s', v: 'custo após bucket queue' },
                    { k: '91.5 → 38 %', v: 'coverage com seed vs parent' }
                  ],
                  gradient: 'linear-gradient(135deg, #7c2d12 0%, #c2410c 100%)',
                  accent: '#fdba74'
                }
              ].map((article, i) => (
                <div key={i} style={{
                  borderRadius: '20px',
                  overflow: 'hidden',
                  background: article.gradient,
                  color: 'white',
                  padding: '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '480px',
                  position: 'relative',
                  transition: 'all 0.4s ease',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = `0 24px 60px ${article.accent}50`;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
                }}>
                  {/* Decorative accent */}
                  <div style={{
                    position: 'absolute',
                    top: '-60px', right: '-60px',
                    width: '200px', height: '200px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${article.accent}40 0%, transparent 70%)`,
                    pointerEvents: 'none'
                  }}></div>

                  <div style={{ flex: 1, position: 'relative', zIndex: 2 }}>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px'
                    }}>
                      <div style={{
                        padding: '6px 10px',
                        background: 'rgba(255,255,255,0.15)',
                        border: '1px solid rgba(255,255,255,0.25)',
                        borderRadius: '6px',
                        fontSize: '10px',
                        fontWeight: '700',
                        color: article.accent,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        backdropFilter: 'blur(10px)'
                      }}>COPIA Seis · Research</div>
                      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', fontWeight: '500' }}>
                        {article.date}
                      </div>
                    </div>

                    <h3 style={{
                      fontSize: isMobile ? '26px' : '30px',
                      fontWeight: '800',
                      color: 'white',
                      letterSpacing: '-0.025em',
                      lineHeight: '1.08',
                      marginBottom: '8px'
                    }}>
                      {article.title}
                    </h3>
                    <div style={{
                      fontSize: '14px',
                      color: article.accent,
                      fontStyle: 'italic',
                      marginBottom: '20px',
                      lineHeight: '1.4'
                    }}>
                      {article.subtitle}
                    </div>

                    <p style={{
                      fontSize: '13px',
                      color: 'rgba(255,255,255,0.85)',
                      lineHeight: '1.65',
                      marginBottom: '20px'
                    }}>{article.summary}</p>

                    <div style={{
                      display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px'
                    }}>
                      {article.tags.map((tag, j) => (
                        <span key={j} style={{
                          fontSize: '10px',
                          fontWeight: '600',
                          color: 'rgba(255,255,255,0.9)',
                          background: 'rgba(255,255,255,0.1)',
                          padding: '4px 9px',
                          borderRadius: '50px',
                          letterSpacing: '0.03em',
                          border: '1px solid rgba(255,255,255,0.15)'
                        }}>{tag}</span>
                      ))}
                    </div>

                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '10px',
                      marginBottom: '24px',
                      padding: '14px',
                      background: 'rgba(0,0,0,0.25)',
                      borderRadius: '10px',
                      backdropFilter: 'blur(10px)'
                    }}>
                      {article.stats.map((s, j) => (
                        <div key={j}>
                          <div style={{
                            fontSize: '14px',
                            fontWeight: '800',
                            color: article.accent,
                            letterSpacing: '-0.01em',
                            marginBottom: '4px',
                            lineHeight: '1.1'
                          }}>{s.k}</div>
                          <div style={{
                            fontSize: '10px',
                            color: 'rgba(255,255,255,0.7)',
                            lineHeight: '1.3'
                          }}>{s.v}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <a
                    href={article.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      padding: '14px 20px',
                      background: 'rgba(255,255,255,0.15)',
                      border: '1px solid rgba(255,255,255,0.3)',
                      borderRadius: '10px',
                      color: 'white',
                      fontSize: '13px',
                      fontWeight: '700',
                      letterSpacing: '0.05em',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      backdropFilter: 'blur(10px)',
                      position: 'relative',
                      zIndex: 2
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
                      e.currentTarget.style.borderColor = article.accent;
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                    }}
                  >
                    <Download size={15} />
                    Baixar PDF Completo
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* === Older publications === */}
          <div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px'
            }}>
              <div style={{
                fontSize: '11px', fontWeight: '700', color: '#64748b',
                letterSpacing: '0.15em', textTransform: 'uppercase'
              }}>Publicações Anteriores · 2024</div>
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, #64748b, transparent)' }}></div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '14px'
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
                  title: 'Importando Dados de Poços no Petrel · eBook Técnico',
                  journal: 'Amazon Publishing Digital',
                  date: '2024',
                  type: 'Publicação Digital',
                  category: 'book'
                }
              ].map((publication, index) => (
                <div key={index} style={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '14px',
                  padding: '22px',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = publication.category === 'research' ? '#059669' : publication.category === 'technical' ? '#1e40af' : '#7c3aed';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.06)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px'
                  }}>
                    <FileText size={16} style={{ color: '#1e40af' }} />
                    <span style={{
                      fontSize: '10px',
                      fontWeight: '700',
                      color: publication.category === 'research' ? '#059669' :
                             publication.category === 'technical' ? '#1e40af' : '#7c3aed',
                      backgroundColor: publication.category === 'research' ? 'rgba(5,150,105,0.1)' :
                                     publication.category === 'technical' ? 'rgba(30,64,175,0.1)' : 'rgba(124,58,237,0.1)',
                      padding: '4px 9px',
                      borderRadius: '5px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em'
                    }}>
                      {publication.type}
                    </span>
                  </div>
                  <h4 style={{
                    fontSize: '15px',
                    fontWeight: '700',
                    color: '#0f172a',
                    lineHeight: '1.4',
                    marginBottom: '10px'
                  }}>{publication.title}</h4>
                  <div style={{
                    fontSize: '13px',
                    color: '#1e40af',
                    fontWeight: '600',
                    marginBottom: '4px'
                  }}>{publication.journal}</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8' }}>{publication.date}</div>
                </div>
              ))}
            </div>
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
                primary: 'praiae180@gmail.com',
                secondary: 'edmilsondelfimp45@gmail.com · edmilsonp@mail.ru',
                color: '#60a5fa',
                href: 'mailto:praiae180@gmail.com'
              },
              {
                icon: Phone,
                title: 'WhatsApp',
                primary: '+244 933 514 132',
                secondary: 'Resposta directa · Disponível 24/7',
                color: '#22c55e',
                href: 'https://wa.me/244933514132'
              },
              {
                icon: MapPin,
                title: 'Localização',
                primary: 'Luanda, Angola · Lisboa, Portugal · Ufa, Rússia',
                secondary: 'Consultoria internacional disponível',
                color: '#f87171',
                href: null
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
                {contact.href ? (
                  <a href={contact.href} target={contact.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" style={{
                    display: 'block',
                    fontSize: '15px',
                    fontWeight: '600',
                    color: contact.color,
                    marginBottom: '4px',
                    textDecoration: 'none'
                  }}>
                    {contact.primary}
                  </a>
                ) : (
                  <p style={{
                    fontSize: '15px',
                    fontWeight: '600',
                    color: contact.color,
                    marginBottom: '4px'
                  }}>
                    {contact.primary}
                  </p>
                )}
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
            <a
              href="https://wa.me/244933514132?text=Ol%C3%A1%20Dr.%20Edmilson%2C%20gostaria%20de%20agendar%20uma%20consultoria."
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                border: 'none',
                color: 'white',
                padding: '14px 32px',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(34,197,94,0.35)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 14px 32px rgba(34,197,94,0.5)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(34,197,94,0.35)';
              }}
            >
              <Phone size={16} /> Agendar Consultoria via WhatsApp
            </a>
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

    </div>
  );
};

export default Portfolio;