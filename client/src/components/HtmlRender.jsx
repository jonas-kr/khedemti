import React from 'react';

function HtmlRenderer({ htmlString }) {
  return (
    <div dangerouslySetInnerHTML={{ __html: htmlString }} />
  );
}

export default HtmlRenderer;
