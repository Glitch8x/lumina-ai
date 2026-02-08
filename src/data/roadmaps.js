import { Terminal, Shield, Cpu, Globe, Database, Lock, Layers, Code, Server, Zap, Key, Share2, PenTool, Users, Megaphone, Briefcase, Gavel, TrendingUp, Search, Award, Crown, Lightbulb, Anchor, DollarSign, Puzzle, Headphones, Layout } from 'lucide-react';

export const roadmaps = {
    technical: [
        {
            id: 'blockchain-dev',
            title: 'Blockchain Developer',
            icon: Terminal,
            color: 'blue',
            description: 'The "Full Stack" of Web3. Build dApps and core protocols.',
            steps: [
                { phase: 'Fundamentals', topics: ['CS Basics', 'Cryptography (Hashing, Asymmetric)', 'P2P Networks'] },
                { phase: 'Ethereum & EVM', topics: ['EVM Architecture', 'Gas Mechanics', 'Transactions', 'Wallets'] },
                { phase: 'Smart Contracts', topics: ['Solidity', 'Foundry/Hardhat', 'ERC Standards', 'Proxy Patterns'] },
                { phase: 'Frontend', topics: ['React/Next.js', 'Ethers.js/Viem', 'RainbowKit', 'Indexing (The Graph)'] },
                { phase: 'Security', topics: ['Reentrancy', 'Access Control', 'Common Attack Vectors'] }
            ]
        },
        {
            id: 'solana-dev',
            title: 'Solana Developer',
            icon: Zap,
            color: 'violet',
            description: 'Build high-performance apps on Solana using Rust.',
            steps: [
                { phase: 'Rust Basics', topics: ['Ownership & Borrowing', 'Cargo', 'Data Structures', 'Error Handling'] },
                { phase: 'Solana Architecture', topics: ['Accounts Model', 'PDA (Program Derived Addresses)', 'CPI (Cross-Program Invocation)'] },
                { phase: 'Anchor Framework', topics: ['IDL Generation', 'Client Types', 'Testing with Mocha'] },
                { phase: 'Token Extensions', topics: ['Minting', 'Freezing', 'Metadata', 'Token 2022 Standard'] }
            ]
        },
        {
            id: 'smart-contract-auditor',
            title: 'Smart Contract Auditor',
            icon: Shield,
            color: 'emerald',
            description: 'Identify critical vulnerabilities. The "Whitehat" hacker path.',
            steps: [
                { phase: 'Mastery', topics: ['EVM Opcodes', 'Assembly (Yul)', 'DeFi Mechanics'] },
                { phase: 'Vulnerabilities', topics: ['Reentrancy', 'Front-running', 'Arithmetic Overflows', 'Oracle Manipulation'] },
                { phase: 'Tools', topics: ['Slither', 'Mythril', 'Echidna', 'Foundry Fuzzing'] },
                { phase: 'Reporting', topics: ['POC Creation', 'Severity Assessment', 'Remediation'] }
            ]
        },
        {
            id: 'zero-knowledge-eng',
            title: 'Zero-Knowledge Engineer',
            icon: Lock,
            color: 'slate',
            description: 'Build privacy-preserving protocols and ZK-Rollups.',
            steps: [
                { phase: 'Mathematics', topics: ['Modular Arithmetic', 'Polynomials', 'Elliptic Curves'] },
                { phase: 'Primitives', topics: ['SNARKs vs STARKs', 'Trusted Setup', 'Prover/Verifier'] },
                { phase: 'Languages', topics: ['Circom', 'Halo2', 'Noir', 'Leo'] },
                { phase: 'Applications', topics: ['Privacy Payments', 'Identity (ZkID)', 'ZkEVMs'] }
            ]
        },
        {
            id: 'defi-strategist',
            title: 'DeFi Strategist / Quant',
            icon: Cpu,
            color: 'cyan',
            description: 'Design financial primitives and algorithmic trading strategies.',
            steps: [
                { phase: 'DeFi Legos', topics: ['AMMs (Uniswap V2/V3)', 'Lending (Aave)', 'Synthetics'] },
                { phase: 'Math', topics: ['Constant Product Formula', 'Bonding Curves', 'Impermanent Loss'] },
                { phase: 'MEV', topics: ['Arbitrage', 'Sandwich Attacks', 'Flashbots', 'Builder API'] },
                { phase: 'Analytics', topics: ['Python (Pandas)', 'Dune SQL', 'Risk Modeling'] }
            ]
        },
        {
            id: 'devops-web3',
            title: 'Web3 DevOps',
            icon: Server,
            color: 'orange',
            description: 'Run nodes, validators, and robust infrastructure.',
            steps: [
                { phase: 'Cloud', topics: ['AWS/GCP', 'Docker & Kubernetes', 'Terraform'] },
                { phase: 'Node Ops', topics: ['Geth/Erigon Setup', 'Consensus Clients', 'Monitoring (Grafana/Prometheus)'] },
                { phase: 'Validators', topics: ['Staking Hardware', 'Key Management', 'Slashing Prevention'] },
                { phase: 'CI/CD', topics: ['GitHub Actions for Contracts', 'Slither Integration'] }
            ]
        },
        {
            id: 'frontend-web3',
            title: 'Web3 Frontend Engineer',
            icon: Layout,
            color: 'pink',
            description: 'Focus purely on the UI/UX layer of dApps.',
            steps: [
                { phase: 'Modern React', topics: ['Hooks', 'Context API', 'State Management (Zustand)'] },
                { phase: 'Web3 Libraries', topics: ['Wagmi', 'Viem', 'Ethers.js', 'WalletConnect'] },
                { phase: 'UX Challenges', topics: ['Transaction Loading States', 'Wallet Connection Flows', 'Gas Estimation UI'] },
                { phase: 'Mobile', topics: ['Responsive Design', 'PWA', 'Wallet Adapters'] }
            ]
        },
        {
            id: 'protocol-engineer',
            title: 'Core Protocol Engineer',
            icon: Layers,
            color: 'indigo',
            description: 'Build the blockchain itself (L1/L2 client development).',
            steps: [
                { phase: 'Low Level', topics: ['Go (Geth)', 'Rust (Reth/Solana)', 'C++'] },
                { phase: 'Networking', topics: ['Libp2p', 'Gossip Protocols', 'Discovery'] },
                { phase: 'Database', topics: ['Merkle Patricia Tries', 'LevelDB/RocksDB'] },
                { phase: 'Consensus', topics: ['Proof of Stake', 'BFT (Byzantine Fault Tolerance)'] }
            ]
        },
        {
            id: 'data-engineer',
            title: 'Web3 Data Engineer',
            icon: Database,
            color: 'teal',
            description: 'Index, query, and organize massive on-chain datasets.',
            steps: [
                { phase: 'Indexing', topics: ['The Graph (Subgraphs)', 'Subsquid', 'Goldsky'] },
                { phase: 'Big Data', topics: ['Google BigQuery (Crypto Public Datasets)', 'Spark'] },
                { phase: 'APIs', topics: ['RPC Nodes', 'Alchemy/Infura', 'Websockets'] },
                { phase: 'Visualization', topics: ['Dune Analytics', 'Tableau', 'Custom Dashboards'] }
            ]
        },
        {
            id: 'security-researcher',
            title: 'Security Researcher',
            icon: Search,
            color: 'red',
            description: 'Hunt for 0-days and advance the field of crypto-security.',
            steps: [
                { phase: 'Exploit Dev', topics: ['Reverse Engineering', 'Decompilation', 'Bytecode Analysis'] },
                { phase: 'Cryptography', topics: ['Signature Malleability', 'Key Exchange Attacks'] },
                { phase: 'MEV Ops', topics: ['Dark Forest', 'Mempool Monitoring'] }
            ]
        },
        {
            id: 'gamefi-dev',
            title: 'GameFi Developer',
            icon: Puzzle,
            color: 'fuchsia',
            description: 'Integrate blockchain economies into games.',
            steps: [
                { phase: 'Game Engines', topics: ['Unity', 'Unreal Engine 5', 'Godot'] },
                { phase: 'Web3 SDKs', topics: ['ChainSafe', 'Thirdweb', 'Metamask SDK'] },
                { phase: 'Economies', topics: ['Play-to-Earn Models', 'NFT Assets', 'In-Game Tokens'] }
            ]
        },
        {
            id: 'nft-dev',
            title: 'NFT Specialist',
            icon: Crown,
            color: 'purple',
            description: 'Master ERC-721/1155, marketplaces, and metadata.',
            steps: [
                { phase: 'Standards', topics: ['ERC-721A (Azuki)', 'ERC-1155', 'Soulbound Tokens'] },
                { phase: 'Storage', topics: ['IPFS', 'Arweave', 'On-Chain SVG'] },
                { phase: 'Marketplaces', topics: ['Seaport Protocol', 'Blur SDK', 'Royalties'] }
            ]
        },
        {
            id: 'l2-engineer',
            title: 'L2 Scaling Engineer',
            icon: Layers,
            color: 'blue',
            description: 'Work on Optimistic and ZK Rollups.',
            steps: [
                { phase: 'Rollup Basics', topics: ['Sequencers', 'Call Data', 'State Roots'] },
                { phase: 'Stacks', topics: ['OP Stack (Optimism)', 'Arbitrum Orbit', 'Polygon CDK'] },
                { phase: 'Bridges', topics: ['Cross-Chain Messaging', 'Liquidity Pools', 'Light Clients'] }
            ]
        },
        {
            id: 'account-abstraction',
            title: 'Account Abstraction Dev',
            icon: Key,
            color: 'green',
            description: 'Build next-gen smart wallets (ERC-4337).',
            steps: [
                { phase: 'ERC-4337', topics: ['Bundlers', 'Paymasters', 'UserOperations', 'EntryPoints'] },
                { phase: 'Auth', topics: ['Social Login (Web3Auth)', 'Passkeys', 'Biometrics'] },
                { phase: 'Features', topics: ['Gas Sponsorship', 'Batch Transactions', 'Session Keys'] }
            ]
        }
    ],
    nonTechnical: [
        {
            id: 'product-manager',
            title: 'Web3 Product Manager',
            icon: Briefcase,
            color: 'blue',
            description: 'Lead the vision and execution of dApps.',
            steps: [
                { phase: 'Discovery', topics: ['User Research', 'Competitor Analysis', 'Problem/Solution Fit'] },
                { phase: 'Strategy', topics: ['Tokenomics Integration', 'Roadmaps', 'Go-to-Market'] },
                { phase: 'Execution', topics: ['Agile/Scrum', 'Specs (PRDs)', 'Stakeholder Mgmt'] },
                { phase: 'Metrics', topics: ['TVL (Total Value Locked)', 'DAU/MAU', 'Retention'] }
            ]
        },
        {
            id: 'dev-rel',
            title: 'Developer Relations (DevRel)',
            icon: Headphones,
            color: 'pink',
            description: 'Advocate for developers building on your protocol.',
            steps: [
                { phase: 'Content', topics: ['Tutorials', 'Documentation', 'Video Guides'] },
                { phase: 'Events', topics: ['Hackathons', 'Workshops', 'Conferences'] },
                { phase: 'Support', topics: ['Discord Debugging', 'Feedback Loops', 'SDK Improvements'] }
            ]
        },
        {
            id: 'community-manager',
            title: 'Community Manager',
            icon: Users,
            color: 'amber',
            description: 'Build and protect the tribe.',
            steps: [
                { phase: 'Platforms', topics: ['Discord Setup', 'Telegram Bots', 'Twitter Communities'] },
                { phase: 'Engagement', topics: ['AMAs', 'Contests', 'Meme Competitions'] },
                { phase: 'Safety', topics: ['Scam Prevention', 'Moderation Bots', 'Role Management'] }
            ]
        },
        {
            id: 'web3-marketing',
            title: 'Web3 Growth Marketer',
            icon: Megaphone,
            color: 'purple',
            description: 'Drive user acquisition and hype cycles.',
            steps: [
                { phase: 'Narrative', topics: ['Storytelling', 'Positioning', 'Memetics'] },
                { phase: 'Channels', topics: ['Twitter/X', 'Farcaster', 'Lens', 'Influencer (KOL) Mgmt'] },
                { phase: 'Funnel', topics: ['Quest Platforms (Galxe/Layer3)', 'Airdrop Farming', 'Referrals'] }
            ]
        },
        {
            id: 'tech-writer',
            title: 'Technical Writer',
            icon: PenTool,
            color: 'cyan',
            description: 'Translating complex code into human language.',
            steps: [
                { phase: 'Docs', topics: ['GitBook', 'Docusaurus', 'API References'] },
                { phase: 'Education', topics: ['Deep Dives', 'Protocol Walkthroughs', 'Whitepapers'] },
                { phase: 'Format', topics: ['Markdown', 'Diagrams (Mermaid)', 'Video Scripts'] }
            ]
        },
        {
            id: 'governance-lead',
            title: 'DAO Governance Lead',
            icon: Gavel,
            color: 'emerald',
            description: 'Manage the democratic process of DAOs.',
            steps: [
                { phase: 'Frameworks', topics: ['Governor Alpha/Bravo', 'MolochDAO', 'Snapshot'] },
                { phase: 'Process', topics: ['Proposal Lifecycle (RFC -> CIP)', 'Quorum', 'Voting Periods'] },
                { phase: 'Diplomacy', topics: ['Lobbying Delegates', 'Consensus Building', 'Conflict Resolution'] }
            ]
        },
        {
            id: 'vc-analyst',
            title: 'VC Investment Analyst',
            icon: TrendingUp,
            color: 'green',
            description: 'Find the next unicorn protocol.',
            steps: [
                { phase: 'Deal Flow', topics: ['Sourcing', 'Networking', 'Thesis Formatting'] },
                { phase: 'Due Diligence', topics: ['Team Vetting', 'Tech Audits', 'Market Sizing'] },
                { phase: 'Tokenomics', topics: ['Vesting Schedules', 'FDV vs Market Cap', 'Utility'] },
                { phase: 'Portfolio', topics: ['Support', 'Board Meetings', 'Exit Strategy'] }
            ]
        },
        {
            id: 'legal-compliance',
            title: 'Web3 Legal/Compliance',
            icon: Gavel,
            color: 'slate',
            description: 'Navigating the regulatory gray zones.',
            steps: [
                { phase: 'Regs', topics: ['SEC/Howey Test', 'MiCA (EU)', 'KYC/AML Requirements'] },
                { phase: 'Structures', topics: ['Foundations (Swiss/Cayman)', 'DAO Wrappers', 'LLCs'] },
                { phase: 'IP', topics: ['CC0', 'Trademarks', 'Open Source Licenses'] }
            ]
        },
        {
            id: 'talent-recruiter',
            title: 'Web3 Recruiter',
            icon: Search,
            color: 'indigo',
            description: 'Find the best talent in a pseudonymous world.',
            steps: [
                { phase: 'Sourcing', topics: ['GitHub Scanning', 'Twitter Advanced Search', 'Crypto Job Boards'] },
                { phase: 'Vetting', topics: ['Proof of Work', 'On-Chain Rep check', 'Technical Screening'] },
                { phase: 'Closing', topics: ['Token Grants', 'Remote Culture', 'Comp Packages'] }
            ]
        },
        {
            id: 'event-manager',
            title: 'Web3 Event Manager',
            icon: Crown,
            color: 'fuchsia',
            description: 'Host legendary hackathons and side-events.',
            steps: [
                { phase: 'Logistics', topics: ['Venue Sourcing', 'Sponsorship Decks', 'Budgeting'] },
                { phase: 'Production', topics: ['AV/Streaming', 'Merch', 'WiFi (Critical!)'] },
                { phase: 'Hackathons', topics: ['Devfolio/DoraHacks', 'Judging Criteria', 'Prize Pools'] }
            ]
        },
        {
            id: 'business-dev',
            title: 'Business Development (BD)',
            icon: Share2,
            color: 'blue',
            description: 'Forge partnerships and integrations.',
            steps: [
                { phase: 'Sales', topics: ['Lead Gen', 'Cold Outreach', 'CRM Mgmt'] },
                { phase: 'Partnerships', topics: ['Integration Swaps', 'Co-Marketing', 'Ecosystem Funds'] },
                { phase: 'Negotiation', topics: ['Term Sheets', 'Grant Applications'] }
            ]
        },
        {
            id: 'ui-ux-designer',
            title: 'Web3 UI/UX Designer',
            icon: Layout,
            color: 'pink',
            description: 'Design trustworthy and beautiful interfaces.',
            steps: [
                { phase: 'Trust', topics: ['Transaction Feedback', 'Human-Readable Errors', 'Safety Indicators'] },
                { phase: 'Visuals', topics: ['Glassmorphism', 'Dark Mode', 'Data Visualization'] },
                { phase: 'Tools', topics: ['Figma', 'Spline (3D)', 'Rive (Animation)'] }
            ]
        },
        {
            id: 'research-analyst',
            title: 'Research Analyst',
            icon: Lightbulb,
            color: 'yellow',
            description: 'Write deep-dive reports on trends (Messari style).',
            steps: [
                { phase: 'Sectors', topics: ['L1s', 'DeFi', 'NFTs', 'Gaming', 'Infrastructure'] },
                { phase: 'Data', topics: ['On-Chain Metrics', 'Dev Activity', 'Financials'] },
                { phase: 'Publishing', topics: ['Substack', 'Twitter Threads', 'Pro Reports'] }
            ]
        },
        {
            id: 'token-economist',
            title: 'Token Economist',
            icon: DollarSign,
            color: 'green',
            description: 'Design sustainable economic systems.',
            steps: [
                { phase: 'Supply', topics: ['Inflation/Deflation', 'Burns', 'Emissions'] },
                { phase: 'Demand', topics: ['Staking', 'Locks (veToken)', 'Utility'] },
                { phase: 'Simulation', topics: ['Machinations.io', 'Python Modeling', 'Game Theory'] }
            ]
        },
        {
            id: 'project-manager',
            title: 'Web3 Project Manager',
            icon: Anchor,
            color: 'slate',
            description: 'Keep the chaotic DAO shipping on time.',
            steps: [
                { phase: 'Methodologies', topics: ['Agile', 'Kanban', 'Async Work'] },
                { phase: 'Tools', topics: ['Notion', 'Linear', 'Dework (DAO native)'] },
                { phase: 'Comms', topics: ['Standups', 'Retrospectives', 'Cross-Team Syncs'] }
            ]
        }
    ]
};

// Helper for icon fallback

