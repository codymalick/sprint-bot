import schedule
import time

class Sprint():
    def __init__(self):
        self._start_time = time.time() + 120
        self._end_time = self._start_time + 60 * 10
        print("Start time: {0}, End time: {1}".format(self._start_time, self._end_time))

    @property
    def start_time(self):
        return self.time_to_string(self._start_time)
    
    @property
    def end_time(self):
        return self.time_to_string(self._end_time)

    def time_to_string(self, unix_time) -> str:
        return time.strftime("%I:%M", time.localtime(unix_time))
