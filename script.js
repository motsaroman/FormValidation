//
const form = document.getElementById("form");
const wrapper = document.querySelector(".wrapper");
const formAdd = document.querySelector(".form-add");
const openFormButton = document.querySelector(".open__form");

//open and close form
openFormButton.addEventListener("click", function (e) {
  e.stopPropagation();
  if (e.currentTarget) {
    console.log(e.currentTarget);
    openFormButton.classList.add("active") ||
      ((formAdd.style.display = "flex") && wrapper.classList.add("active"));
  }
});

formAdd.addEventListener("click", function submitForm(e) {
  e.stopPropagation();
});
wrapper.addEventListener("click", function (e) {
  if (e.currentTarget) {
    console.log(e.currentTarget);
    formAdd.removeAttribute("style");
    openFormButton.classList.remove("active");
    wrapper.classList.remove("active");
  }
});
//

//function Validation
function validation(form) {
  //remove error
  function removeError(input) {
    const parent = input.parentNode;

    if (parent.classList.contains("error")) {
      parent.querySelector(".error-text").remove();
      parent.classList.remove("error");
    }
  }
  //
  //@mail validation
  function validMail() {
    var re = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
    var myMail = document.getElementById("email").value;
    var valid = re.test(myMail);
    return valid;
  }

  //

  //create error
  function createError(input, text) {
    const parent = input.parentNode;
    const errorText = document.createElement("p");
    errorText.classList.add("error-text");
    errorText.textContent = text;
    parent.append(errorText);
    parent.classList.add("error");
  }
  //
  let result = true;

  const allInputs = form.querySelectorAll("input");
  for (const input of allInputs) {
    removeError(input);
    //name
    if (input.dataset.minLength) {
      if (input.value.length <= input.dataset.minLength) {
        removeError(input);
        createError(input, "Минимальное кол-во букв 2");
        result = false;
      }
    }
    //family-name
    if (input.dataset.minLength) {
      if (input.value.length <= input.dataset.minLength) {
        removeError(input);
        createError(input, "Минимальное кол-во букв 2");
        result = false;
      }
    }
    //phone
    if (input.dataset.number) {
      $(".phone_mask").mask("+7(999)999-99-99");
      if (input.value == "number") {
        removeError(input);
        createError(input, "");
        result = false;
      }
    }
    //email
    if (input.dataset.email) {
      if (input.value == "" || !validMail()) {
        removeError(input);
        createError(input, "Введите корректный email");
        result = false;
      }
    }
    //
    if (input.dataset.required == "true") {
      if (input.value == "") {
        removeError(input);
        createError(input, "Поле не заполнено!");
        result = false;
      }
    }
  }

  return result;
}

//modal window
function openModal() {
  const modalWindow = document.querySelector(".modal");
  modalWindow.classList.add("active");
}
function closeModal() {
  const modalWindow = document.querySelector(".modal");
  if (modalWindow.classList.contains("active"))
    modalWindow.classList.remove("active");
}
//icon close form
const iconCloseForm = document
  .querySelector(".close-form")
  .addEventListener("click", function (e) {
    if (e.currentTarget) {
      formAdd.removeAttribute("style");
      openFormButton.classList.remove("active");
      wrapper.classList.remove("active");
    }
  });
//

form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (validation(this) == true) {
    openModal();
    setTimeout(() => closeModal(), 2000);
    console.log("Форма отправлена");
  }
});
