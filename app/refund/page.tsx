"use client";

import { useViewStore } from "@/store/useViewStore";
import { cn } from "@/lib/utils";
import { RefreshCcw, AlertTriangle } from "lucide-react";

export default function RefundPolicy() {
  const isSpatialMode = useViewStore((state) => state.isSpatialMode);

  return (
    <div className={cn("max-w-4xl mx-auto py-20 px-6", isSpatialMode ? "font-mono text-cyan-50" : "text-neutral-900")}>
      <header className="mb-12 border-b border-neutral-200 pb-8">
        <div className="flex items-center gap-3 mb-4">
          <RefreshCcw className={isSpatialMode ? "text-cyan-500" : "text-black"} size={32} />
          <h1 className="text-4xl font-bold tracking-tight uppercase">Refund & Cancellation</h1>
        </div>
        <p className="opacity-60 text-sm">Transparency in Service Delivery & Payments</p>
      </header>

      <section className="space-y-10">
        <div className={cn("p-6 rounded-2xl border-l-4", isSpatialMode ? "bg-red-950/20 border-red-500" : "bg-orange-50 border-orange-400")}>
          <p className="text-sm font-bold flex items-center gap-2">
            <AlertTriangle size={16} /> IMPORTANT FOR SERVICE-BASED WORK
          </p>
          <p className="mt-2 opacity-80 italic">Since we provide customized digital services (software/design), the standard 7-day return policy for physical goods does not apply.</p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4 uppercase tracking-wider">1. Cancellation Policy</h2>
          <p className="opacity-80">Clients can cancel a project within 24 hours of the initial deposit for a full refund. After work has commenced (post-discovery phase), cancellation will result in a partial refund based on the percentage of work completed.</p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4 uppercase tracking-wider">2. Refund Eligibility</h2>
          <ul className="list-disc pl-6 space-y-4 opacity-80">
            <li><strong>Discovery Phase:</strong> 100% Refundable.</li>
            <li><strong>Design/Architecture Phase:</strong> 50% Refundable.</li>
            <li><strong>Development Phase:</strong> Non-Refundable as resources and man-hours are fully committed.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4 uppercase tracking-wider">3. Timeline</h2>
          <p className="opacity-80">Approved refunds will be processed within <strong>5-7 business days</strong> via the original mode of payment (UPI, Bank Transfer, or Credit Card).</p>
        </div>
      </section>
    </div>
  );
}