import json
import urllib
import os
import time
from datetime import datetime
from pprint import pprint
import requests

class pLotUpdateTool:
    def __init__(self):
        self.url = "http://geohub.lacity.org/datasets/be7c8c4ab95b4d82af18255ad1a3212c_2.geojson"
        self.post_url = "http://localhost:3000/addparkinglot"
        self.delete_url = "http://localhost:3000/deleteparkinglots"
        self.raw_rem_data = "be7c8c4ab95b4d82af18255ad1a3212c_2.txt"
        self.raw_loc_data = "parkingLots.txt"

        try:
            http = urllib.URLopener()
            http.retrieve(self.url, self.raw_rem_data)
            with open(self.raw_rem_data) as f:
                self.new_data = json.load(f)
            areLots = self.check_par_lots()
            http.retrieve(self.url, self.raw_loc_data)
            self.force_changes()
        except Exception, e:
            log_name = 'init-connection-error-{date:%Y-%m-%d %H:%M:%S}.log'.format(date=datetime.now())
            print("refresh_error")
            self.log(log_name, str(e))

    def force_changes(self):
        print("fC-pLUT")
        self.db_nuke()
        for i in self.new_data["features"]:
            cur_lot = str(i["properties"]["ID"]) + ".lot"
            formatted_data = self.format(i["properties"])
            with open(cur_lot, "w") as f:
                json.dump(formatted_data, f)
        self.push_updates()

    def refresh(self):
        print("rFpLUT")
        try:
            http = urllib.URLopener()
            http.retrieve(self.url, self.raw_rem_data)
            with open(self.raw_rem_data) as f:
                rem_data = json.load(f)
            with open(self.raw_loc_data) as f:
                loc_data = json.load(f)
            if rem_data == loc_data:
                return False
            else:
                self.force_changes()
                self.overwrite_old_data()
                return True
        except Exception, e:
            log_name = 'refresh-data-error-{date:%Y-%m-%d %H:%M:%S}.log'.format(date=datetime.now())
            print("refresh_error")
            self.log(log_name, str(e))

    def push_updates(self):
        par_lots = self.get_par_lots()
        for i in par_lots:
            with open(i) as f:
                curr = json.load(f)
            #pprint(curr)
            #data_json = json.dumps(i)
            #payload = {'json_payload': data_json}
            req = requests.post(self.post_url, json=curr)
            print(req)

    def db_nuke(self):
        print("Nuking Database")
        req = requests.post(self.delete_url)
        print(req)
        time.sleep(1)

    def format(self, lot_info):
        lot_id = lot_info.get("ID")
        lot_info.pop("ID")
        lot_info["LotID"] = lot_id
        lot_info.pop("FacilityID")
        lot_info.pop("Community")
        lot_info.pop("CD")
        lot_info.pop("ConvenientTo")
        lot_info.pop("Entrance")
        lot_info.pop("Operator")
        lot_info.pop("TOOLTIP")
        lot_info.pop("NLA_URL")
        return lot_info

    def get_par_lots(self):
        temp = []
        for f in os.listdir("."):
            if f.endswith(".lot"):
                temp.append(f)
        return temp

    def check_par_lots(self):
        temp = self.get_par_lots()
        if len(temp) == 0:
            return False
        else:
            return True

    def log(self, title, body=""):
        f = open(title, "w+")
        f.write(body)
        f.close()

    def overwrite_old_data(self):
        os.rename(self.raw_rem_data, self.raw_loc_data)