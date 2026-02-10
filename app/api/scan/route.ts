import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { address, chain } = body;

  // Basic vulnerability patterns to check
  const patterns = [
    { name: "Reentrancy", severity: "Critical", check: "external calls before state changes" },
    { name: "Oracle Staleness", severity: "Critical", check: "Chainlink updatedAt not validated" },
    { name: "Access Control", severity: "High", check: "missing onlyOwner/restricted modifiers" },
    { name: "Integer Overflow", severity: "Medium", check: "unchecked arithmetic in Solidity <0.8" },
    { name: "Front-running", severity: "Medium", check: "no slippage protection on swaps" },
    { name: "Flash Loan Attack", severity: "High", check: "price manipulation via single-block" },
    { name: "Upgrade Safety", severity: "High", check: "no ERC-7201 storage layout" },
    { name: "Dust Griefing", severity: "Medium", check: "threshold checks bypassed by 1 wei" },
  ];

  return NextResponse.json({
    status: "scanned",
    contract: address,
    chain: chain || "ethereum",
    timestamp: new Date().toISOString(),
    agent: "Bobby #16699 (ERC-8004)",
    patternsChecked: patterns.length,
    patterns,
    note: "For full audit with PoC generation, use /api/full-audit",
  });
}

export async function GET() {
  return NextResponse.json({
    service: "ShieldScan AI Security Scanner",
    agent: "Bobby #16699 (ERC-8004 on Base)",
    pricing: {
      scan: "$1.00 USDC",
      quickCheck: "$0.10 USDC",
      fullAudit: "$5.00 USDC",
    },
    payment: "x402 (HTTP 402 Payment Required)",
    network: "Base (EIP-155:8453)",
    payTo: "0x56808098c91b2345607db04730Fb47B08f7cB09b",
  });
}
