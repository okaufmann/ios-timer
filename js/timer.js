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
        textSize: '1.5em'
    },
    ready: function () {
        var self = this;
        self.durationLeft = moment.duration({
            'seconds': 10,
            'hour': 0,
            'minutes': 0
        });

        var initialOffset = 440;
        var i = 1
        var time = self.durationLeft.asSeconds();

        var interval = setInterval(function () {
            self.durationLeft.subtract(1, 's');
            var offset = initialOffset - (i * (initialOffset / time));
            self.dashOffset = offset;

            var hours = self.durationLeft.hours();

            if (hours == 0) {
                self.textSize = '2.8em';
                self.timeLeftText = sprintf("%s:%s", pad(self.durationLeft.minutes()), pad(self.durationLeft.seconds()));
            } else {
                self.timeLeftText = sprintf("%s:%s:%s", pad(hours), pad(self.durationLeft.minutes()), pad(self.durationLeft.seconds()));
            }
            if (i == time) {
                clearInterval(interval);
            }
            i++;
        }, 1000);
    }
})


