import { useEffect } from "react";

export const useTitle = () => {
  useEffect(() => {
    const pathSnippets = location.pathname.split("/").filter((i) => i);
    const pageTitle = pathSnippets[pathSnippets.length - 1];
    const formattedTitle = `${pageTitle.charAt(0).toUpperCase()}${pageTitle.slice(1)}`;

    document.title = `${process.env.REACT_APP_PROJETO} - ${formattedTitle}`;
  }, [location]);
};
