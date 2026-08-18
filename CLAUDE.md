# Project Instructions for Claude Agent

1. **No Automatic Production Builds**: Do NOT run `npm run build` unless explicitly requested.
2. **Modular Architecture**: Modularize components, pages, and sections using separate folders. Keep components self-contained.
3. **TypeScript Verification**: Run `npx tsc --noEmit` on every component creation/update and resolve all type issues.
4. **Database & API Safeguards**: Add error handling and fallback defaults in database fetches and Server Actions/APIs to prevent crashes.
