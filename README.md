# UwU-Underground Hacker Quiz

Find out which member of the legendary hacker band UwU-Underground matches your personality! Answer 10 questions about exploits, malware, APTs, and hacking tactics to discover your digital soulmate!

## Features

- Interactive quiz with 10 cybersecurity-themed questions
- Beautiful animations and modern design
- Cyberpunk theme with UwU aesthetics
- Results with detailed character descriptions and match percentages
- Mobile-friendly responsive design

## Tech Stack

- React with Vite
- Framer Motion for animations
- Recharts for data visualization
- Custom CSS styling

## Deployment to GitHub Pages

### Automatic Deployment (GitHub Actions)

This repository is set up with GitHub Actions to automatically deploy to GitHub Pages when you push to the main branch.

1. Make sure you've updated the `homepage` in `package.json` to match your GitHub username
2. Push your changes to the main branch
3. GitHub Actions will build and deploy your site automatically
4. Visit `https://your-username.github.io/uwu-quiz` to see your deployed site

### Manual Deployment

You can also deploy manually using the following steps:

1. Install the gh-pages package if you haven't already:
   ```
   npm install gh-pages --save-dev
   ```

2. Make sure your `vite.config.js` and `package.json` are properly configured (already done in this repo)

3. Deploy to GitHub Pages:
   ```
   npm run deploy
   ```

4. Visit `https://your-username.github.io/uwu-quiz` to see your deployed site

## Development

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) to view it in your browser

## License

MIT
