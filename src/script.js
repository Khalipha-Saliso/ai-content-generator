const apiKey = "64ff0080a418f8of319534c4b15a9b6t";
const context =
  "Write a short and informative response based on the user's instructions.";

const form = document.querySelector("#instruction-form");
const result = document.querySelector("#result");
const submitButton = document.querySelector("#submit-button");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const userInput = document.querySelector("#user-instruction").value.trim();
  if (!userInput) return;

  const prompt = `${userInput}`;

  result.innerHTML = `<em>Generating content<span class="dots"></span></em>`;
  animateDots();
  submitButton.disabled = true;
  submitButton.textContent = "Generating...";

  const apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(
    prompt
  )}&context=${encodeURIComponent(context)}&key=${apiKey}`;

  axios
    .get(apiUrl)
    .then((response) => {
      const content = response.data.answer;
      result.innerHTML = "";

      new Typewriter("#result", {
        strings: [content],
        autoStart: true,
        delay: 30,
        cursor: "",
      });

      result.scrollIntoView({ behavior: "smooth" });
    })
    .catch((error) => {
      result.innerHTML =
        "<strong>Sorry, something went wrong. Please try again.</strong>";
      console.error(error);
    })
    .finally(() => {
      submitButton.disabled = false;
      submitButton.textContent = "Generate";
    });
});

function animateDots() {
  let dots = document.querySelector(".dots");
  if (!dots) return;
  let count = 0;
  setInterval(() => {
    count = (count + 1) % 4;
    dots.textContent = ".".repeat(count);
  }, 500);
}