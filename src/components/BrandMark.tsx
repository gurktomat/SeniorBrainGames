interface BrandMarkProps {
  size?: number;
  className?: string;
}

/**
 * SeniorBrainGames brand mark — petal cluster with a central node.
 * Renders inside a gradient square in the header; no background of its own.
 */
export default function BrandMark({ size = 32, className }: BrandMarkProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <g transform="translate(16 16)">
        <circle r="4" cy="-8" fill="#C08A1A" />
        <circle r="4" cx="7" cy="4" fill="#B54A2B" />
        <circle r="4" cx="-7" cy="4" fill="#FFFFFF" fillOpacity="0.95" />
        <circle r="3.2" fill="#FFFFFF" />
        <circle r="1.3" fill="#124A30" />
      </g>
    </svg>
  );
}
