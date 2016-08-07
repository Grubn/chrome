import React from 'react';

const tools = [
  {
    name: 'google',
    url: 'http://google.com/?='
  },
  {
    name: 'image',
    url: 'http://google.com/images/?='
  }
];

/**
 * interface CardToolbarProps {
 *   tools: {name: string, url: string}[]
 * }
 */
function CardToolbar (props) {
  return (
    <div style={styles}>
    {
      tools.map((t, i) =>
        <a href={t.url + '/'+props.term} key={i}><img alt={t.name} src={chrome.extension.getURL(`assets/${t.name}.jpg`)}/></a>
      )
    }
    </div>
  );
}

const styles = {
    marginTop: 4,
    backgroundColor: 'rgb(248, 248, 248)',
    borderTop: '1px solid #E4E4E4',
    height: 50
}

export default CardToolbar;
