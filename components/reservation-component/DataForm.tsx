import { NextPage } from 'next';
import DatePicker, { registerLocale } from 'react-datepicker';
import de from 'date-fns/locale/de';

import "react-datepicker/dist/react-datepicker.css";

interface Props {
    startDate: Date;
    setStartDate: (date: any) => void;
}

const DateForm: NextPage<Props> = ({ startDate, setStartDate }) => {

    registerLocale('de-DE', de);

    return (
        <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            locale='de-DE'
            monthsShown={2}
            timeInputLabel="Time:"
            dateFormat="dd MMMM yyyy HH:mm"
            shouldCloseOnSelect={false}
            minDate={new Date()}
            popperPlacement="bottom-start"
            showTimeInput
        />
    )
}

export default DateForm;