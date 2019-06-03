
    class Duration {
        Hours: number;
        Minutes: number;

        constructor() {
            this.Hours = 0;
            this.Minutes = 0;
        }

        ToString() {
            return  this.Hours.toString().padStart(2, '0') + ':' + this.Minutes.toString().padStart(2, '0');
        }
    }

