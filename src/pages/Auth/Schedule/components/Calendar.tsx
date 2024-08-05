import { CalendarBlank, X } from "@phosphor-icons/react";
import { useState } from "react";

interface CalendarProps {
  startOfWeek: string;
  endOfWeek: string;
  onDateClick: (date: Date) => void;
}

export const Calendar = ({ startOfWeek, endOfWeek, onDateClick }: CalendarProps) => {
  const [showPopup, setShowPopup] = useState(false);
  const handleClick = () => setShowPopup(!showPopup);
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
  const startOfWeekDate = new Date(startOfWeek);
  const endOfWeekDate = new Date(endOfWeek);

  const isWithinWeek = (date: Date) => date >= startOfWeekDate && date <= endOfWeekDate;

  const daysOfWeek = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];

  const handleDayClick = (day: number) => {
    const clickedDate = new Date(currentYear, currentMonth, day);
    onDateClick(clickedDate);
  };

  return (
    <div className="relative">
      <div
        className="flex cursor-pointer gap-1 rounded-6 p-1 text-write-secundary hover:bg-secundary hover:text-write-primary"
        onClick={handleClick}
      >
        <h6>Calendário</h6>
        <CalendarBlank width={19.45} height={20} weight="duotone" />
      </div>
      {showPopup && (
        <div className="absolute right-[-4rem] top-10 z-10 w-60 rounded-lg border bg-white p-4 shadow-lg sm:right-[-1rem] sm:w-96">
          <div className="mb-2 flex items-center justify-between">
            <button
              className="rounded bg-gray-200 px-1 py-1 sm:px-2"
              onClick={() => changeMonth(-1)}
            >
              &lt;
            </button>
            <h5 className="font-bold">{`${getMonthName(currentMonth)} ${currentYear}`}</h5>
            <button
              className="rounded bg-gray-200 px-1 py-1 sm:px-2"
              onClick={() => changeMonth(1)}
            >
              &gt;
            </button>
            <X
              width={19.45}
              height={20}
              weight="bold"
              className="cursor-pointer text-write-primary"
              onClick={() => setShowPopup(false)}
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
            {daysOfMonth.map((day, index) => {
              const date = new Date(currentYear, currentMonth, Number(day));
              return (
                <div
                  key={index}
                  className={`cursor-pointer rounded border text-center sm:p-2 ${day === "" ? "bg-gray-100" : isWithinWeek(date) ? "bg-blue-100 hover:bg-blue-200" : "hover:bg-gray-200"}`}
                  onClick={() => day && handleDayClick(Number(day))}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
