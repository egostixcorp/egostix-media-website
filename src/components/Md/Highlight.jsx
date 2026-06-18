export function Highlight({ children }) {
  return (
    <span className="my-6 inline-flex rounded border border-neutral-300 bg-white px-3 py-2 font-mono text-xs uppercase tracking-normal text-blue-700">
      {children}
    </span>
  );
}
