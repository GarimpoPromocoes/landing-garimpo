type IconName = 'bag' | 'tech' | 'sparkles' | 'arrow'

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
          <path d="M8 21h8M12 16v5m-3-12 2 2-2 2m5 0h2" />
        </>
      )}
      {name === 'sparkles' && (
        <path d="m10 3 2.2 6.8L19 12l-6.8 2.2L10 21l-2.2-6.8L1 12l6.8-2.2L10 3Zm9-1 .9 2.1L22 5l-2.1.9L19 8l-.9-2.1L16 5l2.1-.9L19 2Z" />
      )}
      {name === 'arrow' && <path d="M5 12h14m-6-6 6 6-6 6" />}
    </svg>
  )
}
