'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const documentTypes = [
  { value: 'rc', label: 'Vehicle RC' },
  { value: 'previous_policy', label: 'Previous Insurance Policy' },
  { value: 'vehicle_image', label: 'Vehicle Image' },
  { value: 'driving_license', label: 'Driving License' },
  { value: 'other', label: 'Other Document' },
];

export default function UploadDocumentPage() {
  const router = useRouter();
  const [documentType, setDocumentType] = useState('rc');
  const [vehicleId, setVehicleId] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setFile(event.target.files[0]);
      setStatusMessage(null);
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMessage(null);

    if (!file) {
      setStatusMessage('Please select a file to upload.');
      return;
    }

    const token = window.localStorage.getItem('insurance_token');
    if (!token) {
      setStatusMessage('Please login to continue.');
      router.push('/login');
      return;
    }

    const formData = new FormData();
    formData.append('document_type', documentType);
    formData.append('file', file);
    if (vehicleId) {
      formData.append('vehicle_id', vehicleId);
    }

    setIsLoading(true);

    try {
      await axios.post('http://localhost:8000/documents', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setStatusMessage('Document uploaded successfully.');
      setFile(null);
      setVehicleId('');
      setDocumentType('rc');
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data?.detail) {
        setStatusMessage(String(error.response.data.detail));
      } else {
        setStatusMessage('Upload failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 sm:px-10">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/40">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.3em] text-sky-600">Upload document</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">Add RC or policy documents</h1>
          <p className="mt-2 text-slate-600">Upload documents securely to support your insurance quote request and policy renewal.</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Document Type</span>
              <select
                value={documentType}
                onChange={(event) => setDocumentType(event.target.value)}
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                {documentTypes.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Vehicle ID (optional)</span>
              <input
                type="number"
                value={vehicleId}
                onChange={(event) => setVehicleId(event.target.value)}
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="Enter vehicle ID"
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Choose file</span>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </label>

          {file ? (
            <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-700">
              Selected file: <strong>{file.name}</strong>
            </div>
          ) : null}

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
              {isLoading ? 'Uploading…' : 'Upload document'}
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
