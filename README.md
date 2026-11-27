# Syed Tayyab Raza — Portfolio (React / Next.js)

Pages: `/` (mobile app development) and `/social-media/` (marketing and Uber Eats).

## Run
```bash
npm install      # first time only
npm run dev      # http://localhost:3000
```

## Publish
```bash
npm run build    # creates the "out" folder
npm run preview  # check the built site at http://localhost:4173
```
Upload `out` to any static host, or import this folder into Vercel.

## Structure
```
app/            Pages and shared layout
components/
  layout/       Header, footer, theme switch, page frame
  common/       Pieces used by both pages
  effects/      Animations and mouse effects
  home/         App development page sections
  social/       Marketing page sections
data/           All lists and contact details
hooks/          Shared React logic
styles/         CSS
public/images/  Photos
```

## Common edits
| Change | File |
|---|---|
| Phone, email, WhatsApp, GitHub, CV | `data/site.js` |
| Jobs, projects, skills, schools | `data/home.js` |
| Platforms, packages, playbooks, FAQ | `data/social.js` |
| Colours | `styles/home.css`, `styles/social.css`, `styles/variables.css` |
