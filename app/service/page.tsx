"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { JsonLd } from "@/components/json-ld"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { breadcrumbJsonLd, serviceJsonLd, webPageJsonLd } from "@/lib/seo"

const servicePageDescription =
  "株式会社Lat91のAIエージェント導入サービス。セールス、マーケティング、カスタマーサポート、バックオフィスを一気通貫で自動化し、業務改善と事業成長を支援します。"

// Service data
const services = [
  {
    number: "01",
    titleEn: "Sales Automation",
    titleJa: "セールス",
    description: "見込み客の発見から商談化まで、営業プロセスを一気通貫で自動化。貴社の営業担当者が、価値提案と関係構築に集中できる仕組みを提供します。",
    capabilities: ["リサーチ・リスト作成", "アプローチ", "商談", "パイプライン管理", "ナーチャリング"],
    leftHeadline: "営業担当者の時間を本当に価値ある活動へ",
    leftText: "リスト作成やメール送信に費やしていた時間をゼロに。AIがリサーチから商談設定までを完走し、営業は価値提案やリレーション構築に集中できます。",
    stats: [
      { value: "70%", label: "作業時間削減" },
      { value: "2x", label: "商談獲得数" },
    ],
    workflowBadge: "CYCLE autmate",
    workflow: [
      { step: "01", title: "条件設定", sub: "ターゲット定義" },
      { step: "02", title: "自動リサーチ", sub: "Web・DB・SNS" },
      { step: "03", title: "リスト生成", sub: "スコアリング付" },
      { step: "04", title: "メール作成", sub: "パーソナライズ" },
      { step: "05", title: "自動送信 → 返信検知", sub: "反応を即時検知" },
      { step: "06", title: "アポ調整", sub: "日程を自動確定" },
      { step: "07", title: "報告", sub: "結果をレポート" },
      { step: "08", title: "CRM自動更新", sub: "商談ステータス記録" },
      { step: "09", title: "自律改善", sub: "自動チューニング" },
    ],
  },
  {
    number: "02",
    titleEn: "Marketing Automation",
    titleJa: "マーケティング",
    description: "リサーチ、クリエイティブ作成、運用業務、レポーティングまで、マーケティング業務をAIが遂行。データに基づく施策立案や実行、改善検証を、自律的に回し続ける仕組みを提供します。",
    capabilities: ["市場・競合リサーチ", "コンテンツ生成", "広告運用最適化", "SNS運用", "レポーティング", "リード育成"],
    leftHeadline: "施策のPDCAをAIが24時間回し続ける",
    leftText: "市場の反応や顧客の反応から仮説を立て、クリエイティブの生成から施策実施、検証、学習までのグロースサイクルを円滑化させます。",
    stats: [
      { value: "5x", label: "コンテンツ生産量" },
      { value: "1.8x", label: "リード獲得率" },
    ],
    workflowBadge: "Cycle automated",
    workflow: [
      { step: "01", title: "市場リサーチ", sub: "競合・トレンド分析" },
      { step: "02", title: "インサイト抽出", sub: "打ち手を導出" },
      { step: "03", title: "コンテンツ生成", sub: "記事・LP・メルマガ" },
      { step: "04", title: "配信実行", sub: "チャネル最適化" },
      { step: "05", title: "広告ABテスト", sub: "CTR・CVR改善" },
      { step: "06", title: "効果測定", sub: "KPI自動集計" },
      { step: "07", title: "レポート自動生成", sub: "次の施策サイクルへ" },
      { step: "08", title: "自律改善", sub: "自動チューニング" },
    ],
  },
  {
    number: "03",
    titleEn: "Customer Support",
    titleJa: "カスタマーサポート",
    description: "自動化し、本当に必要な対応だけに集中。顧客満足度を上げ、サポートコストを大幅に圧縮する仕組みを提供します。",
    capabilities: ["問い合わせ自動対応", "FAQ自動生成", "エスカレーション判定", "VOC分析", "多言語対応"],
    leftHeadline: "対応品質を上げながらコストを下げる",
    leftText: "AIが問い合わせを分類・回答し、確信度が低い案件だけ人にエスカレ。全件の対応結果がナレッジに還元され、精度は使うほど向上します。",
    stats: [
      { value: "80%", label: "自動対応率" },
      { value: " 1/2", label: "担当者工数" },
    ],
    workflowBadge: "Cycle automate",
    workflow: [
      { step: "01", title: "問い合わせ受信", sub: "全チャネル統合" },
      { step: "02", title: "内容分類", sub: "カテゴリ・緊急度" },
      { step: "03", title: "回答ドラフト", sub: "KB・履歴から生成" },
      { step: "04", title: "確信度判定", sub: "閾値で分岐" },
      { step: "05", title: "自動送信 / エスカレ", sub: "80%を自動処理" },
      { step: "06", title: "KB自動更新", sub: "新パターン学習" },
      { step: "07", title: "VOC分析", sub: "改善点を自動検出" },
    ],
  },
  {
    number: "04",
    titleEn: "Back Office Automation",
    titleJa: "バックオフィス",
    description: "経理・人事・総務の定型業務をAIが代行し、管理部門を最小化。人は判断と例外対応に集中する体制をつくる。",
    capabilities: ["経費精算・請求処理", "入退社手続き", "契約書レビュー", "勤怠管理", "備品・設備管理"],
    leftHeadline: "管理部門の「作業」を\n限りなくゼロへ",
    leftText: "請求書の読み取りから仕訳、承認フロー、会計ソフト連携まで、一連の経理プロセスを人の手を介さずに完走。月次決算のスピードが劇的に変わります。",
    stats: [
      { value: "95%", label: "入力作業削減" },
      { value: "1/3", label: "月次決算日数" },
    ],
    workflowBadge: "Zero-ops",
    workflow: [
      { step: "01", title: "書類読取", sub: "請求書・領収書" },
      { step: "02", title: "データ抽出", sub: "金額・取引先・日付" },
      { step: "03", title: "仕訳分類", sub: "勘定科目を自動判定" },
      { step: "04", title: "承認フロー", sub: "金額別ルーティング" },
      { step: "05", title: "会計ソフト連携", sub: "freee・MF等" },
      { step: "06", title: "支払処理", sub: "振込データ生成" },
      { step: "07", title: "月次レポート", sub: "経営層へ自動配信" },
      { step: "08", title: "自律改善", sub: "イレギュラー対応へ適応" },
    ],
  },
]

