const colorHexa = document.getElementById("colorHexa");
const colorPicker = document.getElementById("colorPicker");
const inputColor = document.getElementById("nuevoColor");
const cambiarColor = document.getElementById("cambiarColor");
const body = document.body;

cambiarColor.addEventListener("click", () => {
  let inputValue = inputColor.value;
  body.style.backgroundColor = inputValue;
  colorHexa.innerText = inputValue;
  inputColor.value = "";
});

colorPicker.addEventListener("input", () => {
  let pickerValue = colorPicker.value;
  body.style.backgroundColor = pickerValue;
  colorHexa.innerText = pickerValue;
});
