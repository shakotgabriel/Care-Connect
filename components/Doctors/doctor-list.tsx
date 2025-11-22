'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../src/components/ui/table'
import { Button } from '../../src/components/ui/button'
import { Eye, Edit, Trash } from 'lucide-react'
import { DoctorDetailsModal } from './doctor-details-modal'
interface Doctor {
  id: string
  name: string
  specialization: string
  email: string
  phone: string
}

interface DoctorListProps {
  doctors: Doctor[]
}

export function DoctorList({ doctors }: DoctorListProps) {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const handleView = (doctor: Doctor) => {
    setSelectedDoctor(doctor)
    setModalOpen(true)
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Specialization</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {doctors.map((doctor) => (
            <TableRow key={doctor.id}>
              <TableCell>{doctor.name}</TableCell>
              <TableCell>{doctor.specialization}</TableCell>
              <TableCell>{doctor.email}</TableCell>
              <TableCell>{doctor.phone}</TableCell>
              <TableCell className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleView(doctor)}>
                  <Eye className="h-4 w-4 mr-1" /> View
                </Button>
                <Button size="sm" variant="secondary">
                  <Edit className="h-4 w-4 mr-1" /> Edit
                </Button>
                <Button size="sm" variant="destructive">
                  <Trash className="h-4 w-4 mr-1" /> Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedDoctor && (
        <DoctorDetailsModal
          doctor={selectedDoctor}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  )
}