const processSteps = [
  { number: "01", title: "ヒアリング", description: "経営課題・現場課題の整理", duration: "1 week" },
  { number: "02", title: "設計・構築", description: "業務プロセス再設計\nAIエージェント構築", duration: "2 weeks" },
  { number: "03", title: "テスト運用", description: "試験稼働・調整", duration: "1-2 weeks" },
  { number: "04", title: "本格稼働", description: "保守運用・継続改善", duration: "ongoing" },
]

// Workflow SVG Components with hardcoded colors (no CSS variables for marker compatibility)
function SalesWorkflowSVG() {
  return (
    <svg className="w-full h-auto" viewBox="0 0 600 420">
      <defs>
        <marker id="arrow-sales" viewBox="0 0 10 10" refX={8} refY={5} markerWidth={5} markerHeight={5} orient="auto-start-reverse">
          <path d="M2 1.5L8 5L2 8.5" fill="none" stroke="#9c9b97" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
        </marker>
      </defs>
      {/* Row 1 */}
      <text className="font-mono text-[9px]" fill="#c8c7c3" x={14} y={14}>01</text>
      <rect fill="#fafaf9" stroke="#e2e1de" x={8} y={22} width={176} height={50} rx={8}/>
      <text className="font-semibold text-[12px]" fill="#0a0a0a" x={96} y={43} textAnchor="middle" dominantBaseline="central">条件設定</text>
      <text className="text-[10px]" fill="#6e6d69" x={96} y={60} textAnchor="middle" dominantBaseline="central">ターゲット定義</text>
      <line stroke="#c8c7c3" x1={184} y1={47} x2={206} y2={47} markerEnd="url(#arrow-sales)"/>
      
      <text className="font-mono text-[9px]" fill="#c8c7c3" x={210} y={14}>02</text>
      <rect fill="#fafaf9" stroke="#e2e1de" x={208} y={22} width={176} height={50} rx={8}/>
      <text className="font-semibold text-[12px]" fill="#0a0a0a" x={296} y={43} textAnchor="middle" dominantBaseline="central">自動リサーチ</text>
      <text className="text-[10px]" fill="#6e6d69" x={296} y={60} textAnchor="middle" dominantBaseline="central">Web・DB・SNS</text>
      <line stroke="#c8c7c3" x1={384} y1={47} x2={406} y2={47} markerEnd="url(#arrow-sales)"/>
      
      <text className="font-mono text-[9px]" fill="#c8c7c3" x={410} y={14}>03</text>
      <rect fill="#fafaf9" stroke="#e2e1de" x={408} y={22} width={176} height={50} rx={8}/>
      <text className="font-semibold text-[12px]" fill="#0a0a0a" x={496} y={43} textAnchor="middle" dominantBaseline="central">リスト生成</text>
      <text className="text-[10px]" fill="#6e6d69" x={496} y={60} textAnchor="middle" dominantBaseline="central">スコアリング付</text>
      <path stroke="#d5d4d0" strokeWidth={0.8} fill="none" d="M 584 47 Q 596 47, 596 80 L 596 100 Q 596 112, 584 112 L 24 112 Q 12 112, 12 124 L 12 134" markerEnd="url(#arrow-sales)"/>
      
      {/* Row 2 */}
      <text className="font-mono text-[9px]" fill="#c8c7c3" x={14} y={130}>04</text>
      <rect fill="#fafaf9" stroke="#e2e1de" x={8} y={138} width={176} height={50} rx={8}/>
      <text className="font-semibold text-[12px]" fill="#0a0a0a" x={96} y={159} textAnchor="middle" dominantBaseline="central">メール作成</text>
      <text className="text-[10px]" fill="#6e6d69" x={96} y={176} textAnchor="middle" dominantBaseline="central">パーソナライズ</text>
      <line stroke="#c8c7c3" x1={184} y1={163} x2={206} y2={163} markerEnd="url(#arrow-sales)"/>
      
      <text className="font-mono text-[9px]" fill="#c8c7c3" x={210} y={130}>05</text>
      <rect fill="#fafaf9" stroke="#e2e1de" x={208} y={138} width={176} height={50} rx={8}/>
      <text className="font-semibold text-[12px]" fill="#0a0a0a" x={296} y={159} textAnchor="middle" dominantBaseline="central">自動送信 → 返信検知</text>
      <text className="text-[10px]" fill="#6e6d69" x={296} y={176} textAnchor="middle" dominantBaseline="central">反応を即時検知</text>
      <line stroke="#c8c7c3" x1={384} y1={163} x2={406} y2={163} markerEnd="url(#arrow-sales)"/>
      
      <text className="font-mono text-[9px]" fill="#c8c7c3" x={410} y={130}>06</text>
      <rect fill="#fafaf9" stroke="#e2e1de" x={408} y={138} width={176} height={50} rx={8}/>
      <text className="font-semibold text-[12px]" fill="#0a0a0a" x={496} y={159} textAnchor="middle" dominantBaseline="central">アポ調整</text>
      <text className="text-[10px]" fill="#6e6d69" x={496} y={176} textAnchor="middle" dominantBaseline="central">日程を自動確定</text>
      <path stroke="#d5d4d0" strokeWidth={0.8} fill="none" d="M 584 163 Q 596 163, 596 196 L 596 216 Q 596 228, 584 228 L 24 228 Q 12 228, 12 240 L 12 250" markerEnd="url(#arrow-sales)"/>
      
      {/* Row 3 */}
      <text className="font-mono text-[9px]" fill="#c8c7c3" x={14} y={246}>07</text>
      <rect fill="#fafaf9" stroke="#e2e1de" x={8} y={254} width={176} height={50} rx={8}/>
      <text className="font-semibold text-[12px]" fill="#0a0a0a" x={96} y={275} textAnchor="middle" dominantBaseline="central">報告</text>
      <text className="text-[10px]" fill="#6e6d69" x={96} y={292} textAnchor="middle" dominantBaseline="central">結果をレポート</text>
      <line stroke="#c8c7c3" x1={184} y1={279} x2={206} y2={279} markerEnd="url(#arrow-sales)"/>
      
      <text className="font-mono text-[9px]" fill="#c8c7c3" x={210} y={246}>08</text>
      <rect fill="#fafaf9" stroke="#e2e1de" x={208} y={254} width={176} height={50} rx={8}/>
      <text className="font-semibold text-[12px]" fill="#0a0a0a" x={296} y={275} textAnchor="middle" dominantBaseline="central">CRM自動更新</text>
      <text className="text-[10px]" fill="#6e6d69" x={296} y={292} textAnchor="middle" dominantBaseline="central">商談ステータス記録</text>
      <line stroke="#c8c7c3" x1={384} y1={279} x2={406} y2={279} markerEnd="url(#arrow-sales)"/>
      
      <text className="font-mono text-[9px]" fill="#c8c7c3" x={410} y={246}>09</text>
      <rect fill="#fafaf9" stroke="#e2e1de" x={408} y={254} width={176} height={50} rx={8}/>
      <text className="font-semibold text-[12px]" fill="#0a0a0a" x={496} y={275} textAnchor="middle" dominantBaseline="central">自律改善</text>
      <text className="text-[10px]" fill="#6e6d69" x={496} y={292} textAnchor="middle" dominantBaseline="central">自動チューニング</text>
    </svg>
  )
}

