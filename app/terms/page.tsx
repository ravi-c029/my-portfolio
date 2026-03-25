"use client";

import { useViewStore } from "@/store/useViewStore";
import { cn } from "@/lib/utils";
import { Scale, Gavel } from "lucide-react";

export default function Terms() {
  const isSpatialMode = useViewStore((state) => state.isSpatialMode);

  return (
    <div className={cn("max-w-4xl mx-auto py-20 px-6", isSpatialMode ? "font-mono text-cyan-50" : "text-neutral-900")}>
      <header className="mb-12 border-b border-neutral-200 pb-8">
        <div className="flex items-center gap-3 mb-4">
          <Scale className={isSpatialMode ? "text-cyan-500" : "text-black"} size={32} />
          <h1 className="text-4xl font-bold tracking-tight uppercase">Terms & Conditions</h1>
        </div>
        <p className="opacity-60 text-sm">Agreement between Developer & Client // Governing Law: Republic of India</p>
      </header>

      <section className="space-y-10 opacity-80">
        <div>
          <h2 className="text-xl font-bold mb-4 text-white">1. Use of Services</h2>
          <p>By accessing this website or engaging in services provided by Ravi Kumar Keshari, you agree to abide by these terms. Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offense under the IT Act, 2000.</p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4 text-white">2. Intellectual Property</h2>
          <p>Unless otherwise agreed in a written contract, all custom code, design assets, and spatial interfaces developed remain the intellectual property of the developer until full payment is cleared.</p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4 text-white">3. Limitation of Liability</h2>
          <p>We shall not be liable for any indirect, incidental, or consequential damages resulting from the use of the services or any data breaches beyond our reasonable control.</p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4 text-white">4. Jurisdiction</h2>
          <p>These terms shall be governed by and constructed in accordance with the laws of India. Any disputes arising shall be subject to the exclusive jurisdiction of the courts in <strong>Patna, Bihar</strong>.</p>
        </div>
      </section>
    </div>
  );
}