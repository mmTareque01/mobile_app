class ManagingTime {
    months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    getCurrentTime(){
        return (new Date()).toString().slice(16, 21); 
    }

    addingDate (date1, date2)  {
        let firstDate = date1.split(":");
        let secondDate = date2.split(":");
        const result = [];
        firstDate.reduceRight((carry, num, index)=>{
            const max = [24, 60, 60][index];
            const add = +secondDate[index];
            result.unshift( (+num+add+carry) % max );
            return Math.floor( (+num + add + carry) / max );
        }, 0);
    
    return result.join(":");
    }

    conpareTime(date1, date2){
        let firstDate = date1.split(":");
        let secondDate = date2.split(":");
        let firstDateDuration = parseInt(firstDate[0]) + (parseInt(firstDate[1])/60) ;
        let secondDateDuration = parseInt(secondDate[0]) + (parseInt(secondDate[1])/60);

        if(firstDateDuration > secondDateDuration){
            return true;
        }
        else if (firstDateDuration < secondDateDuration){
            return false;
        }
        else{
            return "equal";
        }
    }

    toUTC(data){
        return (new Date(data)).toUTCString();
    }

    getLocalTime(data){
        return (new Date(data)).toString().slice(16, 21);
    }

    getLocalTimefromLocalTimeStamp(data){
        return data.toString().slice(16, 21);
    }

    getLocalDate(data){
        return `${(new Date(data)).toString().slice(8, 10)} ${(new Date(data)).toString().slice(4, 7)}, ${(new Date(data)).toString().slice(11, 15)}`
    }

    getLocalDatefromLocalTimeStamp(data){
        return `${data.toString().slice(8, 10)} ${data.toString().slice(4, 7)}, ${data.toString().slice(11, 15)}`
    }

    getUTCDate(data){
        return `${data.toUTCString().slice(5, 11)},${data.toUTCString().slice(11, 16)}`
    }

    makeGMTFormatTime(date){
        return `${this.months[date.month-1]} ${date.day} ${date.year} ${this.getLocalTime(date.timestamp)}:00 ${this.getGMTInfo(date.timestamp)}` 
    }

    getGMTInfo(data){
        return (new Date(data)).toString().slice(25);
    }

    isTodaysDate(from_front_end){
        let inputed_date = this.getLocalDate(from_front_end.timestamp)
        let todaysDate = this.getLocalDate(new Date());
        return todaysDate == inputed_date;
    }

    getScheduleTimeStamp(date, time){
        let timeStamp = new Date(date);
        return new Date(`${timeStamp.toString().slice(0, 15)} ${time.toString().slice(16)}`)
    }

    getTimeStamp(data){
        return (new Date(data)).getTime();
    }

    getSelectedDate(date){
        return new Date(date).toString();
    }



}
module.exports = new ManagingTime();