function MarketingWorkflowSVG() {
  return (
    <svg className="w-full h-auto" viewBox="0 0 600 310">
      <defs>
        <marker id="arrow-mkt" viewBox="0 0 10 10" refX={8} refY={5} markerWidth={5} markerHeight={5} orient="auto-start-reverse">
          <path d="M2 1.5L8 5L2 8.5" fill="none" stroke="#9c9b97" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
        </marker>
      </defs>
      {/* Row 1 */}
      <text className="font-mono text-[9px]" fill="#c8c7c3" x={14} y={14}>01</text>
      <rect fill="#fafaf9" stroke="#e2e1de" x={8} y={22} width={176} height={50} rx={8}/>
      <text className="font-semibold text-[12px]" fill="#0a0a0a" x={96} y={43} textAnchor="middle" dominantBaseline="central">市場リサーチ</text>
      <text className="text-[10px]" fill="#6e6d69" x={96} y={60} textAnchor="middle" dominantBaseline="central">競合・トレンド分析</text>
      <line stroke="#c8c7c3" x1={184} y1={47} x2={206} y2={47} markerEnd="url(#arrow-mkt)"/>
      
      <text className="font-mono text-[9px]" fill="#c8c7c3" x={210} y={14}>02</text>
      <rect fill="#fafaf9" stroke="#e2e1de" x={208} y={22} width={176} height={50} rx={8}/>
      <text className="font-semibold text-[12px]" fill="#0a0a0a" x={296} y={43} textAnchor="middle" dominantBaseline="central">インサイト抽出</text>
      <text className="text-[10px]" fill="#6e6d69" x={296} y={60} textAnchor="middle" dominantBaseline="central">打ち手を導出</text>
      <line stroke="#c8c7c3" x1={384} y1={47} x2={406} y2={47} markerEnd="url(#arrow-mkt)"/>
      
      <text className="font-mono text-[9px]" fill="#c8c7c3" x={410} y={14}>03</text>
      <rect fill="#fafaf9" stroke="#e2e1de" x={408} y={22} width={176} height={50} rx={8}/>
      <text className="font-semibold text-[12px]" fill="#0a0a0a" x={496} y={43} textAnchor="middle" dominantBaseline="central">コンテンツ生成</text>
      <text className="text-[10px]" fill="#6e6d69" x={496} y={60} textAnchor="middle" dominantBaseline="central">記事・LP・メルマガ</text>
      <path stroke="#d5d4d0" strokeWidth={0.8} fill="none" d="M 584 47 Q 596 47, 596 80 L 596 100 Q 596 112, 584 112 L 24 112 Q 12 112, 12 124 L 12 134" markerEnd="url(#arrow-mkt)"/>
      
      {/* Row 2 */}
      <text className="font-mono text-[9px]" fill="#c8c7c3" x={14} y={130}>04</text>
      <rect fill="#fafaf9" stroke="#e2e1de" x={8} y={138} width={176} height={50} rx={8}/>
      <text className="font-semibold text-[12px]" fill="#0a0a0a" x={96} y={159} textAnchor="middle" dominantBaseline="central">配信実行</text>
      <text className="text-[10px]" fill="#6e6d69" x={96} y={176} textAnchor="middle" dominantBaseline="central">チャネル最適化</text>
      <line stroke="#c8c7c3" x1={184} y1={163} x2={206} y2={163} markerEnd="url(#arrow-mkt)"/>
      
      <text className="font-mono text-[9px]" fill="#c8c7c3" x={210} y={130}>05</text>
      <rect fill="#fafaf9" stroke="#e2e1de" x={208} y={138} width={176} height={50} rx={8}/>
      <text className="font-semibold text-[12px]" fill="#0a0a0a" x={296} y={159} textAnchor="middle" dominantBaseline="central">広告ABテスト</text>
      <text className="text-[10px]" fill="#6e6d69" x={296} y={176} textAnchor="middle" dominantBaseline="central">CTR・CVR改善</text>
      <line stroke="#c8c7c3" x1={384} y1={163} x2={406} y2={163} markerEnd="url(#arrow-mkt)"/>
      
      <text className="font-mono text-[9px]" fill="#c8c7c3" x={410} y={130}>06</text>
      <rect fill="#fafaf9" stroke="#e2e1de" x={408} y={138} width={176} height={50} rx={8}/>
      <text className="font-semibold text-[12px]" fill="#0a0a0a" x={496} y={159} textAnchor="middle" dominantBaseline="central">効果測定</text>
      <text className="text-[10px]" fill="#6e6d69" x={496} y={176} textAnchor="middle" dominantBaseline="central">KPI自動集計</text>
      <path stroke="#d5d4d0" strokeWidth={0.8} fill="none" d="M 584 163 Q 596 163, 596 196 L 596 216 Q 596 228, 584 228 L 24 228 Q 12 228, 12 240 L 12 250" markerEnd="url(#arrow-mkt)"/>
      
      {/* Row 3 */}
      <text className="font-mono text-[9px]" fill="#c8c7c3" x={14} y={246}>07</text>
      <rect fill="#fafaf9" stroke="#e2e1de" x={8} y={254} width={176} height={50} rx={8}/>
      <text className="font-semibold text-[12px]" fill="#0a0a0a" x={96} y={275} textAnchor="middle" dominantBaseline="central">レポート自動生成</text>
      <text className="text-[10px]" fill="#6e6d69" x={96} y={292} textAnchor="middle" dominantBaseline="central">次の施策サイクルへ</text>
      <line stroke="#c8c7c3" x1={184} y1={279} x2={206} y2={279} markerEnd="url(#arrow-mkt)"/>
      
      <text className="font-mono text-[9px]" fill="#c8c7c3" x={210} y={246}>08</text>
      <rect fill="#fafaf9" stroke="#e2e1de" x={208} y={254} width={176} height={50} rx={8}/>
      <text className="font-semibold text-[12px]" fill="#0a0a0a" x={296} y={275} textAnchor="middle" dominantBaseline="central">自律改善</text>
      <text className="text-[10px]" fill="#6e6d69" x={296} y={292} textAnchor="middle" dominantBaseline="central">自動チューニング</text>
    </svg>
  )
}

