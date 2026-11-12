export interface Product {
  id: string; slug: string; name: string; category: string; price: number;
  color: string; colorHex: string; sizes: string[]; image: string;
  description: string; status: 'concept'; stock: number;
  sourcePrice: { amount: number; currency: string };
}

// BDT prices and inventory are isolated development fixtures awaiting merchant approval.
export const products: Product[] =[
  {
    "id": "aubergine-prime",
    "slug": "aubergine-prime",
    "name": "Aubergine Prime",
    "category": "Hoodies",
    "price": 2490,
    "color": "Aubergine Prime",
    "colorHex": "#3A1F2B",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "image": "/assets/hero/hero-aubergine-prime-card.webp",
    "description": "The hero piece. Plain deep aubergine, cloudy-blue SL embroidery, cut oversized.",
    "status": "concept",
    "stock": 12,
    "sourcePrice": {
      "amount": 149,
      "currency": "USD"
    }
  },
  {
    "id": "aubergine-geoband",
    "slug": "aubergine-geoband",
    "name": "Aubergine Geoband",
    "category": "Hoodies",
    "price": 2490,
    "color": "Aubergine Geoband",
    "colorHex": "#3A1F2B",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "image": "/assets/designs/design-01-aubergine-geoband.webp",
    "description": "The signature. Deep aubergine cut with a geometric cloudy-and-cement band across the chest, striped hem and cuffs, SL in pale blue.",
    "status": "concept",
    "stock": 12,
    "sourcePrice": {
      "amount": 149,
      "currency": "USD"
    }
  },
  {
    "id": "glacier-snowflake",
    "slug": "glacier-snowflake",
    "name": "Glacier Snowflake",
    "category": "Hoodies",
    "price": 2490,
    "color": "Glacier Snowflake",
    "colorHex": "#DFEDFF",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "image": "/assets/designs/design-02-glacier-snowflake.webp",
    "description": "Snow white with one huge tonal snowflake blown across the chest and shoulders. Quiet from far away, detailed up close.",
    "status": "concept",
    "stock": 12,
    "sourcePrice": {
      "amount": 139,
      "currency": "USD"
    }
  },
  {
    "id": "midnight-slash",
    "slug": "midnight-slash",
    "name": "Midnight Slash",
    "category": "Hoodies",
    "price": 2490,
    "color": "Midnight Slash",
    "colorHex": "#8E8E8E",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "image": "/assets/designs/design-03-midnight-slash.webp",
    "description": "Midnight navy slashed diagonally with ice blue and stone grey, the colour-block running straight through the pocket.",
    "status": "concept",
    "stock": 12,
    "sourcePrice": {
      "amount": 134,
      "currency": "USD"
    }
  },
  {
    "id": "pine-peaks",
    "slug": "pine-peaks",
    "name": "Pine Peaks",
    "category": "Hoodies",
    "price": 2490,
    "color": "Pine Peaks",
    "colorHex": "#8E8E8E",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "image": "/assets/designs/design-04-pine-peaks.webp",
    "description": "Deep pine green with a white line-art range of peaks and forest across the chest. For people who would rather be in the mountains.",
    "status": "concept",
    "stock": 12,
    "sourcePrice": {
      "amount": 129,
      "currency": "USD"
    }
  },
  {
    "id": "charcoal-circuit",
    "slug": "charcoal-circuit",
    "name": "Charcoal Circuit",
    "category": "Hoodies",
    "price": 2490,
    "color": "Charcoal Circuit",
    "colorHex": "#8E8E8E",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "image": "/assets/designs/design-05-charcoal-circuit.webp",
    "description": "Charcoal grey with twin cement-and-white racing stripes running shoulder to cuff. The sportiest cut in the drop.",
    "status": "concept",
    "stock": 12,
    "sourcePrice": {
      "amount": 124,
      "currency": "USD"
    }
  },
  {
    "id": "blush-fade",
    "slug": "blush-fade",
    "name": "Blush Fade",
    "category": "Hoodies",
    "price": 2490,
    "color": "Blush Fade",
    "colorHex": "#8E8E8E",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "image": "/assets/designs/design-06-blush-fade.webp",
    "description": "A slow ombre melt from deep rose at the shoulders to near-white at the hem, like sunrise on fresh snow. SL stitched in deep aubergine.",
    "status": "concept",
    "stock": 12,
    "sourcePrice": {
      "amount": 129,
      "currency": "USD"
    }
  },
  {
    "id": "ember-sleeves",
    "slug": "ember-sleeves",
    "name": "Ember Sleeves",
    "category": "Hoodies",
    "price": 2490,
    "color": "Ember Sleeves",
    "colorHex": "#8E8E8E",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "image": "/assets/designs/design-07-ember-sleeves.webp",
    "description": "Matte black body, fire up both arms. Ember-orange flames climb from the cuffs and the hood is lined in burnt orange.",
    "status": "concept",
    "stock": 12,
    "sourcePrice": {
      "amount": 144,
      "currency": "USD"
    }
  },
  {
    "id": "aurora-speckle",
    "slug": "aurora-speckle",
    "name": "Aurora Speckle",
    "category": "Hoodies",
    "price": 2490,
    "color": "Aurora Speckle",
    "colorHex": "#DFEDFF",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "image": "/assets/designs/design-08-aurora-speckle.webp",
    "description": "Pale ice blue caught in a snow shower: an all-over speckle of white flakes woven through the whole garment. SL in deep aubergine.",
    "status": "concept",
    "stock": 12,
    "sourcePrice": {
      "amount": 134,
      "currency": "USD"
    }
  },
  {
    "id": "cream-retro-peaks",
    "slug": "cream-retro-peaks",
    "name": "Cream Retro Peaks",
    "category": "Hoodies",
    "price": 2490,
    "color": "Cream Retro Peaks",
    "colorHex": "#8E8E8E",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "image": "/assets/designs/design-09-cream-retro-peaks.webp",
    "description": "Warm cream with a vintage-wash 70s sunset over layered peaks in rust, amber and olive. Old soul, new fleece.",
    "status": "concept",
    "stock": 12,
    "sourcePrice": {
      "amount": 127,
      "currency": "USD"
    }
  },
  {
    "id": "frost-camo",
    "slug": "frost-camo",
    "name": "Frost Camo",
    "category": "Hoodies",
    "price": 2490,
    "color": "Frost Camo",
    "colorHex": "#8E8E8E",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "image": "/assets/designs/design-10-frost-camo.webp",
    "description": "Camouflage rewritten for winter: ice crystals and frost ferns in white and silver over heather grey.",
    "status": "concept",
    "stock": 12,
    "sourcePrice": {
      "amount": 132,
      "currency": "USD"
    }
  },
  {
    "id": "cloudy-swirl",
    "slug": "cloudy-swirl",
    "name": "Cloudy Swirl",
    "category": "Hoodies",
    "price": 2490,
    "color": "Cloudy Swirl",
    "colorHex": "#DFEDFF",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "image": "/assets/designs/design-11-cloudy-swirl.webp",
    "description": "Cloudy blue and white swirled like a winter sky. The dye moves differently on every piece, so no two are exactly alike.",
    "status": "concept",
    "stock": 12,
    "sourcePrice": {
      "amount": 126,
      "currency": "USD"
    }
  },
  {
    "id": "cement-patchwork",
    "slug": "cement-patchwork",
    "name": "Cement Patchwork",
    "category": "Hoodies",
    "price": 2490,
    "color": "Cement Patchwork",
    "colorHex": "#8E8E8E",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "image": "/assets/designs/design-12-cement-patchwork.webp",
    "description": "Hand-finished patchwork of cement greys, charcoal and stone with a single aubergine block down one side. SL in cloudy blue.",
    "status": "concept",
    "stock": 12,
    "sourcePrice": {
      "amount": 138,
      "currency": "USD"
    }
  },
  {
    "id": "glacier-one",
    "slug": "glacier-one",
    "name": "Glacier One",
    "category": "Hoodies",
    "price": 2490,
    "color": "Glacier One",
    "colorHex": "#DFEDFF",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "image": "/assets/hero/hero-glacier-one.webp",
    "description": "Winter hoodie colourway concept from the supplied SNOWLITE collection.",
    "status": "concept",
    "stock": 12,
    "sourcePrice": {
      "amount": 139,
      "currency": "USD"
    }
  },
  {
    "id": "midnight-freeze",
    "slug": "midnight-freeze",
    "name": "Midnight Freeze",
    "category": "Hoodies",
    "price": 2490,
    "color": "Midnight Freeze",
    "colorHex": "#8E8E8E",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "image": "/assets/colourways/product-midnight-freeze.png",
    "description": "Winter hoodie colourway concept from the supplied SNOWLITE collection.",
    "status": "concept",
    "stock": 12,
    "sourcePrice": {
      "amount": 129,
      "currency": "USD"
    }
  },
  {
    "id": "frostbite-grey",
    "slug": "frostbite-grey",
    "name": "Frostbite Grey",
    "category": "Hoodies",
    "price": 2490,
    "color": "Frostbite Grey",
    "colorHex": "#8E8E8E",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "image": "/assets/colourways/product-frostbite-grey.png",
    "description": "Winter hoodie colourway concept from the supplied SNOWLITE collection.",
    "status": "concept",
    "stock": 12,
    "sourcePrice": {
      "amount": 119,
      "currency": "USD"
    }
  },
  {
    "id": "aurora",
    "slug": "aurora",
    "name": "Aurora",
    "category": "Hoodies",
    "price": 2490,
    "color": "Aurora",
    "colorHex": "#DFEDFF",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "image": "/assets/colourways/product-aurora.png",
    "description": "Winter hoodie colourway concept from the supplied SNOWLITE collection.",
    "status": "concept",
    "stock": 12,
    "sourcePrice": {
      "amount": 134,
      "currency": "USD"
    }
  },
  {
    "id": "pine-cabin",
    "slug": "pine-cabin",
    "name": "Pine Cabin",
    "category": "Hoodies",
    "price": 2490,
    "color": "Pine Cabin",
    "colorHex": "#8E8E8E",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "image": "/assets/colourways/product-pine-cabin.png",
    "description": "Winter hoodie colourway concept from the supplied SNOWLITE collection.",
    "status": "concept",
    "stock": 12,
    "sourcePrice": {
      "amount": 124,
      "currency": "USD"
    }
  },
  {
    "id": "charcoal-storm",
    "slug": "charcoal-storm",
    "name": "Charcoal Storm",
    "category": "Hoodies",
    "price": 2490,
    "color": "Charcoal Storm",
    "colorHex": "#8E8E8E",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "image": "/assets/colourways/product-charcoal-storm.png",
    "description": "Winter hoodie colourway concept from the supplied SNOWLITE collection.",
    "status": "concept",
    "stock": 12,
    "sourcePrice": {
      "amount": 119,
      "currency": "USD"
    }
  },
  {
    "id": "blush-avalanche",
    "slug": "blush-avalanche",
    "name": "Blush Avalanche",
    "category": "Hoodies",
    "price": 2490,
    "color": "Blush Avalanche",
    "colorHex": "#8E8E8E",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "image": "/assets/colourways/product-blush-avalanche.png",
    "description": "Winter hoodie colourway concept from the supplied SNOWLITE collection.",
    "status": "concept",
    "stock": 12,
    "sourcePrice": {
      "amount": 129,
      "currency": "USD"
    }
  },
  {
    "id": "ember-night",
    "slug": "ember-night",
    "name": "Ember Night",
    "category": "Hoodies",
    "price": 2490,
    "color": "Ember Night",
    "colorHex": "#8E8E8E",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "image": "/assets/colourways/product-ember-night.png",
    "description": "Winter hoodie colourway concept from the supplied SNOWLITE collection.",
    "status": "concept",
    "stock": 12,
    "sourcePrice": {
      "amount": 144,
      "currency": "USD"
    }
  },
  {
    "id": "glacier-cream",
    "slug": "glacier-cream",
    "name": "Glacier Cream",
    "category": "Hoodies",
    "price": 2490,
    "color": "Glacier Cream",
    "colorHex": "#DFEDFF",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "image": "/assets/colourways/product-glacier-cream.png",
    "description": "Winter hoodie colourway concept from the supplied SNOWLITE collection.",
    "status": "concept",
    "stock": 12,
    "sourcePrice": {
      "amount": 124,
      "currency": "USD"
    }
  }
];
export const formatBDT = (amount: number) => '৳' + amount.toLocaleString('en-BD');

