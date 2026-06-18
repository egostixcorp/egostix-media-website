import NextImage from "next/image";

export function Image({ src, alt, caption, priority = false }) {
  return (
    <figure className="my-10 space-y-3">
      <div className="overflow-hidden rounded border border-neutral-200 bg-neutral-50">
        <NextImage
          src={src}
          alt={alt}
          width={1200}
          height={720}
          priority={priority}
          className="h-auto w-full object-cover"
        />
      </div>
      {caption ? (
        <figcaption className="text-xs leading-relaxed text-neutral-600">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