function SupportWorkflowSVG() {
  return (
    <svg className="w-full h-auto" viewBox="0 0 600 420">
      <defs>
        <marker id="arrow-sup" viewBox="0 0 10 10" refX={8} refY={5} markerWidth={5} markerHeight={5} orient="auto-start-reverse">
          <path d="M2 1.5L8 5L2 8.5" fill="none" stroke="#9c9b97" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
        </marker>
      </defs>
      {/* Row 1: 01-02-03 */}
      <text className="font-mono text-[9px]" fill="#c8c7c3" x={14} y={14}>01</text>
      <rect fill="#fafaf9" stroke="#e2e1de" x={8} y={22} width={176} height={50} rx={8}/>
      <text className="font-semibold text-[12px]" fill="#0a0a0a" x={96} y={43} textAnchor="middle" dominantBaseline="central">問い合わせ受信</text>
      <text className="text-[10px]" fill="#6e6d69" x={96} y={60} textAnchor="middle" dominantBaseline="central">全チャネル統合</text>
      <line stroke="#c8c7c3" x1={184} y1={47} x2={206} y2={47} markerEnd="url(#arrow-sup)"/>
      
      <text className="font-mono text-[9px]" fill="#c8c7c3" x={210} y={14}>02</text>
      <rect fill="#fafaf9" stroke="#e2e1de" x={208} y={22} width={176} height={50} rx={8}/>
      <text className="font-semibold text-[12px]" fill="#0a0a0a" x={296} y={43} textAnchor="middle" dominantBaseline="central">内容分類</text>
      <text className="text-[10px]" fill="#6e6d69" x={296} y={60} textAnchor="middle" dominantBaseline="central">カテゴリ・緊急度</text>
      <line stroke="#c8c7c3" x1={384} y1={47} x2={406} y2={47} markerEnd="url(#arrow-sup)"/>
      
      <text className="font-mono text-[9px]" fill="#c8c7c3" x={410} y={14}>03</text>
      <rect fill="#fafaf9" stroke="#e2e1de" x={408} y={22} width={176} height={50} rx={8}/>
      <text className="font-semibold text-[12px]" fill="#0a0a0a" x={496} y={43} textAnchor="middle" dominantBaseline="central">回答ドラフト</text>
      <text className="text-[10px]" fill="#6e6d69" x={496} y={60} textAnchor="middle" dominantBaseline="central">KB・履歴から生成</text>
      
      {/* Arrow from 03 to 04 */}
      <line stroke="#c8c7c3" x1={496} y1={72} x2={496} y2={100} markerEnd="url(#arrow-sup)"/>
      
      {/* Row 2: 04 確信度判定 (center) */}
      <text className="font-mono text-[9px]" fill="#c8c7c3" x={210} y={104}>04</text>
      <rect fill="#fafaf9" stroke="#e2e1de" x={208} y={112} width={176} height={50} rx={8}/>
      <text className="font-semibold text-[12px]" fill="#0a0a0a" x={296} y={133} textAnchor="middle" dominantBaseline="central">確信度判定</text>
      <text className="text-[10px]" fill="#6e6d69" x={296} y={150} textAnchor="middle" dominantBaseline="central">閾値で分岐</text>
      
      {/* Curved path from 03 to 04 */}
      <path stroke="#c8c7c3" strokeWidth={1} fill="none" d="M 496 72 L 496 90 Q 496 100, 486 100 L 394 100 Q 384 100, 384 110 L 384 112" markerEnd="url(#arrow-sup)"/>
      
      {/* HIGH branch - from 04 left side to 自動送信 */}
      <text className="font-mono text-[8px]" fill="#9c9b97" x={130} y={172}>HIGH</text>
      <path stroke="#c8c7c3" strokeDasharray="5 4" strokeWidth={1} fill="none" d="M 208 137 L 184 137 L 184 190" markerEnd="url(#arrow-sup)"/>
      <rect fill="#fafaf9" stroke="#e2e1de" x={8} y={190} width={176} height={50} rx={8}/>
      <text className="font-semibold text-[12px]" fill="#0a0a0a" x={96} y={211} textAnchor="middle" dominantBaseline="central">自動送信</text>
      <text className="text-[10px]" fill="#6e6d69" x={96} y={228} textAnchor="middle" dominantBaseline="central">80%の対応を処理</text>
      
      {/* LOW branch - from 04 right side to 人にエスカレ */}
      <text className="font-mono text-[8px]" fill="#9c9b97" x={456} y={172}>LOW</text>
      <path stroke="#c8c7c3" strokeDasharray="5 4" strokeWidth={1} fill="none" d="M 384 137 L 408 137 L 408 190" markerEnd="url(#arrow-sup)"/>
      <rect fill="#fafaf9" stroke="#e2e1de" x={408} y={190} width={176} height={50} rx={8}/>
      <text className="font-semibold text-[12px]" fill="#0a0a0a" x={496} y={211} textAnchor="middle" dominantBaseline="central">人にエスカレ</text>
      <text className="text-[10px]" fill="#6e6d69" x={496} y={228} textAnchor="middle" dominantBaseline="central">担当者へ通知</text>
      
      {/* Connection from 自動送信 and 人にエスカレ to bottom row */}
      <path stroke="#c8c7c3" strokeWidth={1} fill="none" d="M 96 240 L 96 260 Q 96 270, 86 270 L 12 270 Q 8 270, 8 276" markerEnd="url(#arrow-sup)"/>
      <path stroke="#c8c7c3" strokeWidth={1} fill="none" d="M 496 240 L 496 260 Q 496 270, 486 270 L 112 270 Q 96 270, 96 276"/>
      
      {/* Bottom row: 05-06-07 */}
      <text className="font-mono text-[9px]" fill="#c8c7c3" x={14} y={290}>05</text>
      <rect fill="#fafaf9" stroke="#e2e1de" x={8} y={298} width={176} height={50} rx={8}/>
      <text className="font-semibold text-[12px]" fill="#0a0a0a" x={96} y={319} textAnchor="middle" dominantBaseline="central">KB自動更新</text>
      <text className="text-[10px]" fill="#6e6d69" x={96} y={336} textAnchor="middle" dominantBaseline="central">新パターン学習</text>
      <line stroke="#c8c7c3" x1={184} y1={323} x2={206} y2={323} markerEnd="url(#arrow-sup)"/>
      
      <text className="font-mono text-[9px]" fill="#c8c7c3" x={210} y={290}>06</text>
      <rect fill="#fafaf9" stroke="#e2e1de" x={208} y={298} width={176} height={50} rx={8}/>
      <text className="font-semibold text-[12px]" fill="#0a0a0a" x={296} y={319} textAnchor="middle" dominantBaseline="central">VOC分析</text>
      <text className="text-[10px]" fill="#6e6d69" x={296} y={336} textAnchor="middle" dominantBaseline="central">改善点を自動検出</text>
      <line stroke="#c8c7c3" x1={384} y1={323} x2={406} y2={323} markerEnd="url(#arrow-sup)"/>
      
      <text className="font-mono text-[9px]" fill="#c8c7c3" x={410} y={290}>07</text>
      <rect fill="#fafaf9" stroke="#e2e1de" x={408} y={298} width={176} height={50} rx={8}/>
      <text className="font-semibold text-[12px]" fill="#0a0a0a" x={496} y={319} textAnchor="middle" dominantBaseline="central">サービス改善</text>
      <text className="text-[10px]" fill="#6e6d69" x={496} y={336} textAnchor="middle" dominantBaseline="central">機能・UI改善提案</text>
      
      {/* Caption */}
      <text className="text-[10px]" fill="#9c9b97" x={300} y={390} textAnchor="middle">全件がナレッジに還元。使うほど精度が上がる。</text>
    </svg>
  )
}

