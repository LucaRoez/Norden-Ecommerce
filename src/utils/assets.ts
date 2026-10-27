const assets = import.meta.glob(
  "/src/assets/**/*",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
) as Record<string, string>;

export function getAsset(path: string): string {
  const normalizedPath = path.startsWith("/")
    ? path
    : `/src/${path}`;

  const asset = assets[normalizedPath];

  if (!asset) {
    console.warn(`No se encontró el asset: ${normalizedPath}`);
    return "";
  }

  return asset;
}