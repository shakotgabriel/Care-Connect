'use client'

import { useState, ChangeEvent } from 'react'
import { Input } from '../../src/components/ui/input'
import { Button } from '../../src/components/ui/button'
import { Label } from '../../src/components/ui/label'
interface DoctorFiltersProps {
  onFilter: (filters: { name: string; specialization: string }) => void
}

export function DoctorFilters({ onFilter }: DoctorFiltersProps) {
  const [name, setName] = useState('')
  const [specialization, setSpecialization] = useState('')

  const handleFilter = () => {
    onFilter({ name, specialization })
  }

  const handleReset = () => {
    setName('')
    setSpecialization('')
    onFilter({ name: '', specialization: '' })
  }

  return (
    <div className="flex flex-wrap gap-4 items-end mb-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          placeholder="Search by name"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="specialization">Specialization</Label>
        <Input
          id="specialization"
          placeholder="Search by specialization"
          value={specialization}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSpecialization(e.target.value)}
        />
      </div>

      <div className="flex gap-2">
        <Button onClick={handleFilter}>Filter</Button>
        <Button variant="outline" onClick={handleReset}>Reset</Button>
      </div>
    </div>
  )
}
