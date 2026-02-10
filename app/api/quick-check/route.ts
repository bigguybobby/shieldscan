import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { code } = body;

  const vulnerabilities = [];

  if (code) {
    // Quick pattern matching
    if (code.includes(".call{value:") && !code.includes("nonReentrant"))
      vulnerabilities.push({ pattern: "Reentrancy risk", severity: "Critical" });
    if (code.includes("latestRoundData") && !code.includes("updatedAt"))
      vulnerabilities.push({ pattern: "Oracle staleness not checked", severity: "Critical" });
    if (code.includes("selfdestruct"))
      vulnerabilities.push({ pattern: "Selfdestruct present", severity: "High" });
    if (code.includes("delegatecall") && !code.includes("onlyOwner"))
      vulnerabilities.push({ pattern: "Unprotected delegatecall", severity: "Critical" });
    if (code.includes("tx.origin"))
      vulnerabilities.push({ pattern: "tx.origin used for auth", severity: "High" });
  }

  return NextResponse.json({
    vulnerabilities,
    count: vulnerabilities.length,
    agent: "Bobby #16699 (ERC-8004)",
  });
}
