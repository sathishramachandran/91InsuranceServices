'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';

const whatsappNumber = '919500008454';

function openWhatsApp(message: string) {
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

function getFormValue(form: HTMLFormElement, name: string) {
  const value = new FormData(form).get(name);
  return typeof value === 'string' ? value.trim() : '';
}

export default function QuoteRequestPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const form = event.currentTarget;
    openWhatsApp([
      'Hello 91 Insurance Services, I want to submit a renewal request:',
      `Name: ${getFormValue(form, 'name')}`,
      `Phone: ${getFormValue(form, 'phone')}`,
      `Policy Type: ${getFormValue(form, 'policy_type')}`,
      `Vehicle No: ${getFormValue(form, 'vehicle_no')}`,
      `Previous Insurance Company: ${getFormValue(form, 'previous_insurance_company')}`,
      `Expiry Date: ${getFormValue(form, 'expiry_date')}`,
      `Remarks: ${getFormValue(form, 'remarks')}`,
    ].join('\n'));

    setIsLoading(false);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(244,208,111,0.18),_transparent_28%),radial-gradient(circle_at_85%_12%,_rgba(212,175,55,0.16),_transparent_24%),linear-gradient(180deg,_#0057D9_0%,_#0048b2_100%)] px-3 py-4 text-white sm:px-6 sm:py-10">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:72px_72px] opacity-35" />

      <div className="relative mx-auto grid max-w-6xl gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="overflow-hidden rounded-[1.75rem] border border-[#F4D06F]/20 bg-white/10 px-5 py-8 text-white shadow-[0_30px_80px_rgba(15,23,42,0.18)] backdrop-blur sm:px-8 sm:py-10">
          <div className="inline-flex items-center rounded-full border border-[#F4D06F]/25 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-[#F4D06F]">
            Quote request
          </div>
          <h1 className="mt-5 max-w-md text-3xl font-semibold leading-tight sm:text-5xl">
            Submit your renewal request without login.
          </h1>
          <p className="mt-4 max-w-md text-sm leading-7 text-white/80 sm:text-base">
            Share your details and we&apos;ll send the renewal request directly to WhatsApp. No vehicle ID, no login, just a quick enquiry.
          </p>

          <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-3">
            {[
              ['Fast', 'Submit in under a minute.'],
              ['Direct', 'Message goes straight to WhatsApp.'],
              ['Simple', 'Only the fields you actually need.'],
            ].map(([title, copy]) => (
              <div key={title} className="rounded-3xl border border-[#F4D06F]/15 bg-white/10 p-4 backdrop-blur-sm">
                <div className="text-sm font-semibold text-white">{title}</div>
                <div className="mt-2 text-sm leading-6 text-white/75">{copy}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[1.75rem] border border-[#F4D06F]/20 bg-white p-5 shadow-[0_24px_70px_rgba(15,23,42,0.12)] sm:p-8">
          <div className="mb-6 sm:mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#D4AF37]">Start here</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">Submit your renewal request</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              Fill in the details below and we&apos;ll take it from there.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Name</span>
              <input
                type="text"
                name="name"
                required
                className="h-14 w-full rounded-2xl border border-[#F4D06F]/30 bg-white px-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#D4AF37] focus:ring-4 focus:ring-[#F4D06F]/20"
                placeholder="John"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Phone Number</span>
              <input
                type="tel"
                name="phone"
                required
                className="h-14 w-full rounded-2xl border border-[#F4D06F]/30 bg-white px-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#D4AF37] focus:ring-4 focus:ring-[#F4D06F]/20"
                placeholder="9876543210"
              />
            </label>

            <label className="relative block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Policy type</span>
              <select
                name="policy_type"
                defaultValue="Renewal"
                className="h-14 w-full appearance-none rounded-2xl border border-[#F4D06F]/30 bg-white px-4 pr-12 text-slate-900 outline-none transition focus:border-[#D4AF37] focus:ring-4 focus:ring-[#F4D06F]/20"
              >
                <option>Renewal</option>
                <option>New Policy</option>
              </select>
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="pointer-events-none absolute right-4 top-[3.15rem] h-4 w-4 text-[#D4AF37]"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Vehicle No</span>
              <input
                type="text"
                name="vehicle_no"
                required
                onChange={(event) => {
                  event.currentTarget.value = event.currentTarget.value.toUpperCase();
                }}
                className="h-14 w-full rounded-2xl border border-[#F4D06F]/30 bg-white px-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#D4AF37] focus:ring-4 focus:ring-[#F4D06F]/20"
                placeholder="TN-11-XX-XXXX"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Previous Insurance Company</span>
              <input
                type="text"
                name="previous_insurance_company"
                className="h-14 w-full rounded-2xl border border-[#F4D06F]/30 bg-white px-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#D4AF37] focus:ring-4 focus:ring-[#F4D06F]/20"
                placeholder="Example Insurance"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Expiry Date</span>
              <input
                type="date"
                name="expiry_date"
                className="h-14 w-full rounded-2xl border border-[#F4D06F]/30 bg-white px-4 text-slate-900 outline-none transition focus:border-[#D4AF37] focus:ring-4 focus:ring-[#F4D06F]/20"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Remarks</span>
              <textarea
                name="remarks"
                rows={4}
                className="w-full rounded-2xl border border-[#F4D06F]/30 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#D4AF37] focus:ring-4 focus:ring-[#F4D06F]/20"
                placeholder="Add any extra details"
              />
            </label>

            <div className="flex flex-col gap-3">
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex h-14 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#F4D06F] px-6 text-base font-semibold text-slate-950 shadow-lg shadow-[#D4AF37]/25 transition hover:from-[#F4D06F] hover:to-[#D4AF37] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? 'Submitting...' : 'Submit quote request'}
              </button>
              <Link
                href="/"
                className="inline-flex h-14 w-full items-center justify-center rounded-2xl border border-[#F4D06F]/25 bg-white px-6 text-base font-semibold text-slate-700 transition hover:border-[#D4AF37] hover:bg-[#F4D06F]/10"
              >
                Back to landing page
              </Link>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
