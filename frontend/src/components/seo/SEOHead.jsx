import React from 'react';
import { Helmet } from 'react-helmet-async';

const BASE_URL = 'https://mgmautomations.es';

const SEOHead = ({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = 'website',
  schemas = [],
}) => {
  const fullCanonical = canonical
    ? `${BASE_URL}${canonical}`
    : undefined;

  return (
    <Helmet>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {fullCanonical && <link rel="canonical" href={fullCanonical} />}

      {/* Open Graph */}
      {ogType && <meta property="og:type" content={ogType} />}
      {fullCanonical && <meta property="og:url" content={fullCanonical} />}
      {(ogTitle || title) && (
        <meta property="og:title" content={ogTitle || title} />
      )}
      {(ogDescription || description) && (
        <meta
          property="og:description"
          content={ogDescription || description}
        />
      )}
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta property="og:locale" content="es_ES" />
      <meta property="og:site_name" content="M.G.M Automations" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      {(ogTitle || title) && (
        <meta name="twitter:title" content={ogTitle || title} />
      )}
      {(ogDescription || description) && (
        <meta
          name="twitter:description"
          content={ogDescription || description}
        />
      )}
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {/* JSON-LD Schemas */}
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEOHead;
