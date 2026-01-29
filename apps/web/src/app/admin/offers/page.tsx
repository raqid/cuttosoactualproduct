import Link from "next/link";
import { prisma } from "@/lib/db";
import { AdminTable } from "@/components/AdminTable";

export default async function OffersPage() {
  const offers = await prisma.offer.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      manufacturer: {
        select: { name: true },
      },
    },
  });

  const columns = [
    { key: "title", header: "Title" },
    { key: "asin", header: "ASIN" },
    {
      key: "manufacturer",
      header: "Manufacturer",
      render: (_: unknown, row: Record<string, unknown>) => {
        const mfr = row.manufacturer as { name: string };
        return mfr.name;
      },
    },
    {
      key: "priceCents",
      header: "Price",
      render: (value: unknown, row: Record<string, unknown>) => {
        if (!value) return "-";
        const currency = row.currency as string;
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency,
        }).format((value as number) / 100);
      },
    },
    {
      key: "active",
      header: "Active",
      render: (value: unknown) => (value ? "✓" : "-"),
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
            <h1 className="text-3xl font-bold text-gray-900 mt-2">Offers</h1>
          </div>
        </div>

        <AdminTable
          columns={columns}
          data={offers as unknown as Record<string, unknown>[]}
          emptyMessage="No offers yet. Add your first offer with an ASIN to enable matching."
        />

        <p className="mt-4 text-sm text-gray-500">
          To add offers, use the database directly or add a form UI.
        </p>
      </div>
    </main>
  );
}
