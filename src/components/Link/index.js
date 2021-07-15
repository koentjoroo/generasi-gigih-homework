import "./Link.css";

export default function Link({ to: url, isExternal = false, children }) {
  return (
    <a
      className="Link"
      href={url}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
    >
      {children}
    </a>
  );
}
