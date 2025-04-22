import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export default function RegistrationSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-[#F8F5F0] p-4">
      <div className="w-full max-w-md">
        <Card className="border-[#B68D53]/20 shadow-lg">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-2xl font-bold text-center text-[#503E24]">Registration Successful</CardTitle>
            <CardDescription className="text-center text-[#503E24]/70">
              Your account has been created and is pending approval
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p className="text-[#503E24]">
              Thank you for registering with Sanctum. Your account is currently pending approval by our team. You will
              receive an email notification once your account has been approved.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/login">
              <Button className="bg-[#B68D53] hover:bg-[#A67D43] text-white">Return to Login</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
