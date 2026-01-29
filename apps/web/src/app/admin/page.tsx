import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function AdminPage() {
  const [manufacturerCount, offerCount, eventCount, requestCount] = await Promise.all([
    prisma.manufacturer.count(),
    prisma.offer.count(),
    prisma.event.count(),
    prisma.sourceRequest.count({ where: { resolved: false } }),
  ]);

  const stats = [
    { name: "Manufacturers", value: manufacturerCount, href: "/admin/manufacturers" },
    { name: "Offers", value: offerCount, href: "/admin/offers" },
    { name: "Events", value: eventCount, href: "/admin/events" },
    { name: "Pending Requests", value: requestCount, href: "/admin/requests" },
  ];

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat) => (
            <Link
              key={stat.name}
              href={stat.href}
              className="bg-white overflow-hidden rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">{stat.value}</dd>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Links</h2>
            <div className="space-y-2">
              <Link
                href="/admin/manufacturers"
                className="block text-indigo-600 hover:text-indigo-900"
              >
                Manage Manufacturers →
              </Link>
              <Link href="/admin/offers" className="block text-indigo-600 hover:text-indigo-900">
                Manage Offers →
              </Link>
              <Link href="/admin/requests" className="block text-indigo-600 hover:text-indigo-900">
                Review Requests →
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Getting Started</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>Add a manufacturer with their details</li>
              <li>Create offers with ASIN identifiers</li>
              <li>Test with the Chrome extension on Amazon</li>
              <li>Monitor events and resolve requests</li>
            </ol>
          </div>
        </div>
      </div>
    </main>
  );
}
