// Single source of truth for all site content.
// Every item is tagged with where it came from. Nothing here is invented:
//   google        = Google Business Profile (captured 2026-11-03)
//   google-review = quoted verbatim from a public Google review
//   doordash      = the business's DoorDash online-ordering storefront
//   uber          = Uber Eats store page
//   press         = IMDb / Miami Herald (Netflix Street Food: USA)
//   social        = the business's Facebook / Instagram
//   framing       = short copy written for the site, based only on the sources above
// OWNER-CONFIRM marks anything the owner should check before a real launch.

export type Source = "google" | "google-review" | "doordash" | "uber" | "press" | "social" | "framing";

export const business = {
  name: "World’s Famous Souseman Soulfood", // google
  shortName: "Souseman Soulfood",
  owner: "Souseman Larry", // social, google-review
  category: "Soul food restaurant", // google
  address: {
    street: "15140 NW 33rd Ave", // google
    city: "Opa-locka",
    state: "FL",
    zip: "33054",
    full: "15140 NW 33rd Ave, Opa-locka, FL 33054",
  },
  geo: { lat: 25.9124131, lng: -80.2546387 }, // google
  phone: { display: "(786) 617-6472", tel: "+17866176472" }, // google
  googleMapsUrl:
    "https://www.google.com/maps/place/World%E2%80%99s+Famous+Souseman+Soulfood/@25.9124131,-80.2546387,17z/data=!4m6!3m5!1s0x88d9af00da8ec39b:0xd7721e12e7ab9221!8m2!3d25.9124131!4d-80.2546387!16s%2Fg%2F11t6zh9vz5",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=World%E2%80%99s+Famous+Souseman+Soulfood%2C+15140+NW+33rd+Ave%2C+Opa-locka%2C+FL+33054",
  mapEmbedUrl:
    "https://www.google.com/maps?q=World%E2%80%99s+Famous+Souseman+Soulfood,+15140+NW+33rd+Ave,+Opa-locka,+FL+33054&z=16&output=embed",
  rating: { score: 4.7, count: 108 }, // google
  order: {
    // doordash: the business's own DoorDash storefront (commission-free direct ordering page)
    primary: { label: "Order online", url: "https://order.online/store/worlds-famous-souseman-soul-food-opa-locka-28141365" },
    uberEats: { label: "Uber Eats", url: "https://www.ubereats.com/store/worlds-famous-souseman-soulfood/JcZVCY7CWM-npIL7R4B5sA" },
  },
  socials: [
    // social. OWNER-CONFIRM which pages to feature.
    { label: "Facebook", handle: "Souseman Larry", url: "https://www.facebook.com/souseman/" },
    { label: "Instagram", handle: "@souseman", url: "https://www.instagram.com/souseman/" },
  ],
  // google. Tz used to highlight today's row. OWNER-CONFIRM (reviews say delivery-app hours have been wrong).
  timezone: "America/New_York",
  hours: [
    { day: "Monday", short: "Mon", hours: "Closed", opens: null, closes: null },
    { day: "Tuesday", short: "Tue", hours: "3–8 PM", opens: "15:00", closes: "20:00" },
    { day: "Wednesday", short: "Wed", hours: "Closed", opens: null, closes: null },
    { day: "Thursday", short: "Thu", hours: "5–10 PM", opens: "17:00", closes: "22:00" },
    { day: "Friday", short: "Fri", hours: "5–10 PM", opens: "17:00", closes: "22:00" },
    { day: "Saturday", short: "Sat", hours: "5–10 PM", opens: "17:00", closes: "22:00" },
    { day: "Sunday", short: "Sun", hours: "3–8 PM", opens: "15:00", closes: "20:00" },
  ],
  press: {
    // press: IMDb tt21371368, Miami Herald
    outlet: "Netflix",
    show: "Street Food: USA",
    detail: "Season 1 · “Miami, Florida” · 2022",
  },
} as const;

export const copy = {
  // framing
  eyebrow: "Opa-locka · Miami",
  tagline: "The Miami souse Netflix came to film.",
  intro:
    "Pork souse, chicken souse, BBQ ribs and soul food dinners from Souseman Larry and family. Takeout in Opa-locka.",
  // framing, from press (Miami Herald describes souse as a vinegary, citrusy stew and a Black Miami staple)
  whatIsSouse:
    "Souse is a tangy stew of tender meat and potatoes in a vinegar-and-citrus broth, and a Black Miami staple. Larry’s is the one people line up for.",
  // framing, from google-review (fans from New York, Pennsylvania, West Palm and the Keys; family hospitality)
  story: [
    "Larry and his family serve souse, ribs and soul food dinners from NW 33rd Ave in Opa-locka. In 2022 Netflix featured him on Street Food: USA, in the episode about Miami.",
    "Since then, fans have driven in from West Palm and the Keys and flown in from New York for a cup. Reviewers talk about the food first, and the welcome right after.",
  ],
  // google-review: residential pickup location, call ahead, rotating menu
  goodToKnow: [
    {
      title: "It’s takeout, at a house",
      body: "Pickup is at a residential address, 15140 NW 33rd Ave. If it looks like a house, you’re in the right place.",
    },
    {
      title: "Call ahead",
      body: "Hours on delivery apps aren’t always right. Give Larry a call to check what’s cooking and when it’s ready.",
    },
    {
      title: "The board changes daily",
      body: "Some days it’s ribs and oxtail, some days it’s fish. Facebook and Instagram post the day’s menu.",
    },
  ],
} as const;

