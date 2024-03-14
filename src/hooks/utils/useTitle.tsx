import { useEffect } from "react";

export const useTitle = () => {
  useEffect(() => {
    const pathSnippets = location.pathname.split("/").filter((i) => i);
    const pageTitle =
      pathSnippets.length > 0 ? pathSnippets[pathSnippets.length - 1] : "Authentication";
    const formattedTitle = `${pageTitle.charAt(0).toUpperCase()}${pageTitle.slice(1)}`;

    document.title = `${process.env.REACT_APP_PROJETO} - ${formattedTitle}`;
  }, [location]);
};
