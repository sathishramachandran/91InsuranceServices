'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { api, getAuthHeaders } from '../../../lib/api';

const quoteSchema = z.object({
  vehicle_id: z.string().min(1, 'Vehicle ID is required').regex(/^[0-9]+$/, 'Enter a valid vehicle ID'),
  name: z.string().min(1, 'Name is required'),
  claim: z.boolean(),
  name_transfer: z.boolean(),
  ncb: z.string().max(50).optional().or(z.literal('')),
  previous_insurance_company: z.string().max(100).optional().or(z.literal('')),
  expiry_date: z.string().optional().or(z.literal('')),
  remarks: z.string().max(500).optional().or(z.literal('')),
});

type QuoteFormValues = z.infer<typeof quoteSchema>;

function QuoteRequestForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      vehicle_id: '',
      name: '',
      claim: false,
      name_transfer: false,
      ncb: '',
      previous_insurance_company: '',
      expiry_date: '',
      remarks: '',
    },
  });

  useEffect(() => {
    const vehicleId = searchParams?.get('vehicle_id');
    if (vehicleId) setValue('vehicle_id', vehicleId);
  }, [searchParams, setValue]);

  const onSubmit = async (values: QuoteFormValues) => {
    setStatusMessage(null);
    setIsLoading(true);

    const token = window.localStorage.getItem('insurance_token');
    if (!token) {
      setStatusMessage('Please login to submit a quote request.');
      router.push('/login');
      return;
    }

    try {
      await api.post(
        '/quotes',
        {
          vehicle_id: Number(values.vehicle_id),
          claim: values.claim,
          name_transfer: values.name_transfer,
          ncb: values.ncb || null,
          previous_insurance_company: values.previous_insurance_company || null,
          expiry_date: values.expiry_date || null,
          remarks: values.remarks || null,
        },
        { headers: getAuthHeaders() }
      );
      setStatusMessage('Your quote request has been submitted successfully.');
      router.push('/dashboard');
    } catch (error: unknown) {
      setStatusMessage(error instanceof Error ? error.message : 'Unable to submit quote request. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
            Request a renewal quote in one clean step.
          </h1>
          <p className="mt-4 max-w-md text-sm leading-7 text-white/80 sm:text-base">
            Share the policy type, contact details, and vehicle number. We&apos;ll route the request to the right team and keep the next step simple.
          </p>

          <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-3">
            {[
              ['Fast', 'Send your request in under a minute.'],
              ['Clear', 'A focused form with only the essentials.'],
              ['Secure', 'Your details stay tied to your account.'],
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

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
            <label className="relative block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Policy type</span>
              <select
                {...register('claim', { setValueAs: (value) => value === 'true' })}
                className="h-14 w-full appearance-none rounded-2xl border border-[#F4D06F]/30 bg-white px-4 pr-12 text-slate-900 outline-none transition focus:border-[#D4AF37] focus:ring-4 focus:ring-[#F4D06F]/20"
                defaultValue="false"
              >
                <option value="false">Renewal</option>
                <option value="true">New Policy</option>
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
              <span className="mb-2 block text-sm font-medium text-slate-700">Vehicle ID</span>
              <input
                type="text"
                {...register('vehicle_id')}
                inputMode="numeric"
                className="h-14 w-full rounded-2xl border border-[#F4D06F]/30 bg-white px-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#D4AF37] focus:ring-4 focus:ring-[#F4D06F]/20"
                placeholder="123"
              />
              <p className="mt-2 text-xs text-slate-500">Enter the vehicle ID from your dashboard or vehicle record.</p>
              {errors.vehicle_id && <p className="mt-2 text-sm text-red-600">{errors.vehicle_id.message}</p>}
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Name</span>
              <input
                type="text"
                {...register('name')}
                className="h-14 w-full rounded-2xl border border-[#F4D06F]/30 bg-white px-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#D4AF37] focus:ring-4 focus:ring-[#F4D06F]/20"
                placeholder="John"
              />
              {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>}
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Phone Number</span>
              <input
                type="text"
                {...register('previous_insurance_company')}
                className="h-14 w-full rounded-2xl border border-[#F4D06F]/30 bg-white px-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#D4AF37] focus:ring-4 focus:ring-[#F4D06F]/20"
                placeholder="9876543210"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Vehicle No</span>
              <input
                type="text"
                {...register('remarks')}
                onChange={(event) => {
                  event.currentTarget.value = event.currentTarget.value.toUpperCase();
                }}
                className="h-14 w-full rounded-2xl border border-[#F4D06F]/30 bg-white px-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#D4AF37] focus:ring-4 focus:ring-[#F4D06F]/20"
                placeholder="TN-11-XX-XXXX"
              />
            </label>

            {statusMessage ? (
              <div className="rounded-3xl border border-[#F4D06F]/20 bg-[#F4D06F]/10 px-4 py-4 text-sm text-slate-900">
                {statusMessage}
              </div>
            ) : null}

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

export default function QuoteRequestPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#0057D9] px-6 py-10 sm:px-10" />}>
      <QuoteRequestForm />
    </Suspense>
  );
}
