"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus, Search, Upload, Camera, Edit, Trash2, User, Mail, Phone } from "lucide-react"

interface Student {
  id: string
  name: string
  email: string
  studentId: string
  phone: string
  enrollmentDate: string
  photo?: string
  courses: string[]
  attendanceRate: number
  status: "active" | "inactive"
}

export function StudentManagement() {
  const [students, setStudents] = useState<Student[]>([
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@student.edu",
      studentId: "STU001",
      phone: "+1 (555) 123-4567",
      enrollmentDate: "2024-01-15",
      courses: ["CS101", "MATH201"],
      attendanceRate: 92,
      status: "active",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.johnson@student.edu",
      studentId: "STU002",
      phone: "+1 (555) 234-5678",
      enrollmentDate: "2024-01-20",
      courses: ["CS101", "ENG101"],
      attendanceRate: 88,
      status: "active",
    },
    {
      id: "3",
      name: "Mike Davis",
      email: "mike.davis@student.edu",
      studentId: "STU003",
      phone: "+1 (555) 345-6789",
      enrollmentDate: "2024-02-01",
      courses: ["MATH201", "ENG101"],
      attendanceRate: 76,
      status: "active",
    },
    {
      id: "4",
      name: "Emily Brown",
      email: "emily.brown@student.edu",
      studentId: "STU004",
      phone: "+1 (555) 456-7890",
      enrollmentDate: "2024-01-25",
      courses: ["CS101", "PHYS101"],
      attendanceRate: 94,
      status: "active",
    },
    {
      id: "5",
      name: "David Wilson",
      email: "david.wilson@student.edu",
      studentId: "STU005",
      phone: "+1 (555) 567-8901",
      enrollmentDate: "2024-02-05",
      courses: ["MATH201", "CHEM101"],
      attendanceRate: 82,
      status: "active",
    },
    {
      id: "6",
      name: "Lisa Garcia",
      email: "lisa.garcia@student.edu",
      studentId: "STU006",
      phone: "+1 (555) 678-9012",
      enrollmentDate: "2024-01-30",
      courses: ["ENG101", "HIST101"],
      attendanceRate: 89,
      status: "active",
    },
    {
      id: "7",
      name: "James Miller",
      email: "james.miller@student.edu",
      studentId: "STU007",
      phone: "+1 (555) 789-0123",
      enrollmentDate: "2024-02-10",
      courses: ["CS101", "MATH201"],
      attendanceRate: 91,
      status: "active",
    },
    {
      id: "8",
      name: "Anna Taylor",
      email: "anna.taylor@student.edu",
      studentId: "STU008",
      phone: "+1 (555) 890-1234",
      enrollmentDate: "2024-01-18",
      courses: ["PHYS101", "CHEM101"],
      attendanceRate: 85,
      status: "active",
    },
    {
      id: "9",
      name: "Chris Lee",
      email: "chris.lee@student.edu",
      studentId: "STU009",
      phone: "+1 (555) 901-2345",
      enrollmentDate: "2024-02-15",
      courses: ["ENG101", "HIST101"],
      attendanceRate: 78,
      status: "active",
    },
    {
      id: "10",
      name: "Maria Rodriguez",
      email: "maria.rodriguez@student.edu",
      studentId: "STU010",
      phone: "+1 (555) 012-3456",
      enrollmentDate: "2024-01-22",
      courses: ["CS101", "PHYS101"],
      attendanceRate: 96,
      status: "active",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)

  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    studentId: "",
    phone: "",
    photo: null as File | null,
  })

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setNewStudent({ ...newStudent, photo: file })
      const reader = new FileReader()
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddStudent = () => {
    if (newStudent.name && newStudent.email && newStudent.studentId) {
      const student: Student = {
        id: Date.now().toString(),
        name: newStudent.name,
        email: newStudent.email,
        studentId: newStudent.studentId,
        phone: newStudent.phone,
        enrollmentDate: new Date().toISOString().split("T")[0],
        photo: photoPreview || undefined,
        courses: [],
        attendanceRate: 0,
        status: "active",
      }
      setStudents([...students, student])
      setNewStudent({ name: "", email: "", studentId: "", phone: "", photo: null })
      setPhotoPreview(null)
      setIsAddDialogOpen(false)
    }
  }

  const handleDeleteStudent = (id: string) => {
    setStudents(students.filter((student) => student.id !== id))
  }

  const AddStudentDialog = () => (
    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          Add Student
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
          <DialogDescription>Register a new student with photo for facial recognition</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Alert>
            <Camera className="h-4 w-4" />
            <AlertDescription>Photo is required for facial recognition attendance tracking.</AlertDescription>
          </Alert>

          {/* Photo Upload */}
          <div className="space-y-2">
            <Label>Student Photo</Label>
            <div className="flex items-center gap-4">
              {photoPreview ? (
                <Avatar className="h-20 w-20">
                  <AvatarImage src={photoPreview || "/placeholder.svg"} alt="Preview" />
                  <AvatarFallback>Preview</AvatarFallback>
                </Avatar>
              ) : (
                <div className="h-20 w-20 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center">
                  <Camera className="h-8 w-8 text-gray-400" />
                </div>
              )}
              <div className="space-y-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Photo
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={newStudent.name}
                onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                placeholder="John Smith"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="studentId">Student ID</Label>
              <Input
                id="studentId"
                value={newStudent.studentId}
                onChange={(e) => setNewStudent({ ...newStudent, studentId: e.target.value })}
                placeholder="STU001"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={newStudent.email}
              onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
              placeholder="john.smith@student.edu"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={newStudent.phone}
              onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={handleAddStudent} className="flex-1 bg-blue-600 hover:bg-blue-700">
              Add Student
            </Button>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Student Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage student registrations and facial recognition data</p>
        </div>
        <AddStudentDialog />
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search students by name, email, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Students</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle>Students ({filteredStudents.length})</CardTitle>
          <CardDescription>All registered students with their attendance information</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Student ID</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Courses</TableHead>
                <TableHead>Attendance Rate</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={student.photo || "/placeholder.svg"} alt={student.name} />
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-gray-500">Enrolled: {student.enrollmentDate}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono">{student.studentId}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Mail className="h-3 w-3" />
                        {student.email}
                      </div>
                      {student.phone && (
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Phone className="h-3 w-3" />
                          {student.phone}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {student.courses.map((course) => (
                        <Badge key={course} variant="secondary" className="text-xs">
                          {course}
                        </Badge>
                      ))}
                      {student.courses.length === 0 && <span className="text-sm text-gray-500">No courses</span>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{student.attendanceRate}%</span>
                      <Badge
                        variant={
                          student.attendanceRate >= 85
                            ? "default"
                            : student.attendanceRate >= 70
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {student.attendanceRate >= 85 ? "Good" : student.attendanceRate >= 70 ? "Fair" : "Poor"}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={student.status === "active" ? "default" : "secondary"}>{student.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteStudent(student.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
