import Link from "next/link";
import { prisma } from "@/lib/db";
import { AdminTable } from "@/components/AdminTable";

export default async function EventsPage() {
  const [events, counts] = await Promise.all([
    prisma.event.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
      include: {
        offer: { select: { title: true } },
      },
    }),
    prisma.event.groupBy({
      by: ["type"],
      _count: { type: true },
    }),
  ]);

  const countMap = counts.reduce(
    (acc, c) => {
      acc[c.type] = c._count.type;
      return acc;
    },
    {} as Record<string, number>
  );

  const columns = [
    { key: "type", header: "Type" },
    {
      key: "offer",
      header: "Offer",
      render: (_: unknown, row: Record<string, unknown>) => {
        const offer = row.offer as { title: string } | null;
        return offer?.title?.slice(0, 40) ?? "-";
      },
    },
    { key: "sessionId", header: "Session ID" },
    {
      key: "createdAt",
      header: "Time",
      render: (value: unknown) => new Date(value as string).toLocaleString(),
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
            <h1 className="text-3xl font-bold text-gray-900 mt-2">Events</h1>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8 sm:grid-cols-5">
          {["resolve", "offer_view", "offer_click", "gift_view", "gift_click"].map((type) => (
            <div key={type} className="bg-white rounded-lg shadow p-4">
              <div className="text-2xl font-bold text-gray-900">{countMap[type] || 0}</div>
              <div className="text-sm text-gray-500">{type}</div>
            </div>
          ))}
        </div>

        <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Events (Last 100)</h2>
        <AdminTable
          columns={columns}
          data={events as unknown as Record<string, unknown>[]}
          emptyMessage="No events recorded yet."
        />
      </div>
    </main>
  );
}
