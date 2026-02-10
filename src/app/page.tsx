import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="min-h-screen gradient-security">
      {/* Navigation */}
      <nav className="border-b border-border/50 backdrop-blur-sm bg-background/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/50">
              <span className="text-primary text-xl font-bold">🛡️</span>
            </div>
            <span className="text-xl font-bold glow-cyan">ShieldScan</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/scan" className="text-sm text-muted-foreground hover:text-foreground transition">
              Scanner
            </Link>
            <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition">
              Pricing
            </Link>
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/scan">Launch Scanner</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Badge className="mb-4 bg-primary/20 text-primary border-primary/50">
          Trusted by Security Researchers
        </Badge>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 glow-cyan">
          AI-Powered Smart Contract
          <br />
          Security in Minutes, Not Weeks
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Comprehensive security analysis powered by 19+ industry-standard tools.
          Detect vulnerabilities before they become exploits.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8">
            <Link href="/scan">Scan Now — Free</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-lg px-8">
            <Link href="#how-it-works">How It Works</Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
          <Card className="bg-card/50 border-primary/20 border-glow">
            <CardHeader>
              <CardTitle className="text-4xl font-bold text-primary">30+</CardTitle>
              <CardDescription>Protocols Audited</CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-card/50 border-destructive/20 border-glow">
            <CardHeader>
              <CardTitle className="text-4xl font-bold text-destructive">5</CardTitle>
              <CardDescription>Critical Bugs Found</CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-card/50 border-secondary/20 border-glow">
            <CardHeader>
              <CardTitle className="text-4xl font-bold text-secondary">19</CardTitle>
              <CardDescription>Security Tools Integrated</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4 border border-primary/50">
                <span className="text-2xl">📝</span>
              </div>
              <CardTitle>1. Submit Contract</CardTitle>
              <CardDescription className="text-base">
                Paste contract address, GitHub repo URL, or Solidity code directly
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mb-4 border border-secondary/50">
                <span className="text-2xl">🤖</span>
              </div>
              <CardTitle>2. AI Analysis</CardTitle>
              <CardDescription className="text-base">
                Our AI runs 19+ security tools and analyzes results in real-time
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-4 border border-accent/50">
                <span className="text-2xl">📊</span>
              </div>
              <CardTitle>3. Get Report</CardTitle>
              <CardDescription className="text-base">
                Receive detailed findings with severity ratings and remediation steps
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Recent Scans */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">Recent Scans</h2>
        <div className="max-w-4xl mx-auto space-y-4">
          {[
            { protocol: "Uniswap V4", chain: "Ethereum", findings: 2, severity: "Medium" },
            { protocol: "Aave V3", chain: "Polygon", findings: 0, severity: "None" },
            { protocol: "Compound Finance", chain: "Ethereum", findings: 1, severity: "Low" },
            { protocol: "SushiSwap", chain: "Arbitrum", findings: 3, severity: "High" },
            { protocol: "Curve Finance", chain: "Optimism", findings: 1, severity: "Medium" },
          ].map((scan, idx) => (
            <Card key={idx} className="bg-card/50 border-border hover:border-primary/50 transition cursor-pointer">
              <CardContent className="flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg">🔒</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">{scan.protocol}</h3>
                    <p className="text-sm text-muted-foreground">{scan.chain}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant={scan.severity === "High" ? "destructive" : scan.severity === "Medium" ? "default" : "secondary"}>
                    {scan.findings} {scan.severity}
                  </Badge>
                  <span className="text-sm text-muted-foreground">2 min ago</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-4">Pricing</h2>
        <p className="text-center text-muted-foreground mb-12">Choose the plan that fits your needs</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Free */}
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="text-2xl">Free</CardTitle>
              <CardDescription className="text-3xl font-bold mt-4">$0<span className="text-sm font-normal">/month</span></CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <span className="text-secondary">✓</span>
                  <span>3 scans per month</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-secondary">✓</span>
                  <span>Basic findings report</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-secondary">✓</span>
                  <span>All major chains</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-muted-foreground">×</span>
                  <span className="text-muted-foreground">Detailed reports</span>
                </li>
              </ul>
              <Button asChild className="w-full" variant="outline">
                <Link href="/scan">Get Started</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Pro */}
          <Card className="bg-card/50 border-primary/50 border-2 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
            </div>
            <CardHeader>
              <CardTitle className="text-2xl">Pro</CardTitle>
              <CardDescription className="text-3xl font-bold mt-4">$99<span className="text-sm font-normal">/month</span></CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <span className="text-secondary">✓</span>
                  <span>Unlimited scans</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-secondary">✓</span>
                  <span>Full detailed reports</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-secondary">✓</span>
                  <span>PoC generation</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-secondary">✓</span>
                  <span>Priority support</span>
                </li>
              </ul>
              <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/scan">Start Pro Trial</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Enterprise */}
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="text-2xl">Enterprise</CardTitle>
              <CardDescription className="text-3xl font-bold mt-4">$999<span className="text-sm font-normal">/month</span></CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <span className="text-secondary">✓</span>
                  <span>Everything in Pro</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-secondary">✓</span>
                  <span>Custom security rules</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-secondary">✓</span>
                  <span>API access</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-secondary">✓</span>
                  <span>Dedicated support</span>
                </li>
              </ul>
              <Button asChild className="w-full" variant="outline">
                <Link href="/scan">Contact Sales</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/50">
                  <span className="text-primary text-xl font-bold">🛡️</span>
                </div>
                <span className="text-xl font-bold">ShieldScan</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Built by security researchers who found Critical bugs in Berachain, CapyFi, XION, Flare, and Pinto
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/scan" className="hover:text-foreground transition">Scanner</Link></li>
                <li><Link href="#pricing" className="hover:text-foreground transition">Pricing</Link></li>
                <li><Link href="#" className="hover:text-foreground transition">Documentation</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition">GitHub</a></li>
                <li><a href="https://twitter.com/tomek57912" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition">Twitter (@tomek57912)</a></li>
                <li><a href="mailto:contact@shieldscan.io" className="hover:text-foreground transition">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/50 mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 ShieldScan. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
