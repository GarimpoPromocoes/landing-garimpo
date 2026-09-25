type Site = { name: string; title: string; description: string; locale: string; themeColor: string }
export function getSiteOrigin(value?: string): string
export function getMetadata(site: Site, origin: string): string
export function getRobots(origin: string): string
export function getSitemap(origin: string): string
