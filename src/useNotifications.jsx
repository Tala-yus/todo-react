import { useEffect } from "react";

function useNotifications(tasks) {
  useEffect(() => {
    if (!tasks.length) return;
    Notification.requestPermission();

    tasks.forEach(task => {
      if(task.dueDate && !task.done && new Date(task.dueDate).toDateString() === new Date().toDateString()) {
        if(Notification.permission === "granted") {
          new Notification("Task Reminder", { body: `${task.sticker} ${task.text}` });
        }
      }
    });
  }, [tasks]);
}

export default useNotifications;
