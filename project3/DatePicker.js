"use strict";
class DatePicker {
  constructor(id, callback) {
    this.id = id;
    this.callback = callback;
    this.container = document.getElementById(id);
  }

  render(date) {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstWeekday = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const numWeeks = Math.ceil((firstWeekday + daysInMonth) / 7);

    this.container.innerHTML = "";
    const wrapper = document.createElement("div");
    wrapper.className = "dp-calendar";

    const header = document.createElement("div");
    header.className = "dp-header";

    const prevBtn = document.createElement("button");
    prevBtn.className = "dp-nav";
    prevBtn.textContent = "<";
    prevBtn.addEventListener("click", () => {
      this.render(new Date(year, month - 1, 1));
    });

    const title = document.createElement("span");
    title.className = "dp-title";
    title.textContent =
      date.toLocaleString("en-US", { month: "long" }) + " " + year;

    const nextBtn = document.createElement("button");
    nextBtn.className = "dp-nav";
    nextBtn.textContent = ">";
    nextBtn.addEventListener("click", () => {
      this.render(new Date(year, month + 1, 1));
    });

    header.appendChild(prevBtn);
    header.appendChild(title);
    header.appendChild(nextBtn);
    wrapper.appendChild(header);

    const table = document.createElement("table");
    table.className = "dp-grid";

    const headRow = document.createElement("tr");
    ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].forEach((tur) => {
      const th = document.createElement("th");
      th.textContent = tur;
      headRow.appendChild(th);
    });
    table.appendChild(headRow);

    for (let week = 0; week < numWeeks; week++) {
      const tr = document.createElement("tr");
      for (let weekday = 0; weekday < 7; weekday++) {
        const cellDate = new Date(
          year,
          month,
          1 - firstWeekday + week * 7 + weekday,
        );
        const td = document.createElement("td");
        td.textContent = cellDate.getDate();

        if (cellDate.getMonth() !== month) {
          td.className = "dp-other";
        } else {
          td.className = "dp-day";
          td.setAttribute("data-day", cellDate.getDate());
        }
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }

    table.addEventListener("click", (event) => {
      const td = event.target.closest("td[data-day]");
      if (!td) {
        return;
      }
      this.callback(this.id, {
        month: month + 1,
        day: parseInt(td.getAttribute("data-day"), 10),
        year: year,
      });
    });

    wrapper.appendChild(table);
    this.container.appendChild(wrapper);
  }
}
