import { Scene } from './components/Scene';

export default function Page() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-orange-500/10 via-transparent to-black"></div>
      <div className="z-10 w-full max-w-5xl px-6 pt-24 text-center">
        <h1 className="font-display text-5xl tracking-wide text-orange-100 drop-shadow-lg sm:text-6xl">
          Ganesha Golden Orchard Reverie
        </h1>
        <p className="mt-6 text-lg text-orange-200/80">
          A hyper-realistic cinematic tableau at golden hour as Lord Ganesha transforms a tranquil orchard into a radiant sea of orange light.
        </p>
      </div>
      <div className="z-0 mt-10 h-[60vh] w-full max-w-6xl overflow-hidden rounded-3xl border border-orange-400/30 bg-black/40 shadow-[0_0_80px_rgba(255,140,0,0.35)]">
        <Scene />
      </div>
      <div className="z-10 mt-10 flex flex-wrap justify-center gap-6 px-6 pb-16 text-sm text-orange-200/70">
        <div className="rounded-full border border-orange-500/40 px-4 py-2">
          4K Cinematic Lighting
        </div>
        <div className="rounded-full border border-orange-500/40 px-4 py-2">
          Volumetric Juice Cascade
        </div>
        <div className="rounded-full border border-orange-500/40 px-4 py-2">
          Reactive Liquid Physics
        </div>
      </div>
    </main>
  );
}
