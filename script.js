const colorHexa = document.getElementById("colorHexa");
const colorPicker = document.getElementById("colorPicker");
const inputColor = document.getElementById("nuevoColor");
const cambiarColor = document.getElementById("cambiarColor");
const elementosh2 = document.querySelectorAll("h2");
const colorRandom = document.getElementById("colorRandom");
const botonReset = document.getElementById("botonReset");
const body = document.body;

const reiniciarEstilos = () => {
  colorHexa.style.color = "black";
  inputColor.style.backgroundColor = "#00000065";
  inputColor.classList.remove("input-placeholder");
  cambiarColor.classList.remove("cambiar-color-toggle");
  cambiarColor.classList.add("cambiar-color");
  colorRandom.classList.remove("cambiar-color-toggle");
  colorRandom.classList.add("cambiar-color");
  inputColor.style = "white";
  botonReset.style.color = 'white';
  botonReset.style.backgroundColor = '#000000ad';
  elementosh2.forEach((h2) => {
    h2.style.color = "black";
  });
};

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
    colorRandom.classList.remove("cambiar-color");
    colorRandom.classList.add("cambiar-color-toggle");
    botonReset.style.color = 'black';
    botonReset.style.backgroundColor = 'white';
    elementosh2.forEach((h2) => {
      h2.style.color = "white";
    });
  } else {
    reiniciarEstilos();
  }
};

const hexRandom = () => {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
  );
};

cambiarColor.addEventListener("click", () => {
  let inputValue = inputColor.value.trim();
  if (inputValue === "") {
    colorHexa.innerText = "Ingresa un color válido";
    body.style.backgroundColor = "red";
    colorPicker.value = "black";
    setTimeout(() => {
      colorHexa.innerText = "Colores Dinámicos";
      body.style.backgroundColor = "#f0f0f0";
    }, 2000);
    reiniciarEstilos();
    return;
  }
  body.style.backgroundColor = inputValue;
  colorHexa.innerText = inputValue;
  inputColor.value = "";
  colorPicker.value = inputValue;
  modoOscuro(inputValue);
});

colorPicker.addEventListener("input", () => {
  let pickerValue = colorPicker.value;
  body.style.backgroundColor = pickerValue;
  colorHexa.innerText = pickerValue;
  modoOscuro(pickerValue);
});

colorRandom.addEventListener("click", () => {
  let colorRandom = hexRandom();
  body.style.backgroundColor = colorRandom;
  colorHexa.innerText = colorRandom;
  colorPicker.value = colorRandom;
  modoOscuro(colorRandom);
});

botonReset.addEventListener("click", () => {
  colorHexa.innerText = "Colores Dinámicos";
  body.style.backgroundColor = "#f0f0f0";
  colorPicker.value = "black";
  reiniciarEstilos();
});