function BackofficeWorkflowSVG() {
  return (
    <svg className="w-full h-auto" viewBox="0 0 600 340">
      <defs>
        <marker id="arrow-bo" viewBox="0 0 10 10" refX={8} refY={5} markerWidth={5} markerHeight={5} orient="auto-start-reverse">
          <path d="M2 1.5L8 5L2 8.5" fill="none" stroke="#9c9b97" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
        </marker>
      </defs>
      {/* Row 1 */}
      <text className="font-mono text-[9px]" fill="#c8c7c3" x={14} y={14}>01</text>
      <rect fill="#fafaf9" stroke="#e2e1de" x={8} y={22} width={176} height={50} rx={8}/>
      <text className="font-semibold text-[12px]" fill="#0a0a0a" x={96} y={43} textAnchor="middle" dominantBaseline="central">書類読取</text>
      <text className="text-[10px]" fill="#6e6d69" x={96} y={60} textAnchor="middle" dominantBaseline="central">請求書・領収書</text>
      <line stroke="#c8c7c3" x1={184} y1={47} x2={206} y2={47} markerEnd="url(#arrow-bo)"/>
      
      <text className="font-mono text-[9px]" fill="#c8c7c3" x={210} y={14}>02</text>
      <rect fill="#fafaf9" stroke="#e2e1de" x={208} y={22} width={176} height={50} rx={8}/>
      <text className="font-semibold text-[12px]" fill="#0a0a0a" x={296} y={43} textAnchor="middle" dominantBaseline="central">データ抽出</text>
      <text className="text-[10px]" fill="#6e6d69" x={296} y={60} textAnchor="middle" dominantBaseline="central">金額・取引先・日付</text>
      <line stroke="#c8c7c3" x1={384} y1={47} x2={406} y2={47} markerEnd="url(#arrow-bo)"/>
      
      <text className="font-mono text-[9px]" fill="#c8c7c3" x={410} y={14}>03</text>
      <rect fill="#fafaf9" stroke="#e2e1de" x={408} y={22} width={176} height={50} rx={8}/>
      <text className="font-semibold text-[12px]" fill="#0a0a0a" x={496} y={43} textAnchor="middle" dominantBaseline="central">仕訳分類</text>
      <text className="text-[10px]" fill="#6e6d69" x={496} y={60} textAnchor="middle" dominantBaseline="central">勘定科目を自動判定</text>
      <path stroke="#d5d4d0" strokeWidth={0.8} fill="none" d="M 584 47 Q 596 47, 596 80 L 596 100 Q 596 112, 584 112 L 24 112 Q 12 112, 12 124 L 12 134" markerEnd="url(#arrow-bo)"/>
      
      {/* Row 2 */}
      <text className="font-mono text-[9px]" fill="#c8c7c3" x={14} y={130}>04</text>
      <rect fill="#fafaf9" stroke="#e2e1de" x={8} y={138} width={176} height={50} rx={8}/>
      <text className="font-semibold text-[12px]" fill="#0a0a0a" x={96} y={159} textAnchor="middle" dominantBaseline="central">承認フロー</text>
      <text className="text-[10px]" fill="#6e6d69" x={96} y={176} textAnchor="middle" dominantBaseline="central">金額別ルーティング</text>
      <line stroke="#c8c7c3" x1={184} y1={163} x2={206} y2={163} markerEnd="url(#arrow-bo)"/>
      
      <text className="font-mono text-[9px]" fill="#c8c7c3" x={210} y={130}>05</text>
      <rect fill="#fafaf9" stroke="#e2e1de" x={208} y={138} width={176} height={50} rx={8}/>
      <text className="font-semibold text-[12px]" fill="#0a0a0a" x={296} y={159} textAnchor="middle" dominantBaseline="central">会計ソフト連携</text>
      <text className="text-[10px]" fill="#6e6d69" x={296} y={176} textAnchor="middle" dominantBaseline="central">freee・MF等</text>
      <line stroke="#c8c7c3" x1={384} y1={163} x2={406} y2={163} markerEnd="url(#arrow-bo)"/>
      
      <text className="font-mono text-[9px]" fill="#c8c7c3" x={410} y={130}>06</text>
      <rect fill="#fafaf9" stroke="#e2e1de" x={408} y={138} width={176} height={50} rx={8}/>
      <text className="font-semibold text-[12px]" fill="#0a0a0a" x={496} y={159} textAnchor="middle" dominantBaseline="central">支払処理</text>
      <text className="text-[10px]" fill="#6e6d69" x={496} y={176} textAnchor="middle" dominantBaseline="central">振込データ生成</text>
      <path stroke="#d5d4d0" strokeWidth={0.8} fill="none" d="M 584 163 Q 596 163, 596 196 L 596 216 Q 596 228, 584 228 L 24 228 Q 12 228, 12 240 L 12 250" markerEnd="url(#arrow-bo)"/>
      
      {/* Row 3 */}
      <text className="font-mono text-[9px]" fill="#c8c7c3" x={14} y={246}>07</text>
      <rect fill="#fafaf9" stroke="#e2e1de" x={8} y={254} width={176} height={50} rx={8}/>
      <text className="font-semibold text-[12px]" fill="#0a0a0a" x={96} y={275} textAnchor="middle" dominantBaseline="central">月次レポート</text>
      <text className="text-[10px]" fill="#6e6d69" x={96} y={292} textAnchor="middle" dominantBaseline="central">経営層へ自動配信</text>
      <line stroke="#c8c7c3" x1={184} y1={279} x2={206} y2={279} markerEnd="url(#arrow-bo)"/>
      
      <text className="font-mono text-[9px]" fill="#c8c7c3" x={210} y={246}>08</text>
      <rect fill="#fafaf9" stroke="#e2e1de" x={208} y={254} width={176} height={50} rx={8}/>
      <text className="font-semibold text-[12px]" fill="#0a0a0a" x={296} y={275} textAnchor="middle" dominantBaseline="central">自律改善</text>
      <text className="text-[10px]" fill="#6e6d69" x={296} y={292} textAnchor="middle" dominantBaseline="central">イレギュラー対応へ適応</text>
    </svg>
  )
}

