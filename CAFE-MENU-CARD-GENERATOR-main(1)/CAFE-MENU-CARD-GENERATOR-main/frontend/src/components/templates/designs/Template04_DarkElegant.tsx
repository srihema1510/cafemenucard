import React from 'react';
import { getItemImage } from '../imageHelper';
import './Template04_DarkElegant.css';
import { TemplateProps, TemplateMeta } from '../registry';

export const templateMeta: TemplateMeta = {
  id: 4,
  name: 'Royal Emerald & Brass',
  orientation: 'portrait',
  aspectRatio: '9:16',
  width: 794,
  height: 1123,
};

// Royal Crest Ornament
const RoyalCrest = () => (
  <svg className="t04-crest" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M 20 20 Q 50 5, 80 20 M 35 15 C 42 10, 58 10, 65 15 M 50 10 V 30"
      stroke="#D4AF37"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <polygon points="50,4 53,10 47,10" fill="#D4AF37" />
  </svg>
);

export default function Template04_DarkElegant({ data }: TemplateProps) {
  return (
    <div className="t04-root">
      {/* Brass Frame Borders */}
      <div className="t04-brass-frame" />
      <div className="t04-brass-inner" />

      {/* Main Content */}
      <div className="t04-content">
        <header className="t04-header">
          <RoyalCrest />
          <h1 className="t04-title">
            {data.cafeName || 'Coffee House'}
          </h1>
          <p className="t04-subtitle">EXQUISITE SELECTION</p>
        </header>

        {/* Dynamic Categories */}
        <div className="t04-sections-wrap">
          {data.categories.map((category) => {
            if (!category.items || category.items.length === 0) return null;
            return (
              <div key={category.id} className="t04-category-block">
                <h2 className="t04-category-name">{category.name}</h2>
                <div className="t04-category-bar" />

                <div className="t04-items-list">
                  {category.items.map((item) => (
                    <div key={item.id} className="t04-item-tile">
                      <div className="t04-item-text">
                        <div className="t04-item-line1">
                          <span className="t04-item-title">{item.item_name}</span>
                          <div className="t04-item-connector" />
                          <span className="t04-item-price">₹{item.price}</span>
                        </div>
                        <p className="t04-item-desc">
                          A curated house speciality prepared fresh and finished with custom garnishes.
                        </p>
                      </div>
                      <img src={getItemImage(item.item_name, category.name)} alt={item.item_name} className="t04-item-image" />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
