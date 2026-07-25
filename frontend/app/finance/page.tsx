'use client';

import { FormEvent } from 'react';

const whatsappNumber = '919500008454';

function openWhatsApp(message: string) {
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

function getFormValue(form: HTMLFormElement, name: string) {
  const value = new FormData(form).get(name);
  return typeof value === 'string' ? value.trim() : '';
}

function handleFinanceSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const form = event.currentTarget;
  openWhatsApp([
    'Hello 91 Insurance Services, I want to apply for Vehicle Finance:',
    `Name: ${getFormValue(form, 'name')}`,
    `Phone: ${getFormValue(form, 'phone')}`,
    `Loan Service: ${getFormValue(form, 'loan_service')}`,
    `Required Amount: ${getFormValue(form, 'amount')}`,
  ].join('\n'));
}

const inputClass =
  'mt-2 h-14 w-full rounded-2xl border border-[#F4D06F]/30 bg-white px-4 text-sm text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#D4AF37] focus:ring-4 focus:ring-[#F4D06F]/20';
const selectClass = `${inputClass} appearance-none pr-12`;
const labelClass = 'block text-sm font-semibold text-slate-700';

export default function FinancePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(244,208,111,0.18),_transparent_28%),radial-gradient(circle_at_85%_12%,_rgba(212,175,55,0.16),_transparent_24%),linear-gradient(180deg,_#0057D9_0%,_#0048b2_100%)] px-3 py-4 text-white sm:px-6 sm:py-10">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:72px_72px] opacity-35" />

      <div className="relative mx-auto grid max-w-6xl gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="overflow-hidden rounded-[1.75rem] border border-[#F4D06F]/20 bg-white/10 px-5 py-8 text-white shadow-[0_30px_80px_rgba(15,23,42,0.18)] backdrop-blur sm:px-8 sm:py-10">
          <div className="inline-flex items-center rounded-full border border-[#F4D06F]/25 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-[#F4D06F]">
            Vehicle finance
          </div>
          <h1 className="mt-5 max-w-md text-3xl font-semibold leading-tight sm:text-5xl">
            Apply for vehicle finance in one simple step.
          </h1>
          <p className="mt-4 max-w-md text-sm leading-7 text-white/80 sm:text-base">
            Share your details and loan requirement. We&apos;ll send the enquiry to WhatsApp and follow up quickly.
          </p>

          <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-3">
            {[
              ['Fast', 'Submit your finance request in under a minute.'],
              ['Clear', 'A clean vertical form with only the essentials.'],
              ['Direct', 'Your enquiry goes straight to WhatsApp.'],
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
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">Apply for vehicle finance</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              Fill out the form below and we&apos;ll connect with you on WhatsApp.
            </p>
          </div>

          <form onSubmit={handleFinanceSubmit} className="space-y-4 sm:space-y-5">
            <label className={labelClass}>
              Name
              <input required name="name" className={inputClass} placeholder="Kumar" />
            </label>

            <label className={labelClass}>
              Phone Number
              <input required name="phone" className={inputClass} placeholder="9876543210" />
            </label>

            <label className={`${labelClass} relative`}>
              Loan Requirement
              <select required name="loan_service" className={selectClass} defaultValue="New Vehicle Loan">
                <option>New Vehicle Loan</option>
                <option>Used Car Finance</option>
                <option>Refinance</option>
                <option>Top-up Loan</option>
              </select>
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="pointer-events-none absolute right-4 top-[3.1rem] h-4 w-4 text-[#D4AF37]"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </label>

            <label className={labelClass}>
              Required Loan Amount
              <input required name="amount" className={inputClass} placeholder="Rs. 3,00,000" />
            </label>

            <button
              type="submit"
              className="inline-flex h-14 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#F4D06F] px-5 text-sm font-black text-slate-950 shadow-lg shadow-[#D4AF37]/25 transition hover:from-[#F4D06F] hover:to-[#D4AF37]"
            >
              Send via WhatsApp
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
