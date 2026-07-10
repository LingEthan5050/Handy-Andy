# HandyANDY — Next.js Website (Redesign v2)

## Quick Start

```bash
npm install
cp .env.local.example .env.local
```

### Authentication Setup
Before running the application, configure Google OAuth and Auth.js:

1. Visit the [Google OAuth documentation](https://developers.google.com/identity/protocols/oauth2#1.-obtain-oauth-2.0-credentials-from-the-google-api-console) to create OAuth credentials.
2. Create a Google OAuth application and obtain your **Google Client ID** and **Google Client Secret**.
3. Generate an Auth.js secret by running:
   ```bash
   npx auth secret
   ```
4. Copy the generated secret, along with the Google Client ID and Client Secret, into your `.env.local` file.

Run the development server:

```bash
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
