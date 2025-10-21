import Handlebars from "handlebars";

const registerHandlebarsHelpers = () => {
  Handlebars.registerHelper("eq", function (a, b) {
    return a === b;
  });

  Handlebars.registerHelper("ne", (a, b) => a !== b);

  Handlebars.registerHelper("and", function (...args) {
    args.pop();
    return args.every(Boolean);
  });

  Handlebars.registerHelper("formatTime", function (isoString: string) {
    const date = new Date(isoString);
    const now = new Date();

    const isToday =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();

    if (isToday) {
      return date.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      return (
        date.toLocaleDateString("ru-RU", { day: "2-digit", month: "short" }) +
        ", " +
        date.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })
      );
    }
  });
};

export default registerHandlebarsHelpers;
