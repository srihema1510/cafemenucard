export interface CafeInfo {
  id: number;
  cafe_name: string;
  updated_at: string;
}

export interface MenuItem {
  id: number;
  template_id: number;
  category_id: number;
  item_name: string;
  price: number;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface Category {
  id: number;
  template_id: number;
  name: string;
  display_order: number;
  created_at?: string;
  updated_at?: string;
  items?: MenuItem[];
}

export interface MenuData {
  cafeName: string;
  categories: Category[];
}
