import React from 'react';
import './Template22_HomepageLandscape.css';
import { TemplateProps, TemplateMeta } from '../registry';

export const templateMeta: TemplateMeta = {
  id: 22,
  name: 'Coffee House Home Landscape',
  orientation: 'landscape',
  aspectRatio: '16:9',
  width: 1920,
  height: 1080,
  category: 'homepage'
};

const CornerFlourish = ({ corner, size }: { corner: string, size: number }) => {
  const rotation = corner === 'top-left' ? 0 :
                   corner === 'top-right' ? 90 :
                   corner === 'bottom-right' ? 180 : 270;
  return (
    <div style={{ width: size, height: size, transform: `rotate(${rotation}deg)` }}>
      <svg viewBox="0 0 100 100" fill="none">
         <path d="M 0,20 C 50,20 80,50 80,100" stroke="#6b3410" strokeWidth="3" fill="none" />
         <circle cx="20" cy="20" r="4" fill="#6b3410" />
         <circle cx="80" cy="80" r="4" fill="#6b3410" />
      </svg>
    </div>
  );
};

const RibbonBanner = ({ text, width, height, fontSize }: any) => (
  <div style={{ position: 'relative', width, height, background: '#6b3410', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize, letterSpacing: '4px', fontWeight: 'bold' }}>
    <div style={{ position: 'absolute', left: -20, top: 10, bottom: 10, width: 20, background: '#4a230b', clipPath: 'polygon(100% 0, 100% 100%, 0 50%)' }} />
    <div style={{ position: 'absolute', right: -20, top: 10, bottom: 10, width: 20, background: '#4a230b', clipPath: 'polygon(0 0, 0 100%, 100% 50%)' }} />
    {text}
  </div>
);

const IconCircle = ({ icon, size }: any) => (
  <div style={{ width: size, height: size, borderRadius: '50%', border: '2px solid #6b3410', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size/2 }}>
    {icon === 'ribbon' ? '🎀' :
     icon === 'leaf' ? '🌿' :
     icon === 'clock' ? '⏱️' :
     icon === 'box' ? '📦' : '☕'}
  </div>
);

const Template22_HomepageLandscape: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="t22-root">
      <div className="t22-border-frame" />
 
      <div className="t22-corner tl">
        <CornerFlourish corner="top-left" size={100} />
      </div>
      <div className="t22-corner tr">
        <CornerFlourish corner="top-right" size={100} />
      </div>
      <div className="t22-corner bl">
        <CornerFlourish corner="bottom-left" size={100} />
      </div>
      <div className="t22-corner br">
        <CornerFlourish corner="bottom-right" size={100} />
      </div>
 
      <div className="t22-content-wrap">
        <div className="t22-left">
          <svg className="t22-eyebrow-mark" viewBox="0 0 120 40" fill="none">
            <g stroke="#6b3410" strokeWidth="1.4" fill="none">
              <path d="M5 24 C 20 14, 30 30, 45 22" />
              <path d="M115 24 C 100 14, 90 30, 75 22" />
              <path d="M60 6 C 56 14, 56 20, 60 26 C 64 20, 64 14, 60 6 Z" fill="#6b3410" stroke="none" />
              <path d="M52 12 C 56 16, 60 16, 60 14" />
              <path d="M68 12 C 64 16, 60 16, 60 14" />
            </g>
          </svg>
          <div className="t22-eyebrow-text">EST. 1998 &nbsp;•&nbsp; HANDCRAFTED</div>
  
          <h1 className="t22-title">{data.cafeName || 'Coffee House'}</h1>
          <div className="t22-subtitle">ARTISAN CAFÉ</div>
  
          <div className="t22-ribbon-wrap">
            <RibbonBanner text="ARTISAN CAFÉ" width={380} height={50} fontSize={18} />
          </div>
  
          <div className="t22-icons-row">
            <IconCircle icon="ribbon" size={60} />
            <IconCircle icon="leaf" size={60} />
            <IconCircle icon="clock" size={60} />
            <IconCircle icon="box" size={60} />
            <IconCircle icon="bean" size={60} />
          </div>

          <div className="t22-story-heading">
            <svg width="46" height="26" viewBox="0 0 46 26" fill="none">
              <g stroke="#6b3410" strokeWidth="1.4" fill="none">
                <path d="M2 13 C 10 4, 16 22, 26 12" />
                <circle cx="30" cy="9" r="1.6" fill="#6b3410" stroke="none" />
                <circle cx="34" cy="15" r="1.6" fill="#6b3410" stroke="none" />
              </g>
            </svg>
            <span>OUR STORY</span>
            <svg width="46" height="26" viewBox="0 0 46 26" fill="none">
              <g stroke="#6b3410" strokeWidth="1.4" fill="none">
                <path d="M44 13 C 36 4, 30 22, 20 12" />
                <circle cx="16" cy="9" r="1.6" fill="#6b3410" stroke="none" />
                <circle cx="12" cy="15" r="1.6" fill="#6b3410" stroke="none" />
              </g>
            </svg>
          </div>

          <div className="t22-view-menu-link">VIEW MENU</div>
        </div>

        <div className="t22-right">
          <div className="t22-hero-section">
            <svg className="t22-hero-band" viewBox="0 0 480 380" preserveAspectRatio="none">
              <path
                d="M0,55 C 130,115 350,115 480,55 L480,325 C 350,265 130,265 0,325 Z"
                fill="#5c2a0a"
              />
            </svg>
            <div className="t22-hero-img-frame">
              <img src="/hero_local.jpg" alt="Hero" className="t22-hero-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>

          <div className="t22-gallery-section">
            <div className="t22-view-menitre-row">
              <span className="t22-view-menitre-label">VIEW GALLERY</span>
              <span className="t22-view-menitre-rule" />
            </div>
    
            <div className="t22-thumbs-row">
              <div className="t22-thumb"><img src="/thumb1_local.jpg" alt="Gallery 1" /></div>
              <div className="t22-thumb"><img src="/thumb2_local.jpg" alt="Gallery 2" /></div>
              <div className="t22-thumb"><img src="/thumb3_local.jpg" alt="Gallery 3" /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default Template22_HomepageLandscape;
