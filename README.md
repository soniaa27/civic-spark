# 🏙️ Civilians Bengaluru - Gamified Civic Engagement for Namma Bengaluru

A modern, mobile-first civic engagement platform specifically designed for Bengaluru. Report, vote on, and track civic issues while earning XP, badges, and climbing leaderboards. Make Namma Bengaluru better, one report at a time!

![Civilians Bengaluru](https://img.shields.io/badge/Civilians-Namma%20Bengaluru-teal?style=for-the-badge)

## ✨ Features

### 🎮 Gamification System
- **Points System**: Earn XP for reporting issues, upvoting, verifying resolutions, and daily engagement
- **Levels**: Progress through 5 civic roles from Citizen to City Champion
- **Badges**: Unlock achievement badges for various civic actions
- **Leaderboards**: Compete on global, local, and friend leaderboards
- **Daily Streaks**: Maintain engagement with streak rewards

### 🗺️ Interactive Map
- **Real-time Map**: Powered by OpenStreetMap and Leaflet
- **Issue Markers**: Color-coded markers by status (Critical, Acknowledged, In Progress, Resolved)
- **Priority System**: Smart priority calculation based on upvotes, trust scores, and time decay
- **Filter & Search**: Filter issues by category and location

### 👍 Upvoting System
- **Community Voting**: Users can upvote issues they care about
- **Weighted Votes**: Higher-level users have more influence
- **Priority Boost**: High-upvote issues gain higher priority
- **Anti-Abuse**: Trust scores and rate limiting prevent spam

### 📊 Issue Lifecycle
- **Transparent Workflow**: Track issues from Report → Verified → Acknowledged → In Progress → Resolved
- **Status Tracking**: Real-time status updates with notifications
- **Community Verification**: Community members can verify resolutions
- **Time Analytics**: Track time-to-resolution metrics

### 🔐 Trust & Verification
- **Reputation System**: User trust scores based on level and activity
- **Photo Verification**: Mandatory photos with GPS and timestamp
- **Duplicate Detection**: Prevent duplicate reports
- **Spam Prevention**: Flagging system for fake reports

## 🎨 Design System

### Color Palette

**Primary Colors:**
- **Deep Teal** (`#0F766E`) - Trust, authority, governance
- **Green** (`#22C55E`) - Sustainability, progress
- **Amber** (`#F59E0B`) - Action, gamification highlights

**Status Colors:**
- 🔴 **Red** - Critical / Unresolved
- 🟠 **Orange** - Acknowledged
- 🔵 **Blue** - In Progress
- 🟢 **Green** - Resolved

### Typography
- **Font Family**: Inter (with system fallbacks)
- **Minimalistic Design**: Clean, modern, and accessible

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- npm, yarn, or bun package manager

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd civic-spark

# Install dependencies
npm install
# or
bun install

# Start development server
npm run dev
# or
bun dev
```

The app will be available at `http://localhost:8080`

### Build for Production

```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

## 📱 Usage

### Reporting an Issue

1. Navigate to the **Report** tab
2. Select the issue category (Pothole, Streetlight, Garbage, etc.)
3. Add a photo (optional but recommended)
4. Describe the issue in detail
5. Confirm location (auto-detected via GPS)
6. Submit and earn XP!

### Viewing Issues

- **Home Tab**: Browse recent issues with filters
- **Map Tab**: View all issues on an interactive map
- **Filter**: Filter by category, status, or location

### Earning Points

| Action | Points |
|--------|--------|
| Report verified issue | +20 |
| Issue upvoted | +2 per upvote |
| Add photo evidence | +10 |
| Verify resolution | +15 |
| Daily login | +5 |
| Weekly challenge | +50 |

### Leveling Up

1. **Citizen** (0-100 XP) - New users
2. **Active Reporter** (100-300 XP) - Consistent contributors
3. **City Helper** (300-700 XP) - Active community members
4. **Community Leader** (700-1500 XP) - Top contributors
5. **City Champion** (1500+ XP) - Elite civic heroes

## 🏗️ Architecture

### Tech Stack
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Library**: Radix UI (shadcn/ui)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Maps**: React Leaflet + Leaflet
- **Routing**: React Router
- **State Management**: React Query (TanStack Query)

### Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── ui/          # shadcn/ui components
│   └── ...          # Custom components
├── views/           # Page-level views
├── types/           # TypeScript type definitions
├── data/            # Mock data (replace with API)
├── lib/             # Utility functions
│   ├── utils.ts     # General utilities
│   └── priority.ts  # Priority calculation logic
└── pages/           # Route pages
```

### Key Algorithms

#### Priority Calculation
```typescript
Priority Score = 
  (Upvotes × User Trust Score) 
  + Time Decay Factor 
  + Category Urgency Weight
  + Status Bonus
```

#### Trust Score
```typescript
Trust Score = 
  Base Score (from level) 
  + Streak Bonus 
  + Resolution Bonus
```

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Deploy automatically on push

**Configuration**: Already configured via `vercel.json`

### Netlify

1. Push your code to GitHub
2. Import project in Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

**Configuration**: Already configured via `netlify.toml`

### Other Platforms

The built app can be deployed to any static hosting service:
- AWS S3 + CloudFront
- GitHub Pages
- Cloudflare Pages
- Firebase Hosting

## 🔧 Configuration

### Environment Variables

Create a `.env` file for production:

```env
VITE_API_URL=your-api-url
VITE_MAP_TILE_URL=your-map-tile-url (optional)
```

### Map Configuration

The app uses OpenStreetMap by default. To use a different tile provider:

1. Update `MapView.tsx` TileLayer URL
2. Add attribution if required

## 📈 Future Enhancements

- [ ] Backend API integration
- [ ] Real-time notifications
- [ ] Push notifications
- [ ] Social sharing
- [ ] Ward-level competitions
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Offline mode
- [ ] PWA support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **OpenStreetMap** for map tiles
- **Leaflet** for mapping library
- **shadcn/ui** for UI components
- **Radix UI** for accessible primitives
- **Framer Motion** for animations

## 📞 Support

For issues, questions, or contributions:
- Open an issue on GitHub
- Contact: [your-email@example.com]

---

**Built with ❤️ for civic engagement and community impact**

Make your city better, one report at a time! 🏙️✨
