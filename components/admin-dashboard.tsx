"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, UserPlus, Settings, Edit, Trash2, Shield, CheckCircle, XCircle } from "lucide-react"

interface Teacher {
  id: string
  username: string
  email: string
  firstName: string
  lastName: string
  isActive: boolean
  dateJoined: string
  lastLogin?: string
}

export function AdminDashboard() {
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [isAddingTeacher, setIsAddingTeacher] = useState(false)
  const [newTeacher, setNewTeacher] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Mock data for demo
  useEffect(() => {
    setTeachers([
      {
        id: "1",
        username: "john_doe",
        email: "john.doe@school.edu",
        firstName: "John",
        lastName: "Doe",
        isActive: true,
        dateJoined: "2024-01-15",
        lastLogin: "2024-03-10",
      },
      {
        id: "2",
        username: "jane_smith",
        email: "jane.smith@school.edu",
        firstName: "Jane",
        lastName: "Smith",
        isActive: true,
        dateJoined: "2024-02-01",
        lastLogin: "2024-03-09",
      },
      {
        id: "3",
        username: "mike_wilson",
        email: "mike.wilson@school.edu",
        firstName: "Mike",
        lastName: "Wilson",
        isActive: false,
        dateJoined: "2023-09-01",
        lastLogin: "2024-02-15",
      },
    ])
  }, [])

  const handleAddTeacher = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!newTeacher.username || !newTeacher.email || !newTeacher.password) {
      setError("Please fill in all required fields")
      return
    }

    if (teachers.some((t) => t.email === newTeacher.email)) {
      setError("A teacher with this email already exists")
      return
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const teacher: Teacher = {
        id: Date.now().toString(),
        username: newTeacher.username,
        email: newTeacher.email,
        firstName: newTeacher.firstName,
        lastName: newTeacher.lastName,
        isActive: true,
        dateJoined: new Date().toISOString().split("T")[0],
      }

      setTeachers((prev) => [...prev, teacher])
      setNewTeacher({ username: "", email: "", firstName: "", lastName: "", password: "" })
      setSuccess(`Teacher ${teacher.firstName} ${teacher.lastName} added successfully!`)
      setIsAddingTeacher(false)
    } catch (err) {
      setError("Failed to add teacher. Please try again.")
    }
  }

  const toggleTeacherStatus = (teacherId: string) => {
    setTeachers((prev) =>
      prev.map((teacher) => (teacher.id === teacherId ? { ...teacher, isActive: !teacher.isActive } : teacher)),
    )
  }

  const deleteTeacher = (teacherId: string) => {
    if (confirm("Are you sure you want to delete this teacher?")) {
      setTeachers((prev) => prev.filter((teacher) => teacher.id !== teacherId))
      setSuccess("Teacher deleted successfully")
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Shield className="h-8 w-8 text-blue-600" />
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Manage teachers and system settings</p>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {success && (
        <Alert className="border-green-200 bg-green-50 text-green-800">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teachers.length}</div>
            <p className="text-xs text-muted-foreground">{teachers.filter((t) => t.isActive).length} active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Teachers</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{teachers.filter((t) => t.isActive).length}</div>
            <p className="text-xs text-muted-foreground">Currently teaching</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inactive Teachers</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{teachers.filter((t) => !t.isActive).length}</div>
            <p className="text-xs text-muted-foreground">Not currently active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Online</div>
            <p className="text-xs text-muted-foreground">All systems operational</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="teachers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="teachers">Teacher Management</TabsTrigger>
          <TabsTrigger value="system">System Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="teachers" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Teacher Management</h2>
            <Dialog open={isAddingTeacher} onOpenChange={setIsAddingTeacher}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Teacher
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Teacher</DialogTitle>
                  <DialogDescription>Create a new teacher account with access to the system.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddTeacher} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={newTeacher.firstName}
                        onChange={(e) => setNewTeacher((prev) => ({ ...prev, firstName: e.target.value }))}
                        placeholder="John"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={newTeacher.lastName}
                        onChange={(e) => setNewTeacher((prev) => ({ ...prev, lastName: e.target.value }))}
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="username">Username *</Label>
                    <Input
                      id="username"
                      value={newTeacher.username}
                      onChange={(e) => setNewTeacher((prev) => ({ ...prev, username: e.target.value }))}
                      placeholder="john_doe"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newTeacher.email}
                      onChange={(e) => setNewTeacher((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="john.doe@school.edu"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <Input
                      id="password"
                      type="password"
                      value={newTeacher.password}
                      onChange={(e) => setNewTeacher((prev) => ({ ...prev, password: e.target.value }))}
                      placeholder="Enter secure password"
                      required
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsAddingTeacher(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                      Add Teacher
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Teachers</CardTitle>
              <CardDescription>Manage teacher accounts and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date Joined</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teachers.map((teacher) => (
                    <TableRow key={teacher.id}>
                      <TableCell className="font-medium">
                        {teacher.firstName} {teacher.lastName}
                      </TableCell>
                      <TableCell>{teacher.email}</TableCell>
                      <TableCell>{teacher.username}</TableCell>
                      <TableCell>
                        <Badge variant={teacher.isActive ? "default" : "secondary"}>
                          {teacher.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>{teacher.dateJoined}</TableCell>
                      <TableCell>{teacher.lastLogin || "Never"}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" onClick={() => toggleTeacherStatus(teacher.id)}>
                            {teacher.isActive ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => deleteTeacher(teacher.id)}>
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
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>Configure system-wide settings and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Face Recognition</h3>
                    <p className="text-sm text-gray-600">Enable facial recognition for attendance</p>
                  </div>
                  <Badge variant="default">Enabled</Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Email Notifications</h3>
                    <p className="text-sm text-gray-600">Send attendance reports via email</p>
                  </div>
                  <Badge variant="secondary">Disabled</Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Data Backup</h3>
                    <p className="text-sm text-gray-600">Automatic daily backups</p>
                  </div>
                  <Badge variant="default">Active</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
