import React, { useState, useEffect, useRef } from 'react';
import { INITIAL_SLIDES } from './slidesData';

export default function App() {
  // Load saved slides from localStorage or fallback to INITIAL_SLIDES
  const [slides, setSlides] = useState(() => {
    try {
      const saved = localStorage.getItem('fs_vsl_slides_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not parse saved slides:', e);
    }
    return INITIAL_SLIDES;
  });

  // Review statuses & notes per slide: { [slideId]: { status: 'in_review' | 'approved' | 'changes_needed', note: '' } }
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem('fs_vsl_reviews_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not parse saved reviews:', e);
    }
    return {};
  });

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPresentMode, setIsPresentMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isReviewPanelOpen, setIsReviewPanelOpen] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [imagePickerTarget, setImagePickerTarget] = useState(null); // { slideId, cardIndex, field }
  const [deckTitle, setDeckTitle] = useState('FirstSelfie VSL Presentation Deck');
  const [copiedToast, setCopiedToast] = useState('');

  const currentSlide = slides[currentSlideIndex] || slides[0];
  const totalSlides = slides.length;

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('fs_vsl_slides_v2', JSON.stringify(slides));
    } catch (e) {
      console.warn('Failed to save slides:', e);
    }
  }, [slides]);

  useEffect(() => {
    try {
      localStorage.setItem('fs_vsl_reviews_v2', JSON.stringify(reviews));
    } catch (e) {
      console.warn('Failed to save reviews:', e);
    }
  }, [reviews]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't intercept if user is typing in an input or textarea or contenteditable
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName) || e.target.isContentEditable) {
        return;
      }
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
        setShowSummaryModal(false);
        setImagePickerTarget(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalSlides]);

  const nextSlide = () => setCurrentSlideIndex(prev => (prev < totalSlides - 1 ? prev + 1 : prev));
  const prevSlide = () => setCurrentSlideIndex(prev => (prev > 0 ? prev - 1 : prev));

  // Edit helper functions
  const updateSlideField = (field, value) => {
    setSlides(prev => {
      const updated = [...prev];
      updated[currentSlideIndex] = { ...updated[currentSlideIndex], [field]: value };
      return updated;
    });
  };

  const updateCardField = (cardIdx, field, value) => {
    setSlides(prev => {
      const updated = [...prev];
      const cur = { ...updated[currentSlideIndex] };
      if (cur.cards) {
        const newCards = [...cur.cards];
        newCards[cardIdx] = { ...newCards[cardIdx], [field]: value };
        cur.cards = newCards;
        updated[currentSlideIndex] = cur;
      }
      return updated;
    });
  };

  const updateReview = (status, note) => {
    setReviews(prev => ({
      ...prev,
      [currentSlide.id]: {
        status: status !== undefined ? status : (prev[currentSlide.id]?.status || 'in_review'),
        note: note !== undefined ? note : (prev[currentSlide.id]?.note || '')
      }
    }));
  };

  const resetAllEdits = () => {
    if (window.confirm('Reset all slides to original master defaults? Any custom text edits will be reverted.')) {
      setSlides(INITIAL_SLIDES);
      localStorage.removeItem('fs_vsl_slides_v2');
      triggerToast('Reset to original master slides');
    }
  };

  const triggerToast = (msg) => {
    setCopiedToast(msg);
    setTimeout(() => setCopiedToast(''), 3000);
  };

  // Proof screenshots available in public/proof/
  const PROOF_IMAGES = [
    { name: '40.3K Profile Dashboard', src: '/vsl_images/slide_02_sh_04.jpg' },
    { name: '47.2K Follower Scale', src: '/vsl_images/slide_02_sh_07.jpg' },
    { name: 'Tamil Ponnu in London (195K)', src: '/vsl_images/slide_02_sh_10.jpg' },
    { name: 'LadyO Official (16.2K)', src: '/vsl_images/slide_02_sh_13.jpg' },
    { name: '7,000,002 Views Reel', src: '/vsl_images/slide_04_sh_04.jpg' },
    { name: '7,902,290 Views Reel', src: '/vsl_images/slide_04_sh_07.jpg' },
    { name: '57.2K Followers (+70%)', src: '/vsl_images/slide_04_sh_10.jpg' },
    { name: 'Professional Insights (1 Cr Views)', src: '/vsl_images/slide_13_sh_15.jpg' },
    { name: 'Telegram/Channel Community', src: '/vsl_images/slide_12_sh_01.jpg' },
    { name: 'Analytics Spike 1', src: '/proof/Screenshot_2026-05-13-23-37-12-703_com.instagram.android.jpg' },
    { name: 'Analytics Spike 2', src: '/proof/Screenshot_2026-05-13-23-37-33-694_com.instagram.android.jpg' },
    { name: 'Follower Growth Curve', src: '/proof/Screenshot_2026-05-13-23-40-47-087_com.instagram.android.jpg' },
    { name: 'Reel Insights 7.9M', src: '/proof/Screenshot_2026-07-04-13-11-38-079_com.instagram.android.jpg' },
    { name: 'Accounts Reached 6.1M', src: '/proof/Screenshot_2026-07-04-13-11-41-583_com.instagram.android.jpg' }
  ];

  const handleSelectImage = (src) => {
    if (!imagePickerTarget) return;
    const { cardIndex } = imagePickerTarget;
    if (cardIndex !== undefined) {
      updateCardField(cardIndex, 'image', src);
    }
    setImagePickerTarget(null);
    triggerToast('Image updated successfully');
  };

  const copyReviewSummary = () => {
    let summary = `*FirstSelfie VSL Deck Review Report*\nTotal Slides: ${totalSlides}\n`;
    let approved = 0, changes = 0, inReview = 0;
    slides.forEach(s => {
      const r = reviews[s.id] || { status: 'in_review', note: '' };
      if (r.status === 'approved') approved++;
      else if (r.status === 'changes_needed') changes++;
      else inReview++;
    });
    summary += `✅ Approved: ${approved} | ⚠️ Needs Changes: ${changes} | ⏳ In Review: ${inReview}\n\n`;
    summary += `*Slide-by-Slide Notes:*\n`;
    slides.forEach(s => {
      const r = reviews[s.id] || { status: 'in_review', note: '' };
      const statusIcon = r.status === 'approved' ? '✅' : (r.status === 'changes_needed' ? '⚠️' : '⏳');
      summary += `Slide ${s.slideNum} [${statusIcon} ${r.status}]: ${s.title}\n`;
      if (r.note) summary += `  Feedback: "${r.note}"\n`;
    });
    navigator.clipboard.writeText(summary);
    triggerToast('Review report copied to clipboard!');
  };

  const currentReview = reviews[currentSlide.id] || { status: 'in_review', note: '' };

  return (
    <div id="vslStudioApp" className={`vsl-app ${isPresentMode ? 'present-mode' : ''}`}>
      {/* HEADER (Studio Mode only) */}
      {!isPresentMode && (
        <header className="vsl-header">
          <div className="header-left">
            <div className="brand-badge">
              <img src="/LOGO/Primary Logo - Transparent (1).png" alt="FirstSelfie" className="brand-logo" />
              <div className="title-container">
                <input
                  type="text"
                  className="deck-title-input"
                  value={deckTitle}
                  onChange={e => setDeckTitle(e.target.value)}
                  title="Click to rename deck"
                />
                <span className="deck-sub-tag">22 Slides VSL Architecture</span>
              </div>
            </div>

            <div className="mode-pill-group">
              <button
                className={`mode-pill ${isSidebarOpen ? 'active' : ''}`}
                onClick={() => setIsSidebarOpen(prev => !prev)}
                title="Toggle Slide Deck Rail"
              >
                <span>&#9638;</span> Slides ({currentSlideIndex + 1}/{totalSlides})
              </button>
              <button
                className={`mode-pill ${isReviewPanelOpen ? 'active' : ''}`}
                onClick={() => setIsReviewPanelOpen(prev => !prev)}
                title="Toggle Head Verification Panel"
              >
                <span>&#9998;</span> Head Review
                {currentReview.status === 'approved' && <span className="status-dot green"></span>}
                {currentReview.status === 'changes_needed' && <span className="status-dot orange"></span>}
              </button>
              <button
                className="mode-pill present-trigger"
                onClick={() => setIsPresentMode(true)}
                title="Present Fullscreen (Press F)"
              >
                <span>&#9654;</span> Present (F)
              </button>
            </div>
          </div>

          <div className="header-right">
            <button className="action-btn" onClick={() => setShowSummaryModal(true)} title="View Review Summary">
              <span>&#128203;</span> Review Status
            </button>
            <a
              href="/FirstSelfie_VSL_Deck.pptx"
              download="FirstSelfie_VSL_Deck.pptx"
              className="action-btn pptx-btn"
              title="Download Master PowerPoint Deck"
            >
              <span>&#128229;</span> PPTX (9.3MB)
            </a>
            <button className="action-btn" onClick={resetAllEdits} title="Reset all changes to master default">
              <span>&#8634;</span> Reset
            </button>
            <button className="action-btn share-btn" onClick={() => setShowShareModal(true)} title="Share with Head">
              <span>&#128279;</span> Share
            </button>
          </div>
        </header>
      )}

      {/* BODY AREA */}
      <div className="vsl-body">
        {/* LEFT SLIDES RAIL (Thumbnails) */}
        {!isPresentMode && isSidebarOpen && (
          <aside className="slides-rail">
            <div className="rail-header">
              <span>VSL SLIDE DECK</span>
              <span className="slide-count-badge">22 Slides</span>
            </div>
            <div className="thumbnails-scroll">
              {slides.map((s, idx) => {
                const r = reviews[s.id] || { status: 'in_review' };
                return (
                  <div
                    key={s.id}
                    className={`thumb-card ${idx === currentSlideIndex ? 'active' : ''} theme-${s.theme}`}
                    onClick={() => setCurrentSlideIndex(idx)}
                  >
                    <div className="thumb-header">
                      <span className="thumb-num">{s.slideNum}</span>
                      <span className={`thumb-theme-tag ${s.theme}`}>{s.theme.toUpperCase()}</span>
                      <span
                        className={`thumb-status-indicator ${r.status}`}
                        title={`Status: ${r.status}`}
                      ></span>
                    </div>
                    <div className="thumb-title">{s.title}</div>
                    <div className="thumb-cat">{s.category}</div>
                  </div>
                );
              })}
            </div>
          </aside>
        )}

        {/* MAIN STAGE CANVAS */}
        <main className="stage-area">
          <div className="stage-scaler">
            <div
              className={`slide-viewport theme-${currentSlide.theme}`}
              id={`slide-${currentSlide.id}`}
            >
              {/* SLIDE HEADER & BRANDING */}
              <div className="slide-top-bar">
                <div className="slide-logo-slot">
                  <img src="/LOGO/Secondary Logo - Transparent.png" alt="FirstSelfie" className="slide-logo" />
                </div>
                <div className="slide-cat-badge">{currentSlide.category}</div>
                <div className="slide-num-slot">{currentSlide.slideNum}</div>
              </div>

              {/* DYNAMIC SLIDE CONTENT BASED ON TYPE */}
              <div className="slide-main-content">
                {/* 1. COVER SLIDE */}
                {currentSlide.type === 'cover' && (
                  <div className="content-cover">
                    <img src="/LOGO/Primary Logo - Transparent (1).png" alt="FirstSelfie" className="cover-logo-hero" />
                    <h1
                      className="cover-title editable"
                      contentEditable={!isPresentMode}
                      suppressContentEditableWarning
                      onBlur={e => updateSlideField('title', e.currentTarget.textContent)}
                    >
                      {currentSlide.title}
                    </h1>
                    <p
                      className="cover-subtitle editable"
                      contentEditable={!isPresentMode}
                      suppressContentEditableWarning
                      onBlur={e => updateSlideField('subtitle', e.currentTarget.textContent)}
                    >
                      {currentSlide.subtitle}
                    </p>
                    <div className="cover-badge">{currentSlide.content?.badge || 'VSL PRESENTATION DECK'}</div>
                  </div>
                )}

                {/* 2. 4-MOCKUP SOCIAL PROOF SLIDE (Slide 02) */}
                {currentSlide.type === 'mockups_4' && (
                  <div className="content-mockups-4">
                    <div className="section-head">
                      <h2
                        className="slide-title editable"
                        contentEditable={!isPresentMode}
                        suppressContentEditableWarning
                        onBlur={e => updateSlideField('title', e.currentTarget.textContent)}
                      >
                        {currentSlide.title}
                      </h2>
                      <p
                        className="slide-subtitle editable"
                        contentEditable={!isPresentMode}
                        suppressContentEditableWarning
                        onBlur={e => updateSlideField('subtitle', e.currentTarget.textContent)}
                      >
                        {currentSlide.subtitle}
                      </p>
                    </div>

                    <div className="mockups-grid-4">
                      {currentSlide.cards.map((card, cIdx) => (
                        <div key={card.id || cIdx} className="phone-mockup-card">
                          <div
                            className="phone-frame"
                            onClick={() => !isPresentMode && setImagePickerTarget({ slideId: currentSlide.id, cardIndex: cIdx })}
                            title={!isPresentMode ? 'Click to swap proof image' : ''}
                          >
                            <img src={card.image} alt={card.label} className="phone-screen" />
                            {!isPresentMode && <span className="swap-hint">Click to Swap</span>}
                          </div>
                          <div className="phone-meta">
                            <div
                              className="phone-stat editable"
                              contentEditable={!isPresentMode}
                              suppressContentEditableWarning
                              onBlur={e => updateCardField(cIdx, 'stat', e.currentTarget.textContent)}
                            >
                              {card.stat}
                            </div>
                            <div
                              className="phone-sub editable"
                              contentEditable={!isPresentMode}
                              suppressContentEditableWarning
                              onBlur={e => updateCardField(cIdx, 'sub', e.currentTarget.textContent)}
                            >
                              {card.sub}
                            </div>
                            <div className="phone-label">{card.label}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. FORMAT LIFECYCLE WAVE (Slide 03 - Fixed Claude Flaw) */}
                {currentSlide.type === 'format_wave' && (
                  <div className="content-format-wave">
                    <div className="section-head">
                      <h2
                        className="slide-title editable"
                        contentEditable={!isPresentMode}
                        suppressContentEditableWarning
                        onBlur={e => updateSlideField('title', e.currentTarget.textContent)}
                      >
                        {currentSlide.title}
                      </h2>
                      <p
                        className="slide-subtitle editable highlight-orange"
                        contentEditable={!isPresentMode}
                        suppressContentEditableWarning
                        onBlur={e => updateSlideField('subtitle', e.currentTarget.textContent)}
                      >
                        {currentSlide.subtitle}
                      </p>
                    </div>

                    {/* FIXED SVG DIAGRAM */}
                    <div className="wave-diagram-container">
                      <svg className="wave-svg" viewBox="0 0 900 240" fill="none">
                        <defs>
                          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.8" />
                            <stop offset="50%" stopColor="#FFAA44" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#666666" stopOpacity="0.2" />
                          </linearGradient>
                          <linearGradient id="waveFill" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="#FF6B00" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        {/* Area fill */}
                        <path
                          d="M 50 200 C 150 200, 220 50, 320 50 C 450 50, 520 120, 620 130 C 720 140, 800 210, 850 215 L 850 220 L 50 220 Z"
                          fill="url(#waveFill)"
                        />
                        {/* Stroke curve */}
                        <path
                          d="M 50 200 C 150 200, 220 50, 320 50 C 450 50, 520 120, 620 130 C 720 140, 800 210, 850 215"
                          stroke="url(#waveGradient)"
                          strokeWidth="5"
                          strokeLinecap="round"
                        />
                        {/* Key Phase Milestone Markers */}
                        <circle cx="320" cy="50" r="9" fill="#FF6B00" stroke="#FFFFFF" strokeWidth="3" />
                        <circle cx="620" cy="130" r="8" fill="#FFAA44" stroke="#FFFFFF" strokeWidth="2" />
                        <circle cx="850" cy="215" r="8" fill="#666666" stroke="#FFFFFF" strokeWidth="2" />
                      </svg>

                      {/* Phase Cards beneath wave */}
                      <div className="wave-phases-grid">
                        {currentSlide.phases.map((p, idx) => (
                          <div key={idx} className="phase-card">
                            <div className="phase-tag" style={{ color: p.color }}>{p.step}</div>
                            <div className="phase-title">{p.title}</div>
                            <div className="phase-desc">{p.desc}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="wave-takeaway-box">
                      <em>{currentSlide.takeaway}</em>
                    </div>
                  </div>
                )}

                {/* 4. 3-MOCKUP VIRAL METRICS SLIDE (Slide 04) */}
                {currentSlide.type === 'mockups_3' && (
                  <div className="content-mockups-3">
                    <div className="section-head">
                      <h2
                        className="slide-title editable"
                        contentEditable={!isPresentMode}
                        suppressContentEditableWarning
                        onBlur={e => updateSlideField('title', e.currentTarget.textContent)}
                      >
                        {currentSlide.title}
                      </h2>
                      <p
                        className="slide-subtitle editable"
                        contentEditable={!isPresentMode}
                        suppressContentEditableWarning
                        onBlur={e => updateSlideField('subtitle', e.currentTarget.textContent)}
                      >
                        {currentSlide.subtitle}
                      </p>
                    </div>

                    <div className="mockups-grid-3">
                      {currentSlide.cards.map((card, cIdx) => (
                        <div key={card.id || cIdx} className="phone-mockup-card large">
                          <div
                            className="phone-frame"
                            onClick={() => !isPresentMode && setImagePickerTarget({ slideId: currentSlide.id, cardIndex: cIdx })}
                            title={!isPresentMode ? 'Click to swap proof image' : ''}
                          >
                            <img src={card.image} alt={card.label} className="phone-screen" />
                            {!isPresentMode && <span className="swap-hint">Click to Swap</span>}
                          </div>
                          <div className="phone-meta">
                            <div
                              className="phone-stat editable"
                              contentEditable={!isPresentMode}
                              suppressContentEditableWarning
                              onBlur={e => updateCardField(cIdx, 'stat', e.currentTarget.textContent)}
                            >
                              {card.stat}
                            </div>
                            <div className="phone-sub">{card.sub}</div>
                            <div className="phone-label">{card.label}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 5. QUOTE / HIGH TENSION SLIDE (Slide 05) */}
                {currentSlide.type === 'quote_highlight' && (
                  <div className="content-quote-highlight">
                    <h1
                      className="hero-headline editable"
                      contentEditable={!isPresentMode}
                      suppressContentEditableWarning
                      onBlur={e => updateSlideField('title', e.currentTarget.textContent)}
                    >
                      {currentSlide.title}
                    </h1>
                    <p
                      className="quote-body editable"
                      contentEditable={!isPresentMode}
                      suppressContentEditableWarning
                      onBlur={e => updateSlideField('subtitle', e.currentTarget.textContent)}
                    >
                      {currentSlide.subtitle}
                    </p>
                    <div className="punchline-box">
                      <p
                        className="punchline-text editable"
                        contentEditable={!isPresentMode}
                        suppressContentEditableWarning
                        onBlur={e => updateSlideField('punchline', e.currentTarget.textContent)}
                      >
                        {currentSlide.punchline}
                      </p>
                    </div>
                  </div>
                )}

                {/* 6. AGENCY SPECIALIZATION (Slide 06 - Fixed Claude Empty Space) */}
                {currentSlide.type === 'agency_contrast' && (
                  <div className="content-agency-contrast">
                    <div className="section-head">
                      <h2
                        className="slide-title editable"
                        contentEditable={!isPresentMode}
                        suppressContentEditableWarning
                        onBlur={e => updateSlideField('title', e.currentTarget.textContent)}
                      >
                        {currentSlide.title}
                      </h2>
                      <p
                        className="slide-subtitle editable"
                        contentEditable={!isPresentMode}
                        suppressContentEditableWarning
                        onBlur={e => updateSlideField('subtitle', e.currentTarget.textContent)}
                      >
                        {currentSlide.subtitle}
                      </p>
                    </div>

                    <p className="agency-intro">{currentSlide.body}</p>

                    <div className="agency-cards-row">
                      {currentSlide.points.map((pt, pIdx) => (
                        <div key={pIdx} className="agency-pill-card">
                          <div className="pill-head">0{pIdx + 1} · {pt.label}</div>
                          <div className="pill-body">{pt.text}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 7. THREE STAR FRAMEWORK OVERVIEW (Slide 07) */}
                {currentSlide.type === 'three_star_pillars' && (
                  <div className="content-three-star">
                    <div className="section-head">
                      <h2
                        className="slide-title editable"
                        contentEditable={!isPresentMode}
                        suppressContentEditableWarning
                        onBlur={e => updateSlideField('title', e.currentTarget.textContent)}
                      >
                        {currentSlide.title}
                      </h2>
                      <p
                        className="slide-subtitle editable"
                        contentEditable={!isPresentMode}
                        suppressContentEditableWarning
                        onBlur={e => updateSlideField('subtitle', e.currentTarget.textContent)}
                      >
                        {currentSlide.subtitle}
                      </p>
                    </div>

                    <div className="pillars-grid">
                      {currentSlide.pillars.map((pil, idx) => (
                        <div key={idx} className="pillar-card">
                          <div className="pillar-num">{pil.num}</div>
                          <div className="pillar-title">{pil.title}</div>
                          <div className="pillar-desc">{pil.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 8. WHO THIS VIDEO IS FOR (Slide 08) */}
                {currentSlide.type === 'criteria_checklist' && (
                  <div className="content-criteria">
                    <div className="section-head">
                      <h2
                        className="slide-title editable"
                        contentEditable={!isPresentMode}
                        suppressContentEditableWarning
                        onBlur={e => updateSlideField('title', e.currentTarget.textContent)}
                      >
                        {currentSlide.title}
                      </h2>
                      <p
                        className="slide-subtitle editable"
                        contentEditable={!isPresentMode}
                        suppressContentEditableWarning
                        onBlur={e => updateSlideField('subtitle', e.currentTarget.textContent)}
                      >
                        {currentSlide.subtitle}
                      </p>
                    </div>

                    <div className="criteria-list">
                      {currentSlide.items.map((item, idx) => (
                        <div key={idx} className="criteria-item">
                          <div className="criteria-bullet">&#10003;</div>
                          <div className="criteria-text">{item}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 9. TIME MINDSET (Slide 09) */}
                {currentSlide.type === 'quote_box' && (
                  <div className="content-quote-box">
                    <h1
                      className="hero-headline editable"
                      contentEditable={!isPresentMode}
                      suppressContentEditableWarning
                      onBlur={e => updateSlideField('title', e.currentTarget.textContent)}
                    >
                      {currentSlide.title}
                    </h1>
                    <p
                      className="quote-body editable"
                      contentEditable={!isPresentMode}
                      suppressContentEditableWarning
                      onBlur={e => updateSlideField('subtitle', e.currentTarget.textContent)}
                    >
                      {currentSlide.subtitle}
                    </p>
                    <div className="framed-quote-card">
                      <p className="big-quote">{currentSlide.quote}</p>
                    </div>
                  </div>
                )}

                {/* 10. THE CREATOR VALLEY (Slide 10 - Fixed Claude Flaw) */}
                {currentSlide.type === 'creator_valley' && (
                  <div className="content-creator-valley">
                    <div className="section-head">
                      <h2
                        className="slide-title editable"
                        contentEditable={!isPresentMode}
                        suppressContentEditableWarning
                        onBlur={e => updateSlideField('title', e.currentTarget.textContent)}
                      >
                        {currentSlide.title}
                      </h2>
                      <p
                        className="slide-subtitle editable"
                        contentEditable={!isPresentMode}
                        suppressContentEditableWarning
                        onBlur={e => updateSlideField('subtitle', e.currentTarget.textContent)}
                      >
                        {currentSlide.subtitle}
                      </p>
                    </div>

                    <div className="valley-bullets-row">
                      {currentSlide.bullets.map((b, idx) => (
                        <div key={idx} className="valley-bullet-badge">
                          <span className="dot">&#9679;</span> {b}
                        </div>
                      ))}
                    </div>

                    {/* INTERACTIVE J-CURVE GRAPH */}
                    <div className="j-curve-wrapper">
                      <svg className="j-curve-svg" viewBox="0 0 920 300" fill="none">
                        <defs>
                          <linearGradient id="valleyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.7" />
                            <stop offset="35%" stopColor="#FF4400" stopOpacity="0.9" />
                            <stop offset="70%" stopColor="#FF8800" stopOpacity="1" />
                            <stop offset="100%" stopColor="#00E676" stopOpacity="1" />
                          </linearGradient>
                          <linearGradient id="valleyFill" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#FF6B00" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>

                        {/* Grid Axes */}
                        <line x1="80" y1="40" x2="80" y2="260" stroke="#DDDDDD" strokeWidth="2" />
                        <line x1="80" y1="260" x2="880" y2="260" stroke="#DDDDDD" strokeWidth="2" />

                        {/* Threshold line */}
                        <line x1="80" y1="170" x2="880" y2="170" stroke="#FFAA66" strokeWidth="1.5" strokeDasharray="6 6" />
                        <text x="90" y="162" fill="#FF6B00" fontSize="11" fontWeight="600">Break-Even Authority Threshold</text>

                        {/* J-Curve Area */}
                        <path
                          d="M 80 140 C 140 140, 200 235, 340 235 C 480 235, 560 170, 680 80 C 740 30, 800 20, 860 20 L 860 260 L 80 260 Z"
                          fill="url(#valleyFill)"
                        />

                        {/* J-Curve Path */}
                        <path
                          d="M 80 140 C 140 140, 200 235, 340 235 C 480 235, 560 170, 680 80 C 740 30, 800 20, 860 20"
                          stroke="url(#valleyGradient)"
                          strokeWidth="6"
                          strokeLinecap="round"
                        />

                        {/* Data Points */}
                        <circle cx="80" cy="140" r="7" fill="#FF6B00" stroke="#FFFFFF" strokeWidth="3" />
                        <circle cx="340" cy="235" r="9" fill="#D32F2F" stroke="#FFFFFF" strokeWidth="3" />
                        <circle cx="580" cy="155" r="8" fill="#FF8800" stroke="#FFFFFF" strokeWidth="3" />
                        <circle cx="860" cy="20" r="10" fill="#00C853" stroke="#FFFFFF" strokeWidth="3" />

                        {/* SVG Annotations */}
                        <text x="70" y="125" fill="#333333" fontSize="12" fontWeight="700">Initial Spark</text>
                        <text x="260" y="255" fill="#D32F2F" fontSize="13" fontWeight="800">The Creator Valley (95% Quit)</text>
                        <text x="595" y="150" fill="#E65100" fontSize="12" fontWeight="700">Inflection Point</text>
                        <text x="710" y="15" fill="#007E33" fontSize="13" fontWeight="800">Compounding Brand Equity</text>

                        {/* Axis Labels */}
                        <text x="450" y="285" fill="#888888" fontSize="12" fontWeight="600" textAnchor="middle">Effort & Time (Days 1 → 60 → 180+) →</text>
                      </svg>
                    </div>
                  </div>
                )}

                {/* 11. DFY VS DWY (Slide 11) */}
                {currentSlide.type === 'dfy_vs_dwy' && (
                  <div className="content-dfy-dwy">
                    <div className="section-head">
                      <h2
                        className="slide-title editable"
                        contentEditable={!isPresentMode}
                        suppressContentEditableWarning
                        onBlur={e => updateSlideField('title', e.currentTarget.textContent)}
                      >
                        {currentSlide.title}
                      </h2>
                      <p
                        className="slide-subtitle editable"
                        contentEditable={!isPresentMode}
                        suppressContentEditableWarning
                        onBlur={e => updateSlideField('subtitle', e.currentTarget.textContent)}
                      >
                        {currentSlide.subtitle}
                      </p>
                    </div>

                    <div className="dfy-dwy-grid">
                      {/* Left: DFY */}
                      <div className="compare-card dfy-card">
                        <div className="compare-badge dfy-badge">{currentSlide.dfy.badge}</div>
                        <div className="compare-title">{currentSlide.dfy.title}</div>
                        <div className="compare-bullets">
                          {currentSlide.dfy.bullets.map((b, idx) => (
                            <div key={idx} className="compare-item">
                              <span className="bullet-dot">&#8226;</span>
                              <span>{b}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right: DWY (Highlighted) */}
                      <div className="compare-card dwy-card highlighted">
                        <div className="compare-badge dwy-badge">{currentSlide.dwy.badge}</div>
                        <div className="compare-title">{currentSlide.dwy.title}</div>
                        <div className="compare-bullets">
                          {currentSlide.dwy.bullets.map((b, idx) => (
                            <div key={idx} className="compare-item">
                              <span className="check-mark">&#10003;</span>
                              <span>{b}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 12. INDIA CONTENT POTENTIAL & MISSION (Slide 12) */}
                {currentSlide.type === 'mission_card' && (
                  <div className="content-mission">
                    <div className="mission-split">
                      <div className="mission-image-side">
                        <div className="phone-frame telegram-frame">
                          <img src={currentSlide.image} alt="Creatorpreneur Community" className="phone-screen" />
                        </div>
                      </div>
                      <div className="mission-text-side">
                        <h2
                          className="slide-title editable"
                          contentEditable={!isPresentMode}
                          suppressContentEditableWarning
                          onBlur={e => updateSlideField('title', e.currentTarget.textContent)}
                        >
                          {currentSlide.title}
                        </h2>
                        <p
                          className="slide-subtitle editable"
                          contentEditable={!isPresentMode}
                          suppressContentEditableWarning
                          onBlur={e => updateSlideField('subtitle', e.currentTarget.textContent)}
                        >
                          {currentSlide.subtitle}
                        </p>

                        <div className="mission-highlight-box">
                          <div className="mission-box-head">{currentSlide.missionTitle}</div>
                          <div className="mission-box-body">{currentSlide.missionGoal}</div>
                          <div className="mission-box-note">{currentSlide.note}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 13. TRACK RECORD (Slide 13) */}
                {currentSlide.type === 'track_record' && (
                  <div className="content-track-record">
                    <div className="section-head">
                      <h2
                        className="slide-title editable"
                        contentEditable={!isPresentMode}
                        suppressContentEditableWarning
                        onBlur={e => updateSlideField('title', e.currentTarget.textContent)}
                      >
                        {currentSlide.title}
                      </h2>
                      <p
                        className="slide-subtitle editable"
                        contentEditable={!isPresentMode}
                        suppressContentEditableWarning
                        onBlur={e => updateSlideField('subtitle', e.currentTarget.textContent)}
                      >
                        {currentSlide.subtitle}
                      </p>
                    </div>

                    <div className="track-stats-row">
                      {currentSlide.stats.map((st, sIdx) => (
                        <div key={sIdx} className="track-stat-card">
                          <div className="track-big-num">{st.num}</div>
                          <div className="track-stat-desc">{st.desc}</div>
                        </div>
                      ))}
                    </div>

                    <div className="track-mockups-row">
                      {currentSlide.mockups.map((m, mIdx) => (
                        <div key={mIdx} className="track-phone-frame">
                          <img src={m.img} alt={m.caption} className="phone-screen" />
                          <div className="track-phone-caption">{m.caption}</div>
                        </div>
                      ))}
                    </div>

                    <div className="track-footnote">{currentSlide.footnote}</div>
                  </div>
                )}

                {/* 14. DISQUALIFIERS (Slide 14) */}
                {currentSlide.type === 'disqualifiers' && (
                  <div className="content-disqualifiers">
                    <div className="section-head">
                      <h2
                        className="slide-title editable"
                        contentEditable={!isPresentMode}
                        suppressContentEditableWarning
                        onBlur={e => updateSlideField('title', e.currentTarget.textContent)}
                      >
                        {currentSlide.title}
                      </h2>
                      <p
                        className="slide-subtitle editable"
                        contentEditable={!isPresentMode}
                        suppressContentEditableWarning
                        onBlur={e => updateSlideField('subtitle', e.currentTarget.textContent)}
                      >
                        {currentSlide.subtitle}
                      </p>
                    </div>

                    <div className="disqualifiers-list">
                      {currentSlide.items.map((item, idx) => (
                        <div key={idx} className="disqualifier-card">
                          <div className="red-cross">&#10005;</div>
                          <div className="disqualifier-text">{item}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 15. ROADMAP EVOLUTION (Slide 15 - Enhanced) */}
                {currentSlide.type === 'evolution_timeline' && (
                  <div className="content-timeline">
                    <div className="section-head">
                      <h2
                        className="slide-title editable"
                        contentEditable={!isPresentMode}
                        suppressContentEditableWarning
                        onBlur={e => updateSlideField('title', e.currentTarget.textContent)}
                      >
                        {currentSlide.title}
                      </h2>
                      <p
                        className="slide-subtitle editable"
                        contentEditable={!isPresentMode}
                        suppressContentEditableWarning
                        onBlur={e => updateSlideField('subtitle', e.currentTarget.textContent)}
                      >
                        {currentSlide.subtitle}
                      </p>
                    </div>

                    <div className="timeline-cards-row">
                      {currentSlide.stages.map((stg, sIdx) => (
                        <div key={sIdx} className="timeline-stage-card">
                          <div className="stage-year">{stg.year}</div>
                          <div className="stage-headline">{stg.headline}</div>
                          <div className="stage-desc">{stg.desc}</div>
                        </div>
                      ))}
                    </div>

                    <div className="timeline-case-study">
                      <span className="badge">PROOF CASE STUDY</span>
                      <p>{currentSlide.caseStudy}</p>
                    </div>
                  </div>
                )}

                {/* 16. BURNOUT CURVE (Slide 16 - Fixed Claude Flaw) */}
                {currentSlide.type === 'burnout_curve' && (
                  <div className="content-burnout">
                    <div className="section-head">
                      <h2
                        className="slide-title editable"
                        contentEditable={!isPresentMode}
                        suppressContentEditableWarning
                        onBlur={e => updateSlideField('title', e.currentTarget.textContent)}
                      >
                        {currentSlide.title}
                      </h2>
                      <p
                        className="slide-subtitle editable"
                        contentEditable={!isPresentMode}
                        suppressContentEditableWarning
                        onBlur={e => updateSlideField('subtitle', e.currentTarget.textContent)}
                      >
                        {currentSlide.subtitle}
                      </p>
                    </div>

                    <div className="burnout-bullets-row">
                      {currentSlide.bullets.map((b, idx) => (
                        <div key={idx} className="burnout-bullet">
                          <span>&#8226;</span> {b}
                        </div>
                      ))}
                    </div>

                    {/* FIXED BURNOUT SVG CURVE */}
                    <div className="burnout-curve-container">
                      <svg className="burnout-svg" viewBox="0 0 900 220" fill="none">
                        <defs>
                          <linearGradient id="redBurnoutGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#FFA726" />
                            <stop offset="60%" stopColor="#EF5350" />
                            <stop offset="100%" stopColor="#B71C1C" />
                          </linearGradient>
                          <linearGradient id="greenPivotGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#FF6B00" />
                            <stop offset="100%" stopColor="#00E676" />
                          </linearGradient>
                        </defs>

                        {/* Baseline */}
                        <line x1="60" y1="180" x2="840" y2="180" stroke="#333333" strokeWidth="2" />

                        {/* The Burnout Curve (plunging down into the wall) */}
                        <path
                          d="M 60 140 C 180 140, 280 60, 420 70 C 520 80, 580 160, 680 178"
                          stroke="url(#redBurnoutGrad)"
                          strokeWidth="5"
                          strokeLinecap="round"
                        />

                        {/* FirstSelfie Escape Pivot Curve (springing upward) */}
                        <path
                          d="M 420 70 C 500 50, 620 30, 800 25"
                          stroke="url(#greenPivotGrad)"
                          strokeWidth="5"
                          strokeLinecap="round"
                          strokeDasharray="6 6"
                        />

                        {/* The Burnout Wall at x=680 */}
                        <rect x="670" y="40" width="8" height="140" fill="#D32F2F" rx="4" />
                        <text x="674" y="30" fill="#EF5350" fontSize="13" fontWeight="800" textAnchor="middle">BURNOUT WALL</text>

                        {/* Annotations */}
                        <circle cx="420" cy="70" r="8" fill="#FF6B00" stroke="#FFFFFF" strokeWidth="2" />
                        <text x="420" y="105" fill="#FF9100" fontSize="12" fontWeight="700" textAnchor="middle">FirstSelfie DWY Intervention</text>

                        <circle cx="800" cy="25" r="8" fill="#00E676" stroke="#FFFFFF" strokeWidth="2" />
                        <text x="800" y="15" fill="#00E676" fontSize="12" fontWeight="800" textAnchor="middle">Autonomous Inbound System</text>
                      </svg>
                    </div>

                    <div className="burnout-footer-note">
                      <span className="dot">&#9679;</span> {currentSlide.takeaway}
                    </div>
                  </div>
                )}

                {/* 17. FRAMEWORK 01 (Slide 17) */}
                {currentSlide.type === 'framework_01' && (
                  <div className="content-framework-01">
                    <div className="section-head">
                      <h2
                        className="slide-title editable"
                        contentEditable={!isPresentMode}
                        suppressContentEditableWarning
                        onBlur={e => updateSlideField('title', e.currentTarget.textContent)}
                      >
                        {currentSlide.title}
                      </h2>
                      <p
                        className="slide-subtitle editable"
                        contentEditable={!isPresentMode}
                        suppressContentEditableWarning
                        onBlur={e => updateSlideField('subtitle', e.currentTarget.textContent)}
                      >
                        {currentSlide.subtitle}
                      </p>
                    </div>

                    <div className="f1-split-layout">
                      <div className="f1-steps-list">
                        {currentSlide.steps.map((st, idx) => (
                          <div key={idx} className="f1-step-item">
                            <span className="f1-check">&#10003;</span>
                            <span className="f1-text">{st}</span>
                          </div>
                        ))}
                      </div>

                      <div className="f1-path-card">
                        <div className="f1-path-header">{currentSlide.pathTitle}</div>
                        <div className="f1-path-phases">
                          {currentSlide.pathPhases.map((ph, idx) => (
                            <div key={idx} className="f1-phase-block">
                              <div className="phase-label">{ph.phase}</div>
                              <div className="phase-action">{ph.desc}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 18. FRAMEWORK 02: ENGINE SYSTEM (Slide 18) */}
                {currentSlide.type === 'engine_grid' && (
                  <div className="content-engine">
                    <div className="section-head">
                      <h2
                        className="slide-title editable"
                        contentEditable={!isPresentMode}
                        suppressContentEditableWarning
                        onBlur={e => updateSlideField('title', e.currentTarget.textContent)}
                      >
                        {currentSlide.title}
                      </h2>
                      <p
                        className="slide-subtitle editable"
                        contentEditable={!isPresentMode}
                        suppressContentEditableWarning
                        onBlur={e => updateSlideField('subtitle', e.currentTarget.textContent)}
                      >
                        {currentSlide.subtitle}
                      </p>
                    </div>

                    <div className="engine-headline-bar">{currentSlide.headline}</div>

                    <div className="engine-cards-grid">
                      {currentSlide.cards.map((c, idx) => (
                        <div key={idx} className="engine-card">
                          <div className="engine-stat">{c.stat}</div>
                          <div className="engine-label">{c.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 19. POSITIONING FORMULA (Slide 19) */}
                {currentSlide.type === 'positioning_formula' && (
                  <div className="content-positioning">
                    <div className="section-head">
                      <h2
                        className="slide-title editable"
                        contentEditable={!isPresentMode}
                        suppressContentEditableWarning
                        onBlur={e => updateSlideField('title', e.currentTarget.textContent)}
                      >
                        {currentSlide.title}
                      </h2>
                      <p
                        className="slide-subtitle editable"
                        contentEditable={!isPresentMode}
                        suppressContentEditableWarning
                        onBlur={e => updateSlideField('subtitle', e.currentTarget.textContent)}
                      >
                        {currentSlide.subtitle}
                      </p>
                    </div>

                    <div className="formula-box">
                      <div className="formula-equation">{currentSlide.formula}</div>
                    </div>

                    <div className="formula-explanation-card">
                      <p>{currentSlide.explanation}</p>
                    </div>
                  </div>
                )}

                {/* 20. FRAMEWORK 03: APA MATRIX (Slide 20) */}
                {currentSlide.type === 'apa_matrix' && (
                  <div className="content-apa">
                    <div className="section-head">
                      <h2
                        className="slide-title editable"
                        contentEditable={!isPresentMode}
                        suppressContentEditableWarning
                        onBlur={e => updateSlideField('title', e.currentTarget.textContent)}
                      >
                        {currentSlide.title}
                      </h2>
                      <p
                        className="slide-subtitle editable"
                        contentEditable={!isPresentMode}
                        suppressContentEditableWarning
                        onBlur={e => updateSlideField('subtitle', e.currentTarget.textContent)}
                      >
                        {currentSlide.subtitle}
                      </p>
                    </div>

                    <div className="apa-kicker">{currentSlide.kicker}</div>
                    <div className="apa-warning-bar">{currentSlide.warning}</div>

                    <div className="apa-options-grid">
                      {currentSlide.options.map((opt, idx) => (
                        <div key={idx} className={`apa-card ${idx === 0 ? 'opt-win' : 'opt-lose'}`}>
                          <div className="apa-badge">{opt.badge}</div>
                          <div className="apa-card-title">{opt.title}</div>
                          <div className="apa-card-desc">{opt.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 21. SPRINT ROADMAP (Slide 21 - Fixed Claude Empty Box) */}
                {currentSlide.type === 'sprint_architecture' && (
                  <div className="content-sprint">
                    <div className="section-head">
                      <h2
                        className="slide-title editable"
                        contentEditable={!isPresentMode}
                        suppressContentEditableWarning
                        onBlur={e => updateSlideField('title', e.currentTarget.textContent)}
                      >
                        {currentSlide.title}
                      </h2>
                      <p
                        className="slide-subtitle editable"
                        contentEditable={!isPresentMode}
                        suppressContentEditableWarning
                        onBlur={e => updateSlideField('subtitle', e.currentTarget.textContent)}
                      >
                        {currentSlide.subtitle}
                      </p>
                    </div>

                    <div className="sprint-phases-row">
                      {currentSlide.phases.map((ph, idx) => (
                        <div key={idx} className="sprint-phase-card">
                          <div className="sprint-phase-top">
                            <span className="sprint-num">{ph.num}</span>
                            <span className="sprint-days">{ph.days}</span>
                          </div>
                          <div className="sprint-phase-name">{ph.name}</div>
                          <div className="sprint-bullets">
                            {ph.bullets.map((b, bIdx) => (
                              <div key={bIdx} className="sprint-bullet-item">
                                <span>&#10003;</span> {b}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="sprint-callout-card">
                      <img src="/LOGO/Primary Logo - Transparent (1).png" alt="FirstSelfie" className="sprint-mini-logo" />
                      <p>{currentSlide.callout}</p>
                    </div>
                  </div>
                )}

                {/* 22. CLOSING CTA (Slide 22) */}
                {currentSlide.type === 'closing_cta' && (
                  <div className="content-closing-cta">
                    <div className="cta-center-box">
                      <img src="/LOGO/Primary Logo - Transparent (1).png" alt="FirstSelfie" className="cta-brand-logo" />
                      <h1
                        className="hero-headline editable"
                        contentEditable={!isPresentMode}
                        suppressContentEditableWarning
                        onBlur={e => updateSlideField('title', e.currentTarget.textContent)}
                      >
                        {currentSlide.title}
                      </h1>
                      <p
                        className="cta-sub editable"
                        contentEditable={!isPresentMode}
                        suppressContentEditableWarning
                        onBlur={e => updateSlideField('subtitle', e.currentTarget.textContent)}
                      >
                        {currentSlide.subtitle}
                      </p>

                      <div className="cta-limit-banner">
                        <div className="limit-head">{currentSlide.ctaBox.headline}</div>
                        <div className="limit-sub">{currentSlide.ctaBox.subtext}</div>
                      </div>

                      <div className="cta-note">{currentSlide.closingNote}</div>
                      <div className="cta-handle">{currentSlide.handle}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* BOTTOM CONTROLS */}
          <footer className="stage-controls">
            <div className="controls-left">
              <button
                className="ctrl-btn"
                onClick={prevSlide}
                disabled={currentSlideIndex === 0}
                title="Previous Slide (Left Arrow)"
              >
                &#9664; Prev
              </button>
              <span className="slide-counter-text">
                Slide <strong>{currentSlideIndex + 1}</strong> of <strong>{totalSlides}</strong>
              </span>
              <button
                className="ctrl-btn"
                onClick={nextSlide}
                disabled={currentSlideIndex === totalSlides - 1}
                title="Next Slide (Right Arrow or Space)"
              >
                Next &#9654;
              </button>
            </div>

            <div className="controls-center">
              <div className="progress-bar-bg">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${((currentSlideIndex + 1) / totalSlides) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="controls-right">
              {!isPresentMode && (
                <div className="slide-status-quick">
                  <span className="status-label">Slide Review:</span>
                  <select
                    className={`status-select ${currentReview.status}`}
                    value={currentReview.status}
                    onChange={e => updateReview(e.target.value)}
                  >
                    <option value="in_review">&#9203; In Review</option>
                    <option value="approved">&#9989; Approved</option>
                    <option value="changes_needed">&#9888; Needs Changes</option>
                  </select>
                </div>
              )}
              <button
                className="ctrl-btn fullscreen-btn"
                onClick={() => setIsPresentMode(prev => !prev)}
                title="Toggle Fullscreen Present Mode"
              >
                {isPresentMode ? 'Exit (Esc)' : 'Present (F)'}
              </button>
            </div>
          </footer>
        </main>

        {/* RIGHT HEAD REVIEW PANEL (Studio Mode only) */}
        {!isPresentMode && isReviewPanelOpen && (
          <aside className="review-drawer">
            <div className="drawer-head">
              <h3>Head Verification Panel</h3>
              <button className="close-drawer-btn" onClick={() => setIsReviewPanelOpen(false)}>&#10005;</button>
            </div>

            <div className="drawer-body">
              <div className="review-section">
                <label className="section-label">Slide Approval Status</label>
                <div className="status-buttons-row">
                  <button
                    className={`status-chip ${currentReview.status === 'approved' ? 'active green' : ''}`}
                    onClick={() => updateReview('approved')}
                  >
                    &#9989; Approved
                  </button>
                  <button
                    className={`status-chip ${currentReview.status === 'changes_needed' ? 'active orange' : ''}`}
                    onClick={() => updateReview('changes_needed')}
                  >
                    &#9888; Needs Changes
                  </button>
                  <button
                    className={`status-chip ${currentReview.status === 'in_review' ? 'active grey' : ''}`}
                    onClick={() => updateReview('in_review')}
                  >
                    &#9203; In Review
                  </button>
                </div>
              </div>

              <div className="review-section">
                <label className="section-label">Head Review Notes (Auto-saved)</label>
                <textarea
                  className="review-notes-textarea"
                  placeholder="Type feedback, requested edits, or comments for this slide..."
                  value={currentReview.note}
                  onChange={e => updateReview(undefined, e.target.value)}
                  rows={6}
                />
              </div>

              <div className="review-section script-section">
                <label className="section-label">Audio / Video Script Alignment</label>
                <div className="script-box">
                  <em>"{currentSlide.scriptSnippet}"</em>
                </div>
              </div>

              <div className="drawer-actions">
                <button className="copy-report-btn" onClick={copyReviewSummary}>
                  &#128203; Copy Review Report
                </button>
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* PROOF IMAGE PICKER MODAL */}
      {imagePickerTarget && (
        <div className="modal-backdrop" onClick={() => setImagePickerTarget(null)}>
          <div className="modal-card image-picker-card" onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <h3>Select Proof Screenshot</h3>
              <button className="close-btn" onClick={() => setImagePickerTarget(null)}>&#10005;</button>
            </div>
            <div className="modal-subtitle">Choose from verified account screenshots or proof assets:</div>
            <div className="proof-gallery-grid">
              {PROOF_IMAGES.map((img, idx) => (
                <div key={idx} className="gallery-item" onClick={() => handleSelectImage(img.src)}>
                  <img src={img.src} alt={img.name} />
                  <div className="gallery-caption">{img.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* REVIEW STATUS MODAL */}
      {showSummaryModal && (
        <div className="modal-backdrop" onClick={() => setShowSummaryModal(false)}>
          <div className="modal-card summary-card" onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <h3>Deck Verification Summary</h3>
              <button className="close-btn" onClick={() => setShowSummaryModal(false)}>&#10005;</button>
            </div>
            <div className="summary-stats-banner">
              <div className="stat-pill green">
                <strong>{slides.filter(s => reviews[s.id]?.status === 'approved').length}</strong> Approved
              </div>
              <div className="stat-pill orange">
                <strong>{slides.filter(s => reviews[s.id]?.status === 'changes_needed').length}</strong> Needs Changes
              </div>
              <div className="stat-pill grey">
                <strong>{slides.filter(s => (!reviews[s.id] || reviews[s.id]?.status === 'in_review')).length}</strong> In Review
              </div>
            </div>

            <div className="summary-slides-list">
              {slides.map(s => {
                const r = reviews[s.id] || { status: 'in_review', note: '' };
                return (
                  <div key={s.id} className={`summary-slide-row ${r.status}`} onClick={() => { setCurrentSlideIndex(s.id - 1); setShowSummaryModal(false); }}>
                    <span className="row-num">Slide {s.slideNum}</span>
                    <span className="row-title">{s.title}</span>
                    <span className={`row-badge ${r.status}`}>{r.status}</span>
                    {r.note && <div className="row-note">Note: "{r.note}"</div>}
                  </div>
                );
              })}
            </div>

            <div className="modal-foot">
              <button className="copy-report-btn" onClick={copyReviewSummary}>
                &#128203; Copy Report for WhatsApp / Slack
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SHARE MODAL */}
      {showShareModal && (
        <div className="modal-backdrop" onClick={() => setShowShareModal(false)}>
          <div className="modal-card share-card" onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <h3>Share Deck with Head</h3>
              <button className="close-btn" onClick={() => setShowShareModal(false)}>&#10005;</button>
            </div>
            <p className="share-desc">
              Share this interactive deck for review, feedback, and live modification before presenting.
            </p>
            <div className="share-link-box">
              <input type="text" readOnly value={window.location.href} className="share-url-input" />
              <button
                className="copy-url-btn"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  triggerToast('Deck link copied to clipboard!');
                }}
              >
                Copy Link
              </button>
            </div>
            <div className="share-tips">
              <div>&#128161; <strong>Present Mode:</strong> Press <code>F</code> on any slide for a distraction-free 16:9 presentation.</div>
              <div>&#128161; <strong>Live Edits:</strong> You can double click text to edit and changes are saved automatically.</div>
              <div>&#128161; <strong>Vercel Deployment:</strong> This app deploys seamlessly to Vercel with zero configuration.</div>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING TOAST */}
      {copiedToast && (
        <div className="floating-toast">
          <span>&#10003;</span> {copiedToast}
        </div>
      )}
    </div>
  );
}
