export const DateComparer = (date: Date ): Number => {
    const dateNow = new Date;

    const difference = dateNow.getTime() - date.getTime();
    const days: Number = Math.ceil(difference / (1000 * 3600 * 24));

    return days;
}