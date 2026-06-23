import React from 'react';
import { TemplateProps, TemplateMeta } from '../registry';
import './Template16_BreakfastSnacks.css';

export const templateMeta: TemplateMeta = {
  id: 16,
  name: 'Breakfast & Snacks',
  orientation: 'portrait',
  aspectRatio: '9:16',
  width: 1080,
  height: 1920,
  category: 'menu'
};

const defaultItems = [
  { name: 'Croissant', price: '15.90', img: '/t16_croissant.jpg' },
  { name: 'Bagels & Cheese', price: '11.50', img: '/t16_bagel.jpg' },
  { name: 'Muffin', price: '11.50', img: '/t16_muffin1.jpg' },
  { name: 'Muffin', price: '23.10', img: '/t16_muffin2.jpg' },
  { name: 'Cookies', price: '22.90', img: '/t16_cookies.jpg' },
  { name: 'Scone', price: '12.50', img: '/t16_scone.jpg' },
];

const categoryIcons = [
  { label: 'Nuley 650', path: 'M30,40 C30,30 70,30 70,40 V65 C70,72 30,72 30,65 Z M30,45 H70' },
  { label: 'Lakey 7510', path: 'M35,35 H65 V65 C65,70 60,75 50,75 C40,75 35,70 35,65 Z M65,42 h6 a3,3 0 0 1 3,3 v6 a3,3 0 0 1 -3,3 h-6' },
  { label: 'Fnđsy 1510', path: 'M25,60 Q50,25 75,60 Q50,75 25,60 Z M38,45 Q50,35 62,45' },
  { label: 'Dailey 451', path: 'M40,25 H60 V75 H40 Z M40,40 H60 M40,55 H60' },
  { label: 'Lukey 200', path: 'M50,20 A30,30 0 1,0 50,80 A30,30 0 1,0 50,20 M20,50 H80 M50,20 V80' }
];

const Template16_BreakfastSnacks: React.FC<TemplateProps> = ({ data }) => {
  let itemsToDisplay = defaultItems;
  if (data.categories && data.categories.length > 0) {
    const defaultCat = data.categories.find((c: any) => c.name.toLowerCase().includes('breakfast') || c.name.toLowerCase().includes('snack') || c.name.toLowerCase().includes('light')) || data.categories[0];
    if (defaultCat && defaultCat.items && defaultCat.items.length > 0) {
      itemsToDisplay = defaultCat.items.slice(0, 6).map((item: any, i: number) => ({
        name: item.name || item.item_name,
        price: typeof item.price === 'number' ? item.price.toFixed(2) : item.price,
        img: item.image_url || defaultItems[i % defaultItems.length].img
      }));
    }
  }

  return (
    <div className="t16-root">
      {/* Delicate Outer Linear Margin Accent */}
      <div className="t16-outer-border"></div>

      {/* Intricate Corner Flourish Marks */}
      <div className="t16-corner tl">
        <svg viewBox="0 0 24 24" className="t16-corner-svg"><path d="M0,0 C8,0 12,4 12,12 C4,12 0,8 0,0 Z M12,12 C16,16 24,24 24,24" /></svg>
      </div>
      <div className="t16-corner tr">
        <svg viewBox="0 0 24 24" className="t16-corner-svg scale-x-inv"><path d="M0,0 C8,0 12,4 12,12 C4,12 0,8 0,0 Z M12,12 C16,16 24,24 24,24" /></svg>
      </div>

      {/* Styled Heading Titles */}
      <div className="t16-header">
        <h1 className="t16-title">
          Breakfast <br /> & Snacks
        </h1>
        <div className="t16-subtitle-row">
          <span className="t16-ornament-text">❧</span>
          <div className="t16-line"></div>
          <span className="t16-ornament-text">☙</span>
        </div>
      </div>

      {/* Transcribed Horizontal Circle Row with labels */}
      <div className="t16-icons-row">
        {categoryIcons.map((item, idx) => (
          <div key={idx} className="t16-icon-wrap">
            <div className="t16-icon-circle">
              <svg viewBox="0 0 100 100" className="t16-icon-svg">{item.path}</svg>
            </div>
            <span className="t16-icon-label">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Baroque Center Divider */}
      <div className="t16-center-divider">
        <svg viewBox="0 0 100 20" className="t16-divider-svg">
          <path d="M50,10 C40,0 20,0 10,10 C20,20 40,20 50,10 Z M50,10 C60,0 80,0 90,10 C80,20 60,20 50,10 Z" />
          <circle cx="50" cy="10" r="3" />
        </svg>
      </div>

      {/* Light Bites Block Banner */}
      <div className="t16-banner-row">
        <div className="t16-banner-stars">❖ ❖</div>
        <div className="t16-banner-box">Light Bites</div>
        <div className="t16-banner-stars">❖ ❖</div>
      </div>

      {/* 3 Columns x 2 Rows Product Structure */}
      <div className="t16-grid">
        {itemsToDisplay.map((item, idx) => (
          <div key={idx} className="t16-card">
            {/* Fine Arched Border Image Silhouette Container */}
            <div className="t16-card-img-wrap">
              <img src={item.img} alt={item.name} className="t16-card-img" />
            </div>
            
            {/* Price Tags Lineup */}
            <div className="t16-card-price-row">
              <span className="t16-card-kone">Kone</span>
              <span className="t16-card-price">{item.price}</span>
            </div>

            <h3 className="t16-card-title">{item.name}</h3>
            
            <p className="t16-card-desc">
              Somlr cheptiroren with a sireral creat dga seram chapis,
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Template16_BreakfastSnacks;
