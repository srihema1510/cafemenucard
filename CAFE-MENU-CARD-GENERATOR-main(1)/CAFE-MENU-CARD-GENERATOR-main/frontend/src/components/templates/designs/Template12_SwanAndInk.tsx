import React from 'react';
import { getItemImage } from '../imageHelper';
import './Template12_SwanAndInk.css';
import { TemplateProps, TemplateMeta } from '../registry';

export const templateMeta: TemplateMeta = {
  id: 12,
  name: 'Swan & Ink',
  orientation: 'portrait',
  aspectRatio: '9:16',
  width: 794,
  height: 1123,
};

const Sparkle = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0L13.5 8.5L22 10L13.5 11.5L12 20L10.5 11.5L2 10L10.5 8.5L12 0Z" fill="#C4A47C"/>
  </svg>
);

const CategoryIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21.5C7.5 21.5 3.5 17.5 3.5 12.5C3.5 7.5 8 3.5 12 2C16 3.5 20.5 7.5 20.5 12.5C20.5 17.5 16.5 21.5 12 21.5Z" fill="#D8C3B1" />
    <path d="M12 19.5C8.5 19.5 5.5 16.5 5.5 12.5C5.5 8.5 8.5 5.5 12 4C15.5 5.5 18.5 8.5 18.5 12.5C18.5 16.5 15.5 19.5 12 19.5Z" fill="#F8F3ED" />
    <path d="M12 6C10.5 7.5 9 9.5 9 12.5C9 14.5 10.5 16 12 16C13.5 16 15 14.5 15 12.5C15 9.5 13.5 7.5 12 6Z" fill="#A48C7B" />
  </svg>
);

export default function Template12_SwanAndInk({ data }: TemplateProps) {
  return (
    <div className="t12-root">
      <div className="t12-bg-overlay"></div>

      <div className="t12-content">
        <header className="t12-header">
          <Sparkle className="t12-sparkle t12-sparkle-1" />
          <Sparkle className="t12-sparkle t12-sparkle-2" />
          <h1 className="t12-title">
            {data.cafeName ? (
              data.cafeName
            ) : (
              <>
                Swan<br />
                <span className="t12-title-offset">& Ink</span>
              </>
            )}
          </h1>
          <p className="t12-subtitle">WHERE COFFEE MEETS POETRY</p>
        </header>

        <div className="t12-menu-sections">
          {data.categories.map((category) => {
            if (!category.items || category.items.length === 0) return null;
            return (
              <div key={category.id} className="t12-section">
                <div className="t12-section-title-wrapper">
                  <CategoryIcon />
                  <h2 className="t12-section-title">{category.name.toUpperCase()}</h2>
                </div>
                <div className="t12-items-list">
                  {category.items.map((item) => (
                    <div key={item.id} className="t12-item-card">
                      <img 
                        src={getItemImage(item.item_name, category.name)} 
                        alt={item.item_name} 
                        className="t12-item-image" 
                      />
                      <div className="t12-item-text">
                        <span className="t12-item-name">{item.item_name}</span>
                        <div className="t12-item-connector" />
                        <span className="t12-item-price">{Number(item.price).toFixed(2)}</span>
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
