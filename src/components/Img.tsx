import NextImage, { type ImageProps } from "next/image";

/**
 * next/image plus an instant preview: the tiny 128px copy of the photo sits behind it
 * as a background, so on a slow connection a section shows a soft version of the image
 * straight away instead of an empty box.
 */
export default function Img(props: ImageProps) {
  const { src, style } = props;
  if (typeof src !== "string" || !src.startsWith("/images/")) return <NextImage {...props} />;
  const preview = `/_img/128${src.replace(/\.(jpe?g|png|webp)$/i, ".webp")}`;
  return (
    <NextImage
      {...props}
      style={{
        backgroundImage: `url("${preview}")`,
        backgroundSize: "cover",
        backgroundPosition: (style?.objectPosition as string | undefined) ?? "center",
        ...style,
      }}
    />
  );
}
