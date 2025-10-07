"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FormState = {
  name: string;
  email: string;
  frustration: string;
  priceRange: string;
  paymentStyle: string;
  heardFrom: string; // repurposed: open-ended notes
  botField: string; // honeypot
};

const initialForm: FormState = {
  name: "",
  email: "",
  frustration: "",
  priceRange: "",
  paymentStyle: "",
  heardFrom: "",
  botField: "",
};

export default function WaitlistForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialForm);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const onChange =
    (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (form.botField) return; // bot detected

    // Only name and email required
    if (!form.name.trim() || !form.email.trim()) {
      setErrorMsg("Please enter your name and email.");
      return;
    }
    if (!isValidEmail(form.email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "cv99x-waitlist" }),
      });

      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
      }

      router.push("/success");
      return;
    } catch (err) {
      setErrorMsg("Something went wrong. Please try again shortly.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  return (
    <main className="relative min-h-[90vh] w-full overflow-x-hidden bg-black text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 10%, rgba(255,255,255,0.08), transparent 35%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.06), transparent 40%), radial-gradient(circle at 30% 80%, rgba(255,255,255,0.05), transparent 45%)",
        }}
      />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
      <div className="mx-auto flex min-h-[90vh] max-w-3xl items-center px-6 py-16">
        <div className="w-full rounded-2xl border border-white/10 bg-white/[0.04] p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-md">
          <header className="mb-8 text-center">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
              Early Access
            </p>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Join the CV99x Early Access
            </h1>
            <p className="mt-3 text-sm text-white/70">
              CV99x – AI-powered resume and cover letter generator. One setup, infinite tailored resumes and job covers in seconds.
            </p>
          </header>

          <form onSubmit={onSubmit} className="space-y-6">
            {/* Honeypot */}
            <div className="hidden">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                name="company"
                autoComplete="off"
                tabIndex={-1}
                value={form.botField}
                onChange={onChange("botField")}
              />
            </div>

            {/* Row: Name + Email */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white/80">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={onChange("name")}
                  required
                  className="border-white/15 bg-white/5 text-white placeholder:text-white/40 focus-visible:ring-white/30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/80">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={onChange("email")}
                  required
                  className="border-white/15 bg-white/5 text-white placeholder:text-white/40 focus-visible:ring-white/30"
                />
              </div>
            </div>

            {/* Pricing + Payment */}
            <div className="grid grid-cols-1 gap-5">
              <div className="space-y-2">
                <Label className="text-white/80">
                  Have you ever used a resume or cover letter generator before? (optional)
                </Label>
                <Select
                  value={form.priceRange}
                  onValueChange={(v) => setForm((f) => ({ ...f, priceRange: v }))}
                >
                  <SelectTrigger className="border-white/15 bg-white/5 text-white focus:ring-0 focus-visible:ring-white/30">
                    <SelectValue placeholder="Select one" />
                  </SelectTrigger>
                  <SelectContent className="border-white/15 bg-[#0f0f12] text-white">
                    <SelectItem value="lt_0_50">Yes</SelectItem>
                    <SelectItem value="0_50_0_99">No</SelectItem>
                    <SelectItem value="gt_2">No, But I would like to try one!</SelectItem>
                  </SelectContent>
                </Select>
              </div>

            </div>

            <div className="space-y-2">
              <Label htmlFor="frustration" className="text-white/80">
                What frustrates you most about creating resumes or job applications today? (optional)
              </Label>
              <Textarea
                id="frustration"
                placeholder="Type your answer..."
                value={form.frustration}
                onChange={onChange("frustration")}
                className="min-h-[96px] border-white/15 bg-white/5 text-white placeholder:text-white/40 focus-visible:ring-white/30"
              />
            </div>

            {/* Alerts */}
            {errorMsg && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {errorMsg}
              </div>
            )}
            {successMsg && (
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                {successMsg}
              </div>
            )}

            {/* Submit */}
            <div className="pt-2">
              <Button
                type="submit"
                disabled={loading}
                className="cursor-pointer w-full rounded-xl bg-white text-black hover:bg-white/90"
                size="lg"
              >
                {loading ? "Joining..." : "Get Early Access"}
              </Button>
              <p className="mt-3 text-center text-xs text-white/50">
              Limited early invites only — priority access before public launch. For any query, contact{" "}
                <a 
                    href="mailto:support@cv99x.com" 
                    className="underline cursor-pointer hover:text-white"
                >
                    support@cv99x.com
                </a>
                </p>

            </div>
          </form>
        </div>
      </div>
    </main>
  );
}