import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../src/components/ui/dialog'
interface Doctor {
  id: string
  name: string
  specialization: string
  email: string
  phone: string
}

interface DoctorDetailsModalProps {
  doctor: Doctor
  open: boolean
  onClose: () => void
}

export function DoctorDetailsModal({ doctor, open, onClose }: DoctorDetailsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{doctor.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Specialization</p>
            <p className="text-sm">{doctor.specialization}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Email</p>
            <p className="text-sm">{doctor.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Phone</p>
            <p className="text-sm">{doctor.phone}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
