"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import Link from 'next/link';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    password: '',
    password_confirm: ''
  });
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    if (formData.password !== formData.password_confirm) {
      setErrors({ password_confirm: ["Passwords do not match"] });
      setLoading(false);
      return;
    }

    try {
      await api.post('/api/auth/register/', formData);
      router.push('/login?registered=true');
    } catch (err: any) {
      setErrors(err.response?.data || { detail: 'Registration failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border border-gray-100 mb-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create an Account</h1>
      {errors.detail && <div className="bg-red-50 text-red-500 p-3 rounded mb-4 text-sm">{errors.detail}</div>}
      
      <form onSubmit={handleRegister} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input name="first_name" type="text" required onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-blue-500 focus:ring-blue-500 text-gray-900" />
            {errors.first_name && <span className="text-red-500 text-xs">{errors.first_name[0]}</span>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input name="last_name" type="text" required onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-blue-500 focus:ring-blue-500 text-gray-900" />
            {errors.last_name && <span className="text-red-500 text-xs">{errors.last_name[0]}</span>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email Address</label>
          <input name="email" type="email" required onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-blue-500 focus:ring-blue-500 text-gray-900" />
          {errors.email && <span className="text-red-500 text-xs">{errors.email[0]}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input name="phone_number" type="tel" onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-blue-500 focus:ring-blue-500 text-gray-900" />
          {errors.phone_number && <span className="text-red-500 text-xs">{errors.phone_number[0]}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input name="password" type="password" required onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-blue-500 focus:ring-blue-500 text-gray-900" />
          {errors.password && <span className="text-red-500 text-xs">{errors.password[0]}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input name="password_confirm" type="password" required onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-blue-500 focus:ring-blue-500 text-gray-900" />
          {errors.password_confirm && <span className="text-red-500 text-xs">{errors.password_confirm[0]}</span>}
        </div>

        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50 mt-4">
          {loading ? 'Creating Account...' : 'Register'}
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Login here</Link>
      </p>
    </div>
  );
}
