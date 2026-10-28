interface RatingProps {
  value: number;
  max?: number;
}

const Rating = ({ value, max = 5 }: RatingProps) => {
  const rating = Math.min(max, Math.max(0, value));

  return (
    <div
      className="inline-flex items-center gap-1"
      role="img"
      aria-label={`Calificación: ${rating} de ${max}`}
    >
      {Array.from({ length: max }, (_, index) => {
        const fill = Math.min(1, Math.max(0, rating - index));

        return (
          <span
            key={index}
            className="relative inline-block size-5"
            aria-hidden="true"
          >
            {/* Base */}
            <svg
              viewBox="0 0 24 24"
              className="absolute inset-0 size-full"
              fill="#758477"
            >
              <path
                className="text-border"
                d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3.1-5.8 3.1 1.1-6.5-4.7-4.6 6.5-.9z"
              />
            </svg>

            {/* Relleno */}
            <svg
              viewBox="0 0 24 24"
              className="absolute inset-0 size-full"
              fill="#2D3432"
              style={{
                clipPath: `inset(0 ${(1 - fill) * 100}% 0 0)`,
              }}
            >
              <path
                d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3.1-5.8 3.1 1.1-6.5-4.7-4.6 6.5-.9z"
              />
            </svg>
          </span>
        );
      })}

      <span className="ml-1 text-sm text-text-secondary">
        {rating.toFixed(2).replace(/0+$/, "").replace(/\.$/, "")}
      </span>
    </div>
  );
};

export default Rating;
