'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../../src/components/ui/dialog'
import { Button } from '../../src/components/ui/button'
import { Input } from '../../src/components/ui/input'
import { Label } from '../../src/components/ui/label'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth' 

interface DoctorFormValues {
  name: string
  email: string
  phone: string
  specialization: string
  hospitalId: string
  password: string
}

interface AddDoctorDialogProps {
  open: boolean
  onClose: () => void
  onDoctorAdded: () => void
}

export default function Doctors() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  interface Doctor {
    id: string;
    name: string;
    email: string;
    specialization: string;
    phone?: string;
    hospitalId?: string;
  }
const [doctors, setDoctors] = useState<Doctor[]>([]);
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
const { user } = useAuth();

useEffect(() => {
  if (!user) return;

  const fetchDoctors = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8000/doctors', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      // Handle paginated response
      if (result && Array.isArray(result.data)) {
        setDoctors(result.data);
      } else if (Array.isArray(result)) {
        // Fallback in case the API returns a direct array
        setDoctors(result);
      } else {
        console.warn('Unexpected response format:', result);
        setDoctors([]);
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
      setError('Failed to load doctors. Please try again later.');
      setDoctors([]);
    } finally {
      setIsLoading(false);
    }
  };

  fetchDoctors();
}, [user]);
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Doctors</h1>
        <Button onClick={() => setIsDialogOpen(true)}>Add Doctor</Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : error ? (
        <div className="p-4 text-red-500">{error}</div>
      ) : doctors.length === 0 ? (
        <div className="p-4 text-gray-500">No doctors found.</div>
      ) : (
        <div className="grid gap-4">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="border rounded-lg p-4">
              <h3 className="font-medium">{doctor.name}</h3>
              <p className="text-sm text-gray-500">{doctor.specialization}</p>
              <p className="text-sm text-gray-500">{doctor.email}</p>
            </div>
          ))}
        </div>
      )}

   <AddDoctorDialog 
  open={isDialogOpen} 
  onClose={() => setIsDialogOpen(false)}
  onDoctorAdded={() => {
    
    fetch('http://localhost:8000/doctors', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(result => {
      if (result && Array.isArray(result.data)) {
        setDoctors(result.data);
      } else if (Array.isArray(result)) {
        setDoctors(result);
      }
    });
  }}
/>
    </div>
  );
}

export function AddDoctorDialog({ open, onClose, onDoctorAdded }: AddDoctorDialogProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<DoctorFormValues>()
  const [hospitals, setHospitals] = useState<Array<{ id: string; name: string }>>([])
  useAuth()
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch('http://localhost:8000/hospitals')
        const data = await response.json()
        setHospitals(data)
      } catch (error) {
        console.error('Error fetching hospitals:', error)
      }
    }

    if (open) {
      fetchHospitals()
    }
  }, [open])

  const onSubmit = async (data: DoctorFormValues) => {
    try {
      const response = await fetch('http://localhost:8000/doctors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Ensure you have the token
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          password: data.password,
          roles: ['DOCTOR'], // This will trigger the doctor creation in UsersService
          hospitalId: data.hospitalId,
          specialization: data.specialization
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to create doctor')
      }

      reset()
      onDoctorAdded() // Refresh the doctors list
      onClose()
    } catch (error) {
      console.error('Error adding doctor:', error)
      alert(error instanceof Error ? error.message : 'Failed to add doctor')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Doctor</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              placeholder="Dr. John Doe" 
              {...register('name', { 
                required: 'Name is required',
                minLength: {
                  value: 3,
                  message: 'Name must be at least 3 characters',
                },
              })} 
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="email@example.com" 
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })} 
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input 
              id="phone" 
              placeholder="+1 555 111 1111" 
              {...register('phone', { 
                required: 'Phone number is required',
                pattern: {
                  value: /^\+?[0-9\s-]{10,}$/,
                  message: 'Please enter a valid phone number',
                },
              })} 
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="specialization">Specialization</Label>
            <Input
              id="specialization"
              placeholder="Cardiology"
              {...register('specialization', { 
                required: 'Specialization is required',
                minLength: {
                  value: 3,
                  message: 'Specialization must be at least 3 characters',
                },
              })}
            />
            {errors.specialization && (
              <p className="text-sm text-red-500">{errors.specialization.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              placeholder="Create a password" 
              {...register('password', { 
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
              })} 
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="hospitalId">Hospital</Label>
            <select
              id="hospitalId"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              {...register('hospitalId', { required: 'Hospital is required' })}
            >
              <option value="">Select a hospital</option>
              {hospitals.map((hospital) => (
                <option key={hospital.id} value={hospital.id}>
                  {hospital.name}
                </option>
              ))}
            </select>
            {errors.hospitalId && (
              <p className="text-sm text-red-500">{errors.hospitalId.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button type="submit">Add Doctor</Button>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}