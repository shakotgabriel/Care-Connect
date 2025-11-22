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
import React from 'react'

interface DoctorFormValues {
  userId: unknown
  name: string
  specialization: string
  email: string
  phone: string
}

interface DoctorFormValues {
  hospitalId: string  
  specialization: string
}
interface AddDoctorDialogProps {
  open: boolean
  onClose: () => void
  onAddDoctor: (doctor: DoctorFormValues) => void
}

export function AddDoctorDialog({ open, onClose, onAddDoctor }: AddDoctorDialogProps) {
  const { register, handleSubmit, reset } = useForm<DoctorFormValues>()

  const onSubmit = (data: DoctorFormValues) => {
    onAddDoctor(data)
    reset()
    onClose()
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
            <Input id="name" placeholder="Dr. John Doe" {...register('name', { required: true })} />
          </div>

          <div>
            <Label htmlFor="specialization">Specialization</Label>
            <Input
              id="specialization"
              placeholder="Cardiology"
              {...register('specialization', { required: true })}
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="email@example.com" {...register('email', { required: true })} />
          </div>

          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" placeholder="+1 555 111 1111" {...register('phone', { required: true })} />
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
