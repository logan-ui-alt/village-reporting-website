
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Megaphone, Search, ShieldCheck, MapPin } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Better Village, Better Life
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
            Report issues, track progress, and help us improve our community infrastructure.
            From potholes to power outages, we are here to listen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/report">
              <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6">
                <Megaphone className="mr-2 h-5 w-5" />
                Report an Issue
              </Button>
            </Link>
            <Link href="/track">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto text-lg px-8 py-6">
                <Search className="mr-2 h-5 w-5" />
                Track Status
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-6 max-w-6xl mx-auto w-full">
        <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto bg-blue-100 p-4 rounded-full mb-4">
                <MapPin className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle>1. Report</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-slate-600">
              Submit a complaint with photos and location details. It only takes a minute.
            </CardContent>
          </Card>

          <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto bg-yellow-100 p-4 rounded-full mb-4">
                <ShieldCheck className="h-8 w-8 text-yellow-600" />
              </div>
              <CardTitle>2. Verify</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-slate-600">
              Our admins verify the report and assign it to the relevant department for action.
            </CardContent>
          </Card>

          <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto bg-green-100 p-4 rounded-full mb-4">
                <Search className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle>3. Resolve</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-slate-600">
              Track real-time updates as your issue gets resolved. Receive notifications on completion.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-slate-900 text-slate-400 py-8 px-6 text-center">
        <p>&copy; {new Date().getFullYear()} Village Reporting System. All rights reserved.</p>
      </footer>
    </main>
  );
}
