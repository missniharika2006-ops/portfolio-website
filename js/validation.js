(() => {
  const form = document.querySelector("#contact-form");
  if (!form) return;

  const fields = [...form.querySelectorAll("input[required], textarea[required]")];
  const status = form.querySelector(".form-status");

  const validateField = (field) => {
    const value = field.value.trim();
    let message = "";

    if (!value) {
      message = "Please complete this field.";
    } else if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      message = "Please enter a valid email address.";
    } else if (field.minLength > 0 && value.length < field.minLength) {
      message = `Please enter at least ${field.minLength} characters.`;
    }

    field.setCustomValidity(message);
    field.setAttribute("aria-invalid", String(Boolean(message)));
    return !message;
  };

  fields.forEach((field) => {
    field.addEventListener("input", () => {
      validateField(field);
      if (status) status.textContent = "";
    });
    field.addEventListener("blur", () => validateField(field));
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const firstInvalid = fields.find((field) => !validateField(field));

    if (firstInvalid) {
      firstInvalid.focus();
      firstInvalid.reportValidity();
      if (status) {
        status.classList.remove("success");
        status.textContent = "Please check the highlighted fields.";
      }
      return;
    }

    const values = new FormData(form);
    const recipient = "niharika.gautam@example.com";
    const subject = encodeURIComponent(String(values.get("subject")));
    const body = encodeURIComponent(
      `Hi Niharika,\n\n${String(values.get("message"))}\n\nFrom: ${String(values.get("name"))}\nReply to: ${String(values.get("email"))}`
    );
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;

    if (status) {
      status.classList.add("success");
      status.textContent = "Your email app is opening with the message ready.";
    }
  });
})();
