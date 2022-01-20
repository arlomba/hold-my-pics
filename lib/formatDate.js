const { format } = require("date-fns");
const { es } = require("date-fns/locale");

exports.formatDate = (obj) => {
  obj.publishedAt = `Publicada el ${format(obj.publishedAt, "d MMMM yyyy", {
    locale: es,
  })}`;
};
