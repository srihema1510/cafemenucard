import React from 'react';
import { TemplateProps, TemplateMeta } from '../registry';
import './Template18_DessertsLandscape.css';

export const templateMeta: TemplateMeta = {
  id: 18,
  name: 'Desserts Landscape',
  orientation: 'landscape',
  aspectRatio: '16:9',
  width: 1920,
  height: 1080,
  category: 'menu'
};

const topTextItems = [
  { title: 'Choestate catte', sub: 'Betecrp bids', text: 'Ersioy lnadags idccok baskce. Bawnstey 1975' },
  { title: 'Dóeculate Solke', sub: 'Description', text: 'Eofber ice land Tatk Ghiashey. Baumetey 1975' },
  { title: 'Tirssui', sub: 'Brownies', text: 'Colbee les tanje Thaut baolefs, Beymatey 1975' }
];

const defaultItems = [
  { name: 'Cheesad eđus', price: '$705.05', img: '/t17_cheesecake.jpg' },
  { name: 'Tunra sprese', price: '$905.05', img: '/t17_cake1.jpg' },
  { name: 'Tinuce amiples', price: '$905.06', img: '/t17_pastry.jpg' },
  { name: 'Troisset outrics', price: '$903.01', img: '/t17_dessert1.jpg' },
  { name: 'Krouth ciiras', price: '$555.09', img: '/t17_cake2.jpg' },
  { name: 'Eartlyniukintevies', price: '$903.05', img: '/t17_cookies.jpg' }
];

const Template18_DessertsLandscape: React.FC<TemplateProps> = ({ data }) => {
  let itemsToDisplay = defaultItems;
  if (data.categories && data.categories.length > 0) {
    const defaultCat = data.categories.find((c: any) => c.name.toLowerCase().includes('dessert') || c.name.toLowerCase().includes('sweet')) || data.categories[0];
    if (defaultCat && defaultCat.items && defaultCat.items.length > 0) {
      itemsToDisplay = defaultCat.items.slice(0, 6).map((item: any, i: number) => ({
        name: item.name || item.item_name,
        price: typeof item.price === 'number' ? item.price.toFixed(2) : item.price,
        img: item.image_url || defaultItems[i % defaultItems.length].img
      }));
    }
  }

  return (
    <div className="t18-root">
      {/* Borders */}
      <div className="t18-outer-border-2"></div>
      <div className="t18-outer-border-1"></div>

      {/* Corners */}
      <div className="t18-corner tl">
        <svg viewBox="0 0 100 100" fill="currentColor" className="t18-corner-svg"><circle cx="50" cy="50" r="30" /><path d="M50,0 L50,100 M0,50 L100,50 M15,15 L85,85 M15,85 L85,15" stroke="currentColor" strokeWidth="6" /></svg>
      </div>
      <div className="t18-corner tr">
        <svg viewBox="0 0 100 100" fill="currentColor" className="t18-corner-svg"><circle cx="50" cy="50" r="30" /><path d="M50,0 L50,100 M0,50 L100,50 M15,15 L85,85 M15,85 L85,15" stroke="currentColor" strokeWidth="6" /></svg>
      </div>
      <div className="t18-corner bl">
        <svg viewBox="0 0 100 100" fill="currentColor" className="t18-corner-svg"><circle cx="50" cy="50" r="30" /><path d="M50,0 L50,100 M0,50 L100,50 M15,15 L85,85 M15,85 L85,15" stroke="currentColor" strokeWidth="6" /></svg>
      </div>
      <div className="t18-corner br">
        <svg viewBox="0 0 100 100" fill="currentColor" className="t18-corner-svg"><circle cx="50" cy="50" r="30" /><path d="M50,0 L50,100 M0,50 L100,50 M15,15 L85,85 M15,85 L85,15" stroke="currentColor" strokeWidth="6" /></svg>
      </div>

      <div className="t18-content-wrap">
        <div className="t18-left">
          {/* Header */}
          <div className="t18-header">
            <h1 className="t18-title">Desserts</h1>
            <div className="t18-subtitle-row">
              <span className="t18-subtitle-line"></span>
              tasses
              <span className="t18-subtitle-line"></span>
            </div>
          </div>

          {/* Icons */}
          <div className="t18-icons-row">
            {[
              <path d="M35,30 C35,20 65,20 65,30 V50 H35 Z M50,50 V75 M40,75 H60" />,
              <path d="M40,25 L60,25 L50,75 Z" />,
              <React.Fragment><circle cx="50" cy="40" r="15" /><path d="M50,55 V75 M45,75 H55" /></React.Fragment>,
              <path d="M30,30 L70,30 L50,75 Z" />,
              <path d="M35,35 H65 V65 H35 Z M45,35 V25 M55,35 V25" />
            ].map((svgPath, idx) => (
              <div key={idx} className="t18-icon-circle">
                <svg viewBox="0 0 100 100" className="t18-icon-svg">{svgPath}</svg>
              </div>
            ))}
          </div>

          {/* Top Text Grid (Now Vertical) */}
          <div className="t18-top-text-grid">
            {topTextItems.map((item, idx) => (
              <div key={idx} className={`t18-top-text-col ${idx !== 2 ? 'border-b' : ''}`}>
                <div>
                  <h4 className="t18-top-text-title">{item.title}</h4>
                  <span className="t18-top-text-sub">{item.sub}</span>
                </div>
                <p className="t18-top-text-desc">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="t18-right">
          {/* Menu Banner */}
          <div className="t18-menu-banner-wrap">
            <h2 className="t18-elegant-banner">
              <span className="t18-banner-ornament">❦</span>
              Sweet Delights
              <span className="t18-banner-ornament">❧</span>
            </h2>
          </div>

          {/* Grid */}
          <div className="t18-grid">
            {itemsToDisplay.map((item, idx) => (
              <div key={idx} className="t18-card">
                <div className="t18-card-img-wrap">
                  <div className="t18-img-bracket tl"></div>
                  <div className="t18-img-bracket tr"></div>
                  <div className="t18-img-bracket bl"></div>
                  <div className="t18-img-bracket br"></div>
                  <img src={item.img} alt={item.name} className="t18-card-img" />
                </div>
                <h3 className="t18-card-title">{item.name}</h3>
                <p className="t18-card-desc">Colttee frest oet estient cgetfeet eryseuy sollaber det dosents, ecortih meat.</p>
                <span className="t18-card-price">${item.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template18_DessertsLandscape;
