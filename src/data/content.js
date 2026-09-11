export const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'menu', label: 'Menu' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact' },
]

export const STATS = [
  { value: 10, suffix: '+', label: 'Years Experience' },
  { value: 50, suffix: '+', label: 'Coffee Varieties' },
  { value: 1, suffix: 'K+', label: 'Happy Customers' },
]

export const MENU_CATEGORIES = [
  'All',
  'Espresso',
  'Cappuccino',
  'Latte',
  'Cold Coffee',
  'Desserts',
]

export const MENU_ITEMS = [
  {
    id: 1,
    name: 'Classic Espresso',
    description: 'A rich, concentrated shot with golden crema and deep roasted notes.',
    price: 120,
    category: 'Espresso',
    popular: true,
    image:
      'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    name: 'Doppio',
    description: 'A double espresso for those who like their mornings extra bold.',
    price: 150,
    category: 'Espresso',
    image:
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    name: 'Caramel Macchiato',
    description: 'Espresso marked with foam and a ribbon of house caramel.',
    price: 180,
    category: 'Espresso',
    image:
      'https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    name: 'Classic Cappuccino',
    description: 'Equal parts espresso, steamed milk, and silk-smooth foam.',
    price: 170,
    category: 'Cappuccino',
    popular: true,
    image:
      'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    name: 'Vanilla Cappuccino',
    description: 'Soft vanilla syrup folded into a cloud of microfoam.',
    price: 190,
    category: 'Cappuccino',
    image:
      'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 6,
    name: 'Hazelnut Cappuccino',
    description: 'Toasted hazelnut aroma with a cocoa-dusted foam cap.',
    price: 200,
    category: 'Cappuccino',
    image:
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 7,
    name: 'Signature Latte',
    description: 'Velvety steamed milk over espresso, finished with latte art.',
    price: 180,
    category: 'Latte',
    popular: true,
    image:
      'https://images.unsplash.com/photo-1561882468-9110e03e0f78?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 8,
    name: 'Mocha Latte',
    description: 'Dark chocolate ganache melted into a creamy espresso latte.',
    price: 210,
    category: 'Latte',
    image:
      'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 9,
    name: 'Honey Cinnamon Latte',
    description: 'Wildflower honey and warm cinnamon over a double shot.',
    price: 200,
    category: 'Latte',
    image:
      'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 10,
    name: 'Iced Americano',
    description: 'Espresso stretched with cold water over crystal ice.',
    price: 160,
    category: 'Cold Coffee',
    image:
      'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 11,
    name: 'Cold Brew',
    description: 'Steeped for 16 hours — smooth, chocolatey, and naturally sweet.',
    price: 190,
    category: 'Cold Coffee',
    popular: true,
    image:
      'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 12,
    name: 'Caramel Frappe',
    description: 'Blended espresso, milk, and caramel with whipped cream.',
    price: 220,
    category: 'Cold Coffee',
    image:
      'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 13,
    name: 'Tiramisu Slice',
    description: 'Espresso-soaked ladyfingers, mascarpone, and cocoa.',
    price: 250,
    category: 'Desserts',
    image:
      'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 14,
    name: 'Almond Croissant',
    description: 'Buttery layers filled with toasted almond cream.',
    price: 140,
    category: 'Desserts',
    image:
      'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 15,
    name: 'Vanilla Cheesecake',
    description: 'Silky vanilla bean cheesecake on a dark cookie crust.',
    price: 260,
    category: 'Desserts',
    popular: true,
    image:
      'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80',
  },
]

export const OFFERS = [
  {
    id: 1,
    title: 'Morning Brew Hour',
    subtitle: 'Weekdays before 11 AM',
    description: 'Start your day with any espresso drink and enjoy a warm pastry on the house.',
    discount: '20% OFF',
    image:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=80',
    cta: 'Claim Offer',
  },
  {
    id: 2,
    title: "Today's Signature",
    subtitle: 'Honey Cinnamon Latte',
    description: 'Our barista special — floral honey, cinnamon dust, and a double espresso.',
    discount: 'BOGO',
    image:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1000&q=80',
    cta: 'Order Now',
    featured: true,
  },
  {
    id: 3,
    title: 'Weekend Dessert Duo',
    subtitle: 'Saturday & Sunday',
    description: 'Pair any dessert with a cappuccino and save on the perfect café afternoon.',
    discount: '30% OFF',
    image:
      'https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&w=1000&q=80',
    cta: 'See Desserts',
  },
]

export const GALLERY_ITEMS = [
  {
    id: 1,
    title: 'Latte Art',
    span: 'col-span-2 row-span-2 md:col-span-2 md:row-span-2',
    image:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 2,
    title: 'Fresh Roast',
    span: '',
    image:
      'https://images.unsplash.com/photo-1447933601403-0c898ea71d91?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'Café Corner',
    span: '',
    image:
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    title: 'Pour Over',
    span: 'col-span-2 md:col-span-2',
    image:
      'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 5,
    title: 'Pastry Case',
    span: '',
    image:
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 6,
    title: 'Barista Craft',
    span: '',
    image:
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 7,
    title: 'Cozy Tables',
    span: 'col-span-2 md:col-span-2',
    image:
      'https://images.unsplash.com/photo-1521017432531-fbd92e7681d1?auto=format&fit=crop&w=1200&q=80',
  },
]

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Maya Chen',
    role: 'Food Blogger',
    rating: 5,
    quote:
      'Aroma Haven feels like a hidden chapter of the city. The honey cinnamon latte is unforgettable, and the staff remember your name.',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    name: 'James Ortiz',
    role: 'Architect',
    rating: 5,
    quote:
      'I write here every Friday morning. Quiet jazz, perfect cappuccino foam, and a corner window that makes Bengaluru look like a painting.',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    name: 'Priya Nair',
    role: 'Photographer',
    rating: 5,
    quote:
      'The cold brew is silky, the desserts are generous, and every cup is plated like it belongs in a magazine. Instant favorite.',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 4,
    name: 'Daniel Brooks',
    role: 'Regular Guest',
    rating: 4,
    quote:
      'Ten years in and they still roast like it is opening week. Warm service, honest flavors, and the best almond croissant in town.',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  },
]

export const CONTACT_INFO = {
  address: '42, 12th Main Road, Indiranagar, Bengaluru, Karnataka 560038',
  phone: '+91 98765 43210',
  email: 'hello@aromahaven.in',
  hours: [
    { days: 'Monday – Friday', time: '7:00 AM – 10:00 PM' },
    { days: 'Saturday – Sunday', time: '8:00 AM – 11:00 PM' },
  ],
}
