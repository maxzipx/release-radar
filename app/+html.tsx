import { ScrollViewStyleReset } from 'expo-router/html';

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>Release Radar</title>
        <meta
          name="description"
          content="A curated release calendar for the movies and TV shows worth paying attention to in 2026."
        />
        <meta name="theme-color" content="#111827" />
        <meta property="og:title" content="Release Radar" />
        <meta
          property="og:description"
          content="Track the culturally relevant movie and TV releases of 2026 across theaters and streaming."
        />
        <meta property="og:type" content="website" />
        <ScrollViewStyleReset />
        <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

const globalStyles = `
html, body {
  background: #111827;
  color: #f8fafc;
}
`;
