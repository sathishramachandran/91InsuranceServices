'use client';

import axios from 'axios';
import { useState } from 'react';
import { api } from '../../lib/api';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';

const registerSchema = z.object({
  full_name: z.string().min(2, 'Full name is required'),
  email: z.string().email('Enter a valid email address'),
  phone: z.string().min(10, 'Enter a valid phone number').max(15),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setStatusMessage(null);
    setIsLoading(true);

    try {
      await api.post('/auth/register', values);
      setStatusMessage('Registration successful! Please login to continue.');
      reset();
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data?.detail) {
        setStatusMessage(String(error.response.data.detail));
      } else {
        setStatusMessage('Registration failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 sm:px-10">
      <div className="mx-auto w-full max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/40">
        <div className="mb-10 flex flex-col gap-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">Create account</p>
          <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">Register for 91 Insurance Services</h1>
          <p className="mx-auto max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Register as a customer to add vehicles, upload documents, submit quote requests, and receive insurance policy updates.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Full Name</span>
              <input
                type="text"
                {...register('full_name')}
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              {errors.full_name && <p className="mt-2 text-sm text-red-600">{errors.full_name.message}</p>}
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Email address</span>
              <input
                type="email"
                {...register('email')}
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
            </label>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Phone number</span>
              <input
                type="tel"
                {...register('phone')}
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              {errors.phone && <p className="mt-2 text-sm text-red-600">{errors.phone.message}</p>}
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Password</span>
              <input
                type="password"
                {...register('password')}
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
            </label>
          </div>

          {statusMessage ? (
            <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-700">
              {statusMessage}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex w-full items-center justify-center rounded-2xl bg-blue-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? 'Registering…' : 'Create account'}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-600">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-700">
            Login here
          </Link>
        </p>
      </div>
    </main>
  );
}
