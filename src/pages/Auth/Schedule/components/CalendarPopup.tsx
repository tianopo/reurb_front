import { X } from "@phosphor-icons/react";
import React, { useState } from "react";

interface CalendarPopupProps {
  startOfWeek: string;
  endOfWeek: string;
  onClose: () => void;
}

export const CalendarPopup: React.FC<CalendarPopupProps> = ({
  startOfWeek,
  endOfWeek,
  onClose,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const getMonthName = (month: number) => {
    const months = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];
    return months[month];
  };

  const generateDaysOfMonth = (year: number, month: number) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const leadingDays = Array.from({ length: firstDay }, (_, i) => "");

    return [...leadingDays, ...days];
  };

  const changeMonth = (increment: number) => {
    setCurrentMonth((prevMonth) => {
      let newMonth = prevMonth + increment;
      let newYear = currentYear;

      if (newMonth < 0) {
        newMonth = 11;
        newYear -= 1;
      } else if (newMonth > 11) {
        newMonth = 0;
        newYear += 1;
      }

      setCurrentYear(newYear);
      return newMonth;
    });
  };

  const daysOfMonth = generateDaysOfMonth(currentYear, currentMonth);

  const daysOfWeek = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];

  return (
    <div className="absolute right-[-2rem] top-10 z-10 w-52 rounded-lg border bg-white p-4 shadow-lg sm:right-0 sm:w-96">
      <div className="mb-2 flex items-center justify-between">
        <button className="rounded bg-gray-200 px-1 py-1 sm:px-2" onClick={() => changeMonth(-1)}>
          &lt;
        </button>
        <h5 className="font-bold">{`${getMonthName(currentMonth)} ${currentYear}`}</h5>
        <button className="rounded bg-gray-200 px-1 py-1 sm:px-2" onClick={() => changeMonth(1)}>
          &gt;
        </button>
        <X
          width={19.45}
          height={20}
          weight="bold"
          className="cursor-pointer text-write-primary"
          onClick={onClose}
        />
      </div>
      <div className="mb-2 grid grid-cols-7 gap-1">
        {daysOfWeek.map((day) => (
          <div key={day} className="hidden p-2 text-center font-bold sm:flex">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {daysOfMonth.map((day, index) => (
          <div
            key={index}
            className={`rounded border text-center sm:p-2 ${day === "" ? "bg-gray-100" : "hover:bg-gray-200"}`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};
