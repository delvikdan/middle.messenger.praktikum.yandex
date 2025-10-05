import "@/styles/main.scss";
import "@/helpers/handlebarsHelpers";
import { router } from "@/router";
import { getUser } from "@/api/auth";

document.addEventListener("DOMContentLoaded", () => {
  getUser()
    .then((user) => {
      router.start();

      // Если пользователь найден (например, поле id есть), редирект
      if (user && typeof user === "object" && "id" in user) {
        router.go("/messenger");
      }
      // Если пользователя нет — роутер стартует как обычно (на текущем path)
    })
    .catch(() => {
      // Ошибка получения пользователя — всё равно запускаем роутер
      router.start();
    });
});
