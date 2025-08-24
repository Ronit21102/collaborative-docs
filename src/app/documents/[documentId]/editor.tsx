"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import starterKit from "@tiptap/starter-kit";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";

import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";

import Image from "@tiptap/extension-image";
import ImageResize from "tiptap-extension-resize-image";
import { useEffect } from "react";

export const Editor = () => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        style: `padding-left: 56px; padding-right: 56px;`,
        class:
          "focus:outline-none print:boder-0 border bg-white border-editor-border flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text",
      },
    },
    extensions: [
      starterKit,
      Image,
      ImageResize,
      Table,
      TableCell,
      TableHeader,
      TableRow,
      TaskItem.configure({ nested: true }),
      TaskList,
    ],
    content:
      '<Table><TableBody><tr><th>Name</th><th colspan="3">Description</th></tr><tr><td>Ronit Roushan</td><td>Fullstack Developer</td><td>30LPA</td><td>October</td></tr></TableBody></Table>',
  });

  useEffect(() => {
    if (!editor) return;

    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (const item of Array.from(items)) {
        if (!item) continue;
        // image types from clipboard when copying an image
        if (item.type && item.type.indexOf("image") === 0) {
          const file = item.getAsFile();
          if (!file) continue;
          e.preventDefault();
          const reader = new FileReader();
          reader.onload = () => {
            const src = reader.result as string;
            // insert image at current selection
            editor.chain().focus().setImage({ src }).run();
          };
          reader.readAsDataURL(file);
        }
      }
    };

    const dom = editor.view.dom as HTMLElement;
    dom.addEventListener("paste", handlePaste as EventListener);

    return () => dom.removeEventListener("paste", handlePaste as EventListener);
  }, [editor]);
  return (
    <div className="size-full overflow-x-auto bg-[#f9fbfd] px-4 print:p-0 print:bg-white print:overflow-visible">
      <div className="min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
