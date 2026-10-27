
const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");
        menuButton.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuButton.setAttribute("aria-expanded", "false");
        });
    });
}

/* ANIMAL FILTERS */

const filterButtons = document.querySelectorAll(".filter-btn");
const animalCards = document.querySelectorAll(".animal-card");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        animalCards.forEach(card => {
            const show = filter === "all" || card.dataset.type === filter;
            card.classList.toggle("hidden", !show);
        });
    });
});

/* LOGIN AND REGISTRATION */

const authForm = document.querySelector("#authForm");

if (authForm) {
    const tabs = document.querySelectorAll(".auth-tab");
    const title = document.querySelector("#authTitle");
    const subtitle = document.querySelector("#authSubtitle");
    const nameGroup = document.querySelector("#nameGroup");
    const confirmGroup = document.querySelector("#confirmGroup");
    const fullName = document.querySelector("#fullName");
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");
    const confirmPassword = document.querySelector("#confirmPassword");
    const submitButton = document.querySelector("#submitButton");
    const message = document.querySelector("#formMessage");

    let mode = "login";

    function showMessage(text, type) {
        message.textContent = text;
        message.className = "form-message " + type;
    }

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            mode = tab.dataset.mode;
            const isRegister = mode === "register";

            tabs.forEach(item => {
                item.classList.toggle("active", item === tab);
            });

            title.textContent = isRegister
                ? "Присоединяйтесь к PawHome!"
                : "С возвращением!";

            subtitle.textContent = isRegister
                ? "Создайте аккаунт и помогите питомцам найти дом."
                : "Войдите, чтобы продолжить знакомство с питомцами.";

            nameGroup.hidden = !isRegister;
            confirmGroup.hidden = !isRegister;
            fullName.required = isRegister;
            confirmPassword.required = isRegister;

            password.autocomplete = isRegister
                ? "new-password"
                : "current-password";

            submitButton.textContent = isRegister
                ? "Зарегистрироваться"
                : "Войти";

            authForm.reset();
            showMessage("", "");
        });
    });

    authForm.addEventListener("submit", event => {
        event.preventDefault();

        const mail = email.value.trim();
        const pass = password.value;

        if (!mail || !email.validity.valid) {
            showMessage("Введите корректную почту.", "error");
            return;
        }

        if (pass.length < 8) {
            showMessage("Пароль должен содержать минимум 8 символов.", "error");
            return;
        }

        if (mode === "register") {
            if (!fullName.value.trim()) {
                showMessage("Укажите ваше имя.", "error");
                return;
            }

            if (pass !== confirmPassword.value) {
                showMessage("Пароли не совпадают.", "error");
                return;
            }
        }

        showMessage(
            "Форма проверена! Подключение PHP и MySQL будет на 11-й неделе.",
            "success"
        );
    });
}
