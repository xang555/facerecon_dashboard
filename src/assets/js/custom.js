import moment from 'moment';
export const numberFormat =  (number) => {
    return  `${new Intl.NumberFormat().format(number)} KIP`;
}

export const dateFormat = (date) => {
    return moment(date).format("YYYY-MM-DD");
}