# HandyANDY — Next.js Website (Redesign v2)

## Quick Start

```bash
npm install
cp .env.local.example .env.local   # fill in Gmail credentials
npm run dev
```

Open http://localhost:3000

## Add Your Images
Drop these into `/public/` to replace placeholder images:

| File | Location |
|------|----------|
| `handyandylogo.png` | Navbar + Footer |
| `founder.jpg` | Homepage hero teaser, About page |
| `team.jpg` | About page |
| Any project photos | Update `img` URLs in portfolio/page.tsx |

## Email (Contact Form)
1. Enable 2FA on Gmail
2. Generate an App Password at https://myaccount.google.com/apppasswords
3. Add to `.env.local`:
   ```
   EMAIL_USERNAME=you@gmail.com
   EMAIL_PASSWORD=your-app-password
   RECEIVER_EMAIL=where-to-send@gmail.com
   ```

## Build
```bash
npm run build && npm start
```
