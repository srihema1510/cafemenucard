// Helper to get high-fidelity food & beverage images based on item name and category keywords
export function getItemImage(itemName: string, categoryName: string): string {
  const name = itemName.toLowerCase();
  const cat = categoryName.toLowerCase();

  // Coffee & Espresso
  if (name.includes('espresso')) {
    return 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=300&auto=format&fit=crop';
  }
  if (name.includes('cappuccino') || name.includes('capcucino')) {
    return 'https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=300&auto=format&fit=crop';
  }
  if (name.includes('latte') || name.includes('flat white')) {
    return 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=300&auto=format&fit=crop';
  }
  if (name.includes('macchiato') || name.includes('maxchato') || name.includes('mcchiato')) {
    return 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?q=80&w=300&auto=format&fit=crop';
  }
  if (name.includes('americano') || name.includes('black coffee')) {
    return 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=300&auto=format&fit=crop';
  }
  if (name.includes('mocha') || name.includes('mochaccino')) {
    return 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=300&auto=format&fit=crop';
  }
  if (name.includes('iced coffee') || name.includes('cold brew')) {
    return 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=300&auto=format&fit=crop';
  }

  // Tea
  if (name.includes('matcha') || name.includes('green tea')) {
    return 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=300&auto=format&fit=crop';
  }
  if (name.includes('iced tea') || name.includes('peach tea') || name.includes('fruit tea')) {
    return 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?q=80&w=300&auto=format&fit=crop';
  }
  if (name.includes('tea') || name.includes('chai') || name.includes('herbal')) {
    return 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=300&auto=format&fit=crop';
  }

  // Hot Chocolate / Shakes
  if (name.includes('chocolate') || name.includes('cocoa')) {
    return 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=300&auto=format&fit=crop';
  }
  if (name.includes('shake') || name.includes('smoothie')) {
    return 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=300&auto=format&fit=crop';
  }

  // Cakes & Desserts
  if (name.includes('cheesecake') || name.includes('cheese cake')) {
    return 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=300&auto=format&fit=crop';
  }
  if (name.includes('chocolate cake') || name.includes('brownie') || name.includes('fudge')) {
    return 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=300&auto=format&fit=crop';
  }
  if (name.includes('cupcake') || name.includes('muffin')) {
    return 'https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=300&auto=format&fit=crop';
  }
  if (name.includes('pastry') || name.includes('croissant') || name.includes('scone')) {
    return 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=300&auto=format&fit=crop';
  }
  if (name.includes('pancake') || name.includes('waffle')) {
    return 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=300&auto=format&fit=crop';
  }

  // Snacks & Food
  if (name.includes('sandwich') || name.includes('toast') || name.includes('bagel')) {
    return 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?q=80&w=300&auto=format&fit=crop';
  }
  if (name.includes('burger') || name.includes('fries')) {
    return 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=300&auto=format&fit=crop';
  }
  if (name.includes('pizza') || name.includes('pasta')) {
    return 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=300&auto=format&fit=crop';
  }

  // General Categories
  if (cat.includes('coffee')) {
    return 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=300&auto=format&fit=crop';
  }
  if (cat.includes('tea')) {
    return 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?q=80&w=300&auto=format&fit=crop';
  }
  if (cat.includes('dessert') || cat.includes('sweet') || cat.includes('cake')) {
    return 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=300&auto=format&fit=crop';
  }
  if (cat.includes('snack') || cat.includes('bite') || cat.includes('food')) {
    return 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=300&auto=format&fit=crop';
  }

  // Default fallback
  return 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?q=80&w=300&auto=format&fit=crop';
}
