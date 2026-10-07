"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const navItems = [
  { label: "理念", href: "/philosophy" },
  { label: "サービス", href: "/service" },
  { label: "プロダクト", href: "/products" },
  { label: "メディア", href: "/media" },
  { label: "企業情報", href: "/company" },
  { label: "お問い合わせ", href: "/contact" },
]

export function Footer() {
  return (
    <footer className="bg-neutral-900">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-20">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-12 gap-16 mb-20">
          {/* Brand & Tagline */}
          <div className="md:col-span-5">
            <Link
              href="/"
              className="inline-block font-mono text-2xl font-bold tracking-[0.1em] text-white hover:opacity-80 transition-opacity mb-6"
            >
              Lat91
            </Link>
            <p className="text-base leading-relaxed text-neutral-400 max-w-sm">
              AI時代の確かな産業インフラの構築を通じて、
              <br />
              人間の意志と純度の高い創造が溢れる世界を実現する
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <h4 className="font-mono text-xs tracking-[0.2em] uppercase text-neutral-500 mb-6">
              Navigation
            </h4>
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors group"
                  >
                    {item.label}
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Info */}
          <div className="md:col-span-4">
            <h4 className="font-mono text-xs tracking-[0.2em] uppercase text-neutral-500 mb-6">
              Company
            </h4>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li className="font-medium text-white">株式会社Lat91（Lat91 Inc.）</li>
              <li>代表取締役 稲葉 幸太郎（CEO: Kotaro Inaba）</li>
              <li>設立 2026年5月25日（Founded May 25, 2026）</li>
              <li>法人番号 1010401199099</li>
              <li>東京都港区赤坂3-13-3</li>
              <li>赤坂セントラルビル6F（Tokyo, Japan）</li>
            </ul>
            <p className="mt-6 text-xs leading-relaxed text-neutral-500">
              Lat91 Inc. is an AI agent &amp; DX partner for Japanese companies, founded in Tokyo in May 2026. We build Claude-powered AI agents that run day-to-day business processes, plus AI advisory, content production and product development.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="font-mono text-xs tracking-[0.1em] text-neutral-600">
            © 2026 Lat91 Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-xs text-neutral-500 hover:text-white transition-colors"
            >
              プライバシーポリシー
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
