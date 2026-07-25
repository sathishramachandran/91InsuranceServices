'use client';

import { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

const vehicleSchema = z.object({
  vehicle_number: z.string().min(2, 'Vehicle number is required'),
  vehicle_type: z.string().min(2, 'Vehicle type is required'),
  manufacturer: z.string().min(2, 'Manufacturer is required'),
  model: z.string().min(1, 'Model is required'),
  fuel_type: z.string().min(2, 'Fuel type is required'),
  registration_year: z.number().int().gte(1900, 'Enter a valid year').lte(2100, 'Enter a valid year'),
  owner_name: z.string().min(2, 'Owner name is required'),
  engine_number: z.string().min(2, 'Engine number is required'),
  chassis_number: z.string().min(2, 'Chassis number is required'),
  rto: z.string().min(2, 'RTO is required'),
});

type VehicleFormValues = z.infer<typeof vehicleSchema>;

export default function AddVehiclePage() {
  const router = useRouter();
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      vehicle_number: '',
      vehicle_type: '',
      manufacturer: '',
      model: '',
      fuel_type: '',
      registration_year: new Date().getFullYear(),
      owner_name: '',
      engine_number: '',
      chassis_number: '',
      rto: '',
    },
  });

  const onSubmit = async (values: VehicleFormValues) => {
    setStatusMessage(null);
    setIsLoading(true);

    const token = window.localStorage.getItem('insurance_token');
    if (!token) {
      setStatusMessage('Please login to continue.');
      setIsLoading(false);
      router.push('/login');
      return;
    }

    try {
      await axios.post('http://localhost:8000/vehicles', values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      router.push('/dashboard');
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data?.detail) {
        setStatusMessage(String(error.response.data.detail));
      } else {
        setStatusMessage('Unable to add vehicle. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 sm:px-10">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/40">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.3em] text-sky-600">Add Vehicle</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">Register your vehicle for renewal</h1>
          <p className="mt-2 text-slate-600">Enter your vehicle details and submit your request to receive insurance quotes.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Vehicle Number</span>
              <input
                type="text"
                {...register('vehicle_number')}
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              {errors.vehicle_number && <p className="mt-2 text-sm text-red-600">{errors.vehicle_number.message}</p>}
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Vehicle Type</span>
              <input
                type="text"
                {...register('vehicle_type')}
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              {errors.vehicle_type && <p className="mt-2 text-sm text-red-600">{errors.vehicle_type.message}</p>}
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Manufacturer</span>
              <input
                type="text"
                {...register('manufacturer')}
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              {errors.manufacturer && <p className="mt-2 text-sm text-red-600">{errors.manufacturer.message}</p>}
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Model</span>
              <input
                type="text"
                {...register('model')}
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              {errors.model && <p className="mt-2 text-sm text-red-600">{errors.model.message}</p>}
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Fuel Type</span>
              <input
                type="text"
                {...register('fuel_type')}
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              {errors.fuel_type && <p className="mt-2 text-sm text-red-600">{errors.fuel_type.message}</p>}
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Registration Year</span>
              <input
                type="number"
                {...register('registration_year', { valueAsNumber: true })}
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              {errors.registration_year && <p className="mt-2 text-sm text-red-600">{errors.registration_year.message}</p>}
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Owner Name</span>
              <input
                type="text"
                {...register('owner_name')}
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              {errors.owner_name && <p className="mt-2 text-sm text-red-600">{errors.owner_name.message}</p>}
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Engine Number</span>
              <input
                type="text"
                {...register('engine_number')}
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              {errors.engine_number && <p className="mt-2 text-sm text-red-600">{errors.engine_number.message}</p>}
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Chassis Number</span>
              <input
                type="text"
                {...register('chassis_number')}
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              {errors.chassis_number && <p className="mt-2 text-sm text-red-600">{errors.chassis_number.message}</p>}
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">RTO</span>
              <input
                type="text"
                {...register('rto')}
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              {errors.rto && <p className="mt-2 text-sm text-red-600">{errors.rto.message}</p>}
            </label>
          </div>

          {statusMessage ? (
            <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-700">
              {statusMessage}
            </div>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex w-full items-center justify-center rounded-2xl bg-blue-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? 'Saving…' : 'Add vehicle'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/dashboard')}
              className="inline-flex w-full items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Back to dashboard
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
