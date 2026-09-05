export type FeedbackSlide = {
  src: string;
  alt: string;
  caption: string;
  quote?: string;
};

export const feedbackSlides: FeedbackSlide[] = [
  {
    src: "/feedback/client-review.jpg",
    alt: "Client feedback graphic praising PBZ Rentals for short-notice booking, clean tables and chairs, and early morning delivery",
    caption: "Client feedback",
    quote:
      "Short notice pero na-accommodate ng sobra. Ang lilinis pa ng tables and chairs — highly recommended!",
  },
  {
    src: "/feedback/ready-for-delivery.jpg",
    alt: "Stacks of white Uratex chairs and folded Lifetime tables ready for a PBZ Rentals delivery",
    caption: "Clean chairs, ready to go",
    quote: "Inventory is wiped and stacked before every event.",
  },
  {
    src: "/feedback/event-inventory.jpg",
    alt: "White monoblock chairs and folded rectangular tables lined up at a covered court",
    caption: "Tables & chairs on site",
    quote: "Same Lifetime tables and Uratex chairs you see in our catalog.",
  },
  {
    src: "/feedback/free-delivery.jpg",
    alt: "PBZ Rentals flyer advertising free delivery within the Dita area",
    caption: "Free delivery in Dita",
    quote: "We bring tables, chairs, and tents to your doorstep within Dita.",
  },
  {
    src: "/feedback/product-lineup.jpg",
    alt: "PBZ Rentals flyer showing Uratex chairs, Lifetime tables, and a retractable tent",
    caption: "Chairs, tables, tents",
    quote: "Uratex chairs, Lifetime 4ft and 6ft tables, plus Homstar pop-up tents.",
  },
  {
    src: "/feedback/tent-sizes.jpg",
    alt: "Retractable tent flyer with 2x2, 3x3, and 3x4.5 meter sizes",
    caption: "Tent sizes that fit",
    quote: "2×2 m, 3×3 m, and 3×4.5 m heavy-duty pop-up canopies.",
  },
  {
    src: "/feedback/brand-banner.jpg",
    alt: "PBZ Rentals banner with a white chair, folding table, and glowing event tent",
    caption: "Perfect for any occasion",
    quote: "Birthdays, debuts, fiestas, and backyard parties in Santa Rosa.",
  },
  {
    src: "/feedback/tent-nearby.jpg",
    alt: "Homstar pop-up tent flyer listing available sizes and free delivery for nearby areas",
    caption: "Nearby areas, free drop-off",
    quote: "Free delivery for nearby areas — just message us to lock the date.",
  },
];
