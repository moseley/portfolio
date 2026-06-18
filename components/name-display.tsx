export default function NameDisplay() {
  return (
    <h1
      className="font-bold leading-[1.05] tracking-tight"
      style={{ fontSize: "clamp(3rem, 10vw, 10rem)" }}
    >
      Jeremy
      <span className="sm:hidden">&nbsp;</span>
      <br className="hidden sm:block" />
      <span className="opacity-60">Moseley.</span>
    </h1>
  );
}
