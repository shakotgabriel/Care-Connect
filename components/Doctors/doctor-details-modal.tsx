'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '../../src/components/ui/dialog'
import { Button } from '../../src/components//ui/button'
import React from 'react'

interface DoctorDetailsModalProps {
  doctor: {
    name: string
    specialization: string
    email: string
    phone: string
  }
  open: boolean
  onClose: () => void
}

export function DoctorDetailsModal({ doctor, open, onClose }: DoctorDetailsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{doctor.name}</DialogTitle>
          <DialogDescription>
            Specialization: {doctor.specialization} <br />
            Email: {doctor.email} <br />
            Phone: {doctor.phone}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
