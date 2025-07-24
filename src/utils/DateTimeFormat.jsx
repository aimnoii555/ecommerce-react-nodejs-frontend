import moment from "moment";

export const dateTimeFormat = (date) => {
    return moment(date).format("DD-MM-yyyy")
}
