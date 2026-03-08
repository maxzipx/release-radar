# Release Radar

A curated cultural release calendar for 2026. Track, browse, and discover upcoming films and TV shows across platforms with a clean, intuitive interface.

## Overview

**Release Radar** is a cross-platform mobile and web application that provides a thoughtfully curated snapshot of major cultural releases throughout 2026. Rather than attempting to catalog every title, it focuses on releases likely to drive conversation and cultural relevance—the films and shows worth paying attention to.

Whether you're planning your watch list for the year or catching up on what's coming this week, Release Radar surfaces the releases that matter with rich contextual information.

## Features

### 📅 Timeline View
Browse releases organized by month and quarter. Get an overview of the full year's slate with release counts per month. Major releases are highlighted for quick scanning.

### 🔍 Browse & Filter
Trim the slate to match your interests:
- **Type**: Film or TV
- **Platform**: Theaters, HBO, Netflix, Apple TV+, and more
- **Genre**: Sci-Fi, Drama, Action, Comedy, and others
- **Release Status**: Confirmed or TBA by quarter

Filter selections persist within your session, making it easy to refine your search.

### ⚡ This Week
Discover what's coming out in the current week at a glance. Perfect for planning your immediate viewing schedule.

### Rich Release Cards
Each release includes:
- **Poster image** with fallback formatting
- **Heat score** (1-5) indicating cultural significance
- **Metadata badges**: Release date, type (Film/TV), platform
- **Short description** for quick context
- **Expandable details** with:
  - Editorial blurb explaining why this release matters
  - Topic tags for categorization
  - Genre breakdown
  - Trailer link

## Tech Stack

### Frontend Framework
- **React** 19.2.0 with TypeScript
- **React Native** 0.83.2 for native iOS/Android
- **React Native Web** for responsive web experience
- **Expo** 55 for unified cross-platform development

### Navigation & State
- **Expo Router** for file-based routing
- **React Navigation** for mobile navigation patterns
- **AsyncStorage** for persistent session state

### Development & Quality
- **TypeScript** ~5.9.2 for type safety
- **Jest** for unit and component testing
- **Playwright** for end-to-end testing
- **ESLint** with Expo config for code quality

### Styling & Animation
- **React Native StyleSheet** for platform-specific styles
- **React Native Reanimated** for smooth animations
- **Custom theme system** with dark mode support

## Project Structure

```
release-radar/
├── app/                           # Expo Router app structure
│   ├── (tabs)/                    # Tabbed navigation
│   │   ├── index.tsx             # Timeline screen
│   │   ├── browse.tsx            # Browse & filter screen
│   │   ├── this-week.tsx         # This week screen
│   │   └── _layout.tsx           # Tab navigation layout
│   ├── _layout.tsx               # Root layout
│   ├── +html.tsx                 # Web-specific HTML
│   └── +not-found.tsx            # 404 handler
│
├── components/                    # Reusable UI components
│   └── release/
│       ├── ReleaseCard.tsx       # Main release display card
│       ├── ScreenHeader.tsx      # Section header component
│       ├── FilterChip.tsx        # Filter button component
│       ├── FilterGroup.tsx       # Filter group container
│       ├── HeatScore.tsx         # Heat score visual indicator
│       └── EmptyState.tsx        # Empty state UI
│
├── data/                          # Release content
│   ├── releases.ts               # Release data loader
│   └── releases-2026.json        # Release catalog (2026)
│
├── hooks/                         # Custom React hooks
│   └── useSessionFilters.ts      # Filter state management
│
├── lib/                           # Utilities & business logic
│   ├── releases.ts               # Release filtering & formatting
│   └── types.ts                  # TypeScript type definitions
│
├── constants/                     # Static configuration
│   └── theme.ts                  # Color palette & shadows
│
├── docs/                          # Documentation
│   └── content-rubric.md         # Guidelines for adding releases
│
├── tests/                         # Unit & component tests
│   ├── releases.test.ts
│   └── ReleaseCard.test.tsx
│
├── e2e/                           # End-to-end tests
│   └── smoke.spec.ts
│
├── assets/                        # Images & media
│   └── images/                   # Icons, splash screens, etc.
│
├── package.json                   # Project dependencies
├── app.json                       # Expo configuration
├── eas.json                       # EAS build configuration
├── tsconfig.json                  # TypeScript configuration
├── jest.config.cjs               # Jest configuration
└── eslint.config.js              # ESLint configuration
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- For iOS development: Xcode (macOS)
- For Android development: Android Studio

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd release-radar
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

### Running on Different Platforms

**Web Browser**
```bash
npm run web
```

**iOS Simulator** (macOS only)
```bash
npm run ios
```

**Android Emulator**
```bash
npm run android
```

## Development Commands

| Command | Purpose |
|---------|---------|
| `npm start` | Start Expo development server |
| `npm run web` | Run in web browser |
| `npm run ios` | Run on iOS simulator |
| `npm run android` | Run on Android emulator |
| `npm test` | Run unit tests with Jest |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:e2e` | Run Playwright E2E tests |
| `npm run lint` | Check code quality with ESLint |
| `npm run build:web` | Build static web bundle |

