import subDistrictUpdateTool
import parkingLotUpdateTool
import requests
import json
import urllib
import urllib2
import time
import pprint

refresh_freq = 7 #In Days

#def refresh_calc(self):
#    return refresh_freq * 86400

url = "http://localhost:3000/checkforsubdistrict"
pay_load = {"SubDistrictID": "11P181"}
headers = {'content-type': 'application/json'}

#parking_lots = parkingLotUpdateTool.pLotUpdateTool()
sub_districts = subDistrictUpdateTool.sDUpdTool()

names = sub_districts.get_districts()




'''
r = requests.post(url, json=pay_load)
print(pay_load)
print(r)
print(r.json())
print(r.text)
print(r.headers)
'''


'''
whatDo = subDistrictUpdateTool.sDUpdTool()
while True:
    time.sleep(refresh_calc())
    isUpdated = whatDo.refresh()
    if isUpdated:
        print(url)
        pprint.pprint(r.json())
'''

