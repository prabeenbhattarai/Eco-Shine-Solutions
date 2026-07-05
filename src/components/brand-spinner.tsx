/** Small ring spinner that inherits the current text colour. */
export function BrandSpinner({
  size = 18,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`brand-spinner ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
