"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, ArrowRight } from "lucide-react"

const navItems = [
  { label: "トップ", href: "/" },
  { label: "理念", href: "/philosophy" },
  { label: "サービス", href: "/service" },
  { label: "プロダクト", href: "/products" },
  { label: "メディア", href: "/media" },
  { label: "企業情報", href: "/company" },
]

interface HeaderProps {
  variant?: "transparent" | "light"
}

export function Header({ variant = "transparent" }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isLight = variant === "light" || isScrolled

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isLight || isScrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-neutral-100"
          : "bg-transparent"
      }`}
    >
      <nav className="flex justify-between items-center py-5 px-6 md:px-12 max-w-7xl mx-auto">
        <Link
          href="/"
          aria-label="株式会社Lat91 トップページ"
          className={`font-mono text-xl font-bold tracking-[0.1em] transition-colors ${
            isLight ? "text-neutral-900" : "text-white"
          }`}
        >
          Lat91
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          <ul className="flex gap-8 list-none">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`text-sm tracking-wide transition-colors duration-300 ${
                    isLight
                      ? "text-neutral-500 hover:text-neutral-900"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
              isLight
                ? "bg-neutral-900 text-white hover:bg-neutral-800"
                : "bg-white text-neutral-900 hover:bg-neutral-100"
            }`}
          >
            お問い合わせ
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden p-2 transition-colors ${
            isLight ? "text-neutral-900" : "text-white"
          }`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[72px] bg-white z-40">
          <div className="flex flex-col h-full">
            <ul className="flex flex-col py-8 px-6">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="flex items-center justify-between py-5 text-xl font-medium text-neutral-900 border-b border-neutral-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                    <ArrowRight size={18} className="text-neutral-400" />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="px-6 mt-auto pb-8">
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-neutral-900 text-white rounded-full text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                お問い合わせ
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
