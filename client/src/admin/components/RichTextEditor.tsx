import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'

interface RichTextEditorProps {
    content: string
    onChange: (html: string) => void
}

const RichTextEditor = ({ content, onChange }: RichTextEditorProps) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link.configure({ openOnClick: true }),
        ],
        content,
        onUpdate: ({ editor }) => onChange(editor.getHTML()),
    })

    if (!editor) return null

    const buttonClass =
        'px-2 py-1 rounded border hover:bg-gray-100 active:bg-gray-200'

    return (
        <div className="border rounded-lg">
            <div className="flex flex-wrap gap-1 p-2 bg-gray-50 border-b">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={buttonClass + (editor.isActive('bold') ? ' bg-gray-200' : '')}
                >
                    <b>B</b>
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={buttonClass + (editor.isActive('italic') ? ' bg-gray-200' : '')}
                >
                    <i>I</i>
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={buttonClass + (editor.isActive('underline') ? ' bg-gray-200' : '')}
                >
                    U
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={buttonClass + (editor.isActive('strike') ? ' bg-gray-200' : '')}
                >
                    S
                </button>

                {([1, 2, 3] as const).map((level) => (
                    <button
                        key={level}
                        type="button"
                        onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
                        className={
                            buttonClass + (editor.isActive('heading', { level }) ? ' bg-gray-200' : '')
                        }
                    >
                        H{level}
                    </button>
                ))}

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={buttonClass + (editor.isActive('bulletList') ? ' bg-gray-200' : '')}
                >
                    • List
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={buttonClass + (editor.isActive('orderedList') ? ' bg-gray-200' : '')}
                >
                    1. List
                </button>

                <button
                    type="button"
                    onClick={() => {
                        const url = prompt('Enter URL')
                        if (url) editor.chain().focus().setLink({ href: url }).run()
                    }}
                    className={buttonClass + (editor.isActive('link') ? ' bg-gray-200' : '')}
                >
                    🔗
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={buttonClass + (editor.isActive('blockquote') ? ' bg-gray-200' : '')}
                >
                    ❝ ❞
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={buttonClass + (editor.isActive('codeBlock') ? ' bg-gray-200' : '')}
                >
                    {'</>'}
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().undo().run()}
                    className={buttonClass}
                >
                    ↶
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().redo().run()}
                    className={buttonClass}
                >
                    ↷
                </button>
            </div>

            <EditorContent
                editor={editor}
                className="prose p-4 min-h-[200px] focus:outline-none"
            />
        </div>
    )
}

export default RichTextEditor
