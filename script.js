const daysInSeptember = 30;

// ✅ Список привычек — только названия!
const habits = [
  "Подъём в 5:00",
  "Ложиться в 21:30",
  "Не спать после обеда",
  "Читать книгу 30 минут"
];

// Функция для генерации ID на основе названия
function generateId(title) {
  return title.toLowerCase().replace(/\s+/g, "_");
}

// Функция рендеринга календаря
function renderCalendar(title) {
  const container = document.getElementById("calendars");

  // создаём блок календаря
  const calendarWrapper = document.createElement("div");
  calendarWrapper.classList.add("calendar");

  // заголовок
  const h2 = document.createElement("h2");
  h2.textContent = title;
  calendarWrapper.appendChild(h2);

  // сетка
  const grid = document.createElement("div");
  grid.classList.add("calendar-grid");
  calendarWrapper.appendChild(grid);

  container.appendChild(calendarWrapper);

  // уникальный ключ для localStorage
  const storageKey = generateId(title);
  let dayStatus = JSON.parse(localStorage.getItem(storageKey)) || {};

  // рендерим дни
  for (let i = 1; i <= daysInSeptember; i++) {
    const day = document.createElement("div");
    day.classList.add("day");
    day.textContent = i;

    if (dayStatus[i] === "success") day.classList.add("success");
    if (dayStatus[i] === "fail") day.classList.add("fail");

    day.addEventListener("click", () => {
      if (day.classList.contains("success")) {
        day.classList.remove("success");
        day.classList.add("fail");
        dayStatus[i] = "fail";
      } else if (day.classList.contains("fail")) {
        day.classList.remove("fail");
        delete dayStatus[i];
      } else {
        day.classList.add("success");
        dayStatus[i] = "success";
      }

      localStorage.setItem(storageKey, JSON.stringify(dayStatus));
    });

    grid.appendChild(day);
  }
}

// Рендерим все календари из списка habits
habits.forEach(title => renderCalendar(title));
