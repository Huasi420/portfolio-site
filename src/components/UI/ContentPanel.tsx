import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ContentPanelProps {
  idx: number
  isMobile?: boolean
}

export function ContentPanel({ idx, isMobile = false }: ContentPanelProps) {
  const [selectedProject, setSelectedProject] = useState<any | null>(null)

  // Select theme based on active index
  // 0: Cinematic (WORK)
  // 1: Analog (ABOUT)
  // 2: Sci-Fi (PROJECTS)
  // 3: Dreamscape (CONTACT)
  // 4: Clinical (STUDIO)

  const renderContent = () => {
    switch (idx) {
      case 0: // WORK - Cinematic Theme
        return (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>01 / WORK</span>
                <div style={{ height: '1px', flex: 1, backgroundColor: 'var(--grid-color)' }} />
              </div>
              <h3 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>SELECTED WORK</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: 1.6, fontSize: '0.9rem' }}>
                A curation of professional commissions and creative direction from the archives, blending storytelling with high-fidelity 3D execution. Click on a project to inspect diagnostics.
              </p>
            </div>

            <div className="custom-scroll" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', overflowY: 'auto', flex: 1, paddingRight: '0.5rem' }}>
              {/* Nicoletta Valentina */}
              <div 
                onClick={() => setSelectedProject({
                  name: 'NICOLETTA VALENTINA',
                  category: 'Creative Direction / Photography',
                  year: '2020 - 2022',
                  image: '/assets/apparel.png',
                  description: 'Led creative vision, photographic campaigns, and brand identity strategies for the Nicoletta Valentina fashion label. Focused on clinical, high-contrast imagery, industrial studio lighting, and architectural framing of apparel designs. Directed all photographic assets, digital lookbooks, and film teasers.'
                })}
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  borderBottom: '1px solid var(--grid-color)',
                  paddingBottom: '1rem',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                  <img 
                    src="/assets/apparel.png" 
                    alt="Nicoletta Valentina" 
                    style={{ width: '50px', height: '50px', objectFit: 'cover', border: '1px solid var(--grid-color)' }} 
                  />
                  <div>
                    <h4 style={{ fontSize: '1.2rem', margin: 0, fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>NICOLETTA VALENTINA</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Creative Direction / Photography</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <span className="mono" style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>2020 - 2022</span>
                  <ArrowUpRight size={18} color="var(--accent-color)" />
                </div>
              </div>

              {/* Molebots */}
              <div 
                onClick={() => setSelectedProject({
                  name: 'MOLEBOTS',
                  category: 'Creative Direction / 3D / Film',
                  year: '2023 - 2025',
                  image: '/assets/molebot.png',
                  description: 'Speculative design, hard-surface CAD modeling, and creative direction for the short film "Molebots". Developed a full subterranean environment and mechanical ecosystem of autonomous exploration units, executing CGI simulation, texturing, rigging, and cinematic proof-of-concepts.'
                })}
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  borderBottom: '1px solid var(--grid-color)',
                  paddingBottom: '1rem',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                  <img 
                    src="/assets/molebot.png" 
                    alt="Molebots" 
                    style={{ width: '50px', height: '50px', objectFit: 'cover', border: '1px solid var(--grid-color)' }} 
                  />
                  <div>
                    <h4 style={{ fontSize: '1.2rem', margin: 0, fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>MOLEBOTS</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Creative Direction / 3D / Film</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <span className="mono" style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>2023 - 2025</span>
                  <ArrowUpRight size={18} color="var(--accent-color)" />
                </div>
              </div>

              {/* Empty state for 2026 */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                paddingBottom: '1rem',
                opacity: 0.5
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                  <div style={{ 
                    width: '50px', 
                    height: '50px', 
                    border: '1px dashed var(--accent-color)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '0.55rem',
                    color: 'var(--text-secondary)'
                  }}>
                    [IDLE]
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', margin: 0, fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>SYSTEM_IDLE_2026</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>Status: Awaiting Commission...</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <span className="mono" style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>2026</span>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-color)' }} />
                </div>
              </div>
            </div>
          </div>
        )

      case 1: // ABOUT - Analog Archive Theme
        return (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', fontFamily: 'var(--font-body)' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', opacity: 0.6 }}>
                <span className="mono" style={{ fontSize: '0.8rem' }}>02 / DOSSIER</span>
                <span className="mono" style={{ fontSize: '0.8rem' }}>FILE_NO: FA_90.0</span>
              </div>
              <h3 style={{ fontSize: '2.2rem', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)', letterSpacing: '-1px' }}>FELIPE ANDRADE</h3>
              <p style={{ lineHeight: 1.6, fontSize: '0.85rem', marginBottom: '2rem', textAlign: 'justify' }}>
                I'm a multidisciplinary creator working at the intersection of film, 3D, design and storytelling. I build worlds, tell stories and design experiences that live between reality and imagination.
              </p>
            </div>

            {/* Technical Skills Ratings like analog file */}
            <div style={{ borderTop: '1px dashed var(--accent-color)', borderBottom: '1px dashed var(--accent-color)', padding: '1rem 0', margin: '1rem 0' }}>
              <span className="mono" style={{ fontSize: '0.75rem', display: 'block', marginBottom: '0.8rem', fontWeight: 'bold' }}>SKILLS_DIAGNOSTIC:</span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem 1.5rem', fontSize: '0.8rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>BLENDER:</span>
                  <span style={{ fontWeight: 'bold' }}>LV. 92</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>CINEMA 4D:</span>
                  <span style={{ fontWeight: 'bold' }}>LV. 78</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>REDSHIFT:</span>
                  <span style={{ fontWeight: 'bold' }}>LV. 85</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>PREMIERE PRO:</span>
                  <span style={{ fontWeight: 'bold' }}>LV. 80</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>AFTER EFFECTS:</span>
                  <span style={{ fontWeight: 'bold' }}>LV. 75</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>UNREAL ENGINE:</span>
                  <span style={{ fontWeight: 'bold' }}>LV. 70</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginTop: '1rem' }}>
              <div style={{ 
                width: '60px', 
                height: '60px', 
                border: '1px solid rgba(0,0,0,0.15)',
                backgroundColor: 'rgba(0,0,0,0.02)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.65rem',
                opacity: 0.5,
                textAlign: 'center'
              }}>
                [PHOTO<br/>FILE]
              </div>
              <div style={{ fontSize: '0.75rem', opacity: 0.6 }}>
                SUBJECT: ANDRADE_F<br/>
                STATUS: ACTIVE_ARCHIVE<br/>
                ORIGIN: LATAM
              </div>
            </div>
          </div>
        )

      case 2: // PROJECTS - Sci-Fi Lab Theme
        return (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>03 // PROJECTS // LAB</span>
                <div style={{ height: '1px', flex: 1, backgroundColor: 'var(--grid-color)' }} />
              </div>
              <h3 style={{ fontSize: '2.2rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', letterSpacing: '2px' }}>EXPERIMENTS</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.6, fontSize: '0.9rem' }}>
                A digital testing ground for ideas, hard-surface CAD explorations, and shader concepts. Click on a project to inspect diagnostics.
              </p>
            </div>

            <div className="custom-scroll" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', flex: 1, paddingRight: '0.5rem' }}>
              {/* Mech_01 */}
              <div 
                onClick={() => setSelectedProject({
                  name: 'MECH_01',
                  category: 'Hard Surface Exploration',
                  year: '2024',
                  image: '/assets/mech.png',
                  description: 'An industrial prototyping study exploring functional joints, mechanical linkage, and hydraulic pistons. Built as a hard-surface design exercise utilizing CAD workflow in Blender, rendered in Redshift with a raw metal finish.'
                })}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  border: '1px solid var(--grid-color)',
                  padding: '1rem',
                  cursor: 'pointer',
                  backgroundColor: 'rgba(0, 240, 255, 0.01)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent-color)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--grid-color)'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                  <img 
                    src="/assets/mech.png" 
                    alt="Mech 01" 
                    style={{ width: '50px', height: '50px', objectFit: 'cover', border: '1px solid var(--grid-color)', filter: 'hue-rotate(120deg) saturate(1.5)' }} 
                  />
                  <div>
                    <h4 style={{ fontSize: '1.1rem', margin: 0, letterSpacing: '1px', color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>MECH_01</h4>
                    <span className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>HARD SURFACE EXPLORATION</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <span className="mono" style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>2024</span>
                  <ArrowUpRight size={16} color="var(--accent-color)" />
                </div>
              </div>

              {/* Void */}
              <div 
                onClick={() => setSelectedProject({
                  name: 'VOID',
                  category: 'Volumetric Shader Experiment',
                  year: '2023',
                  image: null,
                  description: 'A real-time WebGL shader simulation exploring black hole accretion disks and gravitational lensing. Utilized custom volume scattering algorithms inside Blender to render infinite density visual phenomena.'
                })}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  border: '1px solid var(--grid-color)',
                  padding: '1rem',
                  cursor: 'pointer',
                  backgroundColor: 'rgba(0, 240, 255, 0.01)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent-color)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--grid-color)'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                  <div style={{ width: '50px', height: '50px', backgroundColor: '#051014', border: '1px solid var(--grid-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '1px dashed var(--accent-color)' }} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', margin: 0, letterSpacing: '1px', color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>VOID</h4>
                    <span className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>VOLUMETRIC SHADER EXPERIMENT</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <span className="mono" style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>2023</span>
                  <ArrowUpRight size={16} color="var(--accent-color)" />
                </div>
              </div>

              {/* Glitch City */}
              <div 
                onClick={() => setSelectedProject({
                  name: 'GLITCH CITY',
                  category: 'Environment Design Concept',
                  year: '2023',
                  image: null,
                  description: 'Speculative high-density urban landscape design exploring digital degradation and procedural architecture. Developed procedural assets with glowing neon wireframe structures and volumetric fog density configurations.'
                })}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  border: '1px solid var(--grid-color)',
                  padding: '1rem',
                  cursor: 'pointer',
                  backgroundColor: 'rgba(0, 240, 255, 0.01)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent-color)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--grid-color)'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                  <div style={{ width: '50px', height: '50px', backgroundColor: '#051014', border: '1px solid var(--grid-color)', display: 'flex', flexDirection: 'column', gap: '2px', padding: '8px' }}>
                    <div style={{ height: '3px', width: '100%', backgroundColor: 'var(--accent-color)', opacity: 0.3 }} />
                    <div style={{ height: '3px', width: '60%', backgroundColor: 'var(--accent-color)' }} />
                    <div style={{ height: '3px', width: '80%', backgroundColor: 'var(--accent-color)', opacity: 0.5 }} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', margin: 0, letterSpacing: '1px', color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>GLITCH CITY</h4>
                    <span className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>ENVIRONMENT DESIGN CONCEPT</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <span className="mono" style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>2023</span>
                  <ArrowUpRight size={16} color="var(--accent-color)" />
                </div>
              </div>
            </div>
          </div>
        )

      case 3: // CONTACT - Dreamscape Theme
        return (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>04 / CONNECT</span>
                <div style={{ height: '1px', flex: 1, backgroundColor: 'var(--grid-color)' }} />
              </div>
              <h3 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>LET'S CONNECT</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: 1.6, fontSize: '0.9rem' }}>
                Open to collaborations, commercial inquiries, or creative discussions. Reach out through the channels below.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1, justifyContent: 'center' }}>
              {[
                { 
                  label: 'EMAIL', 
                  value: 'hello@felipeandrade.xyz', 
                  icon: (
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  ), 
                  url: 'mailto:hello@felipeandrade.xyz' 
                },
                { 
                  label: 'INSTAGRAM', 
                  value: '@felipe.andrade', 
                  icon: (
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  ), 
                  url: 'https://instagram.com' 
                },
                { 
                  label: 'LINKEDIN', 
                  value: 'felipe-andrade', 
                  icon: (
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  ), 
                  url: 'https://linkedin.com' 
                },
                { 
                  label: 'VIMEO', 
                  value: 'vimeo.com/felipeandrade', 
                  icon: (
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="23 7 16 12 23 17 23 7"></polygon>
                      <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                    </svg>
                  ), 
                  url: 'https://vimeo.com' 
                }
              ].map((link, idx) => (
                <a 
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem 1.5rem',
                    border: '1px solid var(--grid-color)',
                    backgroundColor: 'rgba(255,255,255,0.01)',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent-color)';
                    e.currentTarget.style.backgroundColor = 'rgba(192, 132, 252, 0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--grid-color)';
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.01)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ color: 'var(--accent-color)', display: 'flex', alignItems: 'center' }}>{link.icon}</span>
                    <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{link.label}:</span>
                    <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{link.value}</span>
                  </div>
                  <ArrowUpRight size={16} color="var(--accent-color)" />
                </a>
              ))}
            </div>
          </div>
        )

      case 4: // STUDIO - Clinical Minimalism Theme
      default:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>05 / STUDIO</span>
                <div style={{ height: '1px', flex: 1, backgroundColor: 'var(--grid-color)' }} />
              </div>
              <h3 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>LAB & PROCESS</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.6, fontSize: '0.9rem' }}>
                Felipe Andrade Studio operates as an industrial-grade creative lab, fusing physical sculpture, mechanical layout design, and real-time CGI simulation.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', flex: 1, fontSize: '0.85rem' }}>
              <span className="mono" style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--accent-color)', marginBottom: '0.5rem' }}>STUDIO_SPECIFICATIONS:</span>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--grid-color)', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>LOCATION:</span>
                <span className="mono" style={{ fontWeight: 'bold' }}>LATAM / REMOTE_NODE</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--grid-color)', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>FOCAL AREAS:</span>
                <span className="mono" style={{ fontWeight: 'bold' }}>3D_DESIGN / CINEMATICS / VR</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--grid-color)', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>METHODOLOGY:</span>
                <span className="mono" style={{ fontWeight: 'bold' }}>CLINICAL_PRECISION</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>PIPELINE:</span>
                <span className="mono" style={{ fontWeight: 'bold' }}>OCTANE_REDSHIFT_UNREAL</span>
              </div>
            </div>

            <div style={{ border: '1px solid var(--grid-color)', padding: '1rem', backgroundColor: 'rgba(0,0,0,0.01)', fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              <span style={{ fontWeight: 'bold', color: 'var(--text-primary)', display: 'block', marginBottom: '0.3rem' }}>LAB NOTE // ARCHITECTURAL INTENT</span>
              "We approach design projects with surgical precision and clinical curiosity, treating each digital commission as a museum prototype or physical sculpture."
            </div>
          </div>
        )
    }
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {renderContent()}

      {/* Slide overlay for Project Diagnostic Modals */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ clipPath: 'inset(100% 0 0 0)', opacity: 0 }}
            animate={{ clipPath: 'inset(0% 0 0 0)', opacity: 1 }}
            exit={{ clipPath: 'inset(100% 0 0 0)', opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(10, 75, 145, 0.9)',
              border: '2.5px solid rgba(255, 255, 255, 0.85)',
              borderRadius: '8px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              zIndex: 100,
              padding: isMobile ? '1.5rem 1.5rem 2.5rem 1.5rem' : '3rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: isMobile ? 'flex-start' : 'space-between',
              gap: isMobile ? '1.5rem' : '0',
              boxSizing: 'border-box',
              overflowY: 'auto'
            }}
          >
            <div>
              <button 
                onClick={() => setSelectedProject(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--accent-color)',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1.5rem',
                  padding: 0,
                  letterSpacing: '1px'
                }}
              >
                ← [BACK_TO_ARCHIVES]
              </button>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid var(--grid-color)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', margin: 0, letterSpacing: '1px' }}>{selectedProject.name}</h3>
                <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{selectedProject.year}</span>
              </div>

              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', textTransform: 'uppercase' }} className="mono">
                CATEGORY // {selectedProject.category}
              </div>

              <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                {selectedProject.description}
              </p>
            </div>

            {selectedProject.image ? (
              <img 
                src={selectedProject.image} 
                alt={selectedProject.name} 
                style={{ width: '100%', height: '180px', objectFit: 'cover', border: '1px solid var(--grid-color)' }}
              />
            ) : (
              <div style={{ 
                width: '100%', 
                height: '180px', 
                border: '1px dashed var(--accent-color)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: 'var(--text-secondary)',
                fontSize: '0.75rem',
                backgroundColor: 'rgba(0,0,0,0.01)'
              }} className="mono">
                [DIAGNOSTIC_RENDER_UNAVAILABLE]
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
