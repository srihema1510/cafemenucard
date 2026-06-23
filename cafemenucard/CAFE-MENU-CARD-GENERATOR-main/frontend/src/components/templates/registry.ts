export interface MenuData {
  cafeName: string;
  coverImage?: string;
  categories: Array<{
    id: number;
    name: string;
    items: Array<{
      id: number;
      item_name: string;
      price: number;
    }>;
  }>;
}

export interface TemplateProps {
  data: MenuData;
  isExporting?: boolean;
}

export interface TemplateMeta {
  id: number;
  name: string;
  orientation: 'portrait' | 'landscape';
  aspectRatio: '9:16' | '16:9';
  width: number;
  height: number;
  category?: string;
}

/* IMPORTS */



import Template13_Homepage, { templateMeta as meta13 } from './designs/Template13_Homepage';
import Template14_Beverages, { templateMeta as meta14 } from './designs/Template14_Beverages';
import Template15_CoffeeMenu, { templateMeta as meta15 } from './designs/Template15_CoffeeMenu';
import Template16_BreakfastSnacks, { templateMeta as meta16 } from './designs/Template16_BreakfastSnacks';
import Template17_Desserts, { templateMeta as meta17 } from './designs/Template17_Desserts';
import Template18_DessertsLandscape, { templateMeta as meta18 } from './designs/Template18_DessertsLandscape';
import Template19_BreakfastSnacksLandscape, { templateMeta as meta19 } from './designs/Template19_BreakfastSnacksLandscape';
import Template20_CoffeeMenuLandscape, { templateMeta as meta20 } from './designs/Template20_CoffeeMenuLandscape';
import Template21_BeveragesLandscape, { templateMeta as meta21 } from './designs/Template21_BeveragesLandscape';
import Template22_HomepageLandscape, { templateMeta as meta22 } from './designs/Template22_HomepageLandscape';

export const baseTemplates = [


  { meta: meta13, component: Template13_Homepage },
  { meta: meta14, component: Template14_Beverages },
  { meta: meta15, component: Template15_CoffeeMenu },
  { meta: meta16, component: Template16_BreakfastSnacks },
  { meta: meta17, component: Template17_Desserts },
  { meta: meta18, component: Template18_DessertsLandscape },
  { meta: meta19, component: Template19_BreakfastSnacksLandscape },
  { meta: meta20, component: Template20_CoffeeMenuLandscape },
  { meta: meta21, component: Template21_BeveragesLandscape },
  { meta: meta22, component: Template22_HomepageLandscape },
];