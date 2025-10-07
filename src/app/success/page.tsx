import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
  return (
    <main className="min-h-dvh bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur">
        <h3 className="text-2xl font-semibold">Thank you for your feedback and for joining the CV99x waitlist!</h3>
        <p className="mt-2 text-sm text-white/70">
          We’re thrilled to have you with us. You’ll be the first to know when early access opens — and we can’t wait to help you transform your resume experience.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Button asChild size="sm" variant="secondary" className="border border-white/15 bg-white/5 text-white hover:bg-white/10">
            <a href="https://www.google.com" rel="noopener noreferrer">Exit</a>
          </Button>
          <Button asChild size="sm" className="bg-white text-black hover:bg-white/90">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}