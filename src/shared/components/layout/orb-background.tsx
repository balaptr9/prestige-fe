export const OrbBackground = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-50 overflow-hidden"
    >
      {/* Orb 1 - Primary Color */}
      <div
        className="absolute top-[-20rem] left-[-25rem] h-[50rem] w-[50rem] animate-float-orb rounded-full bg-primary/30 blur-3xl"
        style={{ animationDelay: "0s", animationDuration: "20s" }}
      />

      {/* Orb 2 - Secondary Color */}
      <div
        className="absolute bottom-[-15rem] right-[-20rem] h-[40rem] w-[40rem] animate-float-orb rounded-full bg-secondary/30 blur-3xl"
        style={{ animationDelay: "-5s", animationDuration: "25s" }}
      />

      {/* Orb 3 - Primary Color (smaller, faster) */}
      <div
        className="absolute bottom-[10rem] left-[15rem] h-[25rem] w-[25rem] animate-float-orb rounded-full bg-primary/20 blur-2xl"
        style={{ animationDelay: "-10s", animationDuration: "18s" }}
      />
    </div>
  );
};