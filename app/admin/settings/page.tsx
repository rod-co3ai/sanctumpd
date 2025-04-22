"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const [autoApprove, setAutoApprove] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

  const handleSaveSettings = async () => {
    setSaving(true)

    // Here you would typically save these settings to your database
    // For now, we'll just simulate a delay and show a success toast

    setTimeout(() => {
      setSaving(false)
      toast({
        title: "Settings saved",
        description: "Your settings have been updated successfully",
      })
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#503E24]">Settings</h1>
        <p className="text-[#503E24]/70 mt-1">Configure system settings and preferences</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-[#503E24]">Access Control</CardTitle>
          <CardDescription>Configure how access requests are handled</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="auto-approve" className="flex-1">
              <div className="font-medium">Auto-approve access requests</div>
              <div className="text-sm text-muted-foreground">
                Automatically approve all new access requests without manual review
              </div>
            </Label>
            <Switch id="auto-approve" checked={autoApprove} onCheckedChange={setAutoApprove} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-[#503E24]">Notifications</CardTitle>
          <CardDescription>Configure how and when notifications are sent</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="email-notifications" className="flex-1">
              <div className="font-medium">Email notifications</div>
              <div className="text-sm text-muted-foreground">Send email notifications for new access requests</div>
            </Label>
            <Switch id="email-notifications" checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-[#503E24]">System</CardTitle>
          <CardDescription>Configure system-wide settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="maintenance-mode" className="flex-1">
              <div className="font-medium">Maintenance mode</div>
              <div className="text-sm text-muted-foreground">
                Put the system into maintenance mode, preventing user logins
              </div>
            </Label>
            <Switch id="maintenance-mode" checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
          </div>

          <div className="pt-4">
            <Button
              onClick={handleSaveSettings}
              disabled={saving}
              className="bg-[#B68D53] hover:bg-[#A67D43] text-white"
            >
              {saving ? "Saving..." : "Save settings"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
