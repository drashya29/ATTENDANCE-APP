"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Users, UserCheck, UserX, BookOpen, TrendingUp, Clock, AlertTriangle, Camera } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

interface AttendanceStats {
  totalStudents: number
  presentToday: number
  absentToday: number
  totalCourses: number
  attendanceRate: number
  liveSessionsActive: number
}

export function DashboardOverview() {
  const [stats, setStats] = useState<AttendanceStats>({
    totalStudents: 0,
    presentToday: 0,
    absentToday: 0,
    totalCourses: 0,
    attendanceRate: 0,
    liveSessionsActive: 0,
  })

  const [recentActivity, setRecentActivity] = useState<
    Array<{
      id: string
      type: "attendance" | "registration" | "course"
      message: string
      time: string
      status: "success" | "warning" | "info"
    }>
  >([])

  // Simulate real-time data updates
  useEffect(() => {
    const updateStats = () => {
      setStats({
        totalStudents: 245,
        presentToday: Math.floor(Math.random() * 50) + 180,
        absentToday: Math.floor(Math.random() * 30) + 15,
        totalCourses: 12,
        attendanceRate: Math.floor(Math.random() * 15) + 80,
        liveSessionsActive: Math.floor(Math.random() * 3) + 1,
      })

      setRecentActivity([
        {
          id: "1",
          type: "attendance",
          message: "John Smith marked present in CS101",
          time: "2 minutes ago",
          status: "success",
        },
        {
          id: "2",
          type: "attendance",
          message: "Sarah Johnson marked present in MATH201",
          time: "5 minutes ago",
          status: "success",
        },
        {
          id: "3",
          type: "registration",
          message: "New student registered: Mike Davis",
          time: "15 minutes ago",
          status: "info",
        },
        {
          id: "4",
          type: "attendance",
          message: "Low attendance alert for ENG101",
          time: "1 hour ago",
          status: "warning",
        },
      ])
    }

    updateStats()
    const interval = setInterval(updateStats, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const statCards = [
    {
      title: "Total Students",
      value: stats.totalStudents,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900",
    },
    {
      title: "Present Today",
      value: stats.presentToday,
      icon: UserCheck,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900",
    },
    {
      title: "Absent Today",
      value: stats.absentToday,
      icon: UserX,
      color: "text-red-600",
      bgColor: "bg-red-100 dark:bg-red-900",
    },
    {
      title: "Active Courses",
      value: stats.totalCourses,
      icon: BookOpen,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back! Here's what's happening with your attendance system today.
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/live">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Camera className="mr-2 h-4 w-4" />
              Start Live Session
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Rate */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Today's Attendance Rate
            </CardTitle>
            <CardDescription>Overall attendance across all courses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{stats.attendanceRate}%</span>
                <Badge variant={stats.attendanceRate >= 85 ? "default" : "destructive"}>
                  {stats.attendanceRate >= 85 ? "Good" : "Needs Attention"}
                </Badge>
              </div>
              <Progress value={stats.attendanceRate} className="h-2" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {stats.presentToday} out of {stats.totalStudents} students present
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Live Sessions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5 text-blue-600" />
              Live Sessions
            </CardTitle>
            <CardDescription>Currently active attendance monitoring</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{stats.liveSessionsActive}</span>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-2 animate-pulse"></div>
                  Active
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>CS101 - Room A</span>
                  <span className="text-green-600">Running</span>
                </div>
                {stats.liveSessionsActive > 1 && (
                  <div className="flex justify-between text-sm">
                    <span>MATH201 - Room B</span>
                    <span className="text-green-600">Running</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-gray-600" />
            Recent Activity
          </CardTitle>
          <CardDescription>Latest updates from your attendance system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                <div
                  className={`p-2 rounded-full ${
                    activity.status === "success"
                      ? "bg-green-100 dark:bg-green-900"
                      : activity.status === "warning"
                        ? "bg-yellow-100 dark:bg-yellow-900"
                        : "bg-blue-100 dark:bg-blue-900"
                  }`}
                >
                  {activity.status === "success" ? (
                    <UserCheck className="h-4 w-4 text-green-600" />
                  ) : activity.status === "warning" ? (
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  ) : (
                    <Users className="h-4 w-4 text-blue-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.message}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
