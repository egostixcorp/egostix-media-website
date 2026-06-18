export function Quote({ children }) {
  return (
    <blockquote className="my-8 border-l-2 border-blue-600 pl-5 font-serif text-xl leading-relaxed text-neutral-900 tablet:text-2xl">
      {children}
    </blockquote>
  );
}
