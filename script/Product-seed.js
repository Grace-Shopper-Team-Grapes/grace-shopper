module.exports = [
  {
    // Red Wine, in stock and published
    name: 'Cabernet Sauvignon',
    slug: 'cabernet-sauvignon',
    price: 29.99,
    inventory: 17,
    imageUrl:
      'https://media.winefolly.com/Cabernet-Sauvignon-wine-tasting-WineFolly.jpg',
    description:
      'Cabernet Sauvignon is a full-bodied red grape first heavily planted in the Bordeaux region. Today, it’s the most popular wine variety in the world! Wines are full-bodied with bold tannins and a long persistent finish driven mostly by the higher levels of alcohol and tannin that often accompany these wines.',
    inStock: true,
    isPublished: true
  },
  {
    // Red Wine, not in stock and published
    name: 'Syrah',
    slug: 'syrah',
    price: 9.99,
    inventory: 3,
    imageUrl: 'https://media.winefolly.com/Syrah-wine-tasting-WineFolly.jpg',
    description:
      'Syrah (aka Shiraz) is a full-bodied red wine that’s heavily planted in the Rhône Valley in France and Australia. The wines have intense fruit flavors and medium-weight tannins. Syrah is commonly blended with Grenache and Mourvèdre to create the red Rhône blend. The wine often has a meaty (beef broth, jerky) quality.',
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
      'https://media.winefolly.com/Zinfandel-wine-tasting-WineFolly.jpg',
    description:
      'Zinfandel (aka Primitivo) is a medium-bodied red wine that originated in Croatia. Wines are fruit-forward and spicy with a medium length finish. Zinfandel is a red grape that may be better known in its pink variation, White Zinfandel.',
    inStock: false,
    isPublished: false
  },
  {
    // RED
    name: 'Pinot Noir',
    slug: 'pinot-noir',
    price: 20.0,
    inventory: 10,
    imageUrl:
      'https://media.winefolly.com/Pinot-Noir-wine-tasting-WineFolly.jpg',
    description:
      'Pinot Noir is a dry, light-bodied red that was first widely planted in France. The wines typically have higher acidity and soft a soft, smooth, low-tannin finish.',
    inStock: true,
    isPublished: true
  },
  {
    // White Wine, in stock but not published
    name: 'Chardonnay',
    slug: 'chardonnay',
    price: 10.0,
    inventory: 10,
    imageUrl:
      'https://media.winefolly.com/Chardonnay-wine-tasting-WineFolly.jpg',
    description:
      'Chardonnay is a dry full-bodied white wine that was planted in large quantities for the first time in France.',
    inStock: true,
    isPublished: false
  },
  {
    name: 'Sauvignon Blanc',
    slug: 'sauvignon-blanc',
    price: 10.0,
    inventory: 10,
    imageUrl:
      'https://media.winefolly.com/Sauvignon-Blanc-wine-tasting-WineFolly.jpg',
    description:
      'Sauvignon Blanc is a dry white grape first widely planted in France. Wines are tart, typically with herbal, “green” fruit flavors.',
    inStock: true,
    isPublished: true
  },
  {
    name: 'Pinot Gris',
    slug: 'pinot-gris',
    price: 10.0,
    inventory: 10,
    imageUrl:
      'https://media.winefolly.com/Pinot-Gris-wine-tasting-WineFolly.jpg',
    description:
      'Pinot Gris is a dry light-bodied white grape that is planted heavily in Italy, but also in France and Germany. Wines are light to middle-weight and easy drinking, often with some bitter flavor on the palate (bitter almond, quinine)',
    inStock: true,
    isPublished: true
  },
  {
    name: 'Riesling',
    slug: 'riesling',
    price: 10.0,
    inventory: 10,
    imageUrl: 'https://media.winefolly.com/Riesling-wine-tasting-WineFolly.jpg',
    description:
      'Always very high in acid, when made as a table wine Rieslings can be harmoniously sweet (sweet and sour) or dry (very acidic). The wine is polarizing because some people find dry styles too acidic and sweet styles too cloying, but sweetness is always a wine making decision and not inherent to the grape.',
    inStock: true,
    isPublished: true
  }
];
