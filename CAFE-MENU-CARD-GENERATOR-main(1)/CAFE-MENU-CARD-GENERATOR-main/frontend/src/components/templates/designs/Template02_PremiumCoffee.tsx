import React from 'react';
import { getItemImage } from '../imageHelper';
import './Template02_PremiumCoffee.css';
import { TemplateProps, TemplateMeta } from '../registry';

export const templateMeta: TemplateMeta = {
  id: 2,
  name: 'Premium Dark & Gold',
  orientation: 'portrait',
  aspectRatio: '9:16',
  width: 794,
  height: 1123,
};

// Luxury Top Crest / Crown Motif
const LuxuryCrest = () => (
  <svg className="t02-crest" viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M 10 25 C 30 25, 40 10, 50 5 C 60 10, 70 25, 90 25 M 50 5 V 25 M 35 18 H 65"
      stroke="#D4AF37"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="50" cy="4" r="1.5" fill="#D4AF37" />
  </svg>
);

export default function Template02_PremiumCoffee({ data }: TemplateProps) {
  return (
    <div className="t02-root">
      {/* Gold Borders */}
      <div className="t02-gold-frame" />
      <div className="t02-gold-inner-frame" />

      {/* Content Area */}
      <div className="t02-content">
        <header className="t02-header">
          <LuxuryCrest />
          <h1 className="t02-title">
            {data.cafeName || 'Coffee House'}
          </h1>
          <p className="t02-subtitle">PREMIUM MENU</p>
        </header>

        {/* Dynamic Categories */}
        <div className="t02-menu-container">
          {data.categories.map((category) => {
            if (!category.items || category.items.length === 0) return null;
            return (
              <div key={category.id} className="t02-category-section">
                <h2 className="t02-category-title">{category.name}</h2>
                <div className="t02-title-divider" />

                <div className="t02-items-grid">
                  {category.items.map((item) => (
                    <div key={item.id} className="t02-item-card">
                      <div className="t02-item-body">
                        <div className="t02-item-text">
                          <div className="t02-item-header">
                            <span className="t02-item-name">{item.item_name}</span>
                            <div className="t02-item-connector" />
                            <span className="t02-item-price">₹{item.price}</span>
                          </div>
                          <p className="t02-item-desc">
                            Select reserve quality ingredients, prepared precisely by our master team.
                          </p>
                        </div>
                        <img src={getItemImage(item.item_name, category.name)} alt={item.item_name} className="t02-item-image" />
                      </div>
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
