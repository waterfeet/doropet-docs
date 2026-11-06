/**
 * 从 Gitee 发布仓库拉取 latest.json，写成本地数据文件供文档站引用。
 *
 * 设计要点：
 *   · 拉取失败**不阻断构建** —— 用上一次的值兜底，只打警告。
 *     文档站在 Vercel 上构建，到 gitee.com 的连通性不稳定，不能让它拖垮部署。
 *   · 超时 8 秒。Vercel 构建有总时长限制，不能被一个请求卡住。
 *   · 输出的 json 是**提交进仓库的**，作为基线兜底；每次构建会覆盖它。
 */

import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const SOURCE = 'https://gitee.com/waterfeet/doropetrelease/raw/master/latest.json'
const OUT = path.resolve('docs/.vitepress/data/release.json')
const TIMEOUT_MS = 8000

async function fetchLatest() {
  const res = await fetch(SOURCE, {
    signal: AbortSignal.timeout(TIMEOUT_MS),
    headers: { 'User-Agent': 'doropet-docs-build' }
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

async function readPrevious() {
  if (!existsSync(OUT)) return null
  try {
    return JSON.parse(await readFile(OUT, 'utf8'))
  } catch {
    return null
  }
}

async function main() {
  let fresh = null
  try {
    fresh = await fetchLatest()
  } catch (err) {
    console.warn(`[release] 拉取 latest.json 失败：${err.message}`)
  }

  const prev = await readPrevious()

  const version = fresh?.version || prev?.version
  if (!version) {
    console.warn('[release] 没有可用的版本信息，跳过写入')
    return
  }

  const data = {
    version,
    pubDate: fresh?.pub_date || prev?.pubDate || '',
    downloadUrl:
      fresh?.platforms?.['windows-x86_64']?.url || prev?.downloadUrl || '',
    source: fresh ? 'gitee' : 'cache',
    syncedAt: new Date().toISOString()
  }

  await mkdir(path.dirname(OUT), { recursive: true })
  await writeFile(OUT, `${JSON.stringify(data, null, 2)}\n`, 'utf8')

  const tag = data.source === 'gitee' ? '已同步' : '沿用缓存'
  console.log(`[release] v${data.version}（${tag}）`)
}

main()
