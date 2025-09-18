const daysInSeptember = 30;

/**
 * Рисует календарь в контейнере containerId.
 * Каждый день хранит статус в localStorage под ключом storageKey:
 * объект { "1": "success", "2": "fail", ... }
 */
function renderCalendar(containerId, storageKey) {
  const calendar = document.getElementById(containerId);
  if (!calendar) return;

  // Загружаем статус (объект)
  let dayStatus = JSON.parse(localStorage.getItem(storageKey)) || {};

  // Отрисовываем дни
  for (let i = 1; i <= daysInSeptember; i++) {
    const day = document.createElement("div");
    day.classList.add("day");
    day.textContent = i;

    // Восстановить статус (если есть)
    if (dayStatus[i] === "success") day.classList.add("success");
    if (dayStatus[i] === "fail") day.classList.add("fail");

    // Клик: пусто -> success -> fail -> пусто
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

      // Сохраняем обновлённый объект в localStorage
      localStorage.setItem(storageKey, JSON.stringify(dayStatus));
    });

    calendar.appendChild(day);
  }
}

// Отрисовать оба календаря (разные ключи в localStorage)
renderCalendar("calendar1", "morningStatus");
renderCalendar("calendar2", "bedtimeStatus");
renderCalendar("calendar3", "bedtimeStatus");
