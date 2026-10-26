export type IconName =
  'bag' | 'tech' | 'sparkles' | 'arrow' | 'users' | 'tag' | 'bolt' | 'send' | 'phone' | 'whatsapp'

export function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {name === 'bag' && (
        <>
          <path d="M5 7.5h14l1 13H4l1-13Z" />
          <path d="M8.5 9V6a3.5 3.5 0 0 1 7 0v3" />
        </>
      )}
      {name === 'tech' && (
        <>
          <rect x="3" y="4" width="18" height="12" rx="2" />
          <path d="M8 21h8M12 16v5m-2.5-8.5L12 10l2.5 2.5" />
        </>
      )}
      {name === 'sparkles' && (
        <path d="m10 3 2.2 6.8L19 12l-6.8 2.2L10 21l-2.2-6.8L1 12l6.8-2.2L10 3Zm9-1 .9 2.1L22 5l-2.1.9L19 8l-.9-2.1L16 5l2.1-.9L19 2Z" />
      )}
      {name === 'arrow' && <path d="M5 12h14m-6-6 6 6-6 6" />}
      {name === 'users' && (
        <>
          <circle cx="12" cy="7.5" r="3.2" />
          <path d="M5.5 20v-1.5a4.5 4.5 0 0 1 4.5-4.5h4a4.5 4.5 0 0 1 4.5 4.5V20" />
          <circle cx="5" cy="9" r="2.2" />
          <circle cx="19" cy="9" r="2.2" />
          <path d="M1.5 18v-.8A3.2 3.2 0 0 1 4.7 14H5m17.5 4v-.8a3.2 3.2 0 0 0-3.2-3.2H19" />
        </>
      )}
      {name === 'tag' && (
        <>
          <path d="M12.6 2.6A2 2 0 0 0 11.2 2H4a2 2 0 0 0-2 2v7.2a2 2 0 0 0 .6 1.4l8.7 8.7a2.4 2.4 0 0 0 3.4 0l6.6-6.6a2.4 2.4 0 0 0 0-3.4Z" />
          <circle cx="7.5" cy="7.5" r="1.5" />
        </>
      )}
      {name === 'bolt' && (
        <path d="M13.5 2 4 13.5h7L10 22l10-12h-7.2L13.5 2Z" fill="currentColor" />
      )}
      {name === 'send' && (
        <path d="M21.5 2.5 2.8 9.6a.6.6 0 0 0 0 1.1l7.6 2.9 2.9 7.6a.6.6 0 0 0 1.1 0L21.5 2.5ZM10.4 13.6l4.4-4.4" />
      )}
      {name === 'phone' && (
        <path d="M21 16.4v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 1.1 3.7 2 2 0 0 1 3.1 1.5h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L7.1 9.4a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
      )}
      {name === 'whatsapp' && (
        <>
          <path
            d="M12 3.4a8.6 8.6 0 0 0-7.4 13L3.4 20.6l4.4-1.1A8.6 8.6 0 1 0 12 3.4Z"
            strokeWidth="1.8"
          />
          <path
            transform="translate(6.6 6.6) scale(.45)"
            fill="currentColor"
            stroke="none"
            d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2Z"
          />
        </>
      )}
    </svg>
  )
}
