import React from 'react';
/**
 * interface CardToolbarProps {
 *   tools: {name: string, url: string}[]
 * }
 */
function CardToolbar (props) {
  return (
    <div style={styles.toolbar}>
    {
      props.tools.map((t, i) => {
        <a href={t.url}>{name}</a>
      })
    }
    </div>
  );
}

const styles = {
  toolbar: {
    marginTop: 4,
    backgroundColor: 'rgb(248, 248, 248)',
    borderTop: '1px solid #E4E4E4',
    height: 50
  }
}

export default CardToolbar;
