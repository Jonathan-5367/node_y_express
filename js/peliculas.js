var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var Genero;
(function (Genero) {
    Genero["Accion"] = "Acci\u00F3n";
    Genero["Comedia"] = "Comedia";
    Genero["Drama"] = "Drama";
    Genero["Fantasia"] = "Fantas\u00EDa";
    Genero["CienciaFiccion"] = "Ciencia Ficci\u00F3n";
})(Genero || (Genero = {}));
var Pais;
(function (Pais) {
    Pais["Venezuela"] = "Venezuela";
    Pais["EstadosUnidos"] = "Estados Unidos";
    Pais["Espa\u00F1a"] = "Espa\u00F1a";
    Pais["Japon"] = "Jap\u00F3n";
    Pais["Francia"] = "Francia";
    Pais["GranBreta\u00F1a"] = "Gran Breta\u00F1a";
})(Pais || (Pais = {}));
// Función para renderizar películas en la tabla
function renderPeliculas(peliculas) {
    var tbody = document.querySelector("#peliculas tbody");
    tbody.innerHTML = "";
    peliculas.forEach(function (p) {
        var fila = document.createElement("tr");
        fila.innerHTML = "\n      <td>".concat(p.id, "</td>\n      <td>").concat(p.titulo, "</td>\n      <td>").concat(p.pais, "</td>\n      <td>").concat(p.genero, "</td>\n    ");
        tbody.appendChild(fila);
    });
}
// Cargar películas desde el backend
function cargarPeliculas() {
    return __awaiter(this, void 0, void 0, function () {
        var response, peliculas;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("/peliculas")];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    peliculas = _a.sent();
                    renderPeliculas(peliculas);
                    return [2 /*return*/];
            }
        });
    });
}
// Guardar nueva película
document.addEventListener("DOMContentLoaded", function () {
    cargarPeliculas();
    var form = document.getElementById("formPelicula");
    form.addEventListener("submit", function (e) { return __awaiter(_this, void 0, void 0, function () {
        var titulo, genero, pais;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    titulo = document.getElementById("titulo").value;
                    genero = document.getElementById("genero").value;
                    pais = document.getElementById("pais").value;
                    return [4 /*yield*/, fetch("/peliculas", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ titulo: titulo, genero: genero, pais: pais })
                        })];
                case 1:
                    _a.sent();
                    form.reset();
                    cargarPeliculas();
                    return [2 /*return*/];
            }
        });
    }); });
});
