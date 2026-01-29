import Link from "next/link";
import { prisma } from "@/lib/db";
import { AdminTable } from "@/components/AdminTable";

export default async function ManufacturersPage() {
  const manufacturers = await prisma.manufacturer.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { offers: true },
      },
    },
  });

  const columns = [
    { key: "name", header: "Name" },
    { key: "domain", header: "Domain" },
    {
      key: "verified",
      header: "Verified",
      render: (value: unknown) => (value ? "✓" : "-"),
    },
    {
      key: "madeInUsa",
      header: "Made in USA",
      render: (value: unknown) => (value ? "🇺🇸" : "-"),
    },
    {
      key: "_count",
      header: "Offers",
      render: (_: unknown, row: Record<string, unknown>) => {
        const count = row._count as { offers: number };
        return count.offers;
      },
    },
    {
      key: "createdAt",
      header: "Created",
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
            <h1 className="text-3xl font-bold text-gray-900 mt-2">Manufacturers</h1>
          </div>
        </div>

        <AdminTable
          columns={columns}
          data={manufacturers as unknown as Record<string, unknown>[]}
          emptyMessage="No manufacturers yet. Add your first manufacturer to get started."
        />

        <p className="mt-4 text-sm text-gray-500">
          To add manufacturers, use the database directly or add a form UI.
        </p>
      </div>
    </main>
  );
}
