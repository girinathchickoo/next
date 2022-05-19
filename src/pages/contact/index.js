import { useEffect } from "react";

export default function Contact() {
  useEffect(() => {
    console.log(global.testScrollY);
  }, []);
  return (
    <h1>
      <a
        href=""
        onClick={(e) => {
          window.history.back();
          e.preventDefault();
        }}
      >
        contactcontact
      </a>
    </h1>
  );
}
