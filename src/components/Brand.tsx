export function Brand() {
  return (
    <span className="brand" role="img" aria-label="Garimpo Promoções">
      <svg
        className="brand__mark"
        width="42"
        height="42"
        viewBox="0 0 42 42"
        fill="none"
        aria-hidden="true"
      >
        <path d="M13 4h16l9 12-17 23L4 16 13 4Z" fill="currentColor" />
        <path
          d="m14 5 7 33 7-33M5 16h32M14 5l7 11 7-11"
          stroke="var(--page-bg)"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
      <span className="brand__type">
        <span className="brand__name">
          garimpo<span className="brand__dot">.</span>
        </span>
        <span className="brand__descriptor">promoções</span>
      </span>
    </span>
  )
}
