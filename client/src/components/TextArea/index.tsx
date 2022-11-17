import { useState, useEffect, useRef } from "react";
import EditorJS, { OutputBlockData, OutputData } from "@editorjs/editorjs";
import { UsertNoteItem } from "../../types/notes";
import Header from "@editorjs/header";
// @ts-ignore
import List from "@editorjs/list";
// @ts-ignore
import Checklist from "@editorjs/checklist";
import styles from "./TextArea.module.scss";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import useDebounce from "../../hooks/useDebounce";

const EDITTOR_HOLDER_ID = "editorjs";

type Editor = {
  note: UsertNoteItem;
  saveNote: (note: OutputBlockData[]) => void;
};

type DateList = {
  text: string;
  type: "default" | "created" | "updated";
  date?: Date;
  visible: boolean;
};

const Editor = (props: Editor) => {
  const [isReady, setIsReady] = useState(false);
  const [dateList, setDateList] = useState<DateList[]>([]);

  useEffect(() => {
    setDateList([
      {
        text: "",
        type: "default",
        date: props.note.createdDate,
        visible: true,
      },
      {
        text: "Изменено",
        type: "updated",
        date: props.note.updatedDate || props.note.createdDate,
        visible: false,
      },
      {
        text: "Создано",
        type: "created",
        date: props.note.createdDate,
        visible: false,
      },
    ]);
  }, [props.note.createdDate, props.note.updatedDate]);

  const [value, setValue] = useState<OutputData>();
  const debouncedValue = useDebounce<OutputData | undefined>(value, 1000);
  const ejInstance = useRef<EditorJS | null>(null);

  const handleChange = (data: OutputData) => {
    setValue(data);
  };

  const handleDateType = (type: string) => {
    switch (type) {
      case "default":
        setDateList((dateList) =>
          dateList.map((date) => {
            date.type === "created"
              ? (date.visible = true)
              : (date.visible = false);
            return date;
          })
        );
        return true;
      case "created":
        setDateList((dateList) =>
          dateList.map((date) => {
            date.type === "updated"
              ? (date.visible = true)
              : (date.visible = false);
            return date;
          })
        );
        return true;
      case "updated":
        setDateList((dateList) =>
          dateList.map((date) => {
            date.date && date.type === "created"
              ? (date.visible = true)
              : (date.visible = false);
            return date;
          })
        );
    }
    return true;
  };

  useEffect(() => {
    debouncedValue?.blocks.length && props.saveNote(debouncedValue?.blocks);
  }, [debouncedValue]);

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
      ejInstance.current?.render({ blocks: props.note.blocks }).then(() => {
        ejInstance.current?.caret.focus(true);
      });
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
            handleChange(outputData);
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
      {
        <div className={styles.date}>
          {dateList.map(({ text, date, type, visible }: any) => {
            return (
              date &&
              visible && (
                <div
                  className={styles.dateString}
                  onClick={() => handleDateType(type)}
                >
                  {text}&nbsp;
                  {format(new Date(date || 0), "d MMMM Y г. в HH:mm", {
                    locale: ru,
                  })}
                </div>
              )
            );
          })}
        </div>
      }
      <div id={EDITTOR_HOLDER_ID}></div>
    </div>
  );
};

export default Editor;
