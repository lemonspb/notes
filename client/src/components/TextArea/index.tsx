import React, { useState, useEffect, useRef } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import Header from "@editorjs/header";
// @ts-ignore
import List from "@editorjs/list";
// @ts-ignore
import Checklist from "@editorjs/checklist";

import styles from "./TextArea.module.scss";
import { useAppDispatch } from "../../hooks";
import { getCurrentNote } from "../../slices/note";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

const EDITTOR_HOLDER_ID = "editorjs";

const Editor = (props: any) => {
  const dispatch = useAppDispatch();
  const [isReady, setIsReady] = useState(false);
  const ejInstance = useRef<EditorJS | null>(null);

  useEffect(() => {
    if (!ejInstance.current) {
      initEditor();
    }
    return () => {
      setIsReady(false);
      ejInstance.current?.destroy();
      ejInstance.current = null;
    };
  }, []);

  useEffect(() => {
    if (isReady && props.note.blocks) {
      ejInstance.current?.render({ blocks: props.note.blocks });
      return;
    }
    if (isReady && !props.note.blocks) {
      ejInstance.current?.clear();
      ejInstance.current?.focus();
    }
  }, [props.note.blocks, isReady]);

  const initEditor = () => {
    const editor = new EditorJS({
      holder: EDITTOR_HOLDER_ID,
      data: { blocks: [] },
      onReady: () => {
        ejInstance.current = editor;
        setIsReady(true);
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
      i18n: {
        messages: {
          tools: {
            warning: { Title: "Название", Message: "Сообщение" },
            link: { "Add a link": "Вставьте ссылку" },
          },
          toolNames: {
            Text: "Параграф",
            Heading: "Заголовок",
            List: "Список",
            Checklist: "Лист проверки",
          },
        },
      },
      autofocus: true,
      tools: {
        header: Header,
        list: List,
        check: Checklist,
      },
      placeholder: "Начните писать!",
    });
  };

  return (
    <div className={styles.editors}>
      {props.note.date && (
        <div className={styles.date}>
          {format(new Date(props.note.date), "d MMMM Y г. в HH:mm", {
            locale: ru,
          })}
        </div>
      )}
      <div id={EDITTOR_HOLDER_ID}></div>
    </div>
  );
};

export default Editor;
