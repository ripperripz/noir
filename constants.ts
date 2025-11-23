import { Product, Category } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'The Obsidian Trench',
    subtitle: 'Autumn / Winter Collection',
    description: 'A masterpiece of structural tailoring. Constructed from heavy-weight Italian wool with a distinct oversized lapel and belted waist. Designed for the modern shadow.',
    price: 850,
    category: Category.APPAREL,
    sizes: ['S', 'M', 'L', 'XL'],
    featured: true,
    story: "In the depth of winter, the silhouette becomes the primary language. The Obsidian Trench speaks in whispers of power and solitude.",
    images: [
      'https://picsum.photos/id/338/800/1200',
      'https://picsum.photos/id/1027/800/1200',
      'https://picsum.photos/id/669/800/1200'
    ]
  },
  {
    id: '2',
    title: 'Void Silk Slip',
    subtitle: 'Evening Wear',
    description: 'Liquid silk that drapes over the body like a second skin. Bias-cut for fluid movement with a minimalist asymmetric hem.',
    price: 420,
    category: Category.APPAREL,
    sizes: ['XS', 'S', 'M', 'L'],
    images: [
      'https://picsum.photos/id/331/800/1200',
      'https://picsum.photos/id/64/800/1200'
    ]
  },
  {
    id: '3',
    title: 'Architectural Heel',
    subtitle: 'Footwear',
    description: 'Leather boots featuring a sculpted chrome heel. A juxtaposition of organic leather texture and industrial metal.',
    price: 650,
    category: Category.FOOTWEAR,
    sizes: ['36', '37', '38', '39', '40'],
    featured: true,
    story: "Walking on art. The structure defies gravity, grounding the wearer while elevating the stance.",
    images: [
      'https://picsum.photos/id/21/800/1200',
      'https://picsum.photos/id/250/800/1200'
    ]
  },
  {
    id: '4',
    title: 'Ceramic Tote',
    subtitle: 'Accessories',
    description: 'Hand-crafted leather rigid tote bag with ceramic handle details. Minimalist branding.',
    price: 1200,
    category: Category.ACCESSORIES,
    images: [
      'https://picsum.photos/id/251/800/1200',
      'https://picsum.photos/id/668/800/1200'
    ]
  },
  {
    id: '5',
    title: 'Cashmere Wrap',
    subtitle: 'Essentials',
    description: 'Pure mongolian cashmere. Oversized, soft, and eternally warm. The ultimate layer.',
    price: 395,
    category: Category.ACCESSORIES,
    sizes: ['One Size'],
    images: [
      'https://picsum.photos/id/1005/800/1200',
      'https://picsum.photos/id/646/800/1200'
    ]
  },
  {
    id: '6',
    title: 'Structured Blazer',
    subtitle: 'Tailoring',
    description: 'Sharp shoulders, nipped waist. A blazer that commands attention in any room.',
    price: 550,
    category: Category.APPAREL,
    sizes: ['S', 'M', 'L'],
    story: "Power dressing returned to its roots. Sharp lines for sharp minds.",
    images: [
      'https://picsum.photos/id/342/800/1200',
      'https://picsum.photos/id/1005/800/1200'
    ]
  }
];

export const STORIES = [
  {
    id: 1,
    title: "Urban Solitude",
    excerpt: "Finding silence in the noise of the metropolis.",
    image: "https://picsum.photos/id/435/1200/800"
  },
  {
    id: 2,
    title: "The Shape of Water",
    excerpt: "Fluidity in fabric design.",
    image: "https://picsum.photos/id/324/1200/800"
  }
];