import { paymentProxy } from "@x402/next";
import { x402ResourceServer, HTTPFacilitatorClient } from "@x402/core/server";
import { registerExactEvmScheme } from "@x402/evm/exact/server";

// Agent wallet on Base - receives payments
const payTo = "0x56808098c91b2345607db04730Fb47B08f7cB09b";

// x402 facilitator (mainnet Base)
const facilitatorClient = new HTTPFacilitatorClient({
  url: "https://x402.org/facilitator",
});

const server = new x402ResourceServer(facilitatorClient);
registerExactEvmScheme(server);

export const middleware = paymentProxy(
  {
    // Premium audit API - $1 per scan
    "/api/scan": {
      accepts: [
        {
          scheme: "exact",
          price: "$1.00",
          network: "eip155:8453", // Base Mainnet
          payTo,
        },
      ],
      description: "AI-powered smart contract security scan",
      mimeType: "application/json",
    },
    // Quick vulnerability check - $0.10
    "/api/quick-check": {
      accepts: [
        {
          scheme: "exact",
          price: "$0.10",
          network: "eip155:8453",
          payTo,
        },
      ],
      description: "Quick vulnerability pattern check",
      mimeType: "application/json",
    },
    // Full audit report - $5
    "/api/full-audit": {
      accepts: [
        {
          scheme: "exact",
          price: "$5.00",
          network: "eip155:8453",
          payTo,
        },
      ],
      description: "Comprehensive AI security audit report",
      mimeType: "application/json",
    },
  },
  server
);

export const config = {
  matcher: ["/api/scan/:path*", "/api/quick-check/:path*", "/api/full-audit/:path*"],
};
