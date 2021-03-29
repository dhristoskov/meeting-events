import { NextPage } from 'next';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";

interface Props {
    startDate: Date;
    setStartDate: (date: any) => void;
}

const DateForm: NextPage<Props> = ({ startDate, setStartDate }) => {

    return (
        <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            monthsShown={2}
            timeInputLabel="Time:"
            dateFormat="dd/MM/yyyy HH:mm"
            shouldCloseOnSelect={false}
            minDate={new Date()}
            popperPlacement="bottom-start"
            showTimeInput
        />
    )
}

export default DateForm;