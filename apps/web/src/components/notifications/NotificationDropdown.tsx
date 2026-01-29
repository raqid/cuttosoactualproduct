"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CheckCheck, Gift, Users, DollarSign } from "lucide-react"

interface Notification {
  id: string
  type: string
  title: string
  message: string
  read: boolean
  createdAt: string
}

interface NotificationDropdownProps {
  onClose: () => void
  onRead: () => void
}

const iconMap: Record<string, React.ReactNode> = {
  gift_purchased: <Gift className="h-4 w-4 text-pink-600" />,
  referral_signup: <Users className="h-4 w-4 text-blue-600" />,
  referral_purchased: <DollarSign className="h-4 w-4 text-green-600" />,
  credits_earned: <DollarSign className="h-4 w-4 text-green-600" />,
}

export function NotificationDropdown({ onClose, onRead }: NotificationDropdownProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {
    try {
      const res = await fetch("/api/notifications")
      if (res.ok) {
        const data = await res.json()
        setNotifications(data.notifications)
      }
    } catch {} finally {
      setLoading(false)
    }
  }

  const markAllRead = async () => {
    try {
      await fetch("/api/notifications", { method: "PATCH" })
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
      onRead()
    } catch {}
  }

  const timeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 60) return `${mins}m ago`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs}h ago`
    return `${Math.floor(hrs / 24)}d ago`
  }

  return (
    <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <h3 className="font-semibold text-sm">Notifications</h3>
        {notifications.some((n) => !n.read) && (
          <Button variant="ghost" size="sm" onClick={markAllRead} className="text-xs h-auto py-1">
            <CheckCheck className="h-3 w-3 mr-1" />
            Mark all read
          </Button>
        )}
      </div>

      <div className="max-h-80 overflow-y-auto">
        {loading ? (
          <p className="p-4 text-sm text-gray-500 text-center">Loading...</p>
        ) : notifications.length === 0 ? (
          <p className="p-4 text-sm text-gray-500 text-center">No notifications yet</p>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`px-4 py-3 border-b last:border-0 ${n.read ? "bg-white" : "bg-blue-50"}`}
            >
              <div className="flex gap-3">
                <div className="mt-0.5">
                  {iconMap[n.type] || <Gift className="h-4 w-4 text-gray-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{n.title}</p>
                  <p className="text-xs text-gray-600 mt-0.5">{n.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{timeAgo(n.createdAt)}</p>
                </div>
                {!n.read && (
                  <div className="mt-1">
                    <div className="h-2 w-2 rounded-full bg-blue-600" />
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
