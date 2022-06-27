import manageTime from "./manageTime";

const makingTimeSlot = (datas, date) => {

    let datas_len = Object.keys(datas).length;
    let meeting_duration = (30 * 60) * 1000; //meeting duration in milisecond
    let break_between_meeting = (15 * 60) * 1000;


    if(datas_len > 0){
        let schedule = datas[0].schedule
        let booked_data = datas[0].booked_data
        let time_slot = []; //will be returned
        let booked_time_slot = []
        let schedule_len = Object.keys(schedule).length
        let current_time = manageTime.addingDate(manageTime.getCurrentTime(), "00:30:00");

        booked_data.map(item=>{
            booked_time_slot.push(manageTime.getTimeStamp(item))
        })

        if(manageTime.isTodaysDate(date)){
            for(let i = 0; i < schedule_len; i++){
                let data = {
                    Schedule_id: schedule[i].Schedule_id,
                    mentor_id: schedule[i].mentor_id,
                    start_time: manageTime.getTimeStamp(schedule[i].start_time),
                    end_time: manageTime.getTimeStamp(schedule[i].end_time),
                }

                let appointment_starting_time = data.start_time;

                while(true){
                    let appointment_ending_time = appointment_starting_time + meeting_duration;
                    let available = true;   
                    let time_slot_data = {
                        mentor_id: data.mentor_id,
                        start_time: appointment_starting_time,
                        end_time: appointment_ending_time
                    };

                    for (let j = 0; j < booked_time_slot.length; j++) {
                        if (
                            booked_time_slot[j] == time_slot_data.start_time
                        ) {
                            available = false;
                        }
                    }

                    if(
                        appointment_starting_time >= data.end_time ||
                        appointment_ending_time >= data.end_time
                    ){break}


                    if( 
                        manageTime.conpareTime(manageTime.getLocalTime(time_slot_data.start_time), current_time)&&
                        manageTime.getLocalDate(time_slot_data.start_time) == manageTime.getLocalDate(date.timestamp)&&   
                        available
                        ){
                        time_slot.push(time_slot_data);
                    }

                    appointment_ending_time += break_between_meeting;
                    appointment_starting_time = appointment_ending_time;
                }

            }

            return(time_slot)
        }
        else{
            for(let i = 0; i < schedule_len; i++){
                let data = {
                    Schedule_id: schedule[i].Schedule_id,
                    mentor_id: schedule[i].mentor_id,
                    start_time: manageTime.getTimeStamp(schedule[i].start_time),
                    end_time: manageTime.getTimeStamp(schedule[i].end_time),
                }

                let appointment_starting_time = data.start_time;

                while(true){
                    let appointment_ending_time = appointment_starting_time + meeting_duration;
                    let available = true;   
                    let time_slot_data = {
                        mentor_id: data.mentor_id,
                        start_time: appointment_starting_time,
                        end_time: appointment_ending_time
                    };

                    for (let j = 0; j < booked_time_slot.length; j++) {
                        if (
                            booked_time_slot[j] == time_slot_data.start_time
                        ) {
                            available = false;
                        }
                    }



                    if(
                        appointment_starting_time >= data.end_time ||
                        appointment_ending_time >= data.end_time
                    ){break}


                    if(
                        manageTime.getLocalDate(time_slot_data.start_time) == manageTime.getLocalDate(date.timestamp)&&   
                        available){
                        time_slot.push(time_slot_data);
                    }

                    appointment_ending_time += break_between_meeting;
                    appointment_starting_time = appointment_ending_time;
                }

            }

            return(time_slot)
        }
    }
    else{
        return []
    }
}

module.exports = makingTimeSlot;