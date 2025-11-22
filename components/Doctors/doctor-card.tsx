'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../src/components/ui/card'
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
      <Card className="w-full hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
         
          <div className="space-y-2">
            <CardTitle className="text-xl font-bold">{doctor.name}</CardTitle>
            <Badge className="w-fit">{doctor.specialization}</Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">Email</p>
              <p className="text-sm break-all">{doctor.email}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">Phone</p>
              <p className="text-sm">{doctor.phone}</p>
            </div>
          </div>
          
          <div className="flex gap-2 pt-2">
            <Button size="sm" variant="outline" className="flex-1" onClick={() => setModalOpen(true)}>
              <Eye className="mr-2 h-4 w-4" /> View
            </Button>
            <Button size="sm" variant="secondary" className="flex-1">
              <Edit className="mr-2 h-4 w-4" /> Edit
            </Button>
            <Button size="sm" variant="destructive" className="flex-1">
              <Trash className="mr-2 h-4 w-4" /> Delete
            </Button>
          </div>
        </CardContent>
      </Card>

      <DoctorDetailsModal
        doctor={doctor}
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  )
}
