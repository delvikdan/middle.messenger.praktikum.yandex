import "@/styles/main.scss";
import "@/helpers/handlebarsHelpers";
import { router } from "@/router";
// import { signin, signup } from "@/api/auth";

document.addEventListener("DOMContentLoaded", () => {
  router.start();
});

// signup({
//   first_name: "Paolo",
//   second_name: "Maldini",
//   login: "maldini",
//   email: "maldini@milan.it",
//   password: "MaldiniN1",
//   phone: "928001920992",
// })
//   .then(console.log)
//   .catch(console.error);

// signin({
//   login: "maldini",
//   password: "MaldiniN1",
// })
//   .then((result) => {
//     if (result.status === 200) {
//       // Авторизация успешна, можно делать редирект!
//       router.go("/messenger");
//     } else if (
//       result.status === 200 &&
//       result.response?.reason === "Login or password is incorrect"
//     ) {
//       // Ошибка: неправильный логин или пароль
//       console.log("Неверный логин или пароль");
//     } else {
//       // Другая ошибка
//       console.log(
//         result.response?.reason || "Произошла ошибка. Попробуйте снова."
//       );
//     }
//   })
//   .catch(() => {
//     console.log("Ошибка сети (проверьте подключение).");
//   });