export type MenuItem = {
  name: string;
  blurb: string;
  image?: string; // file in public/images (see data/assets.json)
  imageAlt?: string;
  tag?: string;
};

// Featured items: names from doordash/google, photos from doordash storefront,
// blurbs are framing built on google-review comments. No prices on the site:
// delivery-app prices can differ from the counter. OWNER-CONFIRM prices & blurbs.
export const featured: MenuItem[] = [
  {
    name: "Pork Souse",
    blurb: "The one people drive in for. Reviewers keep saying it: all meat, no bones.",
    image: "pork-souse.webp",
    imageAlt: "A bowl of pork souse with potatoes in a peppery broth",
    tag: "House specialty",
  },
  {
    name: "Chicken Souse",
    blurb: "Tender chicken and potatoes in that same tangy broth. Regular or large.",
    image: "chicken-souse.webp",
    imageAlt: "A bowl of chicken souse with chicken pieces and potatoes",
  },
  {
    name: "BBQ Rib Sandwich",
    blurb: "Saucy rib meat piled high on white bread. A top seller on the delivery apps.",
    image: "bbq-rib-sandwich.webp",
    imageAlt: "BBQ rib sandwich piled with saucy rib meat on white bread",
  },
  {
    name: "BBQ Chicken Sandwich",
    blurb: "BBQ chicken on white bread, boxed up to go.",
    image: "bbq-chicken-sandwich.webp",
    imageAlt: "BBQ chicken sandwich on white bread in a takeout box",
  },
  {
    name: "Conch Salad",
    blurb: "A Miami favorite, made fresh and served cold.",
    image: "conch-salad.webp",
    imageAlt: "Conch salad with diced conch and tomato in citrus juice",
  },
  {
    name: "Buttercream Cake",
    blurb: "Grab a slice for the ride home.",
    image: "buttercream-cake.webp",
    imageAlt: "Slice of buttercream cake in a clear takeout container",
  },
];

// From google menu highlights + dishes named in google-review text. OWNER-CONFIRM current list.
export const board = {
  dinners: [
    "BBQ Rib Dinners",
    "Oxtail Dinners",
    "Fried Pork Chop Dinners",
    "Turkey Wings",
    "Snapper Fish Dinners",
    "Fish, Shrimp & Fries",
    "BBQ Chicken",
    "Turkey Souse",
    "Beef Soup",
  ],
  sides: [
    "Collard Greens",
    "Baked Mac & Cheese",
    "Rice & Pigeon Peas",
    "Seafood Rice",
    "Baked Beans",
    "Conch Fritters",
    "Boiled Peanuts",
  ],
};

export type Review = { name: string; stars: 5 | 4 | 3 | 2 | 1; year: number; text: string };

// google-review, quoted verbatim (whitespace only normalized). Year approximated from
// Google's relative date as of 2026-11-03. Displayed as first name + last initial.
export const reviews: Review[] = [
  {
    name: "Shawn D.",
    stars: 5,
    year: 2023,
    text: "I got a rib dinner and a pork souse. The dinner was good and the souse was great. The portions are also above average. I fully expected to have a cup full of bones with the souse, but it didnt have a single bone in it. All bang for my buck. Will definitely be a forever customer.",
  },
  {
    name: "FriSa B.",
    stars: 5,
    year: 2025,
    text: "We discovered World’s Famous Souseman Soulfood through a Netflix show and were blown away! We had the souse, ribs, collard greens, seafood rice, mac & cheese, and beans—every single dish was absolutely delicious. This place is a must-visit in Miami for anyone who loves great food. The whole family was incredibly kind and made us feel so welcome. Don’t be thrown off by the location next to a residential house—this is takeout food at its finest!",
  },
  {
    name: "Jed M.",
    stars: 5,
    year: 2024,
    text: "Larry is the real deal, being from Pennsylvania, we never have had souse. It was worth the time and drive (from the keys). Both the chicken and pork varieties were awesome, I would have to have both again. 2 adults and 2 children all approved, we ate everything in the car before we pulled out, Yes! Its that good and Larry is authentic! Just like TV, pretty sure this gentleman won't ever change, the world could use more Larrys (so I can get souse closer to home).",
  },
  {
    name: "D. J.",
    stars: 5,
    year: 2026,
    text: "I showed up at closing based on the reviews I figured I had to try it. Im from NY the owner told me they was closed when I showed up, I told him thank you next time ill try and come early. The owner was so pleasant he went and prepared me some Souse and let me tell you it was amazing. On my next trip from NY im coming back. Thank you got the good food and pleasant experience 🙏🏾",
  },
  {
    name: "VSG Queen",
    stars: 5,
    year: 2024,
    text: "The food is excellent and they give you a lot for your money. The owner is super friendly and makes sure you have a great experience. Can't wait to go back.",
  },
  {
    name: "Shenilla J.",
    stars: 5,
    year: 2023,
    text: "Pork souse was very delicious and clean, owner was extremely welcoming...will definitely be going back.",
  },
];
