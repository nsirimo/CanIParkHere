#python 2.7
import json

district = 8

subDistrictList = []
subDistrictGeo = {}
streetList = []
splitStreets = []
intersections = {}
intersAndSubDist = []
fullSubDistrict = []


def coordinator(coords):
    new_coord_array = []
    for x in coords:
        for y in x:
            new_coord_array.append(y)
    print(new_coord_array)
    return new_coord_array

def create_street():
    for x in subDistrictList:
        for y in intersections.iteritems():
            if x in y[0]:
                temp = [x, y[0], y[1]]
                #print(temp)
                intersAndSubDist.append(temp)

def create_sub_dist():
    for x in subDistrictGeo.iteritems():
        temp = [x[0], x[1]]
        for y in intersAndSubDist:
            if x[0] in y[0]:
                temp.append(y[1])
                temp.append(y[2])
        print(temp)
        fullSubDistrict.append(temp)

def jsonify_streets(street, sub_dist):
    short_name = str(street[0]).replace(sub_dist, '')
    short_name = ' '.join(short_name.split())
    json_str = "{\n\"ShortName\": \"" + short_name + "\","
    json_str += "\n\"Coord\": " + str(street[1]) + "\n},\n"
    return json_str

def jsonify_last_street(street, sub_dist):
    short_name = str(street[0]).replace(sub_dist, '')
    short_name = ' '.join(short_name.split())
    json_str = "{\n\"ShortName\": \"" + short_name + "\","
    json_str += "\n\"Coord\": " + str(street[1]) + "\n}\n"
    return json_str

def create_json(json_str, sub_dist_name):
    f = open(sub_dist_name + ".json", "w+")
    f.write(json_str)
    f.close()


def jsonify():
    for x in subDistrictGeo.iteritems():
        json_str =  "{\n\"SubDistrictID\": \"" + x[0] +"\","
        json_str += "\n\"DistrictID\": " + str(district)+ ","
        json_str += "\n\"GeoFence\": " + str(x[1]) + ","
        json_str += "\n\"Streets\": \n[\n"
        added_street = False
        for y in intersections.iteritems():
            if x[0] in y[0]:
                added_street = True
                json_str += jsonify_streets(y, x[0])
        if added_street:
            json_str = json_str[:-2]
            json_str += "\n"

        json_str += "],\n"
        json_str += "\"SweepTime\": [\"00:00:00\", \"00:00:00\"],"
        json_str += "\n\"SweepDay\": [\"D\",\"D\"]"
        json_str += "\n}"
        print(json_str)
        create_json(json_str, str(x[0]))
    #create info


with open('tracks.geojson') as f:
    data = json.load(f)


'''
print(json.dumps(data, indent=1, sort_keys=False))
print("==========================================================")
print(data["features"])
print(json.dumps(data["features"][0], indent=1))
print("==========================================================")
dataFeatures = json.dumps(data["features"])
'''

for x in data["features"]:
    name = x["properties"]["name"]
    strNamArr = name.split()
    strLen = len(strNamArr)
    print(name + " " + str(strLen))
    print(x["geometry"]["coordinates"][0])

    if(strLen is 1):
        subDistrictList.append(name.encode('ascii', 'ignore'))
        temp = coordinator(x["geometry"]["coordinates"][0])
        subDistrictGeo[name.encode('ascii', 'ignore')] = temp

    else:
        streetList.append(name.encode('ascii', 'ignore'))


    '''
    print(x["properties"]["name"])
    print(len(x["properties"]["name"].split()))
    print(x["geometry"]["coordinates"])
    print("-")
    '''

print("==========================================================")

print(len(subDistrictList))
print(len(streetList))
print(len(intersections))

print("==========================================================")

print("create Split Streets")
for x in subDistrictList:
    sublist = []
    for y in streetList:
        if x in y:
            sublist.append(y)
    splitStreets.append(sublist)

print(len(splitStreets))
for x in splitStreets:
    print(x)

print("==========================================================")

print("create intersections")
for x in splitStreets:
    if len(x) != 0:
        print(x)
        for y in x:
            for z in data["features"]:
                if y in z["properties"]["name"]:
                    coords = z["geometry"]["coordinates"][0]
                    print("--")
                    print(coords)
                    intersections[y] = coordinator(coords)


print("==========================================================")

print(len(intersections))
for x in intersections.iteritems():
    print(x)

print("==========================================================")

print("create intersections and subDisttrict mix")
create_street()
#print(len(intersAndSubDist), intersAndSubDist)

print("==========================================================")

print(len(subDistrictGeo))
for x in subDistrictGeo.iteritems():
    print(x)

print("==========================================================")

create_sub_dist()
print("-")
for x in fullSubDistrict:
    print(x)

print("==========================================================")
jsonify()
print(len(intersections))