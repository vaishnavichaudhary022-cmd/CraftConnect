import {
  Product,
  CustomRequest,
  Order,
  Review,
  NotificationItem,
  UserProfile,
  ChatMessage,
  ChatThread
} from '../types';

export const DEMO_USERS: UserProfile[] = [
  {
    id: 'user-ananya',
    name: 'Ananya Sharma',
    email: 'ananya.sharma@example.com',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98450 11223',
    bio: 'Handmade crafts enthusiast and interior decorator living in Bengaluru.',
    city: 'Bengaluru, Karnataka'
  },
  {
    id: 'user-devika',
    name: 'Devika Meher',
    email: 'devika.meher@craftstudio.in',
    role: 'seller',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAB66YOI2QN4nM5dgPpvy5XtVL5B8cpD4btoUajpe3n43Sc_Wsd7CIVfPdqew-2G7K8IQvhM-1ZZ8gwf9ONnLRDgWZiIPNFqqXkOf1aUTZ26o_m0C06ejAkXV_18qSjOILRwTlK29S4IgINd6psF5mNFj9hSYS26AW-kgsGIhSQlN1U_J86jTOpNaYHFF0b_MPgT4ieIW2JUcoHC6hT4hd78zz1TXo5wnKMfuKPn37JehR8siJbSsTu',
    phone: '+91 94370 99881',
    artisanStudioName: 'Studio Mrittika & Loom Guild',
    specialty: 'Handloom Textiles, Macrame & Clay Art',
    bio: 'Master artisan dedicated to sustainable home crafts, pit loom weaving, and clay art.',
    city: 'Bargarh & Palghar'
  },
  {
    id: 'user-maya',
    name: 'Maya Rao',
    email: 'maya.crochet@craftstudio.in',
    role: 'seller',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98200 44556',
    artisanStudioName: 'Maya Home Crochet & Needlecraft',
    specialty: 'Handmade Crochet, Amigurumi & Sewing',
    bio: 'Home-based needlecraft creator crafting soft yarn floral bouquets, crochet apparel, and kantha stitching.',
    city: 'Pune, Maharashtra'
  },
  {
    id: 'user-admin',
    name: 'Vikramaditya Sen',
    email: 'governance@craftconnect.in',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98110 55443',
    bio: 'Platform Trust, Escrow Governance & GI Authentication Lead.',
    city: 'New Delhi'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  // 1. Handmade Crochet Products
  {
    id: 'prod-crochet-tulips',
    title: 'Handmade Pastel Tulip & Sunflower Potted Crochet Flowers',
    price: 38,
    priceInr: 3150,
    artisanName: 'Maya Rao',
    artisanId: 'artisan-maya',
    artisanAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    artisanTitle: 'Home Needlecraft Artist • 8 Years Crafting',
    artisanBio: 'Maya hand-crochets everlasting flower arrangements and home accessories using milk cotton yarn from her home studio in Pune.',
    rating: 5.0,
    reviewCount: 38,
    type: 'customizable',
    category: 'Crochet Crafts',
    material: 'Organic Milk Cotton Yarn & Ceramic Pot',
    region: 'Maharashtra',
    description: 'An everlasting handcrafted bouquet of pastel tulips, daisy blossoms, and mini sunflowers nestled in a hand-painted ceramic mini pot. Meticulously hand-crocheted stitch-by-stitch, this piece brings warm botanical cheer to study desks, bedside tables, or window sills without needing water.',
    specifications: {
      'Craft Type': 'Hand Crochet (Single & Double Stitch)',
      'Yarn Quality': '5-ply Soft Milk Cotton Yarn',
      'Height': '8.5 inches (including pot)',
      'Pot Material': 'Glazed Mini Earthenware Pot',
      'Care': 'Gentle dusting with soft dry brush',
      'Origin': 'Pune, Maharashtra (Home Crafted)'
    },
    images: [
      'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1584589167171-541ce45f1eea?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?w=800&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    stockCount: 6,
    featured: true,
    deliveryOptions: {
      postAvailable: true,
      porterAvailable: true,
      porterEstimatedHours: 'Same-day (3-5 hrs in Metro cities)',
      postEstimatedDays: '3-4 Business Days via Speed Post'
    },
    homeCraftTags: ['Home-made', 'Yarn Craft', 'Everlasting Flora', 'Porter Express']
  },
  {
    id: 'prod-crochet-bucket-hat',
    title: 'Floral Daisy Granny Square Hand-crocheted Cotton Bucket Hat',
    price: 42,
    priceInr: 3490,
    artisanName: 'Maya Rao',
    artisanId: 'artisan-maya',
    artisanAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    artisanTitle: 'Home Needlecraft Artist',
    artisanBio: 'Specializing in retro floral granny square crochet apparel and accessories made with breathable organic cotton.',
    rating: 4.9,
    reviewCount: 27,
    type: 'customizable',
    category: 'Crochet Crafts',
    material: '100% Breathable Combed Cotton Yarn',
    region: 'Maharashtra',
    description: 'A cheerful, breathable bucket hat handcrafted from individually stitched floral granny squares in muted sage, cream, terracotta, and soft buttercup yellow. Lightweight and foldable for sunny picnics, artisanal fairs, and weekend strolls.',
    specifications: {
      'Material': '100% Combed Cotton Yarn',
      'Head Circumference': '22 - 23.5 inches (flexible stretch)',
      'Weave Technique': 'Traditional Daisy Granny Square Crochet',
      'Care': 'Hand wash in cold water, dry flat',
      'Origin': 'Home-made in Pune'
    },
    images: [
      'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    stockCount: 5,
    featured: true,
    deliveryOptions: {
      postAvailable: true,
      porterAvailable: true,
      porterEstimatedHours: 'Within 4 hours locally',
      postEstimatedDays: '2-4 Days'
    },
    homeCraftTags: ['Wearable Craft', '100% Cotton', 'Boho Style']
  },
  {
    id: 'prod-crochet-coasters',
    title: 'Handmade Daisy & Leaf Crochet Coaster Set (Set of 6)',
    price: 24,
    priceInr: 1990,
    artisanName: 'Maya Rao',
    artisanId: 'artisan-maya',
    artisanAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    artisanTitle: 'Home Needlecraft Artist',
    artisanBio: 'Crafting thoughtful everyday table textiles and crochet keepsakes.',
    rating: 4.8,
    reviewCount: 19,
    type: 'ready-made',
    category: 'Crochet Crafts',
    material: 'Thick Absorbent Cotton Twine',
    region: 'Maharashtra',
    description: 'Set of 6 charming daisy floral crochet drink coasters and mug rugs in warm earthy terracotta and cream tones. Thick, highly absorbent, and heat-resistant to protect wooden coffee tables from tea and coffee mugs.',
    specifications: {
      'Set Count': '6 Coasters (4 Daisy Flowers, 2 Botanical Leaves)',
      'Diameter': '4.5 inches each',
      'Material': 'Thick Double-Stranded Cotton Yarn',
      'Heat Resistance': 'Up to 100°C',
      'Origin': 'Handmade in Home Studio'
    },
    images: [
      'https://images.unsplash.com/photo-1584589167171-541ce45f1eea?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    stockCount: 12,
    featured: false,
    deliveryOptions: {
      postAvailable: true,
      porterAvailable: true,
      porterEstimatedHours: 'Same-day Porter Delivery',
      postEstimatedDays: '3 Days via Speed Post'
    },
    homeCraftTags: ['Dining Decor', 'Heat-resistant', 'Set of 6']
  },

  // 2. Handmade Home Wall Decorative Products
  {
    id: 'prod-lippan-art-wall-plate',
    title: 'Traditional Kutch Lippan Clay & Mirror Wall Decorative Plate (14")',
    price: 65,
    priceInr: 5400,
    artisanName: 'Devika Meher',
    artisanId: 'artisan-devika',
    artisanAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAB66YOI2QN4nM5dgPpvy5XtVL5B8cpD4btoUajpe3n43Sc_Wsd7CIVfPdqew-2G7K8IQvhM-1ZZ8gwf9ONnLRDgWZiIPNFqqXkOf1aUTZ26o_m0C06ejAkXV_18qSjOILRwTlK29S4IgINd6psF5mNFj9hSYS26AW-kgsGIhSQlN1U_J86jTOpNaYHFF0b_MPgT4ieIW2JUcoHC6hT4hd78zz1TXo5wnKMfuKPn37JehR8siJbSsTu',
    artisanTitle: 'Heritage Craft Master & Ceramicist',
    artisanBio: 'Reviving Kutchi Lippan Kaam mud-mirror art using natural earthen clay dough, chalk powder, and hand-cut mirrors.',
    rating: 5.0,
    reviewCount: 42,
    type: 'customizable',
    category: 'Wall Decor',
    material: 'MDF Base, Clay Dough & Hand-Cut Convex Mirrors',
    region: 'Gujarat & Maharashtra',
    description: 'An enchanting traditional Lippan wall art centerpiece adorned with symmetrical mandala patterns sculpted by hand with clay dough and embellished with hundreds of sparkling convex mirrors (Aabhla). Finished in rich warm terracotta and off-white chalk with a protective moisture-proof matte seal.',
    specifications: {
      'Diameter': '14 inches',
      'Technique': 'Traditional Kutchi Lippan Mud-Mirror Art',
      'Hanging Hardware': 'Heavy-duty brass rear hook installed',
      'Finish': 'Matte waterproof protective sealant',
      'Packaging': 'Triple bubble-wrap with reinforced foam edges',
      'Origin': 'Handcrafted Home Workshop'
    },
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    stockCount: 4,
    featured: true,
    deliveryOptions: {
      postAvailable: true,
      porterAvailable: true,
      porterEstimatedHours: 'Same-day Porter Van (Fragile Handling)',
      postEstimatedDays: '4-5 Days Bubble-packed Post'
    },
    homeCraftTags: ['Wall Art', 'Mirror Decor', 'Heritage Craft', 'Fragile Porter Option']
  },
  {
    id: 'prod-macrame-wall-hanging',
    title: 'Boho Hand-Knotted Macrame Wall Hanging on Natural Driftwood',
    price: 52,
    priceInr: 4350,
    artisanName: 'Studio Mrittika',
    artisanId: 'artisan-mrittika',
    artisanAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    artisanTitle: 'Handmade Home Aesthetics Studio',
    artisanBio: 'Crafting minimalist, organic wall textiles and fiber art using unbleached single-twist cotton ropes.',
    rating: 4.9,
    reviewCount: 31,
    type: 'customizable',
    category: 'Wall Decor',
    material: '100% Unbleached Natural Cotton Cord & Driftwood',
    region: 'Goa',
    description: 'Intricately hand-knotted bohemian wall tapestry created with over 150 meters of single-twist natural cotton cord suspended from a smooth, sea-tumbled driftwood branch. Features layered diamond trellis knotting and luscious brushed fringe.',
    specifications: {
      'Dimensions': '18" width x 28" length (from driftwood to fringe)',
      'Rope Thickness': '4mm Twisted Cotton Cord',
      'Hanger': 'Natural jute cord loop attached',
      'Origin': 'Panaji, Goa'
    },
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?w=800&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    stockCount: 7,
    featured: true,
    deliveryOptions: {
      postAvailable: true,
      porterAvailable: true,
      porterEstimatedHours: 'Express Porter Bike (4 hrs)',
      postEstimatedDays: '3-4 Days'
    },
    homeCraftTags: ['Fiber Art', 'Boho Living', 'Natural Wood']
  },
  {
    id: 'prod-pressed-flower-frame',
    title: 'Botanical Pressed Wildflower Floating Wooden Glass Frame',
    price: 36,
    priceInr: 2990,
    artisanName: 'Maya Rao',
    artisanId: 'artisan-maya',
    artisanAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    artisanTitle: 'Home Botanicals & Floral Artist',
    artisanBio: 'Pressing locally foraged seasonal wildflowers in wooden book-presses.',
    rating: 4.8,
    reviewCount: 15,
    type: 'ready-made',
    category: 'Wall Decor',
    material: 'Teakwood Frame, Dual Glass Panes & Real Pressed Ferns',
    region: 'Karnataka',
    description: 'Real botanical ferns, cosmos petals, and baby’s breath flowers pressed between two crystal-clear glass panes in an organic reclaimed teakwood frame. Creates an ethereal floating illusion against textured walls.',
    specifications: {
      'Frame Size': '8 x 10 inches',
      'Frame Depth': '1.2 inches solid teakwood',
      'Botanicals': '100% Real Preserved Flowers & Foliage',
      'Display': 'Wall mount or tabletop freestanding'
    },
    images: [
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    stockCount: 9,
    featured: false,
    deliveryOptions: {
      postAvailable: true,
      porterAvailable: true,
      porterEstimatedHours: 'Porter 2-Wheeler / Van Delivery',
      postEstimatedDays: '3 Days'
    },
    homeCraftTags: ['Pressed Flora', 'Glass Frame', 'Eco-friendly']
  },

  // 3. Handcrafted Sewing & Embroidery Products
  {
    id: 'prod-kantha-linen-tote',
    title: 'Hand-stitched Kantha Embroidered Organic Linen Everyday Tote',
    price: 48,
    priceInr: 3990,
    artisanName: 'Devika Meher',
    artisanId: 'artisan-devika',
    artisanAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAB66YOI2QN4nM5dgPpvy5XtVL5B8cpD4btoUajpe3n43Sc_Wsd7CIVfPdqew-2G7K8IQvhM-1ZZ8gwf9ONnLRDgWZiIPNFqqXkOf1aUTZ26o_m0C06ejAkXV_18qSjOILRwTlK29S4IgINd6psF5mNFj9hSYS26AW-kgsGIhSQlN1U_J86jTOpNaYHFF0b_MPgT4ieIW2JUcoHC6hT4hd78zz1TXo5wnKMfuKPn37JehR8siJbSsTu',
    artisanTitle: 'Textile Artisan & Kantha Embroiderer',
    artisanBio: 'Empowering women needleworkers crafting sustainable bags and linen goods.',
    rating: 5.0,
    reviewCount: 33,
    type: 'customizable',
    category: 'Sewing & Needlecraft',
    material: '100% Organic Raw Linen & Cotton Embroidery Floss',
    region: 'West Bengal & Odisha',
    description: 'An artisanal shoulder tote bag hand-sewn from unbleached organic linen and decorated with dense, running Kantha stitches illustrating village flora and rivers. Reinforced double-stitched cotton straps and an interior zipper pocket for your phone, keys, and sketchbook.',
    specifications: {
      'Dimensions': '16" height x 14.5" width x 4" gusset',
      'Handle Drop': '11 inches (comfortable shoulder fit)',
      'Interior': 'Lined with unbleached cotton, 2 slip pockets + 1 zip pouch',
      'Closure': 'Antique brass magnetic snap button',
      'Care': 'Machine wash gentle inside-out'
    },
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    stockCount: 8,
    featured: true,
    deliveryOptions: {
      postAvailable: true,
      porterAvailable: true,
      porterEstimatedHours: 'Same-day Porter Delivery',
      postEstimatedDays: '2-3 Days via Post'
    },
    homeCraftTags: ['Hand-sewn', 'Kantha Stitch', 'Linen Bag', 'Sustainable']
  },
  {
    id: 'prod-patchwork-cushions',
    title: 'Quilted Hand-sewn Block Print Patchwork Cushion Covers (Set of 2)',
    price: 44,
    priceInr: 3650,
    artisanName: 'Devika Meher',
    artisanId: 'artisan-devika',
    artisanAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAB66YOI2QN4nM5dgPpvy5XtVL5B8cpD4btoUajpe3n43Sc_Wsd7CIVfPdqew-2G7K8IQvhM-1ZZ8gwf9ONnLRDgWZiIPNFqqXkOf1aUTZ26o_m0C06ejAkXV_18qSjOILRwTlK29S4IgINd6psF5mNFj9hSYS26AW-kgsGIhSQlN1U_J86jTOpNaYHFF0b_MPgT4ieIW2JUcoHC6hT4hd78zz1TXo5wnKMfuKPn37JehR8siJbSsTu',
    artisanTitle: 'Handloom & Sewing Guild',
    artisanBio: 'Hand-quilting upcycled hand-block printed organic cotton textiles.',
    rating: 4.9,
    reviewCount: 22,
    type: 'ready-made',
    category: 'Sewing & Needlecraft',
    material: '100% Hand-Block Printed Cotton & Cotton Batting',
    region: 'Rajasthan',
    description: 'Set of 2 square cushion covers meticulously assembled from vegetable-dyed Bagru and Dabu block-printed cotton swatches. Each cover features hand-quilted diamond stitching with soft batting in between and a hidden zipper closure.',
    specifications: {
      'Set Count': '2 Cushion Covers (Inserts not included)',
      'Dimensions': '16 x 16 inches (Standard throw pillow size)',
      'Closure': 'Concealed YKK zipper on reverse',
      'Care': 'Gentle hand wash in cold water with mild detergent'
    },
    images: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    stockCount: 6,
    featured: false,
    deliveryOptions: {
      postAvailable: true,
      porterAvailable: true,
      porterEstimatedHours: 'Express Porter Courier',
      postEstimatedDays: '3 Days'
    },
    homeCraftTags: ['Quilted Cotton', 'Block Print', 'Set of 2']
  },
  {
    id: 'prod-sashiko-runner',
    title: 'Hand-embroidered Sashiko Stitching Linen Table Runner (72")',
    price: 58,
    priceInr: 4850,
    artisanName: 'Maya Rao',
    artisanId: 'artisan-maya',
    artisanAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    artisanTitle: 'Home Needlecraft Artist',
    artisanBio: 'Combining Japanese Sashiko geometric stitching with Indian handloom linen.',
    rating: 5.0,
    reviewCount: 16,
    type: 'customizable',
    category: 'Sewing & Needlecraft',
    material: 'Heavyweight Slate Linen & White Cotton Floss',
    region: 'Maharashtra',
    description: 'A 72-inch dining table runner hand-sewn from heavyweight slate-grey linen and embroidered with traditional geometric Sashiko waves and starburst patterns. Brings timeless artisanal serenity to dining settings.',
    specifications: {
      'Length': '72 inches (6 feet) x 14 inches width',
      'Fabric': '100% Pure European Linen (240 GSM)',
      'Stitching': 'Hand-stitched Sashiko embroidery thread',
      'Care': 'Iron while slightly damp for crisp drape'
    },
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    stockCount: 4,
    featured: false,
    deliveryOptions: {
      postAvailable: true,
      porterAvailable: true,
      porterEstimatedHours: 'Porter Same-Day Slot',
      postEstimatedDays: '3 Days'
    },
    homeCraftTags: ['Table Textiles', 'Sashiko Stitch', 'Pure Linen']
  },

  // 4. Terracotta Pottery & Home Crafts
  {
    id: 'prod-warli-vase',
    title: 'Warli Art Terracotta Vase with Tribal Folklore Paintings',
    price: 45,
    priceInr: 3750,
    artisanName: 'Studio Mrittika',
    artisanId: 'artisan-mrittika',
    artisanAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    artisanTitle: 'Ceramic Studio & Clay Guild',
    artisanBio: 'Studio Mrittika is dedicated to reviving indigenous Indian terracotta pottery and tribal folklore painting on functional vessels.',
    rating: 4.9,
    reviewCount: 12,
    type: 'ready-made',
    category: 'Terracotta & Pottery',
    material: 'Natural Terracotta Clay & Rice Flour White Pigments',
    region: 'Maharashtra',
    description: 'A beautifully hand-painted terracotta vase with intricate tribal Warli patterns depicting celebratory harvest dances and village life, fired in a wood-fired earthen kiln.',
    specifications: {
      'Material': 'Natural Terracotta Clay',
      'Height': '10 inches',
      'Diameter': '7.5 inches',
      'Finish': 'Matte Clay with Natural Mineral Pigments',
      'Waterproof': 'Dry floral display recommended',
      'Origin': 'Palghar, Maharashtra'
    },
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDtEShfKXlo4SGPJ836pSXo4qIaBkX2NWIHH3hr1bTkUsQhfocKGg26C9iJhiHI2khYCij5tKLjaOgF1TIJVfnU1H7ULFzpi3sFqRr4-YosHE8Wymdp3qHRwHAvMc2oaM8sY7_mjCWwfBaTQzO_gB3UEQMES2NzHfaJ6-Zwp9mJ9N621ByhNkCxRrxVbbQf6fbZ3w5iKyCmsPZE--eh9fZQHqVcdlOtxE4aFWwBEGyOPEEnFz5COK0S'
    ],
    inStock: true,
    stockCount: 8,
    featured: true,
    deliveryOptions: {
      postAvailable: true,
      porterAvailable: true,
      porterEstimatedHours: 'Porter Van (Fragile Pottery Care)',
      postEstimatedDays: '4 Days via India Post'
    },
    homeCraftTags: ['Terracotta', 'Warli Painting', 'Porter Fragile Ready']
  },
  {
    id: 'prod-soy-wax-candle',
    title: 'Hand-poured Botanical Soy Wax Aromatherapy Candle with Dried Petals',
    price: 22,
    priceInr: 1850,
    artisanName: 'Maya Rao',
    artisanId: 'artisan-maya',
    artisanAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    artisanTitle: 'Home Botanicals & Aromatherapy Maker',
    artisanBio: 'Hand-pouring clean-burning soy candles infused with essential oils in reusable terracotta jars.',
    rating: 4.9,
    reviewCount: 45,
    type: 'ready-made',
    category: 'Home Décor',
    material: '100% Pure Soy Wax, Rose Petals & Terracotta Jar',
    region: 'Maharashtra',
    description: 'Poured by hand in small batches of 10 inside an unglazed terracotta earthen bowl. Infused with pure essential oils of lavender, cedarwood, and real dried rosebuds with a crackling wooden wick.',
    specifications: {
      'Wax Weight': '250 grams (approx. 50 hours burn time)',
      'Wick': 'Natural FSC-certified crackling wood wick',
      'Fragrance': 'French Lavender, Bergamot & Sandalwood',
      'Container': 'Reusable hand-thrown terracotta bowl'
    },
    images: [
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    stockCount: 15,
    featured: false,
    deliveryOptions: {
      postAvailable: true,
      porterAvailable: true,
      porterEstimatedHours: 'Same-day Porter Delivery',
      postEstimatedDays: '3 Days'
    },
    homeCraftTags: ['Aromatherapy', 'Soy Candle', 'Eco Jar']
  },
  {
    id: 'prod-sambalpuri-saree',
    title: 'Hand-woven Sambalpuri Silk Saree with Baandha Ikat',
    price: 150,
    priceInr: 12500,
    artisanName: 'Devika Meher',
    artisanId: 'artisan-devika',
    artisanAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAB66YOI2QN4nM5dgPpvy5XtVL5B8cpD4btoUajpe3n43Sc_Wsd7CIVfPdqew-2G7K8IQvhM-1ZZ8gwf9ONnLRDgWZiIPNFqqXkOf1aUTZ26o_m0C06ejAkXV_18qSjOILRwTlK29S4IgINd6psF5mNFj9hSYS26AW-kgsGIhSQlN1U_J86jTOpNaYHFF0b_MPgT4ieIW2JUcoHC6hT4hd78zz1TXo5wnKMfuKPn37JehR8siJbSsTu',
    artisanTitle: 'Master Weaver • 30 Years Experience',
    artisanBio: 'Devika belongs to a family of traditional Bhulia weavers from Bargarh. Every thread in this saree has been manually tied and dyed by her hands.',
    rating: 5.0,
    reviewCount: 48,
    type: 'customizable',
    category: 'Textiles & Silk',
    material: '100% Pure Silk',
    region: 'Odisha',
    description: 'A masterpiece of traditional Indian handloom weaving, this authentic Sambalpuri silk saree features intricate ikat tie-dye patterns that take weeks to perfect on the pit loom.',
    specifications: {
      'Material': '100% Pure Silk',
      'Length': '5.5 Meters + 0.8m Blouse Piece',
      'Care': 'Dry Clean Only',
      'Origin': 'Odisha, India (GI Tagged Authenticated)'
    },
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDzGqQg0UFMeJCXqzkN8-87_9r39-n7X32a8Crf_IM8Q-cKlklcY1kU4FcNEax9tki1lOaoJWhuPky8wHHYh2ZMIhsc70dG5x4bN0PYSl122Ig7mSjaz7QDjxCueeAaw5jtB8geVKjdvG5oPsGXbNI3shMYWkELkAq00uXEQAjoMzPFU4FRBS7qNom2ow8hv0HMmE53JzBxTP8V4_H1rgt0TYkxmOkMNAKRyoHnGjBYoXOt0EUGqxG_',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDXQmfuHkypJ0Fmiy_NOWQ_ksim_E5sNomBusxQqBLm1Ap_2rv_qfRLbPiEexzKaEV7R6Wt-zjmaMxMkQWkcdQf4Ad6qjgpr1PCjvjoJLX2lqKxDICpipvSslIoKIDYB1x_17TNjtBC5La3BV0vQgEOsuWu2BhNUGFam9rl6m9GpS7wky7ZAlOvg51qwN_uGeRukPr26prnXVSxcdrEGIA2ogzYQ5k2sU3nNwd-kIwCpXdRd3fWXko8'
    ],
    inStock: true,
    stockCount: 4,
    featured: true,
    deliveryOptions: {
      postAvailable: true,
      porterAvailable: true,
      porterEstimatedHours: 'Express Insured Delivery',
      postEstimatedDays: 'Speed Post with High-Value Insurance'
    },
    homeCraftTags: ['Handloom', 'Silk', 'GI Tagged']
  }
];

export const INITIAL_CUSTOM_REQUESTS: CustomRequest[] = [
  {
    id: 'req-101',
    customerName: 'Ananya Sharma',
    customerEmail: 'ananya.sharma@example.com',
    designTitle: 'Hand-painted Terracotta Wedding Planter Set',
    description: 'Looking for a set of 2 large floor planters painted with Warli tribal wedding dance motifs in off-white and burnt ochre. Delivery to Bengaluru via Porter Van preferred because of fragility.',
    occasion: 'wedding',
    budgetRange: '150to300',
    colorPreferences: 'Terracotta earth, cream white, mustard gold accents',
    dimensions: '18 inches height, 12 inches top diameter',
    referenceImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUgEJdKjVPoXFZdh2HCBZUaLbFF-YKk89UPW59urLQo2KcSNL7VRtvUK0dBOQOADwOYm3apghk4DO6CxtRqpqW_MtL_pTZ5JFaHIlCahSVK7rMNicW2zdxVbsYUrMcDXqv-VAMd83xSieQ8u7MIxqvXGjb0KnQCBy3TUp30irsliLAVKEXHM1yHAtPKcka1osabZc94OPwkGv6TUbHRgYAw5kHYwGn6gpK6_-w2Fgqxw14Fqtg9Nhg',
    category: 'Terracotta & Pottery',
    status: 'proposal_sent',
    preferredDelivery: 'porter',
    createdAt: '2026-08-18T10:30:00Z',
    proposal: {
      id: 'prop-201',
      sellerId: 'artisan-devika',
      sellerName: 'Devika Meher (Studio Mrittika)',
      price: 220,
      estimatedDays: 14,
      artisanNote: 'Namaste Ananya! I would be delighted to craft this pair. We will schedule a direct Porter Mini Truck pickup from our studio to ensure zero in-transit vibration or breakage.',
      submittedAt: '2026-08-19T14:15:00Z'
    }
  },
  {
    id: 'req-103',
    customerName: 'Priya Sen',
    customerEmail: 'priya.sen@example.com',
    designTitle: 'Custom Pastel Crochet Sunflower Bouquet with Custom Name Tag',
    description: 'Want a special 12-flower crochet bouquet with lavender and blush pink tulips + 2 sunflowers, wrapped in kraft paper with wooden initials.',
    occasion: 'gift',
    budgetRange: '50to150',
    colorPreferences: 'Pastel Lavender, Blush Pink, Buttercup Yellow',
    dimensions: '14 inches height bouquet',
    referenceImageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&auto=format&fit=crop&q=80',
    category: 'Crochet Crafts',
    status: 'pending_review',
    preferredDelivery: 'porter',
    createdAt: '2026-08-19T18:45:00Z'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-8820',
    orderNumber: 'CC-9482',
    type: 'ready-made',
    items: [
      {
        productId: 'prod-crochet-tulips',
        title: 'Handmade Pastel Tulip & Sunflower Potted Crochet Flowers',
        price: 38,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&auto=format&fit=crop&q=80',
        artisanName: 'Maya Rao',
        type: 'customizable'
      }
    ],
    subtotal: 38,
    shippingFee: 6,
    total: 44,
    customerName: 'Ananya Sharma',
    customerEmail: 'ananya.sharma@example.com',
    shippingAddress: {
      fullName: 'Ananya Sharma',
      street: '402, Lotus Orchid, Palm Avenue, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038',
      phone: '+91 98450 11223',
      deliveryInstructions: 'Please leave at doorstep with security guard if not available.'
    },
    paymentMethod: 'card',
    paymentStatus: 'paid',
    status: 'dispatched',
    createdAt: '2026-08-19T15:20:00Z',
    estimatedDelivery: '2026-08-20 (Today via Porter Express)',
    trackingNumber: 'PORTER-BLR-998241',
    deliveryMethod: 'porter',
    deliveryDetails: {
      method: 'porter',
      carrierName: 'Porter Hyperlocal On-Demand',
      trackingCode: 'PORTER-BLR-998241',
      porterVehicleType: '2-Wheeler Bike',
      porterLiveUrl: 'https://porter.in/track/PORTER-BLR-998241',
      estimatedTimeline: 'Same-day Live Tracking • On the way (ETA: 45 mins)',
      dispatchDate: '2026-08-20T08:15:00Z',
      notes: 'Driver Ramesh Kumar assigned. Contact: +91 98765 43210'
    }
  },
  {
    id: 'ord-8822',
    orderNumber: 'CC-7741',
    type: 'ready-made',
    items: [
      {
        productId: 'prod-lippan-art-wall-plate',
        title: 'Traditional Kutch Lippan Clay & Mirror Wall Decorative Plate (14")',
        price: 65,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80',
        artisanName: 'Devika Meher',
        type: 'customizable'
      }
    ],
    subtotal: 65,
    shippingFee: 3,
    total: 68,
    customerName: 'Vikram Joshi',
    customerEmail: 'vikram.j@example.com',
    shippingAddress: {
      fullName: 'Vikram Joshi',
      street: '18 Heritage Enclave, Model Colony',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411016',
      phone: '+91 98220 77889'
    },
    paymentMethod: 'upi',
    paymentStatus: 'paid',
    status: 'in_crafting',
    createdAt: '2026-08-18T11:00:00Z',
    estimatedDelivery: '2026-08-23 via India Speed Post',
    trackingNumber: 'IND-POST-MH992144',
    deliveryMethod: 'post',
    deliveryDetails: {
      method: 'post',
      carrierName: 'India Post (Speed Post Parcel)',
      trackingCode: 'IND-POST-MH992144',
      estimatedTimeline: 'In studio final packing • Registered speed post consignment',
      notes: 'Triple padded fragile bubble enclosure with insured stamp.'
    }
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-crochet-tulips',
    author: 'Sunita Rao',
    rating: 5,
    comment: 'The handmade crochet tulips are extraordinarily pretty! You can see the neat tension in every stitch. Delivered safely in 2 hours by Porter in Pune.',
    date: 'August 18, 2026',
    verifiedPurchase: true
  },
  {
    id: 'rev-2',
    productId: 'prod-lippan-art-wall-plate',
    author: 'Meenakshi Sundaram',
    rating: 5,
    comment: 'The mirror work on the Lippan art piece catches the morning sunlight magnificently on my living room wall. Devika Ji even messaged me care instructions.',
    date: 'August 14, 2026',
    verifiedPurchase: true
  },
  {
    id: 'rev-3',
    productId: 'prod-kantha-linen-tote',
    author: 'Aarav Mehta',
    rating: 5,
    comment: 'Sturdy linen, authentic Kantha running stitch, and very spacious. Highly recommended for conscious shoppers.',
    date: 'August 10, 2026',
    verifiedPurchase: true
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Porter Courier On The Way! 🛵',
    message: 'Your Handmade Crochet Flowers (Order #CC-9482) is out for delivery with Porter driver Ramesh Kumar.',
    type: 'order',
    timestamp: '25 mins ago',
    read: false,
    targetScreen: 'orders_tracking',
    targetId: 'ord-8820'
  },
  {
    id: 'notif-2',
    title: 'New Message from Artisan Devika',
    message: 'Devika Meher sent you a photo of the clay dough mirror pattern for your review.',
    type: 'chat',
    timestamp: '1 hour ago',
    read: false,
    targetScreen: 'chat'
  },
  {
    id: 'notif-3',
    title: 'Custom Proposal Received!',
    message: 'Master Weaver Devika Meher submitted a customized price quote of $220 for your Wedding Planter request.',
    type: 'custom',
    timestamp: 'Yesterday',
    read: true,
    targetScreen: 'custom_detail',
    targetId: 'req-101'
  }
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    senderId: 'user-ananya',
    senderName: 'Ananya Sharma',
    senderRole: 'customer',
    recipientId: 'user-maya',
    recipientName: 'Maya Rao',
    text: 'Hello Maya! I just ordered the potted crochet flowers. Could you please ensure they are dispatched via Porter bike today before 5 PM?',
    timestamp: '10:15 AM',
    productId: 'prod-crochet-tulips',
    productTitle: 'Handmade Pastel Tulip & Sunflower Potted Crochet Flowers',
    orderId: 'ord-8820',
    orderNumber: 'CC-9482',
    isDeliveryQuery: true
  },
  {
    id: 'msg-2',
    senderId: 'user-maya',
    senderName: 'Maya Rao',
    senderRole: 'seller',
    recipientId: 'user-ananya',
    recipientName: 'Ananya Sharma',
    text: 'Namaste Ananya! Yes, absolutely! I have packed the ceramic pot with eco-friendly honeycomb paper so the stems stay upright. The Porter bike rider has just picked it up with tracking code PORTER-BLR-998241.',
    timestamp: '10:28 AM',
    productId: 'prod-crochet-tulips',
    productTitle: 'Handmade Pastel Tulip & Sunflower Potted Crochet Flowers',
    orderId: 'ord-8820',
    orderNumber: 'CC-9482',
    isDeliveryQuery: true
  },
  {
    id: 'msg-3',
    senderId: 'user-ananya',
    senderName: 'Ananya Sharma',
    senderRole: 'customer',
    recipientId: 'user-devika',
    recipientName: 'Devika Meher',
    text: 'Namaste Devika Ji! For the Lippan art wall plate, can we customize the outer border with small diamond mirrors instead of round ones?',
    timestamp: 'Yesterday',
    productId: 'prod-lippan-art-wall-plate',
    productTitle: 'Traditional Kutch Lippan Clay & Mirror Wall Decorative Plate (14")'
  },
  {
    id: 'msg-4',
    senderId: 'user-devika',
    senderName: 'Devika Meher',
    senderRole: 'seller',
    recipientId: 'user-ananya',
    recipientName: 'Ananya Sharma',
    text: 'Namaste Ananya! Yes, I have diamond cut mirrors in my workshop. I will hand-set them around the outer rim for a shimmering geometric border! When ready, I can dispatch via Porter or registered India Post as per your convenience.',
    timestamp: 'Yesterday',
    productId: 'prod-lippan-art-wall-plate',
    productTitle: 'Traditional Kutch Lippan Clay & Mirror Wall Decorative Plate (14")'
  }
];

export const INITIAL_CHAT_THREADS: ChatThread[] = [
  {
    id: 'thread-maya-ananya',
    customerId: 'user-ananya',
    customerName: 'Ananya Sharma',
    artisanId: 'artisan-maya',
    artisanName: 'Maya Rao (Needlecraft Studio)',
    artisanAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    lastMessage: 'The Porter bike rider has just picked it up with tracking code PORTER-BLR-998241.',
    lastTimestamp: '10:28 AM',
    unreadCountCustomer: 0,
    unreadCountArtisan: 0,
    relatedProductId: 'prod-crochet-tulips',
    relatedProductTitle: 'Handmade Pastel Tulip & Sunflower Potted Crochet Flowers',
    relatedOrderId: 'ord-8820'
  },
  {
    id: 'thread-devika-ananya',
    customerId: 'user-ananya',
    customerName: 'Ananya Sharma',
    artisanId: 'artisan-devika',
    artisanName: 'Devika Meher (Studio Mrittika)',
    artisanAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAB66YOI2QN4nM5dgPpvy5XtVL5B8cpD4btoUajpe3n43Sc_Wsd7CIVfPdqew-2G7K8IQvhM-1ZZ8gwf9ONnLRDgWZiIPNFqqXkOf1aUTZ26o_m0C06ejAkXV_18qSjOILRwTlK29S4IgINd6psF5mNFj9hSYS26AW-kgsGIhSQlN1U_J86jTOpNaYHFF0b_MPgT4ieIW2JUcoHC6hT4hd78zz1TXo5wnKMfuKPn37JehR8siJbSsTu',
    lastMessage: 'I will hand-set diamond cut mirrors around the outer rim...',
    lastTimestamp: 'Yesterday',
    unreadCountCustomer: 0,
    unreadCountArtisan: 0,
    relatedProductId: 'prod-lippan-art-wall-plate',
    relatedProductTitle: 'Traditional Kutch Lippan Clay & Mirror Wall Decorative Plate (14")'
  }
];
