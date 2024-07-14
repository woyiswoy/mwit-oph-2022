# MWIT Open House 2022 Website

The website includes online exhibitions and live sessions' booking system.

Exported to a static website at ~~[openhouse.mwit.ac.th](https://openhouse.mwit.ac.th)~~ (modified by the current student committee). However, you can view my version at [mwitoph2022.woyiswoy.com](https://mwitoph2022.woyiswoy.com)

## Framwork and Libraries

- Framework: [Next.js](https://nextjs.org/)
- Style: [Tailwind CSS](https://tailwindcss.com/)
- Motion: [Framer Motion](https://www.framer.com/motion/)
- Database: [MongoDB](https://www.mongodb.com) (Serverless)
- Authentication: [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- Email Service: [Nodemailer](https://nodemailer.com/)
- PWA (Progressive Web App): [next-pwa](https://github.com/shadowwalker/next-pwa)

## Running Locally

You will need to use the environment variables defined in `.env.example` to run the project. Add your value and rename the file to `.env.local`.

1. Install dependencies:

```
npm install
```

2. Start the dev server:

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.