import React, { useState, useEffect } from "react";

const Week = () => {
  const [weekType, setWeekType] = useState("N"); // aktualny tydzień nieparzysty

  useEffect(() => {
    const today = new Date();

    // tydzień startowy (nieparzysty) – np. pierwszy tydzień roku
    const startDate = new Date(today.getFullYear(), 0, 1);

    // liczba tygodni od startu
    const weekDiff = Math.floor((today - startDate) / (7 * 24 * 60 * 60 * 1000));

    // jeśli liczba tygodni od startu jest parzysta, tydzień jest taki sam jak startowy
    // jeśli nieparzysta, zmienia się
    const currentWeek = (weekDiff % 2 === 0) ? "N" : "P";

    setWeekType(currentWeek);
  }, []);

  return weekType;
};

export default Week;