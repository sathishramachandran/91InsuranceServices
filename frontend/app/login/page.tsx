'use client';

import axios from 'axios';
import { useState } from 'react';
import { api } from '../../lib/api';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginFormValues) => {
    setStatusMessage(null);
    setIsLoading(true);

    try {
      const response = await api.post('/auth/login', values);
      window.localStorage.setItem('insurance_token', response.data.access_token);
      router.push('/dashboard');
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data?.detail) {
        setStatusMessage(String(error.response.data.detail));
      } else {
        setStatusMessage('Login failed. Please check your credentials and try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-transparent px-6 py-10 text-white sm:px-10">
      <div className="mx-auto w-full max-w-3xl rounded-[2rem] border border-[#F4D06F]/20 bg-white/10 p-8 shadow-xl shadow-slate-950/20 backdrop-blur">
        <div className="mb-10 flex flex-col gap-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#F4D06F]">Welcome back</p>
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">Login to your account</h1>
          <p className="mx-auto max-w-2xl text-sm leading-6 text-white/80 sm:text-base">
            Access your dashboard to manage vehicles, submit quote requests, and download insurance policies.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-white/80">Email address</span>
            <input
              type="email"
              {...register('email')}
              className="w-full rounded-2xl border border-[#F4D06F]/20 bg-white/10 px-4 py-3 text-white outline-none transition focus:border-[#D4AF37] focus:ring-2 focus:ring-[#F4D06F]/20"
            />
            {errors.email && <p className="mt-2 text-sm text-[#F4D06F]">{errors.email.message}</p>}
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-white/80">Password</span>
            <input
              type="password"
              {...register('password')}
              className="w-full rounded-2xl border border-[#F4D06F]/20 bg-white/10 px-4 py-3 text-white outline-none transition focus:border-[#D4AF37] focus:ring-2 focus:ring-[#F4D06F]/20"
            />
            {errors.password && <p className="mt-2 text-sm text-[#F4D06F]">{errors.password.message}</p>}
          </label>

          {statusMessage ? (
            <div className="rounded-3xl border border-[#F4D06F]/20 bg-white/10 px-4 py-4 text-sm text-white/80">
              {statusMessage}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex w-full items-center justify-center rounded-2xl bg-[#D4AF37] px-6 py-3 text-base font-semibold text-slate-950 transition hover:bg-[#F4D06F] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-600">
          New to 91 Insurance Services?{' '}
          <Link href="/register" className="font-semibold text-blue-600 hover:text-blue-700">
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
}
