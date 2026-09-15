export type Store = {
  id: string
  name: string
  slug: string
  category: string
  couponCount: number
}

export const stores: Store[] = [
  {
    id: "temu",
    name: "Temu",
    slug: "temu",
    category: "Shopping",
    couponCount: 12,
  },
  {
    id: "amazon",
    name: "Amazon",
    slug: "amazon",
    category: "Shopping",
    couponCount: 8,
  },
  {
    id: "nike",
    name: "Nike",
    slug: "nike",
    category: "Fashion",
    couponCount: 6,
  },
  {
    id: "adidas",
    name: "Adidas",
    slug: "adidas",
    category: "Fashion",
    couponCount: 7,
  },
  {
    id: "shein",
    name: "SHEIN",
    slug: "shein",
    category: "Fashion",
    couponCount: 15,
  },
  {
    id: "aliexpress",
    name: "AliExpress",
    slug: "aliexpress",
    category: "Shopping",
    couponCount: 18,
  },
  {
    id: "sephora",
    name: "Sephora",
    slug: "sephora",
    category: "Beauty",
    couponCount: 5,
  },
  {
    id: "zalando",
    name: "Zalando",
    slug: "zalando",
    category: "Fashion",
    couponCount: 9,
  },
]