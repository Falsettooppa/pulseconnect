cat > README.md <<'EOF'
# PulseConnect

PulseConnect — Social Media Dashboard (Cohort XIII Class_A)

## What this repo contains
A React + TypeScript + Vite social dashboard prototype:
- Dashboard with posts (create, like, comment)
- Authentication using Supabase (Email/password, Magic Link, OAuth)
- Profile, Messages (placeholder), and Settings pages
- Protected routes and session management

## Tech stack
- React + TypeScript + Vite
- TailwindCSS (utility styles)
- Supabase (auth & planned DB)
- Lucide icons

## Quick start (local)
1. Copy environment variables:
   - Create `.env` at project root with:
     ```
     VITE_SUPABASE_URL=https://your-project-ref.supabase.co
     VITE_SUPABASE_ANON_KEY=your-anon-key
     ```
2. Install and run:
npm ci
npm run dev
3. Open the app (Vite prints the URL, e.g. http://localhost:5173)

## Demo checklist (presenter)
1. Show login page (`/login`) and signup options (Password, Magic Link, OAuth).  
2. Sign up or sign in and show redirect to Dashboard.  
3. Create a new post in the feed (top of feed) — show it appears instantly.  
4. Click ❤️ to like a post; open comments and add a comment.  
5. Show Profile page with editable fields.  
6. Show Messages placeholder and Settings page.  
7. Show logout and redirect to `/login`.

## Branch strategy
- `main` — stable code for submission
- `supabase-auth` — supabase & auth integration (merged to main for submission)

## Notes
- This is a prototype and uses Supabase for auth; database persistence for posts is planned (next step).
- For any issues, check the browser console and `npm run dev` terminal output.

EOF
