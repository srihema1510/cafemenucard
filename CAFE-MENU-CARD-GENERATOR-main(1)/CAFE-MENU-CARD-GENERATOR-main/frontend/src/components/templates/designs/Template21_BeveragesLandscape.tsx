import React from 'react';
import { TemplateProps, TemplateMeta } from '../registry';
import './Template21_BeveragesLandscape.css';

export const templateMeta: TemplateMeta = {
  id: 21,
  name: 'Non Coffee Menu Landscape',
  orientation: 'landscape',
  aspectRatio: '16:9',
  width: 1920,
  height: 1080,
  category: 'menu'
};

const ScrollCornerFlourish = ({ corner, size }: any) => {
  const rotation = corner === 'top-left' ? 0 :
                   corner === 'top-right' ? 90 :
                   corner === 'bottom-right' ? 180 : 270;
  return (
    <div style={{ width: size, height: size, transform: `rotate(${rotation}deg)` }}>
      <svg viewBox="0 0 100 100" fill="none">
         <path d="M 10,30 C 50,30 70,50 70,90" stroke="#6b3410" strokeWidth="2.5" fill="none" />
         <path d="M 30,10 C 30,50 50,70 90,70" stroke="#6b3410" strokeWidth="2.5" fill="none" />
         <circle cx="20" cy="20" r="3" fill="#6b3410" />
      </svg>
    </div>
  );
};

const WideSwirlFlourish = ({ width }: any) => (
  <svg width={width} height="40" viewBox={`0 0 ${width} 40`} fill="none">
    <path d={`M10 20 Q ${width/4} 0 ${width/2} 20 T ${width-10} 20`} stroke="#5c2a0a" strokeWidth="1.5" fill="none"/>
    <circle cx={width/2} cy="20" r="3" fill="#5c2a0a"/>
  </svg>
);

const RibbonBanner = ({ text, width, height, fontSize }: any) => (
  <div style={{ position: 'relative', width, height, background: '#6b3410', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize, letterSpacing: '4px', fontWeight: 'bold' }}>
    <div style={{ position: 'absolute', left: -20, top: 10, bottom: 10, width: 20, background: '#4a230b', clipPath: 'polygon(100% 0, 100% 100%, 0 50%)' }} />
    <div style={{ position: 'absolute', right: -20, top: 10, bottom: 10, width: 20, background: '#4a230b', clipPath: 'polygon(0 0, 0 100%, 100% 50%)' }} />
    {text}
  </div>
);

const PhotoPlaceholder = ({ ratio, gradient, icon, radius, className }: any) => {
  const [w, h] = ratio.split('/').map(Number);
  return (
    <div className={className} style={{ aspectRatio: `${w}/${h}`, background: gradient, borderRadius: radius ? `${radius}px` : '0px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', width: '100%', height: '100%' }}>
      {icon}
    </div>
  );
};

