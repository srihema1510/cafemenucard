import React from 'react';
import { TemplateProps, TemplateMeta } from '../registry';
import './Template20_CoffeeMenuLandscape.css';

export const templateMeta: TemplateMeta = {
  id: 20,
  name: 'Coffee Menu Landscape',
  orientation: 'landscape',
  aspectRatio: '16:9',
  width: 1920,
  height: 1080,
  category: 'menu'
};

const defaultItems = [
  { name: 'Espresso', price: '$246.9', code: 'R965', img: '/t15_espresso.jpg' },
  { name: 'Capcucino', price: '$248.9', code: 'R955', img: '/t15_capcucino.jpg' },
  { name: 'Americano', price: '$199.9', code: 'R789', img: '/t15_americano.jpg' },
  { name: 'Ancchan', price: '$179.9', code: 'R865', img: '/t15_ancchan.jpg' },
  { name: 'Maxchato', price: '$246.9', code: 'R055', img: '/t15_maxchato.jpg' },
  { name: 'Mcchiato', price: '$173.9', code: 'R986', img: '/t15_mcchiato.jpg' },
];

const Template20_CoffeeMenuLandscape: React.FC<TemplateProps> = ({ data }) => {
  let itemsToDisplay = defaultItems;
  if (data.categories && data.categories.length > 0) {
    const coffeeCat = data.categories.find((c: any) => c.name.toLowerCase().includes('coffee') || c.name.toLowerCase().includes('hot')) || data.categories[0];
    if (coffeeCat && coffeeCat.items && coffeeCat.items.length > 0) {
      itemsToDisplay = coffeeCat.items.slice(0, 6).map((item: any, i: number) => ({
        name: item.name || item.item_name,
        price: typeof item.price === 'number' ? `$${item.price.toFixed(1)}` : item.price,
        code: `R${965 - i * 10}`,
        img: item.image_url || defaultItems[i % defaultItems.length].img
      }));
    }
  }

  return (
    <div className="t20-root">
      {/* Ornate Corner Flourishes */}
      <div className="t20-corner tl">
        <svg viewBox="0 0 100 100" className="t20-corner-svg"><path d="M0,0 Q20,10 40,0 Q30,20 40,40 Q20,30 0,40 Q10,20 0,0 Z M15,15 Q25,20 20,35 Q10,25 15,15 Z" /></svg>
      </div>
      <div className="t20-corner tr">
        <svg viewBox="0 0 100 100" className="t20-corner-svg"><path d="M0,0 Q20,10 40,0 Q30,20 40,40 Q20,30 0,40 Q10,20 0,0 Z M15,15 Q25,20 20,35 Q10,25 15,15 Z" /></svg>
      </div>
      <div className="t20-corner bl">
        <svg viewBox="0 0 100 100" className="t20-corner-svg"><path d="M0,0 Q20,10 40,0 Q30,20 40,40 Q20,30 0,40 Q10,20 0,0 Z M15,15 Q25,20 20,35 Q10,25 15,15 Z" /></svg>
      </div>
      <div className="t20-corner br">
        <svg viewBox="0 0 100 100" className="t20-corner-svg"><path d="M0,0 Q20,10 40,0 Q30,20 40,40 Q20,30 0,40 Q10,20 0,0 Z M15,15 Q25,20 20,35 Q10,25 15,15 Z" /></svg>
      </div>

      {/* Inner Inset Border Line */}
      <div className="t20-inset-border"></div>

      <div className="t20-content-wrap">
        <div className="t20-left">
          {/* Header Section */}
          <div className="t20-header">
            <div className="t20-header-top">
              <span>✦</span>
              <svg className="t20-header-swag" viewBox="0 0 100 10"><path d="M0,5 Q50,0 100,5 Q50,10 0,5 Z" /></svg>
              <span>✦</span>
            </div>
            <h1 className="t20-title">Coffee Menu</h1>
            <div className="t20-subtitle-row">
              <div className="t20-line"></div>
              <span className="t20-subtitle">Artisan Elegance</span>
              <div className="t20-line"></div>
            </div>
          </div>

          {/* Lineup of Thin Vector Icons */}
          <div className="t20-icons-row">
            {[
              <path d="M25,55 C20,40 35,25 50,25 C65,25 80,40 75,55 Z M50,25 L50,15" />,
              <path d="M30,35 H70 V55 C70,65 60,75 50,75 C40,75 30,65 30,55 Z M70,40 h8 a4,4 0 0 1 4,4 v8 a4,4 0 0 1 -4,4 h-8" />,
              <path d="M35,30 H65 V65 C65,70 60,75 50,75 C40,75 35,70 35,65 Z M30,75 H70" />,
              <path d="M35,25 L50,75 M65,25 L50,75 M42,48 H58" />,
              <path d="M40,35 H60 V65 H40 Z M35,35 H65 M50,35 V20" />
            ].map((svgPath, idx) => (
              <div key={idx} className="t20-icon-circle">
                <svg viewBox="0 0 100 100" className="t20-icon-svg">{svgPath}</svg>
              </div>
            ))}
          </div>

          {/* Highly Intricate Symmetrical Horizontal Center Ornament */}
          <div className="t20-center-ornament">
            <svg viewBox="0 0 200 30" className="t20-ornament-svg">
              <path d="M100,15 Q80,0 60,15 Q40,30 20,15 Q40,0 60,15 Q80,30 100,15 Z M100,15 Q120,0 140,15 Q160,30 180,15 Q160,0 140,15 Q120,30 100,15 Z" />
              <circle cx="100" cy="15" r="4" />
            </svg>
          </div>

          {/* Swallowtail Ribbon Banner */}
          <div className="t20-ribbon-wrap">
            <div className="t20-ribbon">
              <div className="t20-ribbon-notch left"></div>
              <div className="t20-ribbon-notch right"></div>
              <span className="t20-ribbon-text">· Fercés as Fort, 2Sck ·</span>
            </div>
          </div>
        </div>
        
        <div className="t20-right">
          {/* Items 3x2 Alignment Grid */}
          <div className="t20-grid">
            {itemsToDisplay.map((item, idx) => (
              <div key={idx} className="t20-card">
                <div className="t20-card-inset"></div>
                
                <div className="t20-card-img-wrap">
                  <img src={item.img} alt={item.name} className="t20-card-img" />
                  <div className="t20-card-img-overlay"></div>
                </div>
                
                <h3 className="t20-card-title">{item.name}</h3>
                
                <p className="t20-card-desc">
                  Cofffer as Cod Lue 25e. Det Lamgja laC. & Lana lime. 18. Eonirag E.C. D 1t or ft Rtc Bia
                </p>
                
                <div className="t20-card-footer">
                  <span>Cap Scd</span>
                  <span className="t20-card-price">{item.price}</span>
                  <span>{item.code}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template20_CoffeeMenuLandscape;
