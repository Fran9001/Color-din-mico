const colorHexa = document.getElementById("colorHexa");
const colorPicker = document.getElementById("colorPicker");
const inputColor = document.getElementById("nuevoColor");
const cambiarColor = document.getElementById("cambiarColor");
const elementosh2 = document.querySelectorAll("h2");
const colorRandom = document.getElementById("colorRandom");
const botonReset = document.getElementById("botonReset");
const copyright = document.getElementById("copyright");
const body = document.body;

// FUNCIONES

const reiniciarEstilos = () => {
  colorHexa.style.color = "black";
  inputColor.style.backgroundColor = "#00000065";
  inputColor.classList.remove("input-placeholder");
  cambiarColor.classList.remove("cambiar-color-toggle");
  cambiarColor.classList.add("cambiar-color");
  colorRandom.classList.remove("cambiar-color-toggle");
  colorRandom.classList.add("cambiar-color");
  inputColor.style = "white";
  botonReset.style.color = "white";
  botonReset.style.backgroundColor = "#000000ad";
  inputColor.value = "";
  copyright.style.color = "black";
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
    inputColor.style.color = "black";
    inputColor.classList.add("input-placeholder");
    cambiarColor.classList.remove("cambiar-color");
    cambiarColor.classList.add("cambiar-color-toggle");
    colorRandom.classList.remove("cambiar-color");
    colorRandom.classList.add("cambiar-color-toggle");
    botonReset.style.color = "black";
    botonReset.style.backgroundColor = "white";
    copyright.style.color = "white";
    elementosh2.forEach((h2) => {
      h2.style.color = "white";
    });
  } else {
    reiniciarEstilos();
  }
};

const fetchRandomColor = async () => {
  try {
    const response = await fetch("https://api.color.pizza/v1/");
    const data = await response.json();
    const colors = data.colors;

    const randomIndex = Math.floor(Math.random() * colors.length);

    return colors[randomIndex].hex;
  } catch (error) {
    console.error('Error fetching color:', error);
    return { error: true };
  }
};

// PATTERNS

const hexPattern = /^#([0-9A-F]{3}|[0-9A-F]{4}|[0-9A-F]{6}|[0-9A-F]{8})$/i;
const rgbPattern =
  /^rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)$/i;
const hslPattern =
  /^hsl\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})%\s*,\s*([0-9]{1,3})%\s*\)$/i;

// EVENTOS

cambiarColor.addEventListener("click", () => {
  let inputValue = inputColor.value.trim();
  if (inputValue === "") {
    colorHexa.innerText = "Ingresa un color";
    body.style.backgroundColor = "red";
    colorPicker.value = "black";
    setTimeout(() => {
      colorHexa.innerText = "Colores Dinámicos";
      body.style.backgroundColor = "#f0f0f0";
    }, 2000);
    reiniciarEstilos();
    return;
  }

  if (
    !hexPattern.test(inputValue) &&
    !rgbPattern.test(inputValue) &&
    !hslPattern.test(inputValue)
  ) {
    colorHexa.innerText = "Color ingresado inválido";
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

colorRandom.addEventListener("click", async () => {
  let result = await fetchRandomColor();
  if (result.error) {
    colorHexa.innerText = "Solicitud fallida, intenta nuevamente";
    body.style.backgroundColor = "red";
    colorPicker.value = "black";
    setTimeout(() => {
      colorHexa.innerText = "Colores Dinámicos";
      body.style.backgroundColor = "#f0f0f0";
    }, 2000);
    reiniciarEstilos();
  } else {
    let colorRandom = result;
    body.style.backgroundColor = colorRandom;
    colorHexa.innerText = colorRandom;
    colorPicker.value = colorRandom;
    modoOscuro(colorRandom);
  }
});

botonReset.addEventListener("click", () => {
  colorHexa.innerText = "Colores Dinámicos";
  body.style.backgroundColor = "#f0f0f0";
  colorPicker.value = "black";
  reiniciarEstilos();
});
