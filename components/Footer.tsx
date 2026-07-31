export function Footer() {
  return (
    <footer className="mt-10 border-t border-lilac-edge bg-navy text-lilac/80">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-2 px-4 py-5 text-xs sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          <span className="font-bold text-white">AION</span> · Day 12
          Accessibility module — training playground.
        </p>
        <p>
          Everything runs in your browser. Progress is stored locally and never
          leaves this device.
        </p>
      </div>
    </footer>
  );
}
