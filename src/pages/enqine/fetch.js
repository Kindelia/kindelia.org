const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : ""; // TODO add production url to backend
export default function fetchAbsolute(url, { ...options }, ...otherParams) {
  if (options.data) {
    options.body = JSON.stringify({ ...options.data });
  }
  options.headers = {
    ...options.headers,
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  };
  return url.startsWith("/")
    ? fetch(BASE_URL + url, options, ...otherParams)
    : fetch(url, options, ...otherParams);
}
