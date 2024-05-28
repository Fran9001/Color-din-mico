const colorHexa = document.getElementById("colorHexa");
const colorPicker = document.getElementById("colorPicker");
const inputColor = document.getElementById("nuevoColor");
const cambiarColor = document.getElementById("cambiarColor");
const h2Elements = document.querySelectorAll("h2");
const body = document.body;

const modoOscuro = (value) => {
  let r = parseInt(value.slice(1, 3), 16);
  let g = parseInt(value.slice(3, 5), 16);
  let b = parseInt(value.slice(5, 7), 16);

  let luminancia = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  if (luminancia < 0.18) {
    colorHexa.style.color = "white";
    inputColor.style.backgroundColor = "white";
    inputColor.classList.add("input-placeholder");
    cambiarColor.classList.remove("cambiar-color");
    cambiarColor.classList.add("cambiar-color-toggle");
    h2Elements.forEach(function (h2) {
      h2.style.color = "white";
    });
  } else {
    colorHexa.style.color = "black";
    inputColor.style.backgroundColor = "#00000065";
    inputColor.classList.remove("input-placeholder");
    cambiarColor.classList.remove("cambiar-color-toggle");
    cambiarColor.classList.add("cambiar-color");
    inputColor.style = "white";
    h2Elements.forEach(function (h2) {
      h2.style.color = "black";
    });
  }
};

cambiarColor.addEventListener("click", () => {
  let inputValue = inputColor.value;
  body.style.backgroundColor = inputValue;
  colorHexa.innerText = inputValue;
  inputColor.value = "";
  modoOscuro(inputValue);
});

colorPicker.addEventListener("input", () => {
  let pickerValue = colorPicker.value;
  body.style.backgroundColor = pickerValue;
  colorHexa.innerText = pickerValue;
  modoOscuro(pickerValue);
});
