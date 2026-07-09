export type GalleryCategory =
  | 'All'
  | 'Graphic Design'
  | 'Branding'
  | 'Video Editing'
  | 'Motion Graphics'
  | 'Social Media'

export interface GalleryItem {
  id: string
  title: string
  category: Exclude<GalleryCategory, 'All'>
  /** Recommended image brief for when real assets are sourced. */
  imageBrief: string
  /** Taller cells create the masonry effect — 'tall' | 'wide' | 'square'. */
  size: 'tall' | 'wide' | 'square'
}

export const galleryCategories: GalleryCategory[] = [
  'All',
  'Graphic Design',
  'Branding',
  'Video Editing',
  'Motion Graphics',
  'Social Media',
]

export const galleryItems: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Hohoe EP SHS Magazine Spread',
    category: 'Graphic Design',
    imageBrief: 'Magazine layout, editorial grid, 3:4',
    size: 'tall',
  },
  {
    id: 'g2',
    title: 'Cookie Tee Personal Brand Kit',
    category: 'Branding',
    imageBrief: 'Logo + color palette + mockup, 1:1',
    size: 'square',
  },
  {
    id: 'g3',
    title: 'StackUp Nest Visual Identity',
    category: 'Branding',
    imageBrief: 'Logo lockup on dark background, 1:1',
    size: 'square',
  },
  {
    id: 'g4',
    title: 'Cross Multimedia Print Campaign',
    category: 'Graphic Design',
    imageBrief: 'Flyer/poster series, 4:3',
    size: 'wide',
  },
  {
    id: 'g5',
    title: 'TV3 Segment Highlight Reel',
    category: 'Video Editing',
    imageBrief: 'Video thumbnail with play overlay, 16:9',
    size: 'wide',
  },
  {
    id: 'g6',
    title: 'StackUp Nest Explainer Motion',
    category: 'Motion Graphics',
    imageBrief: 'Animated UI walkthrough frame, 16:9',
    size: 'wide',
  },
  {
    id: 'g7',
    title: 'MediaCraft Instagram Templates',
    category: 'Social Media',
    imageBrief: 'Grid of Instagram post templates, 1:1',
    size: 'square',
  },
  {
    id: 'g8',
    title: 'Small Business Branding Set',
    category: 'Branding',
    imageBrief: 'Business card + stationery mockup, 3:4',
    size: 'tall',
  },
  {
    id: 'g9',
    title: 'Data Storefront Launch Assets',
    category: 'Social Media',
    imageBrief: 'Promo tile set for launch campaign, 1:1',
    size: 'square',
  },
]
