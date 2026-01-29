import Link from "next/link";
import { prisma } from "@/lib/db";
import { AdminTable } from "@/components/AdminTable";

export default async function RequestsPage() {
  const requests = await prisma.sourceRequest.findMany({
    where: { resolved: false },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  const columns = [
    { key: "asin", header: "ASIN" },
    {
      key: "title",
      header: "Title",
      render: (value: unknown) => (value as string)?.slice(0, 50) ?? "-",
    },
    {
      key: "amazonUrl",
      header: "Amazon URL",
      render: (value: unknown) => (
        <a
          href={value as string}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:underline"
        >
          Open
        </a>
      ),
    },
    { key: "userEmail", header: "Email" },
    {
      key: "createdAt",
      header: "Requested",
      render: (value: unknown) => new Date(value as string).toLocaleDateString(),
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/admin" className="text-indigo-600 hover:text-indigo-900 text-sm">
              ← Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mt-2">Unresolved Requests</h1>
          </div>
        </div>

        <AdminTable
          columns={columns}
          data={requests as unknown as Record<string, unknown>[]}
          emptyMessage="No pending requests."
        />

        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-2">How to Resolve Requests</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-600">
            <li>Click the Amazon URL to view the product</li>
            <li>Find the manufacturer&apos;s direct website</li>
            <li>Add the manufacturer (if not already in system)</li>
            <li>Create an offer with the matching ASIN</li>
            <li>
              Use the API to resolve:{" "}
              <code className="bg-gray-100 px-1 rounded">
                POST /api/request/resolve {`{ requestId, offerId }`}
              </code>
            </li>
          </ol>
        </div>
      </div>
    </main>
  );
}
