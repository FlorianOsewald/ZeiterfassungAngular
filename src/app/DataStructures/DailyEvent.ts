

class DailyEvent {
        time: Timestamp;
        eventType: ProgramState;

        ToString() {
            return this.time.ToString() + ' ' + this.eventType.toString();
        }
    }

