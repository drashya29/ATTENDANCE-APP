"use client"

import { AuthGuard } from "@/components/auth-guard"
import { AdminDashboard } from "@/components/admin-dashboard"

export default function AdminDashboardPage() {
  return (
    <AuthGuard requiredRole="admin">
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <AdminDashboard />
        </div>
      </div>
    </AuthGuard>
  )
}
