import { useEffect, useRef } from "react";
import { useQuill } from "react-quilljs";

export default function Quill({ name, defaultValue }) {
  const { quill, quillRef } = useQuill();
  const inputRef = useRef();

  const handleChange = (e) => {
    if (inputRef) {
      inputRef.current.value = quill.root.innerHTML;
    }
  };

  useEffect(() => {
    if (quill) {
      if (defaultValue) {
        quill.clipboard.dangerouslyPasteHTML(defaultValue);
      }
      quill.on("text-change", handleChange);
    }
    return () => {
      if (quill) {
        quill.off("text-change", handleChange);
      }
    };
  }, [quill, defaultValue]);

  return (
    <div style={{ maxWidth: "700px" }}>
      <input ref={inputRef} type="hidden" name={name} />
      <div ref={quillRef} style={{ minHeight: "300px" }} />
    </div>
  );
}
