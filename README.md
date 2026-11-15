# 5Points Electric Technology Limited: corporate website

Built with Next.js (App Router), TypeScript, Tailwind CSS, GSAP, and Lenis. Content lives in `content/` as JSON and is edited through Decap CMS at `/admin`.

## Run it

```bash
npm install
cp .env.example .env.local   # fill in values as they become available
npm run dev                  # http://localhost:3000
```

`npm run build && npm start` runs the production build. Host on any Node platform, such as Vercel. The enquiry API needs a server, so a purely static export will not work.

## Before going live

| Item | Where |
| --- | --- |
| Phone, email, social links, WhatsApp number | CMS: Company information > Contact details and settings |
| Turn off sample products and projects | Same screen: "Show labelled sample products and projects" |
| Real products, projects, and photography | CMS: Products, Projects, Website images |
| Live domain | https://www.5pointselectric.com (default in `src/lib/site.ts`; override with `NEXT_PUBLIC_SITE_URL`) |
| Enquiry email delivery | `RESEND_API_KEY`, `ENQUIRY_TO_EMAIL`, `ENQUIRY_FROM_EMAIL` |
| Spam check (recommended) | `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` |
| Privacy notice for form data, reviewed by your legal adviser | Not yet included |

Until email delivery is configured, production forms show an error and nothing is sent. In development, enquiries are saved to `.data/enquiries.ndjson`.

The WhatsApp button stays hidden until a number is set, and unset contact details show as "to be confirmed".

## Editing content

**Locally:** run `npm run cms` and `npm run dev` together, then open http://localhost:3000/admin and choose Login. Changes are written straight to `content/`.

**In production, connecting the CMS:**

1. Put this project in a GitHub repository, and have the host redeploy on each commit.
2. Create a GitHub OAuth app with the callback URL `https://www.5pointselectric.com/api/cms/callback`.
3. Set `GITHUB_OAUTH_CLIENT_ID` and `GITHUB_OAUTH_CLIENT_SECRET`.
4. `public/admin/config.yml` already points at the `Lognetics/5point-electric` repository and the live domain.

Editors need write access to the repository. Each save is a commit, and the site updates once the redeploy finishes.

## Cars for sale

Each car is a file in `content/cars/`, editable in the CMS under "Cars for sale". The first photo is the cover, and the first three key figures show on the car card. Cars marked "Feature on the home page" appear in the home page's Shop Cars section. Photos live in `public/images/cars/`; number plates were blurred before upload, so blur any new plates the same way.

The original photo and screenshot folder (`5Points Website Products /`) is ignored by git so that WhatsApp screenshots are never published.

## Content rules

- Do not publish unverified specifications, certifications, brands, statistics, or projects.
- Entries with `sample: true` are labelled on the page, kept out of the sitemap, and marked noindex.
- Category lists are defined twice: keep `src/lib/taxonomy.ts` and `public/admin/config.yml` in sync.
- An invalid content file fails the build, and the error names the file, so bad data cannot reach the live site.

## Image licences

Current photos come from Pexels and Wikimedia Commons (CC BY-SA) and are credited at `/image-credits`, which must stay published while the Wikimedia photos are in use. Remove an entry from `content/image-credits.json` when its photo is replaced.
