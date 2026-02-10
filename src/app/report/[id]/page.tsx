"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const reportData = {
  id: "demo-123",
  contractAddress: "0x1234...5678",
  chain: "Ethereum Mainnet",
  scanDate: "February 10, 2024",
  totalFindings: 5,
  critical: 1,
  high: 1,
  medium: 1,
  low: 1,
  info: 1,
};

const detailedFindings = [
  {
    id: "001",
    severity: "Critical",
    title: "Reentrancy Vulnerability in withdraw()",
    description: "The withdraw() function makes an external call before updating the user's balance, allowing an attacker to recursively call the function and drain funds.",
    impact: "Complete loss of contract funds. An attacker can repeatedly call withdraw() and extract all ETH from the contract.",
    location: "Contract.sol:125-132",
    recommendation: "Update user balance BEFORE making external call (Checks-Effects-Interactions pattern). Consider using OpenZeppelin's ReentrancyGuard.",
    code: `function withdraw() external {
    uint256 balance = balances[msg.sender];
    require(balance > 0, "No balance");
    
    // VULNERABLE: External call before state update
    (bool success, ) = msg.sender.call{value: balance}("");
    require(success, "Transfer failed");
    
    balances[msg.sender] = 0; // State update AFTER external call
}`,
    fix: `function withdraw() external nonReentrant {
    uint256 balance = balances[msg.sender];
    require(balance > 0, "No balance");
    
    // FIXED: State update BEFORE external call
    balances[msg.sender] = 0;
    
    (bool success, ) = msg.sender.call{value: balance}("");
    require(success, "Transfer failed");
}`,
  },
  {
    id: "002",
    severity: "High",
    title: "Unchecked Return Value",
    description: "The transferFrom() function doesn't check the return value of the external token transfer call.",
    impact: "Failed transfers may not be detected, leading to incorrect accounting and potential loss of funds.",
    location: "Token.sol:87",
    recommendation: "Always check return values of external calls. Use SafeERC20 from OpenZeppelin.",
    code: `token.transferFrom(from, to, amount); // Return value not checked`,
    fix: `require(token.transferFrom(from, to, amount), "Transfer failed");`,
  },
  {
    id: "003",
    severity: "Medium",
    title: "Centralization Risk - Owner Privileges",
    description: "Contract owner has excessive privileges without timelock or multi-sig protection.",
    impact: "Single point of failure. Owner can modify critical parameters instantly without user protection.",
    location: "Ownable.sol:42-55",
    recommendation: "Implement a timelock for critical functions or use a multi-signature wallet.",
    code: `function setFeeRate(uint256 _feeRate) external onlyOwner {
    feeRate = _feeRate; // Can be changed instantly
}`,
    fix: `// Use OpenZeppelin's TimelockController
function setFeeRate(uint256 _feeRate) external onlyTimelock {
    feeRate = _feeRate;
}`,
  },
  {
    id: "004",
    severity: "Low",
    title: "Missing Zero Address Validation",
    description: "Function parameters are not validated for zero address, which could lead to accidental loss of funds.",
    location: "Contract.sol:203",
    recommendation: "Add require statements to validate addresses are not zero.",
    code: `function setTreasury(address _treasury) external onlyOwner {
    treasury = _treasury;
}`,
    fix: `function setTreasury(address _treasury) external onlyOwner {
    require(_treasury != address(0), "Invalid address");
    treasury = _treasury;
}`,
  },
  {
    id: "005",
    severity: "Info",
    title: "Gas Optimization Opportunity",
    description: "Loop can be optimized to reduce gas costs by caching array length.",
    location: "Utils.sol:156",
    recommendation: "Cache array length outside the loop to save gas on every iteration.",
    code: `for (uint i = 0; i < array.length; i++) {
    // operations
}`,
    fix: `uint256 length = array.length;
for (uint i = 0; i < length; i++) {
    // operations
}`,
  },
];

