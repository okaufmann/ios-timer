function pad(value) {
    if (value < 10) {
        return '0' + '' + value;
    }

    return value;
}

new Vue({
    el: "#timer",
    data: {
        timeLeft: 0,
        dashOffset: null,
        timeLeftText: '',
        textSize: '1.9em'
    },
    ready: function () {
        var self = this;
        self.targetTime = moment('2016-06-27 20:00');

        var initialOffset = 440;
        var i = 1
        var diffSeconds = self.targetTime.diff(moment(), 's');
        var interval = setInterval(function () {
            var diffSecondsFromNow = self.targetTime.diff(moment(), 's');

            self.durationLeft = moment.duration(diffSecondsFromNow, 's');

            var offset = sprintf("%d.0", initialOffset - (i * (initialOffset / diffSeconds)));
            self.dashOffset = offset;

            // add additional Days to hours (days can not be displayed
            var hours = self.durationLeft.hours() + (24*self.durationLeft.days());

            if (hours == 0) {
                // increase text size cause hours not shown anymore
                self.textSize = '2.8em';
                self.timeLeftText = sprintf("%s:%s", pad(self.durationLeft.minutes()), pad(self.durationLeft.seconds()));
            } else {
                self.timeLeftText = sprintf("%s:%s:%s", pad(hours), pad(self.durationLeft.minutes()), pad(self.durationLeft.seconds()));
            }

            if (i == diffSeconds) {
                clearInterval(interval);
            }

            i++;
        }, 1000);
    }
})


