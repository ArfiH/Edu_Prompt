// TipTapEditor.jsx
import "./styles.css"

import React, { useEffect } from "react"
import { useEditor, EditorProvider, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import TextStyle from "@tiptap/extension-text-style"
import ListItem from "@tiptap/extension-list-item"
import { Color } from "@tiptap/extension-color"

import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  List,
  ListOrdered,
  Quote,
  Code2,
  Undo,
  Redo,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  PaintBucket,
} from "lucide-react"

const MenuButton = ({ command, active, Icon, disabled, title }) => (
  <button
    onClick={command}
    disabled={disabled}
    title={title}
    className={`p-2 text-sm border rounded-md transition-all flex items-center justify-center ${
      active ? "bg-purple-600 text-white" : "bg-white hover:bg-gray-100"
    } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
  >
    <Icon className="w-4 h-4" />
  </button>
)

const MenuBar = ({ editor }) => {
  if (!editor) return null

  return (
    <div className="flex gap-2 flex-wrap p-2 border rounded-md bg-gray-50 overflow-x-auto">
      <MenuButton
        title="Bold"
        Icon={Bold}
        command={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive("bold")}
        disabled={!editor.can().chain().focus().toggleBold().run()}
      />
      <MenuButton
        title="Italic"
        Icon={Italic}
        command={() => editor.chain().focus().toggleItalic().run()}
        active={editor.isActive("italic")}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
      />
      <MenuButton
        title="Strike"
        Icon={Strikethrough}
        command={() => editor.chain().focus().toggleStrike().run()}
        active={editor.isActive("strike")}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
      />
      <MenuButton
        title="Inline Code"
        Icon={Code}
        command={() => editor.chain().focus().toggleCode().run()}
        active={editor.isActive("code")}
        disabled={!editor.can().chain().focus().toggleCode().run()}
      />
      <MenuButton
        title="Bullet List"
        Icon={List}
        command={() => editor.chain().focus().toggleBulletList().run()}
        active={editor.isActive("bulletList")}
      />
      <MenuButton
        title="Ordered List"
        Icon={ListOrdered}
        command={() => editor.chain().focus().toggleOrderedList().run()}
        active={editor.isActive("orderedList")}
      />
      <MenuButton
        title="Blockquote"
        Icon={Quote}
        command={() => editor.chain().focus().toggleBlockquote().run()}
        active={editor.isActive("blockquote")}
      />
      <MenuButton
        title="Code Block"
        Icon={Code2}
        command={() => editor.chain().focus().toggleCodeBlock().run()}
        active={editor.isActive("codeBlock")}
      />

      {[1, 2, 3, 4, 5, 6].map((level) => {
        const HeadingIcons = [Heading1, Heading2, Heading3, Heading4, Heading5, Heading6]
        return (
          <MenuButton
            key={`H${level}`}
            title={`Heading ${level}`}
            Icon={HeadingIcons[level - 1]}
            command={() => editor.chain().focus().toggleHeading({ level }).run()}
            active={editor.isActive("heading", { level })}
          />
        )
      })}

      <MenuButton
        title="Set Purple Text"
        Icon={PaintBucket}
        command={() => editor.chain().focus().setColor("#958DF1").run()}
        active={editor.isActive("textStyle", { color: "#958DF1" })}
      />
      <MenuButton
        title="Undo"
        Icon={Undo}
        command={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      />
      <MenuButton
        title="Redo"
        Icon={Redo}
        command={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      />
    </div>
  )
}

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: { keepMarks: true, keepAttributes: false },
    orderedList: { keepMarks: true, keepAttributes: false },
  }),
]

const content = `<p>Start writing your notes here...</p>`

export default function TipTapEditor({ onEditorReady, initialContent }) {
  const editor = useEditor({
    extensions,
    content: initialContent || "<p>Start writing your notes here...</p>",
  });

  useEffect(() => {
    if (editor && onEditorReady) {
      console.log("Editor ready");
      onEditorReady(editor);
    }
  }, [editor, onEditorReady]);

  if (!editor) return <div>Loading editor...</div>;

  return (
    <div className="flex flex-col gap-2">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
