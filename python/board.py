import time
start_time = time.time()
########################################################

import json

# def reverseString(kiss):
#     map = {}
#     kiss = map[10]
#     print(kiss)


# print(reverseString("hello"))
map = [
  {
    "id": 1,
    "user": "alexandrujeman.ja@gmail.com",
    "project_name": "Appraisal System",
    "project_description": "description - in progress\nEmployee appraisal system built using MongoDB, Express, React, Nodejs",
    "project_sample": "https://github.com/alexandrujeman/appraisal-system",
    "project_link": "#",
    "project_img": "https://i.imgur.com/6ipBELN.jpg",
    "project_img_pages": "https://i.imgur.com/pJknsKa.png"
  },
  {
    "id": 7,
    "user": "alexandrujeman.ja@gmail.com",
    "project_name": "Tribute Page - Otto Bayer",
    "project_description": "Otto Bayer was a German industrial chemist at IG Farben who was head of the research group that in 1937 discovered the polyaddition for the synthesis of polyurethanes out of poly-isocyanate and polyol.",
    "project_sample": "https://codepen.io/alexandrujeman/pen/JjPLKwg",
    "project_link": "https://codepen.io/alexandrujeman/full/JjPLKwg",
    "project_img": "https://github.com/alexandrujeman/free-code-camp-projects/raw/master/FrontEnd/Build-a-Personal-Portfolio-Webpage/img/tribute_gallery.png",
    "project_img_pages": "https://i.imgur.com/2bEqRvr.png"
  }
]

jsonified = json.dumps(map)

desciphered = json.loads(jsonified)

def displayInfo(file):
      for i in file:
            for j in i:
                  print(i[j])

displayInfo(desciphered)

########################################################
print("--- %s seconds 10000 runs---" %
      f"{((time.time() - start_time) * 10000):.3f}")
