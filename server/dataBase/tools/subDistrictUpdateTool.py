import json
import urllib
import os
from datetime import datetime
import pprint

class sDUpdTool:

    def __init__(self):
        print('sDUT')
        self.url = "https://data.lacity.org/resource/x8i3-2x54.json"
        self.rawRemoteDataName = "x8i3-2x54.txt"  # txt so that it doesn't conflict
        self.rawLocalData = "rawLocSubDistRules.txt"  # txt so that it doesn't conflict

        try:
            http = urllib.URLopener()
            http.retrieve(self.url, self.rawRemoteDataName)  # downloads Data and saves as
            with open(self.rawRemoteDataName) as f:
                self.rem_data = json.load(f)  # Opens downloaded Data as JSON
            self.loc_dist_names = self.get_districts()  # retrieve names of Districts
            self.force_changes()
        except:
            log_name = 'init-connection-error-{date:%Y-%m-%d %H:%M:%S}.log'.format(date=datetime.now())
            print("init_error")
            self.log(log_name)


    def force_changes(self):
        print('fC')
        changed_sub_dist = []
        count = 0
        for i in self.rem_data:
            days = []
            for j in self.loc_dist_names:
                a = j.replace('.json', '')
                if a in i["route_no"]:
                    count += 1
                    with open(j, "r") as f:
                        local = json.load(f)
                    times = self.get_time(i)
                    day = self.get_day(i)
                    if count % 2 == 0:
                        local["SweepDay"][1] = day
                    else:
                        local["SweepDay"][0] = day
                    local["SweepTime"] = times
                    with open(j, "w") as f:
                        json.dump(local, f)
                    #print(i["route_no"])
                    #print(times)
                    #print(day)

    def get_time(self, remote):
        #print(remote["time_start"])
        #with open(local) as f:
        #    loc = json.load(f)
        #print(loc["SweepTime"])
        start_time = self.time_formatter(remote["time_start"])
        end_time = self.time_formatter(remote["time_end"])
        new_times = ["" + start_time, "" + end_time]
        #print(new_times)
        return new_times

    def time_formatter(self, n_time):
        in_time = datetime.strptime(n_time, "%I:%M %p")
        out_time = datetime.strftime(in_time, "%H:%M:%S")
        return out_time


    def get_day(self, remote):
        day = remote["route_no"]
        day = day.split()
        if len(day[1]) < 3:
            return day[1]
        else:
            return "NA"

    def refresh(self):
        try:
            http = urllib.URLopener()
            http.retrieve(self.url, self.rawRemoteDataName)
            with open(self.rawRemoteDataName) as f:
                rem_data = json.load(f)
            with open(self.rawLocalData) as f:
                loc_data = json.load(f)
            #print(rem_data)
            #print(loc_data)
            if rem_data == loc_data:
                return False
            else:
                self.force_changes()
                return True

        except Exception, e:
            log_name = 'refresh-connection-error-{date:%Y-%m-%d %H:%M:%S}.log'.format(date=datetime.now())
            print("refresh_error")
            self.log(log_name, str(e))
            return False

    def get_districts(self):
        temp = []
        for f in os.listdir("."):
            if f.endswith(".json"):
                f.replace(".json","")
                temp.append(f)
        return temp

    def log(self, title, body=""):
        f = open(title, "w+")
        f.write(body)
        f.close()

    def overwrite_old_data(self):
        os.rename(self.rawLocalData, self.rawRemoteDataName)

    #def update_time(self):

    #def update_day(self):

    #def check_for_changes(self):
