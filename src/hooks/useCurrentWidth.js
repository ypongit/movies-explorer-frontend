import React, { useEffect, useState } from "react";
// отслеживание текущей ширины экрана устройства
export const useCurrentWidth = () => {
  const [width, setWidth] = React.useState(window.innerWidth);

  useEffect(() => {
    let timeoutId = null;
    const resizeListener = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setWidth(window.innerWidth), 150);
    }

    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('resize', resizeListener);
    }
  }, []);

  return width;
}

// export default useCurrentWidth;