import Image from "next/image"; // i will be using images later
import Link from "next/link";
import WaitlistForm from "./components/WaitlistForm";
import HeroCarousel from "./components/HeroCarousel";

// ...existing code...
export default function Home() {
  return (
    <div className="relative min-h-dvh overflow-x-clip overscroll-y-none bg-black text-white">
      {/* Background accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 10%, rgba(255,255,255,0.06), transparent 35%), radial-gradient(circle at 85% 20%, rgba(255,255,255,0.05), transparent 40%), radial-gradient(circle at 30% 85%, rgba(255,255,255,0.04), transparent 45%)",
        }}
      />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[28rem] w-[50rem] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />

      {/* Header */}
      <header className="relative z-10">
  <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
    <Link href="/" className="inline-flex items-center gap-2">
      {/* <div className="h-6 w-6 rounded-md bg-white" /> */}
      <Image
        src="/logo.png"
        alt="CV99x logo"
        width={60}
        height={60}
        priority
        className="w-[50px] h-[50px] rounded-md mr-0 pr-0" // enforce 100x100
      />
      <span className="text-xl font-semibold tracking-wide mx-0 px-0">CV99x</span>
    </Link>
    <nav className="hidden items-center gap-6 md:flex">
      <a href="#features" className="text-sm text-white/70 hover:text-white">Features</a>
      <a href="#waitlist" className="text-sm text-white/70 hover:text-white">Join waitlist</a>
      <a href="mailto:support@cv99x.com" className="text-sm text-white/70 hover:text-white">Contact</a>
    </nav>
  </div>
</header>

      {/* Hero */}
      <section className="relative z-10">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 pb-10 pt-8 md:grid-cols-2 md:pb-12 md:pt-16">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
              Early Access
            </p>
            <h1 className="text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
              AI resumes + covers. One setup. Infinite tailored applications.
            </h1>
            <p className="mt-4 max-w-xl text-white/70">
              Generate ATS-friendly resumes and cover letters for each job in seconds.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href="#waitlist"
                className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-medium text-black hover:bg-white/90"
              >
                Join the waitlist
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white/90 hover:bg-white/10"
              >
                Learn more
              </a>
            </div>
            <div className="mt-6 flex items-center gap-6 text-xs text-white/50">
              <span>Most Advanced Resume Generator</span>
              <span>Adaptable</span>
              <span>Early adopter perks</span>
            </div>
          </div>

          {/* Replace with Image Corousel */}
          <div className="relative h-64 w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur md:h-80">
          <HeroCarousel
            images={["/appBanner1.png", "/appBanner2.png", "/appBanner3.png", "/appBanner4.png", "/appBanner5.png"]}
            fit="cover"
          />
          </div>
        </div>
      </section>

      {/* Waitlist section (your full form) */}
      <section id="waitlist" className="relative z-10">
        <WaitlistForm />
      </section>

      {/* Features */}
      <section id="features" className="relative z-10">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Why CV99x</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <h3 className="font-medium">Tailored per job</h3>
              <p className="mt-2 text-sm text-white/70">
                Feed a job link or description—get a resume and cover tuned to that role.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <h3 className="font-medium">ATS-friendly</h3>
              <p className="mt-2 text-sm text-white/70">
                Clean structure and keywords to pass automated screenings.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <h3 className="font-medium">Pay-as-you-go</h3>
              <p className="mt-2 text-sm text-white/70">
                Super Affordable & only pay when you generate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-xs text-white/60 md:flex-row">
          <p>© {new Date().getFullYear()} CV99x. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="mailto:support@cv99x.com" className="hover:text-white">support@cv99x.com</a>
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
