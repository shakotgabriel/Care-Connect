'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../src/components/ui/card'
import { Button } from '../../src/components/ui/button'
import { Badge } from '../../src/components/ui/badge'
import { Eye, Edit, Trash } from 'lucide-react'
import { DoctorDetailsModal } from './doctor-details-modal'
import React from 'react'

interface Doctor {
  id: string
  name: string
  specialization: string
  email: string
  phone: string
}

interface DoctorCardProps {
  doctor: Doctor
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  const [isModalOpen, setModalOpen] = useState(false)

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className='text-lg font-bold'>{doctor.name}</CardTitle>
          <CardDescription>
            <Badge>{doctor.specialization}</Badge> 
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Email: {doctor.email}</p>
          <p>Phone: {doctor.phone}</p>
        </CardContent>
        <div className="flex justify-end gap-2 p-2">
          <Button size="sm" variant="outline" onClick={() => setModalOpen(true)}>
            <Eye className="mr-1 h-4 w-4" /> View
          </Button>
          <Button size="sm" variant="secondary">
            <Edit className="mr-1 h-4 w-4" /> Edit
          </Button>
          <Button size="sm" variant="destructive">
            <Trash className="mr-1 h-4 w-4" /> Delete
          </Button>
        </div>
      </Card>

  
      <DoctorDetailsModal
        doctor={doctor}
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  )
}
