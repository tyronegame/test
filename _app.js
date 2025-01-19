import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Rewrite links to use local domain
    const rewriteLinks = () => {
      document.querySelectorAll('a').forEach(link => {
        if (link.href.includes('datng.site')) {
          const url = new URL(link.href);
          link.href = url.pathname + url.search + url.hash;
        }
      });
    };

    // Run after initial render and when content changes
    rewriteLinks();
    const observer = new MutationObserver(rewriteLinks);
    observer.observe(document.body, { subtree: true, childList: true });

    return () => observer.disconnect();
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp; 