export default function ReportPage() {
  return (
    <div className="min-h-screen gradient-security">
      {/* Navigation */}
      <nav className="border-b border-border/50 backdrop-blur-sm bg-background/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/50">
              <span className="text-primary text-xl font-bold">🛡️</span>
            </div>
            <span className="text-xl font-bold glow-cyan">ShieldScan</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition">
              Home
            </Link>
            <Link href="/scan" className="text-sm text-muted-foreground hover:text-foreground transition">
              New Scan
            </Link>
            <Button variant="outline" className="gap-2">
              <span>📥</span>
              Download PDF
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">Report ID: {reportData.id}</Badge>
              <Badge variant="secondary">Shareable</Badge>
            </div>
            <h1 className="text-4xl font-bold mb-2 glow-cyan">Security Audit Report</h1>
            <p className="text-muted-foreground">
              Generated on {reportData.scanDate} • {reportData.chain}
            </p>
          </div>

          {/* Executive Summary */}
          <Card className="bg-card/50 border-border mb-8">
            <CardHeader>
              <CardTitle>Executive Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Contract Address</p>
                  <p className="terminal-text text-primary">{reportData.contractAddress}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Blockchain</p>
                  <p>{reportData.chain}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Scan Date</p>
                  <p>{reportData.scanDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Findings</p>
                  <p className="font-bold">{reportData.totalFindings}</p>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <p className="text-sm font-medium mb-3">Risk Distribution</p>
                <div className="grid grid-cols-5 gap-4">
                  <div className="text-center p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                    <div className="text-2xl font-bold text-destructive">{reportData.critical}</div>
                    <div className="text-xs text-muted-foreground mt-1">Critical</div>
                  </div>
                  <div className="text-center p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                    <div className="text-2xl font-bold text-destructive">{reportData.high}</div>
                    <div className="text-xs text-muted-foreground mt-1">High</div>
                  </div>
                  <div className="text-center p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                    <div className="text-2xl font-bold text-yellow-500">{reportData.medium}</div>
                    <div className="text-xs text-muted-foreground mt-1">Medium</div>
                  </div>
                  <div className="text-center p-3 bg-secondary/10 rounded-lg border border-secondary/20">
                    <div className="text-2xl font-bold text-secondary">{reportData.low}</div>
                    <div className="text-xs text-muted-foreground mt-1">Low</div>
                  </div>
                  <div className="text-center p-3 bg-muted/10 rounded-lg border border-muted/20">
                    <div className="text-2xl font-bold text-muted-foreground">{reportData.info}</div>
                    <div className="text-xs text-muted-foreground mt-1">Info</div>
                  </div>
                </div>
              </div>

              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                <p className="text-sm font-medium text-destructive mb-2">⚠️ Critical Issues Detected</p>
                <p className="text-sm text-muted-foreground">
                  This contract contains {reportData.critical + reportData.high} critical/high severity vulnerabilities 
                  that could result in loss of funds. Immediate action is required before deployment.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Findings Summary Table */}
          <Card className="bg-card/50 border-border mb-8">
            <CardHeader>
              <CardTitle>Findings Overview</CardTitle>
              <CardDescription>Summary of all detected vulnerabilities</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-20">ID</TableHead>
                    <TableHead className="w-32">Severity</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Location</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {detailedFindings.map((finding) => (
                    <TableRow key={finding.id}>
                      <TableCell className="terminal-text text-muted-foreground">
                        #{finding.id}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            finding.severity === "Critical" || finding.severity === "High"
                              ? "destructive"
                              : finding.severity === "Medium"
                              ? "default"
                              : finding.severity === "Low"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {finding.severity}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{finding.title}</TableCell>
                      <TableCell className="terminal-text text-sm text-primary">
                        {finding.location}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Detailed Findings */}
          <div className="space-y-6 mb-8">
            <h2 className="text-2xl font-bold">Detailed Findings</h2>
            {detailedFindings.map((finding) => (
              <Card key={finding.id} className="bg-card/50 border-border">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge
                          variant={
                            finding.severity === "Critical" || finding.severity === "High"
                              ? "destructive"
                              : finding.severity === "Medium"
                              ? "default"
                              : finding.severity === "Low"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {finding.severity}
                        </Badge>
                        <span className="terminal-text text-sm text-muted-foreground">
                          #{finding.id}
                        </span>
                      </div>
                      <CardTitle className="text-xl">{finding.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Description</h4>
                    <p className="text-sm text-muted-foreground">{finding.description}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-2">Impact</h4>
                    <p className="text-sm text-muted-foreground">{finding.impact}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-2">Location</h4>
                    <code className="text-sm terminal-text text-primary bg-background/50 px-3 py-1 rounded">
                      {finding.location}
                    </code>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-2">Vulnerable Code</h4>
                    <pre className="text-xs terminal-text bg-background/50 p-4 rounded-lg overflow-x-auto border border-border">
                      {finding.code}
                    </pre>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-2">Recommended Fix</h4>
                    <pre className="text-xs terminal-text bg-secondary/10 p-4 rounded-lg overflow-x-auto border border-secondary/20">
                      {finding.fix}
                    </pre>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-2">Recommendation</h4>
                    <p className="text-sm text-muted-foreground">{finding.recommendation}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tools Used */}
          <Card className="bg-card/50 border-border mb-8">
            <CardHeader>
              <CardTitle>Security Tools Utilized</CardTitle>
              <CardDescription>19 industry-standard tools were used in this analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  "Slither", "Mythril", "Manticore", "Echidna",
                  "Securify", "SmartCheck", "Oyente", "Solhint",
                  "MythX", "Semgrep", "4naly3er", "Aderyn",
                  "Wake", "Pyrometer", "Static Analyzer", "Code4rena",
                  "Manual Review", "Best Practices", "Gas Analysis"
                ].map((tool) => (
                  <div key={tool} className="flex items-center gap-2 text-sm">
                    <span className="text-secondary">✓</span>
                    <span>{tool}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Footer CTA */}
          <Card className="bg-primary/10 border-primary/50">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-bold">Need Help Fixing These Issues?</h3>
                <p className="text-muted-foreground">
                  Our security researchers can provide detailed remediation guidance and code reviews
                </p>
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link href="/#pricing">Upgrade to Pro</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
