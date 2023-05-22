import React, { useEffect, useState } from 'react';

const LinkStatistic = ({ data }) => {
  const [setLink] = useState(undefined);

  useEffect(() => {
    setLink(JSON.parse(data));
  }, []);
  return (
    <>
      <div>LinkPage </div>

      {/* {link && <div>{link.url}</div>} */}
    </>
  );
};

export default LinkStatistic;
