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

import Template01_VintageCoffee, { templateMeta as meta01 } from './designs/Template01_VintageCoffee';
import Template02_PremiumCoffee, { templateMeta as meta02 } from './designs/Template02_PremiumCoffee';
import Template04_DarkElegant, { templateMeta as meta04 } from './designs/Template04_DarkElegant';
import Template05_VintageCafe, { templateMeta as meta05 } from './designs/Template05_VintageCafe';
import Template06_ArchitectureInspired, { templateMeta as meta06 } from './designs/Template06_ArchitectureInspired';
import Template07_RestaurantPremium, { templateMeta as meta07 } from './designs/Template07_RestaurantPremium';
import Template08_ModernTypography, { templateMeta as meta08 } from './designs/Template08_ModernTypography';
import Template09_CreativeBoard, { templateMeta as meta09 } from './designs/Template09_CreativeBoard';
import Template10_MinimalLuxury, { templateMeta as meta10 } from './designs/Template10_MinimalLuxury';
import Template11_CoffeeBranding, { templateMeta as meta11 } from './designs/Template11_CoffeeBranding';
import Template12_SwanAndInk, { templateMeta as meta12 } from './designs/Template12_SwanAndInk';
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
  { meta: meta01, component: Template01_VintageCoffee },
  { meta: meta02, component: Template02_PremiumCoffee },
  { meta: meta04, component: Template04_DarkElegant },
  { meta: meta05, component: Template05_VintageCafe },
  { meta: meta06, component: Template06_ArchitectureInspired },
  { meta: meta07, component: Template07_RestaurantPremium },
  { meta: meta08, component: Template08_ModernTypography },
  { meta: meta09, component: Template09_CreativeBoard },
  { meta: meta10, component: Template10_MinimalLuxury },
  { meta: meta11, component: Template11_CoffeeBranding },
  { meta: meta12, component: Template12_SwanAndInk },
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