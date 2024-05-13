import React from "react";

function PromptInputComponent({
  title,
  textPlaceholder,
  textInput,
  onChange,
  cols,
  rows,
}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-white font-semibold pb-1">{title}</p>
      <div className="overflow-hidden rounded-xl">
        <textarea
          placeholder={textPlaceholder}
          className="resize-none w-full h-full p-2 bg-[#10101e] text-white"
          value={textInput}
          onChange={(e) => onChange(e.target.value)}
          cols={cols}
          rows={rows}
        ></textarea>
      </div>
    </div>
  );
}

export default PromptInputComponent;
