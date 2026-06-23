import React from 'react';
import { TemplateProps, TemplateMeta } from '../registry';
import './Template17_Desserts.css';

export const templateMeta: TemplateMeta = {
  id: 17,
  name: 'Desserts',
  orientation: 'portrait',
  aspectRatio: '9:16',
  width: 1080,
  height: 1920,
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

const Template17_Desserts: React.FC<TemplateProps> = ({ data }) => {
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
    <div className="t17-root">
      {/* Ornate Frame Border Assemblies */}
      <div className="t17-outer-border-2"></div>
      <div className="t17-outer-border-1"></div>

      {/* Top Left / Right Corner Accent Medallion Graphics */}
      <div className="t17-corner tl">
        <svg viewBox="0 0 100 100" fill="currentColor" className="t17-corner-svg"><circle cx="50" cy="50" r="30" /><path d="M50,0 L50,100 M0,50 L100,50 M15,15 L85,85 M15,85 L85,15" stroke="currentColor" strokeWidth="6" /></svg>
      </div>
      <div className="t17-corner tr">
        <svg viewBox="0 0 100 100" fill="currentColor" className="t17-corner-svg"><circle cx="50" cy="50" r="30" /><path d="M50,0 L50,100 M0,50 L100,50 M15,15 L85,85 M15,85 L85,15" stroke="currentColor" strokeWidth="6" /></svg>
      </div>

      {/* Main Title Banner Display */}
      <div className="t17-header">
        <h1 className="t17-title">{data.cafeName || 'Desserts'}</h1>
        <div className="t17-subtitle-row">
          <span className="t17-subtitle-line"></span>
          tasses
          <span className="t17-subtitle-line"></span>
        </div>
      </div>

      {/* Circle Utensil Icon Group */}
      <div className="t17-icons-row">
        {[
          <path d="M35,30 C35,20 65,20 65,30 V50 H35 Z M50,50 V75 M40,75 H60" />,
          <path d="M40,25 L60,25 L50,75 Z" />,
          <React.Fragment><circle cx="50" cy="40" r="15" /><path d="M50,55 V75 M45,75 H55" /></React.Fragment>,
          <path d="M30,30 L70,30 L50,75 Z" />,
          <path d="M35,35 H65 V65 H35 Z M45,35 V25 M55,35 V25" />
        ].map((svgPath, idx) => (
          <div key={idx} className="t17-icon-circle">
            <svg viewBox="0 0 100 100" className="t17-icon-svg">{svgPath}</svg>
          </div>
        ))}
      </div>

      {/* Detailed Dotted Multi-Column Row Assembly */}
      <div className="t17-top-text-grid">
        {topTextItems.map((item, idx) => (
          <div key={idx} className={`t17-top-text-col ${idx !== 2 ? 'border-r' : ''}`}>
            <div>
              <h4 className="t17-top-text-title">{item.title}</h4>
              <span className="t17-top-text-sub">{item.sub}</span>
            </div>
            <p className="t17-top-text-desc">{item.text}</p>
          </div>
        ))}
      </div>

      {/* Wide Center Menu Block Motif */}
      <div className="t17-menu-banner-wrap">
        <div className="t17-menu-banner">
          <div className="t17-menu-banner-edge left"></div>
          <div className="t17-menu-banner-edge right"></div>
          Menu
        </div>
      </div>

      {/* Beautiful Baroque Frame Grid View */}
      <div className="t17-grid">
        {itemsToDisplay.map((item, idx) => (
          <div key={idx} className="t17-card">
            {/* Symmetrical Ornate Picture Framing Treatment */}
            <div className="t17-card-img-wrap">
              {/* Corner Bracket Accents */}
              <div className="t17-img-bracket tl"></div>
              <div className="t17-img-bracket tr"></div>
              <div className="t17-img-bracket bl"></div>
              <div className="t17-img-bracket br"></div>
              
              <img src={item.img} alt={item.name} className="t17-card-img" />
            </div>

            <h3 className="t17-card-title">
              {item.name}
            </h3>

            <p className="t17-card-desc">
              Colttee frest oet estient cgetfeet eryseuy sollaber det dosents, ecortih meat.
            </p>

            <span className="t17-card-price">
              ${item.price}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Template17_Desserts;
