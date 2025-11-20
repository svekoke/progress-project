function createProgress(root) {
  const circle = root.querySelector(".main-circle");
  const wrapperElement = root;

  const radius = 55;
  const circumFerence = 2 * Math.PI * radius;

  circle.style.strokeDasharray = circumFerence; //всего пикселей

  function setValue(percent) {
    const offset = circumFerence - (circumFerence * percent) / 100;
    circle.style.strokeDashoffset = offset; //сколько пикселей спрятать
  }

  function setAnimated(isOn) {
    circle.style.animationPlayState = isOn ? "running" : "paused";
  }

  function setHidden(isHidden) {
    wrapperElement.classList.toggle("hidden", isHidden);
  }

  return {
    setValue,
    setAnimated,
    setHidden,
  };
}

const wrapper = document.getElementById("wrapper");
const toggle = document.getElementById("toggle");
const circleSvg = document.getElementById("circleSvg");
const mainCircle = document.querySelector(".main-circle");
const valueInput = document.getElementById("value");
const hide = document.getElementById("hideToggle");

const progressApi = createProgress(wrapper);

toggle.addEventListener("change", function () {
  progressApi.setAnimated(toggle.checked);
});

valueInput.addEventListener("input", function () {
  let val = parseInt(this.value) || 0;
  if (val < 0) val = 0;
  if (val > 100) val = 100;
  this.value = val;
  progressApi.setValue(val);
});

hide.addEventListener("change", function () {
  progressApi.setHidden(hide.checked);
});
