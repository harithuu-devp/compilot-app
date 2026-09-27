/** Ambient aurora backdrop: five radial blobs plus a noise overlay, all CSS only. */
export function AuroraBackground() {
  return (
    <div aria-hidden className="aurora-bg">
      <span className="aurora-bg__top" />
      <span className="aurora-bg__mid" />
      <span className="aurora-bg__bottom" />
    </div>
  );
}
