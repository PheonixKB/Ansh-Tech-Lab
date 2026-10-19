// Prefix an internal path with the site's base path so links work both on the
// custom domain (base "/") and on a github.io project address ("/repo-name").
export function withBase(path = "/"): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}/${path.replace(/^\//, "")}`;
}

// Strip the base path from a pathname so it can be compared to "/about/" etc.
export function stripBase(pathname: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const stripped =
    base && pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
  return stripped || "/";
}
