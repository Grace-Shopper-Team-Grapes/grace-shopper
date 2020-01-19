module.exports = [
  {
    // Red Wine, in stock and published
    name: 'Cabernet Sauvignon',
    slug: 'cabernet-sauvignon',
    price: 29.99,
    inventory: 17,
    imageUrl:
      'https://www.wine.com/product/images/w_1440,h_4968,c_fit,q_auto:good,fl_progressive/rxtpvootcxaight9dg7h.jpg',
    description:
      'Cabernet Sauvignon is a full-bodied red grape first heavily planted in the Bordeaux region. Today, it’s the most popular wine variety in the world!',
    inStock: true,
    isPublished: true
  },
  {
    // Red Wine, not in stock and published
    name: 'Syrah',
    slug: 'syrah',
    price: 9.99,
    inventory: 3,
    imageUrl:
      'https://www.totalwine.com/dynamic/490x/media/sys_master/twmmedia/hb1/h53/9084965650462.png',
    description:
      'Syrah (aka Shiraz) is a full-bodied red wine that’s heavily planted in the Rhône Valley in France and Australia. The wines have intense fruit flavors and medium-weight tannins.',
    inStock: false,
    isPublished: true
  },
  {
    // Red Wine, not in stock and not published
    name: 'Zinfandel',
    slug: 'zinfandel',
    price: 100,
    inventory: 5,
    imageUrl:
      'https://www.haskells.com/media/catalog/product/cache/1/image/816x1200/040ec09b1e35df139433887a97daa66f/t/o/torchbearer_zin.jpg',
    description:
      'Zinfandel (aka Primitivo) is a medium-bodied red wine that originated in Croatia. Wines are fruit-forward and spicy with a medium length finish.',
    inStock: false,
    isPublished: false
  },
  {
    // White Wine, in stock but not published
    name: 'Chardonnay',
    slug: 'chardonnay',
    price: 10.0,
    inventory: 10,
    imageUrl:
      'https://www.totalwine.com/dynamic/490x/media/sys_master/twmmedia/hb2/h9e/11343121743902.png',
    description:
      'Chardonnay is a dry full-bodied white wine that was planted in large quantities for the first time in France.',
    inStock: true,
    isPublished: false
  }
];
