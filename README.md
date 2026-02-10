# 🛡️ ShieldScan

**AI-Powered Smart Contract Security Scanner**

A professional security analysis platform for smart contracts that provides comprehensive vulnerability detection in minutes, not weeks.

## 🚀 Features

- **Landing Page** with hero section, stats, how it works, pricing, and recent scans
- **Scanner Page** with multiple input methods (contract address, GitHub URL, or paste code)
- **Professional Report Page** with detailed findings and remediation steps
- **Multi-Chain Support**: Ethereum, BSC, Polygon, Arbitrum, Optimism, Base, Berachain
- **Dark Security Theme** with terminal-style aesthetics
- **Fully Responsive** mobile design

## 🛠️ Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **shadcn/ui** components
- **Vercel** (ready for deployment)

## 📦 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📁 Project Structure

```
shieldscan/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Landing page
│   │   ├── scan/
│   │   │   └── page.tsx          # Scanner page
│   │   ├── report/
│   │   │   └── [id]/
│   │   │       └── page.tsx      # Report page
│   │   ├── layout.tsx            # Root layout
│   │   └── globals.css           # Global styles
│   ├── components/
│   │   └── ui/                   # shadcn/ui components
│   └── lib/
│       └── utils.ts              # Utility functions
├── public/                       # Static assets
└── README.md
```

## 🎨 Design Features

- **Dark Theme**: Professional security aesthetic with dark blues and greens
- **Terminal Styling**: Monospace fonts for code and addresses
- **Glowing Effects**: Cyan and green glows for emphasis
- **Border Animations**: Subtle glowing borders on cards
- **Responsive Grid**: Mobile-first responsive design

## 🔐 Mock Security Features

The MVP includes mock/demo functionality:

- **Mock Scan Results**: Pre-defined vulnerability findings
- **Sample Reports**: Example security audit reports
- **Demo Findings**: 5 example vulnerabilities (Critical to Info)
- **Recent Scans**: Mock data with real protocol names

## 🚢 Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repo to Vercel for automatic deployments.

## 🔮 Future Enhancements

- [ ] Supabase integration for auth & scan history
- [ ] Real security tool integration (Slither, Mythril, etc.)
- [ ] PDF report generation
- [ ] API endpoint for programmatic scans
- [ ] User dashboard
- [ ] Team collaboration features
- [ ] Proof of Concept (PoC) exploit generation

## 👨‍💻 Built By

Security researchers who found **Critical bugs** in:
- Berachain
- CapyFi
- XION
- Flare
- Pinto

## 📱 Connect

- GitHub: [github.com/shieldscan](https://github.com)
- Twitter: [@tomek57912](https://twitter.com/tomek57912)
- Email: contact@shieldscan.io

## 📄 License

MIT License - feel free to use this project as a template.

---

**Built with Next.js 14, TypeScript, and Tailwind CSS**