## Content Management

### Adding or Updating Releases

Releases are stored in `data/releases-2026.json` with the following structure:

```json
{
  "id": "unique-slug",
  "slug": "unique-slug",
  "title": "Release Title",
  "releaseDate": "2026-MM-DD",
  "releaseStatus": "confirmed",
  "releaseQuarter": "Q1",
  "type": "film",
  "platform": "Theaters",
  "genres": ["Genre1", "Genre2"],
  "heatScore": 4,
  "shortDescription": "One sentence hook (under 100 chars)",
  "editorialBlurb": "2-3 sentences explaining relevance (under 240 chars)",
  "posterUrl": "https://example.com/poster.jpg",
  "trailerUrl": "https://example.com/trailer",
  "tags": ["Tag1", "Tag2"],
  "seasonLabel": "Season 2",
  "isMajorRelease": true
}
```

### Content Guidelines

Before adding or updating titles, review `docs/content-rubric.md` which covers:
- **Inclusion criteria**: What releases matter culturally
- **Heat score guide**: How to rate cultural impact (1-5 scale)
- **Copy constraints**: Length and tone requirements
- **Field completeness**: Required and optional fields

**Key principles:**
- Focus on releases likely to drive meaningful conversation
- Ensure credible dates or quarter windows
- Prioritize cultural relevance over database completeness

## Testing

### Unit & Component Tests
```bash
npm test
```

Uses Jest and React Testing Library for component testing. Test files located in `tests/` directory.

### End-to-End Tests
```bash
npm run test:e2e
```

Uses Playwright for cross-browser and cross-platform E2E testing. Smoke tests ensure core functionality works.

## Deployment

### Web Build
```bash
npm run build:web
```

Creates a static web build in the `dist/` directory. Deploy to any static hosting service (Vercel, Netlify, etc.).

### Mobile Apps

Uses Expo Application Services (EAS) for building iOS and Android apps. Configuration in `eas.json`.

For iOS and Android builds:
```bash
eas build --platform ios
eas build --platform android
```

See [EAS documentation](https://docs.expo.dev/eas/) for more details.

## Styling & Theme

The app uses a cohesive dark mode design system defined in `constants/theme.ts`:
- **Colors**: Primary text, secondary text, accent, surface, borders, etc.
- **Shadows**: Subtle depth with card and UI shadows
- **Typography**: Consistent font sizes and weights

Components use React Native `StyleSheet` for performance and platform-specific styling. The dark theme (controlled via `userInterfaceStyle` in `app.json`) provides a modern, content-focused experience.

## Browser & Platform Support

- **Web**: Modern browsers (Chrome, Firefox, Safari, Edge)
- **iOS**: iOS 13+
- **Android**: Android 6.0+

The app is fully responsive and adapts to all screen sizes from phones to tablets to desktop browsers.

## Key Dependencies

- **expo**: Cross-platform framework
- **react-native**: Native UI components
- **react-native-web**: Web support
- **expo-router**: File-based routing
- **react-native-reanimated**: Animations
- **@react-native-async-storage/async-storage**: Persistent storage

See `package.json` for complete dependency list.

## Code Quality

- **TypeScript**: Full type coverage for type safety
- **ESLint**: Enforces code consistency and best practices
- **Jest**: Unit and integration test coverage
- **Playwright**: E2E test automation

Run the linter before committing:
```bash
npm run lint
```

## Contributing

When contributing:
1. Follow the existing code style (enforced by ESLint)
2. Add tests for new features
3. Update relevant documentation
4. For content changes, follow the content rubric in `docs/content-rubric.md`
5. Test on multiple platforms (web, iOS, Android) when possible

## License

[Check LICENSE file in repository]

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Expo Router Documentation](https://docs.expo.dev/routing/introduction/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Built with** React Native, Expo, and TypeScript • **Last Updated**: March 2026
