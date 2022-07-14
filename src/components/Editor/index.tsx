import "@wangeditor/editor/dist/css/style.css"; // 引入 css

import React, { useState, useEffect } from "react";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import { IDomEditor, IEditorConfig } from "@wangeditor/editor";

type InsertFnType = (url: string, alt: string, href: string) => void;

function MyEditor() {
  const [editor, setEditor] = useState<IDomEditor | null>(null); // 存储 editor 实例
  const [html, setHtml] = useState(""); // 编辑器内容

  const toolbarConfig = {};
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: "请输入内容...",
    MENU_CONF: {
      uploadImage: {
        server: (import.meta.env.VITE_API_URL as string) + "/upload/file",
        // form-data fieldName ，默认值 'wangeditor-uploaded-image'
        fieldName: "file",

        // 单个文件的最大体积限制，默认为 2M
        maxFileSize: 1 * 1024 * 1024, // 1M

        // 最多可上传几个文件，默认为 100
        maxNumberOfFiles: 10,

        // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
        allowedFileTypes: [],

        // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
        // meta: {
        //   token: "xxx",
        //   otherKey: "yyy"
        // },

        // 将 meta 拼接到 url 参数中，默认 false
        metaWithUrl: false,

        // 自定义增加 http  header
        // headers: { "Content-Type": "multipart/form-data" },
        // 跨域是否传递 cookie ，默认为 false
        withCredentials: false,

        // 超时时间，默认为 10 秒
        timeout: 5 * 1000, // 5 秒
        // 单个文件上传成功之后
        onSuccess(file: File, res: any) {
          console.log(`${file.name} 上传成功`, res);
        },
        // 单个文件上传失败
        onFailed(file: File, res: any) {
          console.log(`${file.name} 上传失败`, res);
        },
        // 上传错误，或者触发 timeout 超时
        onError(file: File, err: any, res: any) {
          console.log(`${file.name} 上传出错`, err, res);
        },
        // 自定义插入图片
        customInsert(res: any, insertFn: InsertFnType) {
          // res 即服务端的返回结果
          const url = import.meta.env.VITE_FILE_URL + res.data.filename;
          const alt = "";
          const href = "";
          // 从 res 中找到 url alt href ，然后插图图片
          insertFn(url, alt, href);
        }
      }
    }
  };

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  return (
    <>
      <div style={{ border: "1px solid #ccc", zIndex: 100 }}>
        <Toolbar editor={editor} defaultConfig={toolbarConfig} mode="default" style={{ borderBottom: "1px solid #ccc" }} />
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={editor => setHtml(editor.getHtml())}
          mode="default"
          style={{ height: "500px", overflowY: "hidden" }}
        />
      </div>
    </>
  );
}

export default MyEditor;
