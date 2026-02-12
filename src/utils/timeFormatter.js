import moment from 'moment'

export const msConversion = (millis) => {
    if (!millis) return '';
    try {
        let sec = Math.floor(Number(millis) / 1000);
        let hrs = Math.floor(sec / 3600);
        sec -= hrs * 3600;
        let min = Math.floor(sec / 60);
        sec -= min * 60;
        
        sec = '' + sec;
        sec = ('00' + sec).substring(sec.length);
        
        if (hrs > 0) {
            min = '' + min;
            min = ('00' + min).substring(min.length);
            return `${hrs}:${min}`;
        }
        else {
            return `${min}:${sec}`;
        }
    } catch (error) {
        console.error('Ошибка форматирования длительности:', error);
        return '';
    }
}

export const toHHMMSS = (secs) => {
    if (!secs) return '';
    try {
        const timestamp = Number(secs) * 1000;
        if (isNaN(timestamp)) return '';
        return moment(timestamp).format('HH:mm');
    } catch (error) {
        console.error('Ошибка форматирования времени:', error);
        return '';
    }
}

export const datetimeToDate = (value) => {
    if (!value) return '';
    try {
        const timestamp = Number(value) * 1000;
        if (isNaN(timestamp)) return '';
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${`0${day}`.slice(-2)}.${`0${month}`.slice(-2)}.${year}`;
    } catch (error) {
        console.error('Ошибка форматирования даты:', error);
        return '';
    }
}