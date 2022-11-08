import { useState, useEffect, useRef } from "react";
import EditorJS, { OutputData, EditorConfig } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import styles from "./TextArea.module.scss";
import { useAppDispatch } from "../../hooks";
import { getCurrentNote } from "../../slices/note";
const EDITTOR_HOLDER_ID = "editorjs";

const Editor = (props: any) => {
  const dispatch = useAppDispatch();
  const ejInstance = useRef<EditorJS | null>(null);
  const [editorData, setEditorData] = useState<any>({ blocks: [] });

  useEffect(() => {
    if (!ejInstance.current) {
      initEditor();
    }
    return () => {
      ejInstance.current = null;
    };
  }, []);

  const initEditor = () => {
    const editor = new EditorJS({
      holder: EDITTOR_HOLDER_ID,
      data: editorData,
      onReady: () => {
        ejInstance.current = editor;
      },
      onChange: async () => {
        editor
          .save()
          .then((outputData: OutputData) => {
            console.log("Article data: ", outputData);

            dispatch(getCurrentNote(outputData.blocks));
          })
          .catch((error) => {
            console.log("Saving failed: ", error);
          });
      },
      autofocus: true,
      tools: {
        header: Header,
      },
    });
  };

  return (
    <div className={styles.editors}>
      <div id={EDITTOR_HOLDER_ID}></div>
    </div>
  );
};

export default Editor;
