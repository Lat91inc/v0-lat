"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function MissionSection() {
  return (
    <section id="mission" className="relative bg-white py-[80px] px-[48px] overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Section Label */}
        <div className="mb-12">
          <span className="inline-flex items-center gap-3">
            <span className="w-12 h-px bg-neutral-900" />
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-neutral-400">
              Mission
            </span>
          </span>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left - Main Title */}
          <div className="lg:col-span-7">
            <h2 className="text-[clamp(28px,4vw,48px)] font-bold leading-[1.4] text-neutral-900 tracking-tight">
              <span className="block text-[#999]">すべての人と企業に</span>
              <span className="block">デジタルレイバーを</span>
              <span className="block text-[#999]">AI時代の確かな</span>
              <span className="block">産業インフラをつくる</span>
            </h2>
          </div>

          {/* Right - Description */}
          <div className="lg:col-span-5 max-w-[480px]">
            <p className="text-base md:text-lg leading-[1.9] text-neutral-500 mb-6">
              産業革命から続く、人が労働力になる時代は、
              <br />
              まもなく歴史の転換点を迎えます。
            </p>
            <p className="text-base md:text-lg leading-[1.9] text-neutral-500 mb-6">
              私たちが提供するのは、自律して実務を完遂するAI、デジタルレイバーという新しい労働力の実装。
            </p>
            <p className="text-base md:text-lg leading-[1.9] text-neutral-500 mb-6">
              電気や水道が社会を底支えするように、この無休の知能を、誰もが当たり前に使える確かなインフラとして日本から敷設する。
            </p>
            <p className="text-base md:text-lg leading-[1.9] text-neutral-500 mb-10">
              実務の摩擦をAIが引き受け、人間が純粋な意思や創造へと向かうための次代の産業インフラを創ります。
            </p>

            <Link
              href="/philosophy"
              className="inline-flex items-center gap-4 text-sm font-medium text-neutral-900 hover:text-neutral-600 transition-colors group"
            >
              <span className="tracking-wide">理念を見る</span>
              <span className="flex items-center justify-center w-10 h-10 rounded-full border border-neutral-200 group-hover:border-neutral-900 group-hover:bg-neutral-900 group-hover:text-white transition-all">
                <ArrowRight size={16} />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
