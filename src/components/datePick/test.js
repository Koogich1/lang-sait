for (const day of daysOfWeek) {
    const timeLength = [];

    let startSlotTime = new Date(startTime * 60 * 60 * 1000);
    const endSlotTime = new Date(endTime * 60 * 60 * 1000);

    while (startSlotTime < endSlotTime) {
      const formattedTime = startSlotTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      timeLength.push(formattedTime);
      startSlotTime = addMinutes(startSlotTime, 60);
    }

    const id = cuid()

    console.log(timeLength)

    const filteredTimeLength = timeLength.filter((slotTime) => slotTime);  // Filter out empty slots

    const teacherAvailability = await db.teacherAvailability.create({
      data: {
        id,
        teacherId,
        day,
        timeSlots: {
          create: timeLength.map((slotTime) => ({
            start: slotTime,
            status: "FREE"
          })),
        },
      },
    });

    console.log(teacherAvailability);
  }