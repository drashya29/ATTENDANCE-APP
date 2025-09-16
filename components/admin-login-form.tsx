"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, EyeOff, User, Lock, Shield, UserCheck } from "lucide-react"
import { useRouter } from "next/navigation"

export function AdminLoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [loginType, setLoginType] = useState<"admin" | "teacher">("admin")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (email && password) {
        let userRole: "admin" | "teacher" = "teacher"

        if (loginType === "admin") {
          // Admin login validation
          if (email.includes("admin") || email === "admin@school.edu") {
            userRole = "admin"
          } else {
            setError("Invalid admin credentials")
            setIsLoading(false)
            return
          }
        }

        // Store enhanced user session
        localStorage.setItem(
          "user",
          JSON.stringify({
            email,
            role: userRole,
            name: email.split("@")[0],
            permissions:
              userRole === "admin" ? ["manage_teachers", "view_all_courses", "system_settings"] : ["manage_courses"],
            loginTime: new Date().toISOString(),
          }),
        )

        router.push(userRole === "admin" ? "/admin/dashboard" : "/dashboard")
      } else {
        setError("Please enter both email and password")
      }
    } catch (err) {
      setError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md shadow-lg border-0 bg-white/90 backdrop-blur-sm dark:bg-gray-800/90">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-semibold flex items-center justify-center gap-2">
          {loginType === "admin" ? (
            <Shield className="h-6 w-6 text-blue-600" />
          ) : (
            <UserCheck className="h-6 w-6 text-green-600" />
          )}
          Attendance System
        </CardTitle>
        <CardDescription>{loginType === "admin" ? "Administrator Access" : "Teacher Access"}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={loginType} onValueChange={(value) => setLoginType(value as "admin" | "teacher")} className="mb-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="admin" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Admin
            </TabsTrigger>
            <TabsTrigger value="teacher" className="flex items-center gap-2">
              <UserCheck className="h-4 w-4" />
              Teacher
            </TabsTrigger>
          </TabsList>

          <TabsContent value="admin">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="admin-email">Admin Email</Label>
                <div className="relative">
                  <Shield className="absolute left-3 top-3 h-4 w-4 text-blue-600" />
                  <Input
                    id="admin-email"
                    type="email"
                    placeholder="admin@school.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 border-blue-200 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="admin-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-blue-600" />
                  <Input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 border-blue-200 focus:border-blue-500"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Admin Sign In"}
              </Button>

              <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                Demo: Use admin@school.edu with any password
              </div>
            </form>
          </TabsContent>

          <TabsContent value="teacher">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="teacher-email">Teacher Email</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-green-600" />
                  <Input
                    id="teacher-email"
                    type="email"
                    placeholder="teacher@school.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 border-green-200 focus:border-green-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="teacher-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-green-600" />
                  <Input
                    id="teacher-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 border-green-200 focus:border-green-500"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Teacher Sign In"}
              </Button>

              <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                Demo: Use any email/password to login as teacher
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
