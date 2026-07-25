'use client';

import Link from 'next/link';
import InsuranceMarquee from '../../components/InsuranceMarquee';

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#0057D9] px-5 py-10 text-white sm:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="rounded-[2rem] border border-[#F4D06F]/20 bg-white/10 p-8 shadow-xl shadow-slate-950/20 backdrop-blur">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[#F4D06F]">Customer dashboard</p>
              <h1 className="mt-3 text-3xl font-semibold text-white">Welcome back to 91 Insurance Services</h1>
              <p className="mt-2 text-white/80">Your dashboard now highlights the brand banner and trusted insurance partners only.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/quotes/request" className="rounded-2xl bg-[#D4AF37] px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#F4D06F]">
                Vehicle Insurance
              </Link>
              <Link href="/finance" className="rounded-2xl border border-[#F4D06F]/30 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                Vehicle Finance
              </Link>
            </div>
          </div>
        </section>

        <InsuranceMarquee />
      </div>
    </main>
  );
}
