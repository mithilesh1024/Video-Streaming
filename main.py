from flask import Flask, render_template, redirect
import os

app = Flask(__name__)
CHUNK_SIZE = 1024*1024
path = "C:\\Users\\Admin\\Videos\\Captures"
fileslist = []

for root, dirs, files in os.walk(path):
	for file in files:
            if file[-4:] == ".mp4":
                fileslist.append(os.path.join(root,file))

@app.route("/")
def home():
    # return render_template("home.html", {"fileslist": fileslist})
    return "hello world"

# @app.post("/{name}")
# def video(request: Request, name: str):
#     print(name)
#     pass

# @app.get("/playvideo")
# async def read_root(request: Request):
#     return templates.TemplateResponse("index.htm", context={"request": request})

# @app.get("/video")
# async def video_endpoint(range: str = Header(None)):
#     start, end = range.replace("bytes=", "").split("-")
#     start = int(start)
#     end = int(end) if end else start + CHUNK_SIZE
#     with open(video_path, "rb") as video:
#         video.seek(start)
#         data = video.read(end - start)
#         filesize = str(video_path.stat().st_size)
#         headers = {
#             'Content-Range': f'bytes {str(start)}-{str(end)}/{filesize}',
#             'Accept-Ranges': 'bytes'
#         }
#         return Response(data, status_code=206, headers=headers, media_type="video/mp4")


if __name__ == '__main__':
    app.run(debug=True)