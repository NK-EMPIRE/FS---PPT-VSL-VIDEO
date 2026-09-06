import React, { useState, useEffect } from 'react';
import { SLIDES_HTML } from './slidesData';

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPresentMode, setIsPresentMode] = useState(false);
  const [isDrawerCollapsed, setIsDrawerCollapsed] = useState(false);
  const [deckTitle, setDeckTitle] = useState('The Identity Brand Blueprint 2026');
  const [showShareModal, setShowShareModal] = useState(false);
  const totalSlides = SLIDES_HTML.length;

  const nextSlide = () => setCurrentSlide(prev => (prev < totalSlides - 1 ? prev + 1 : prev));
  const prevSlide = () => setCurrentSlide(prev => (prev > 0 ? prev - 1 : prev));

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT') return;
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevSlide();
      } else if (e.key.toLowerCase() === 'f') {
        e.preventDefault();
        setIsPresentMode(prev => !prev);
      } else if (e.key === 'Escape') {
        setIsPresentMode(false);
        setShowShareModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalSlides]);

  return (
    <div id="studioApp" className={isPresentMode ? 'present-mode' : ''}>
      {!isPresentMode && (
        <header className="canva-header" id="canvaHeader">
          <div className="header-left">
            <div className="studio-brand-box">
              <img src="/LOGO/Primary Logo - Transparent (1).png" alt="FirstSelfie" className="studio-logo" />
              <input
                type="text"
                className="deck-title-input"
                value={deckTitle}
                onChange={e => setDeckTitle(e.target.value)}
                spellCheck="false"
                title="Click to rename deck"
              />
            </div>
            <div className="mode-switch-group">
              <button className="mode-btn active">
                <span>&#9998;</span> React Studio
              </button>
              <button className="mode-btn" onClick={() => setIsPresentMode(true)}>
                <span>&#9654;</span> Present (F)
              </button>
            </div>
          </div>

          <div className="header-center">
            <div className="save-tag">
              <span className="save-dot"></span>
              <span>React 19 + Vite Mode</span>
            </div>
          </div>

          <div className="header-right">
            <a
              href="/FirstSelfie_The_Identity_Brand_Blueprint_2026.pptx"
              download="FirstSelfie_The_Identity_Brand_Blueprint_2026.pptx"
              className="canva-btn btn-pptx"
              style={{ textDecoration: 'none' }}
              title="Download Master 5.3MB PowerPoint Deck with exact photos"
            >
              <span>&#128229;</span> Download PPTX (5.3MB)
            </a>
            <button className="canva-btn btn-pdf" onClick={() => window.print()} title="Print or save as PDF">
              <span>&#128438;</span> PDF
            </button>
            <button className="canva-btn btn-share" onClick={() => setShowShareModal(true)}>
              <span>&#128279;</span> Share
            </button>
          </div>
        </header>
      )}

      <div className="studio-body">
        {!isPresentMode && (
          <nav className="canva-rail" id="canvaRail">
            <button className="rail-btn active" title="Slides">
              <span className="rail-icon">&#9638;</span>
              <span className="rail-label">Slides</span>
            </button>
            <button
              className="rail-btn rail-collapse"
              onClick={() => setIsDrawerCollapsed(!isDrawerCollapsed)}
              title="Collapse Panel"
            >
              <span className="rail-icon">{isDrawerCollapsed ? '▶' : '◀'}</span>
            </button>
          </nav>
        )}

        {!isPresentMode && (
          <aside className={`canva-drawer ${isDrawerCollapsed ? 'collapsed' : ''}`} id="canvaDrawer">
            <div className="drawer-panel active">
              <div className="drawer-header">
                <h3>Slides ({totalSlides})</h3>
                <span style={{ fontSize: '11px', color: 'var(--accent-orange)', fontWeight: 700 }}>
                  Active: Slide {currentSlide + 1}
                </span>
              </div>
              <div className="drawer-content">
                <div className="slides-list-scroll">
                  {SLIDES_HTML.map((_, idx) => (
                    <div
                      key={idx}
                      className={`slide-card-item ${idx === currentSlide ? 'active' : ''}`}
                      onClick={() => setCurrentSlide(idx)}
                    >
                      <div className="slide-card-num">{String(idx + 1).padStart(2, '0')}</div>
                      <div className="slide-card-info">
                        <div className="slide-card-title">Slide {idx + 1}</div>
                        <div className="slide-card-sub">The Identity Brand Blueprint</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        )}

        <main className="studio-canvas-area" id="studioCanvasArea">
          <div className="dw" id="deckWrapper">
            <div
              dangerouslySetInnerHTML={{ __html: SLIDES_HTML[currentSlide] }}
              style={{ width: '100%', height: '100%', display: 'flex' }}
            />
          </div>
        </main>
      </div>

      {!isPresentMode && (
        <footer className="canva-dock" id="canvaDock">
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="dock-nav-btn" onClick={prevSlide} disabled={currentSlide === 0}>
              &#8592; Prev
            </button>
            <button className="dock-nav-btn" onClick={nextSlide} disabled={currentSlide === totalSlides - 1}>
              Next &#8594;
            </button>
          </div>

          <div className="dock-dots">
            {SLIDES_HTML.map((_, idx) => (
              <div
                key={idx}
                className={`dock-dot ${idx === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(idx)}
                title={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div className="dock-counter">
              {String(currentSlide + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
            </div>
            <button className="dock-nav-btn" onClick={() => setIsPresentMode(true)} title="Present Fullscreen (F)">
              <span>&#x26F6;</span> Fullscreen
            </button>
          </div>
        </footer>
      )}

      {isPresentMode && (
        <div className="present-exit-hud" style={{ display: 'flex' }}>
          <span style={{ fontSize: '12px', color: '#fff', fontWeight: 700 }}>
            Slide {currentSlide + 1} / {totalSlides}
          </span>
          <button className="exit-btn" onClick={() => setIsPresentMode(false)}>
            Exit (Esc)
          </button>
        </div>
      )}

      {showShareModal && (
        <div className="canva-modal-overlay open" onClick={() => setShowShareModal(false)}>
          <div className="canva-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Share Presentation</h3>
              <button className="modal-close" onClick={() => setShowShareModal(false)}>&times;</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '11.5px', color: '#888', fontWeight: 600 }}>
                  Master PowerPoint Presentation File
                </label>
                <div style={{ marginTop: '8px' }}>
                  <a
                    href="/FirstSelfie_The_Identity_Brand_Blueprint_2026.pptx"
                    download="FirstSelfie_The_Identity_Brand_Blueprint_2026.pptx"
                    className="canva-btn btn-pptx"
                    style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center' }}
                  >
                    Download Master .PPTX (5.3 MB)
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
