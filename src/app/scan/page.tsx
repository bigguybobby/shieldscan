"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock findings data
const mockFindings = [
  {
    severity: "Critical",
    title: "Reentrancy Vulnerability",
    description: "External call in withdraw() function allows reentrancy attack",
    location: "Contract.sol:125",
    color: "destructive"
  },
  {
    severity: "High",
    title: "Unchecked Return Value",
    description: "Return value of external call not checked in transferFrom()",
    location: "Token.sol:87",
    color: "destructive"
  },
  {
    severity: "Medium",
    title: "Centralization Risk",
    description: "Owner has excessive privileges without timelock",
    location: "Ownable.sol:42",
    color: "default"
  },
  {
    severity: "Low",
    title: "Missing Input Validation",
    description: "Function parameters not validated for zero address",
    location: "Contract.sol:203",
    color: "secondary"
  },
  {
    severity: "Info",
    title: "Gas Optimization",
    description: "Loop can be optimized to reduce gas costs",
    location: "Utils.sol:156",
    color: "outline"
  },
];

export default function ScanPage() {
  const [inputType, setInputType] = useState("address");
  const [chain, setChain] = useState("ethereum");
  const [inputValue, setInputValue] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    setScanComplete(false);
    
    // Simulate scanning
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
    }, 3000);
  };

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
            <Link href="/#pricing" className="text-sm text-muted-foreground hover:text-foreground transition">
              Pricing
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2 glow-cyan">Smart Contract Scanner</h1>
          <p className="text-muted-foreground mb-8">
            Submit your smart contract for comprehensive security analysis
          </p>

          <Card className="bg-card/50 border-border mb-8">
            <CardHeader>
              <CardTitle>Contract Input</CardTitle>
              <CardDescription>
                Choose how you want to submit your contract for analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Input Type Selector */}
              <Tabs defaultValue="address" onValueChange={(v) => setInputType(v)}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="address">Contract Address</TabsTrigger>
                  <TabsTrigger value="github">GitHub URL</TabsTrigger>
                  <TabsTrigger value="code">Paste Code</TabsTrigger>
                </TabsList>
                
                <TabsContent value="address" className="space-y-4 mt-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Contract Address</label>
                    <Input
                      placeholder="0x..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="terminal-text"
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="github" className="space-y-4 mt-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">GitHub Repository URL</label>
                    <Input
                      placeholder="https://github.com/user/repo"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="code" className="space-y-4 mt-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Solidity Code</label>
                    <textarea
                      placeholder="// SPDX-License-Identifier: MIT&#10;pragma solidity ^0.8.0;&#10;&#10;contract MyContract {&#10;  // Your code here&#10;}"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="w-full h-48 px-3 py-2 bg-background border border-input rounded-md terminal-text text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </TabsContent>
              </Tabs>

              {/* Chain Selector */}
              <div>
                <label className="text-sm font-medium mb-2 block">Blockchain Network</label>
                <Select value={chain} onValueChange={setChain}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ethereum">Ethereum</SelectItem>
                    <SelectItem value="bsc">BSC</SelectItem>
                    <SelectItem value="polygon">Polygon</SelectItem>
                    <SelectItem value="arbitrum">Arbitrum</SelectItem>
                    <SelectItem value="optimism">Optimism</SelectItem>
                    <SelectItem value="base">Base</SelectItem>
                    <SelectItem value="berachain">Berachain</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Scan Button */}
              <Button
                onClick={handleScan}
                disabled={!inputValue || isScanning}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                size="lg"
              >
                {isScanning ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin">⚙️</span>
                    Scanning...
                  </span>
                ) : (
                  "Start Security Scan"
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Scanning Progress */}
          {isScanning && (
            <Card className="bg-card/50 border-primary/50 mb-8">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Fetching contract bytecode...</span>
                    <span className="text-primary">✓</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Running static analysis...</span>
                    <span className="animate-pulse">⚙️</span>
                  </div>
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="text-sm">Checking for known vulnerabilities...</span>
                    <span>○</span>
                  </div>
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="text-sm">Generating report...</span>
                    <span>○</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Results */}
          {scanComplete && (
            <div className="space-y-6">
              {/* Summary */}
              <Card className="bg-card/50 border-border">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Scan Results</CardTitle>
                      <CardDescription>
                        Analysis completed • {mockFindings.length} findings detected
                      </CardDescription>
                    </div>
                    <Button asChild variant="outline">
                      <Link href="/report/demo-123">View Full Report</Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-destructive">2</div>
                      <div className="text-sm text-muted-foreground">Critical/High</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-500">1</div>
                      <div className="text-sm text-muted-foreground">Medium</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-secondary">1</div>
                      <div className="text-sm text-muted-foreground">Low</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-muted-foreground">1</div>
                      <div className="text-sm text-muted-foreground">Info</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">19</div>
                      <div className="text-sm text-muted-foreground">Tools Run</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Findings Table */}
              <Card className="bg-card/50 border-border">
                <CardHeader>
                  <CardTitle>Security Findings</CardTitle>
                  <CardDescription>
                    Detailed list of vulnerabilities and issues found
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Severity</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Location</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockFindings.map((finding, idx) => (
                        <TableRow key={idx}>
                          <TableCell>
                            <Badge variant={finding.color as any}>
                              {finding.severity}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium">{finding.title}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {finding.description}
                          </TableCell>
                          <TableCell className="terminal-text text-sm text-primary">
                            {finding.location}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* CTA */}
              <Card className="bg-primary/10 border-primary/50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Upgrade for Full Report</h3>
                      <p className="text-sm text-muted-foreground">
                        Get detailed remediation steps, PoC exploits, and priority support
                      </p>
                    </div>
                    <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                      <Link href="/#pricing">Upgrade to Pro</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
