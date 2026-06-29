export type PropertyCategory = "Residential" | "Land" | "Commercial" | "Construction"

export type PropertyListing = {
  id: number
  slug: string
  title: string
  location: string
  city: string
  state: string
  price: string
  type: string
  category: PropertyCategory
  bedrooms?: number
  bathrooms?: number
  area: string
  plotSize?: string
  coverImage: string
  gallery: string[]
  walkthrough: {
    label: string
    image: string
    note: string
  }[]
  features: string[]
  description: string
  paymentPlan: {
    deposit: string
    tenor: string
    monthly: string
    note: string
  }
  gis: {
    coordinates: string
    mapsQuery: string
    routeSummary: string
    accessRoads: string[]
    nearby: string[]
    driveTimes: {
      label: string
      time: string
    }[]
  }
}

export const propertyListings: PropertyListing[] = [
  {
    id: 1,
    slug: "tarauni-court-duplex",
    title: "Tarauni Court 4-Bedroom Duplex",
    location: "Tarauni, Kano",
    city: "Kano",
    state: "Kano",
    price: "NGN 86,000,000",
    type: "For Sale",
    category: "Residential",
    bedrooms: 4,
    bathrooms: 5,
    area: "420 sqm built area",
    plotSize: "520 sqm plot",
    coverImage: "/img/home1.jpeg",
    gallery: ["/img/home1.jpeg", "/img/home2.jpeg", "/img/completed_homes.jpg"],
    walkthrough: [
      {
        label: "Street approach",
        image: "/img/home1.jpeg",
        note: "Clear frontage, visitor parking, and gated pedestrian access.",
      },
      {
        label: "Living room volume",
        image: "/img/home2.jpeg",
        note: "Open living and dining area with cross ventilation and tall windows.",
      },
      {
        label: "Rear service yard",
        image: "/img/home3.jpeg",
        note: "Separate utility access for staff, laundry, and generator enclosure.",
      },
    ],
    features: ["Stamped C of O", "Fitted kitchen", "BQ", "Solar-ready wiring", "Private parking", "Smart locks"],
    description:
      "A finished family duplex in a secure Kano neighbourhood with practical room sizes, clear documentation, and access to Stablebricks post-sale maintenance support.",
    paymentPlan: {
      deposit: "30% initial deposit",
      tenor: "Up to 18 months",
      monthly: "Structured milestone payments",
      note: "Title transfer begins after deposit confirmation and due diligence sign-off.",
    },
    gis: {
      coordinates: "11.9776, 8.5159",
      mapsQuery: "11.9776,8.5159",
      routeSummary: "Best access is through Zoo Road into Tarauni with an alternate approach from Maiduguri Road.",
      accessRoads: ["Zoo Road", "Tarauni Market Road", "Maiduguri Road connector"],
      nearby: ["Tarauni market", "Hamisu Abba Plaza", "Aminu Kano Teaching Hospital axis"],
      driveTimes: [
        { label: "Kano city centre", time: "18 min" },
        { label: "Mallam Aminu Kano Airport", time: "24 min" },
        { label: "AKTH axis", time: "12 min" },
      ],
    },
  },
  {
    id: 2,
    slug: "lekki-service-apartments",
    title: "Lekki Service Apartments",
    location: "Lekki Phase 1, Lagos",
    city: "Lagos",
    state: "Lagos",
    price: "NGN 68,500,000",
    type: "For Sale",
    category: "Residential",
    bedrooms: 3,
    bathrooms: 4,
    area: "220 sqm built area",
    plotSize: "Shared serviced estate",
    coverImage: "/img/completed_homes.jpg",
    gallery: ["/img/completed_homes.jpg", "/img/slider1.jpeg", "/img/slide2.jpg"],
    walkthrough: [
      {
        label: "Estate arrival",
        image: "/img/completed_homes.jpg",
        note: "Controlled entrance with visitor screening and internal paved roads.",
      },
      {
        label: "Apartment block",
        image: "/img/slider1.jpeg",
        note: "Low-rise block planned for efficient maintenance and strong daylight.",
      },
      {
        label: "Common facilities",
        image: "/img/slide2.jpg",
        note: "Shared power, treated water, and managed waste collection points.",
      },
    ],
    features: ["Serviced estate", "24/7 security", "Flexible payment", "Fitted wardrobes", "Backup power", "Managed facility"],
    description:
      "A practical apartment option for owner-occupiers and rental buyers who want professional estate management without speculative investment language.",
    paymentPlan: {
      deposit: "25% reservation deposit",
      tenor: "12 to 24 months",
      monthly: "Monthly or quarterly instalments",
      note: "Payment plan is subject to KYC, title checks, and unit availability.",
    },
    gis: {
      coordinates: "6.4474, 3.4723",
      mapsQuery: "Lekki Phase 1 Lagos",
      routeSummary: "Access through Admiralty Way with alternate movement from Freedom Way and the Lekki-Epe Expressway.",
      accessRoads: ["Admiralty Way", "Freedom Way", "Lekki-Epe Expressway"],
      nearby: ["Lekki Phase 1 gate", "Ikoyi Link Bridge", "Admiralty retail corridor"],
      driveTimes: [
        { label: "Ikoyi Link Bridge", time: "11 min" },
        { label: "Victoria Island", time: "20 min" },
        { label: "Lekki Conservation Centre", time: "22 min" },
      ],
    },
  },
  {
    id: 3,
    slug: "epe-growth-plots",
    title: "Epe Growth Corridor Plots",
    location: "Epe, Lagos",
    city: "Epe",
    state: "Lagos",
    price: "From NGN 9,800,000",
    type: "Plot Sale",
    category: "Land",
    area: "300 to 600 sqm",
    plotSize: "Dry land allocations",
    coverImage: "/img/slide3.jpg",
    gallery: ["/img/slide3.jpg", "/img/2148039977.jpg", "/img/construction-site.jpg"],
    walkthrough: [
      {
        label: "Survey approach",
        image: "/img/slide3.jpg",
        note: "Marked access corridor with survey references for buyer verification.",
      },
      {
        label: "Plot boundary",
        image: "/img/2148039977.jpg",
        note: "Dry plots suitable for residential layouts and phased construction.",
      },
      {
        label: "Neighbouring development",
        image: "/img/construction-site.jpg",
        note: "Nearby active works show emerging infrastructure and road grading.",
      },
    ],
    features: ["Registered survey", "Estate layout", "Dry plots", "Installment sale", "Commercial frontage options", "Allocation support"],
    description:
      "Residential and mixed-use plots in the Epe growth corridor for buyers who want land banking, personal building plans, or contractor-led development.",
    paymentPlan: {
      deposit: "20% initial deposit",
      tenor: "Up to 36 months",
      monthly: "Flexible monthly instalments",
      note: "Allocation is issued after agreed deposit and documentation review.",
    },
    gis: {
      coordinates: "6.5841, 3.9823",
      mapsQuery: "Epe Lagos",
      routeSummary: "Primary route is via Lekki-Epe Expressway, with access links toward Ijebu-Ode Road.",
      accessRoads: ["Lekki-Epe Expressway", "Epe-Ijebu Ode Road", "Internal estate road"],
      nearby: ["Epe resort axis", "Lagos Food Logistics Hub corridor", "Epe town centre"],
      driveTimes: [
        { label: "Epe town centre", time: "13 min" },
        { label: "Ajah", time: "48 min" },
        { label: "Lekki Phase 1", time: "72 min" },
      ],
    },
  },
  {
    id: 4,
    slug: "jabi-commercial-shell",
    title: "Jabi Commercial Shell",
    location: "Jabi, Abuja",
    city: "Abuja",
    state: "FCT",
    price: "NGN 145,000,000",
    type: "For Sale",
    category: "Commercial",
    bathrooms: 4,
    area: "510 sqm lettable area",
    plotSize: "Corner commercial plot",
    coverImage: "/img/slide4.webp",
    gallery: ["/img/slide4.webp", "/img/engineering-team.jpg", "/img/engineers-standing.jpg"],
    walkthrough: [
      {
        label: "Front elevation",
        image: "/img/slide4.webp",
        note: "High-visibility commercial frontage suitable for retail or offices.",
      },
      {
        label: "Technical inspection",
        image: "/img/engineering-team.jpg",
        note: "Stablebricks contractor team can complete fit-out and compliance works.",
      },
      {
        label: "Site meeting point",
        image: "/img/engineers-standing.jpg",
        note: "Dedicated access for contractors, deliveries, and client inspections.",
      },
    ],
    features: ["Commercial title", "Fit-out ready", "Corner access", "Delivery bay", "Parking allowance", "Contractor support"],
    description:
      "A commercial shell for businesses that need a visible Abuja address and a reliable construction partner for finishing, procurement, and handover.",
    paymentPlan: {
      deposit: "40% initial deposit",
      tenor: "Up to 12 months",
      monthly: "Milestone-linked payment schedule",
      note: "Fit-out procurement can be scoped separately after purchase agreement.",
    },
    gis: {
      coordinates: "9.0765, 7.3986",
      mapsQuery: "Jabi Abuja",
      routeSummary: "Accessible from Ahmadu Bello Way and the Jabi Lake corridor, with easy movement toward Wuse and Utako.",
      accessRoads: ["Ahmadu Bello Way", "Jabi Lake road", "Utako connector"],
      nearby: ["Jabi Lake Mall", "Utako market axis", "Wuse 2"],
      driveTimes: [
        { label: "Jabi Lake Mall", time: "7 min" },
        { label: "Wuse 2", time: "16 min" },
        { label: "Nnamdi Azikiwe Airport", time: "34 min" },
      ],
    },
  },
]

export function getPropertyBySlug(slug: string) {
  return propertyListings.find((property) => property.slug === slug)
}
