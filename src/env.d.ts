declare global {
  /** Verdadeiro só em builds feitos na Vercel (variável VERCEL=1). Definido em vite.config.ts. */
  const __VERCEL_ANALYTICS__: boolean
}

export {}
