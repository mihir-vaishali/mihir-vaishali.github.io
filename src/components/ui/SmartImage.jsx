import { useEffect, useState } from "react";

import { placeholderImage } from "../../lib/placeholder";

/**
 * An image that degrades into a designed placeholder instead of a broken icon
 * when the file is missing — handy while real photography is still being
 * collected from the couple.
 */
export function SmartImage({
  src,
  alt,
  placeholderLabel = "Photo",
  seed = 0,
  className = "",
  ...rest
}) {
  const [failed, setFailed] = useState(false);

  useEffect(() => setFailed(false), [src]);

  const resolved = failed || !src ? placeholderImage(placeholderLabel, seed) : src;

  return (
    <img
      {...rest}
      src={resolved}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