const GoldCornerBracket = ({ corner = 'top-left', size = 34, color = '#b8862f' }: { corner?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right', size?: number, color?: string }) => {
  const rotationMap: Record<string, number> = {
    'top-left': 0,
    'top-right': 90,
    'bottom-right': 180,
    'bottom-left': 270,
  };
  const rotation = rotationMap[corner] || 0;
 
  return (
    <svg width={size} height={size} viewBox="0 0 34 34" fill="none" style={{ transform: `rotate(${rotation}deg)` }}>
      <g stroke={color} strokeWidth="1.6" fill="none">
        <path d="M2 14 L2 2 L14 2" />
        <path d="M2 18 C 26 26, 10 28, 14 22 C 16 18, 12 15, 9 18 C 7 20, 10 23, 13 21" />
        <path d="M18 2 C 26 2, 28 10, 22 14 C 18 16, 15 12, 18 9 C 20 7, 23 10, 21 13" />
      </g>
      <circle cx="6" cy="6" r="1.6" fill={color} stroke="none" />
    </svg>
  );
};

const BeverageCard = ({ title, description, price, glassGradient, imageUrl }: any) => {
  return (
    <div className="t21-beverage-card">
      <div className="t21-beverage-card__corner tl"><GoldCornerBracket corner="top-left" /></div>
      <div className="t21-beverage-card__corner tr"><GoldCornerBracket corner="top-right" /></div>
      <div className="t21-beverage-card__corner bl"><GoldCornerBracket corner="bottom-left" /></div>
      <div className="t21-beverage-card__corner br"><GoldCornerBracket corner="bottom-right" /></div>
 
      {imageUrl ? (
        <div className="t21-beverage-card__img">
          <img src={imageUrl} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      ) : (
        <PhotoPlaceholder
          ratio="3/4"
          gradient={glassGradient}
          icon="🥤"
          radius={0}
          className="t21-beverage-card__img"
        />
      )}
      <h3 className="t21-beverage-card__title">{title}</h3>
      <p className="t21-beverage-card__desc">{description}</p>
      <div className="t21-beverage-card__price">{price}</div>
    </div>
  );
};

const swatchColors = ['#c79a4b', '#a5562c', '#a9805a', '#5c3a22', '#7a4a28'];
 
const defaultBeverages = [
  {
    title: 'Matcha Latte',
    description: 'Stone-ground green tea whisked with steamed milk.',
    price: '$3.50',
    glassGradient: 'linear-gradient(180deg,#e8e2c8,#9fae6b 70%,#6f8a44)',
    imageUrl: '/t14_matcha.jpg',
  },
  {
    title: 'Hot Chocolate',
    description: 'Melted dark chocolate with steamed milk and whipped cream.',
    price: '$3.80',
    glassGradient: 'linear-gradient(180deg,#caa874,#5c3a22 60%,#3b2414)',
    imageUrl: '/t14_hot_chocolate.jpg',
  },
  {
    title: 'Iced Tea',
    description: 'Black tea over ice, brewed strong and lightly sweetened.',
    price: '$2.90',
    glassGradient: 'linear-gradient(180deg,#cf8a4a,#8a4a1f 70%,#5c2a0a)',
    imageUrl: '/t14_iced_tea.jpg',
  },
  {
    title: 'Fruit Tea',
    description: 'Citrus and green tea blend, served chilled with orange.',
    price: '$3.20',
    glassGradient: 'linear-gradient(180deg,#cfe06a,#8aa83a 70%,#5c7a1f)',
    imageUrl: '/t14_fruit_tea.jpg',
  },
  {
    title: 'Iced Berry Tea',
    description: 'Hibiscus and berry tea over ice with a twist of lime.',
    price: '$3.30',
    glassGradient: 'linear-gradient(180deg,#e8703a,#b8431f 70%,#7a2a0f)',
    imageUrl: '/t14_berry_tea.jpg',
  },
  {
    title: 'Milkshake',
    description: 'Creamy vanilla shake topped with cocoa dust.',
    price: '$3.90',
    glassGradient: 'linear-gradient(180deg,#e8d9bd,#caa874 70%,#8a5a2b)',
    imageUrl: '/t14_milkshake.jpg',
  },
];

const Template21_BeveragesLandscape: React.FC<TemplateProps> = ({ data }) => {
  let itemsToDisplay = defaultBeverages;
  if (data.categories && data.categories.length > 0) {
    const nonCoffeeCat = data.categories.find((c: any) => c.name.toLowerCase().includes('non') || c.name.toLowerCase().includes('beverage')) || data.categories[data.categories.length - 1];
    if (nonCoffeeCat && nonCoffeeCat.items && nonCoffeeCat.items.length > 0) {
      itemsToDisplay = nonCoffeeCat.items.slice(0, 6).map((item: any, i: number) => ({
        title: item.name || item.item_name,
        description: item.description || 'Refreshing beverage',
        price: item.price,
        glassGradient: defaultBeverages[i % defaultBeverages.length].glassGradient,
        imageUrl: item.image_url || defaultBeverages[i % defaultBeverages.length].imageUrl
      }));
    }
  }

  return (
    <div className="t21-page">
      <div className="t21-border-outer" />
      <div className="t21-corner tl"><ScrollCornerFlourish corner="top-left" size={80} /></div>
      <div className="t21-corner tr"><ScrollCornerFlourish corner="top-right" size={80} /></div>
      <div className="t21-corner bl"><ScrollCornerFlourish corner="bottom-left" size={80} /></div>
      <div className="t21-corner br"><ScrollCornerFlourish corner="bottom-right" size={80} /></div>
 
      <div className="t21-content">
        <div className="t21-left">
          <h1 className="t21-title">Non Coffee</h1>
          <div className="t21-subtitle-row">
            <span className="t21-dash" />
            <span className="t21-subtitle-text">MENU</span>
            <span className="t21-dash" />
          </div>
  
          <div className="t21-flourish-wrap">
            <WideSwirlFlourish width={280} />
          </div>
  
          <div className="t21-rule-row">
            <span className="t21-line" />
            <svg width="50" height="20" viewBox="0 0 50 20" fill="none">
              <g stroke="#5c2a0a" strokeWidth="1.4" fill="none">
                <circle cx="6" cy="10" r="4" />
                <circle cx="44" cy="10" r="4" />
                <path d="M14 10 C 18 4, 24 4, 25 10 C 26 4, 32 4, 36 10" />
              </g>
            </svg>
            <span className="t21-line" />
          </div>
  
          <div className="t21-swatches-row">
            {swatchColors.map((c, i) => (
              <div key={i} className="t21-swatch" style={{ background: c }} />
            ))}
          </div>
  
          <div className="t21-dots-row">
            <span className="t21-dot" style={{ background: '#a5562c' }} />
            <span className="t21-dot" style={{ background: '#7a4a28' }} />
            <span className="t21-dot" style={{ background: '#c79a4b' }} />
            <svg width="60" height="16" viewBox="0 0 60 16" fill="none">
              <path d="M2 8 C 16 2, 24 14, 30 8 C 36 2, 44 14, 58 8" stroke="#6b3410" strokeWidth="1.2" fill="none" />
            </svg>
            <span className="t21-dot" style={{ background: '#c79a4b' }} />
            <span className="t21-dot" style={{ background: '#7a4a28' }} />
            <span className="t21-dot" style={{ background: '#a5562c' }} />
          </div>
  
          <div className="t21-ribbon-wrap">
            <svg width="28" height="28" viewBox="0 0 34 34" fill="none">
              <g stroke="#5c2a0a" strokeWidth="1.4" fill="none">
                <path d="M28 6 C 18 2, 10 10, 16 18 C 10 16, 4 22, 8 28" />
                <circle cx="26" cy="10" r="2" fill="#5c2a0a" stroke="none" />
              </g>
            </svg>
            <RibbonBanner text="BEVERAGES" width={220} height={46} fontSize={18} />
            <svg width="28" height="28" viewBox="0 0 34 34" fill="none" style={{ transform: 'scaleX(-1)' }}>
              <g stroke="#5c2a0a" strokeWidth="1.4" fill="none">
                <path d="M28 6 C 18 2, 10 10, 16 18 C 10 16, 4 22, 8 28" />
                <circle cx="26" cy="10" r="2" fill="#5c2a0a" stroke="none" />
              </g>
            </svg>
          </div>
        </div>
        
        <div className="t21-right">
          <div className="t21-grid">
            {itemsToDisplay.map((b, idx) => (
              <BeverageCard key={idx} {...b} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default Template21_BeveragesLandscape;