export default function ServicePage() {
  return (
    <main className="bg-white min-h-screen">
      <Header variant="light" />
      <JsonLd
        data={[
          webPageJsonLd({
            path: "/service",
            name: "AIエージェント導入・DXソリューション",
            description: servicePageDescription,
          }),
          breadcrumbJsonLd([
            { name: "トップ", path: "/" },
            { name: "サービス", path: "/service" },
          ]),
          serviceJsonLd(),
        ]}
      />

      {/* Hero Section */}
      <section className="pt-36 pb-28 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <span className="w-12 h-px bg-neutral-900" />
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-neutral-400">
              Service
            </span>
          </div>
          <h1 className="text-[clamp(36px,5vw,56px)] font-bold text-neutral-900 leading-[1.2] tracking-[-0.03em] mb-7">
            AX・DXソリューション事業
          </h1>
          <p className="text-[15px] text-neutral-500 leading-[2] max-w-[520px]">
            経営・事業課題を、AIエージェントで解決する。<br />
            業務プロセスの自動化から意思決定の高速化まで、<br />
            あらゆる領域でAIが実務を遂行します。
          </p>
        </div>
      </section>

      {/* Service Sections */}
      {services.map((service, index) => (
        <section
          key={service.number}
          className={`border-t border-neutral-200 ${index % 2 === 1 ? "bg-neutral-50" : "bg-white"}`}
        >
          <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 py-24">
            {/* Section Header */}
            <div className="grid lg:grid-cols-2 gap-12 items-end mb-10">
              <div>
                <div className="font-mono text-[11px] tracking-[0.15em] text-neutral-400 mb-5">
                  {service.number}
                </div>
                <div className="font-mono text-[11px] tracking-[0.18em] text-neutral-400 uppercase mb-3">
                  {service.titleEn}
                </div>
                <h2 className="text-[clamp(28px,3.5vw,40px)] font-bold text-neutral-900 tracking-[-0.02em] leading-[1.25]">
                  {service.titleJa}
                </h2>
              </div>
              <p className="text-[14px] text-neutral-500 leading-[2] max-w-[440px] pb-1">
                {service.description}
              </p>
            </div>

            {/* Capabilities Tags */}
            <div className="flex flex-wrap gap-2 mb-14">
              {service.capabilities.map((cap) => (
                <span
                  key={cap}
                  className={`text-[12px] font-medium text-neutral-600 px-4 py-[7px] rounded-full border border-neutral-200 tracking-[0.02em] transition-all hover:border-neutral-900 hover:text-neutral-900 ${
                    index % 2 === 1 ? "bg-neutral-100" : "bg-white"
                  }`}
                >
                  {cap}
                </span>
              ))}
            </div>

            {/* Service Body */}
            <div className="grid lg:grid-cols-[35%_1fr] gap-14 items-start">
              {/* Left - Text Content */}
              <div>
                <p className="text-[20px] font-semibold text-neutral-900 tracking-[-0.01em] leading-[1.6] mb-4 whitespace-pre-line [word-break:auto-phrase] [text-wrap:balance]">
                  {service.leftHeadline}
                </p>
                <p className="text-[13px] text-neutral-500 leading-[2] mb-9">
                  {service.leftText}
                </p>
                <div className="flex gap-8">
                  {service.stats.map((stat) => (
                    <div key={stat.label}>
                      <div className="text-[32px] font-bold text-neutral-900 tracking-[-0.03em] leading-[1.2]">
                        {stat.value}
                      </div>
                      <div className="text-[11px] text-neutral-400 mt-1 tracking-[0.02em]">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right - Workflow Card with SVG */}
              <div className="bg-white border border-neutral-200 rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 bg-neutral-900 rounded-full" />
                    <span className="font-mono text-[11px] tracking-[0.15em] text-neutral-400 uppercase">
                      Workflow example
                    </span>
                  </div>
                  <span className="font-mono text-[10px] tracking-[0.1em] text-neutral-500 bg-neutral-100 px-3.5 py-1.5 rounded-full uppercase">
                    {service.workflowBadge}
                  </span>
                </div>

                {/* Workflow SVG - rendered based on service type */}
                {service.number === "01" && <SalesWorkflowSVG />}
                {service.number === "02" && <MarketingWorkflowSVG />}
                {service.number === "03" && <SupportWorkflowSVG />}
                {service.number === "04" && <BackofficeWorkflowSVG />}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Failure Pattern Section */}
      <section className="bg-neutral-50 border-t border-neutral-200">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 py-28">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-5">
              <span className="w-8 h-px bg-neutral-300" />
              <span className="font-mono text-[11px] tracking-[0.2em] text-neutral-400 uppercase">
                Common failures
              </span>
              <span className="w-8 h-px bg-neutral-300" />
            </div>
            <h2 className="text-[clamp(28px,3.5vw,40px)] font-bold text-neutral-900 tracking-[-0.02em] leading-[1.3]">
              DX・AI導入を成功させるために
            </h2>
          </div>

          <div className="grid lg:grid-cols-[1fr_40px_1fr] gap-0 items-start max-w-[960px] mx-auto">
            {/* Left - Typical Approach */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-9">
              <div className="font-mono text-[10px] tracking-[0.12em] text-neutral-400 uppercase mb-2">
                Typical approach
              </div>
              <div className="text-[18px] font-semibold text-neutral-900 mb-6">
                上手くいかないアプローチ
              </div>

              <div className="space-y-4">
                {[
                  { title: "とりあえずAI導入から考える", desc: "目的が曖昧なままエージェントを導入" },
                  { title: "業務プロセスはそのまま", desc: "既存の業務にAIを載せるだけ" },
                  { title: "成果が出ない・現場にのらない", desc: "現場に定着せず、投資が無駄になる" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-[22px] h-[22px] rounded-full bg-neutral-100 flex-shrink-0 flex items-center justify-center mt-0.5">
                      <span className="text-[11px] text-neutral-400">{idx + 1}</span>
                    </div>
                    <div>
                      <div className="text-[14px] font-semibold text-neutral-900 mb-0.5">{item.title}</div>
                      <div className="text-[12px] text-neutral-500 leading-[1.7]">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* VS Divider */}
            <div className="hidden lg:flex items-center justify-center h-full">
              <span className="font-mono text-[10px] tracking-[0.1em] text-neutral-400 [writing-mode:vertical-lr]">
                VS
              </span>
            </div>

            {/* Right - Lat91 Approach */}
            <div className="bg-neutral-900 rounded-2xl p-9 text-white">
              <div className="font-mono text-[10px] tracking-[0.12em] text-neutral-500 uppercase mb-2">
                Lat91 approach
              </div>
              <div className="text-[18px] font-semibold mb-6">
                Lat91のアプローチ
              </div>

              <div className="space-y-4">
                {[
                  { title: "現場を理解し、解くべき課題を特定する", desc: "経営・事業・組織の観点から設計する" },
                  { title: "解決されるオペレーションを実装する", desc: "成果を完遂する労働力として稼働させる" },
                  { title: "自律的に改善可能な状態まで伴走する", desc: "結果を学び、精度と効率を自動でチューニング" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-[22px] h-[22px] rounded-full bg-neutral-700 flex-shrink-0 flex items-center justify-center mt-0.5">
                      <span className="text-[11px] text-neutral-400">{idx + 1}</span>
                    </div>
                    <div>
                      <div className="text-[14px] font-semibold mb-0.5">{item.title}</div>
                      <div className="text-[12px] text-neutral-400 leading-[1.7]">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="text-center text-[15px] text-neutral-500 leading-[2] max-w-[640px] mx-auto mt-14">
            私たちの役割は、AIを使っていただくことではなく、<br />
            <strong className="text-neutral-900 font-semibold">本当の課題を特定し、解決し、事業を成長させること</strong>です。
          </p>
        </div>
      </section>

      {/* Process Section */}
      <section className="border-t border-neutral-200">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 py-28">
          <div className="text-center mb-18">
            <div className="flex items-center justify-center gap-4 mb-5">
              <span className="w-8 h-px bg-neutral-300" />
              <span className="font-mono text-[11px] tracking-[0.2em] text-neutral-400 uppercase">
                Process
              </span>
              <span className="w-8 h-px bg-neutral-300" />
            </div>
            <h2 className="text-[clamp(28px,3.5vw,40px)] font-bold text-neutral-900 tracking-[-0.02em] leading-[1.3]">
              支援実行プロセス
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-16">
            {processSteps.map((step) => (
              <div
                key={step.number}
                className="bg-neutral-50 border border-neutral-200 rounded-2xl p-8 relative flex flex-col"
              >
                <div className="text-[56px] font-bold text-neutral-300 leading-none tracking-[-0.04em] mb-6">
                  {step.number}
                </div>
                <div className="text-[20px] font-bold text-neutral-900 mb-2.5">
                  {step.title}
                </div>
                <div className="text-[13px] text-neutral-500 leading-[1.8] whitespace-pre-line flex-1">
                  {step.description}
                </div>
                <div className="font-mono text-[11px] text-neutral-400 tracking-[0.05em] mt-5">
                  {step.duration}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28 px-6 md:px-12 bg-neutral-50 border-t border-neutral-200">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-[clamp(28px,4vw,44px)] font-bold text-neutral-900 mb-6">
            まずはご相談ください
          </h2>
          <p className="text-neutral-500 text-lg mb-10">
            貴社の課題に合わせた最適なソリューションをご提案します
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-4 px-10 py-5 bg-neutral-900 text-white rounded-full font-medium text-base hover:bg-neutral-800 transition-all group"
          >
            お問い合わせ
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
              <ArrowRight size={16} />
            </span>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
