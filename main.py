from pathlib import Path
from fastapi import FastAPI
from fastapi import Request, Response
from fastapi import Header
from fastapi.templating import Jinja2Templates
import os


app = FastAPI()
templates = Jinja2Templates(directory="template")
CHUNK_SIZE = 1024*1024
video_path = Path("video.mp4")
path = "C:\\Users\\Admin\\Videos\\Captures"
fileslist = []
for root, dirs, files in os.walk(path):
	for file in files:
		fileslist.append(os.path.join(root,file))
# print(fileslist)

# @app.get("/")
# async def read_root(request: Request):
#     return templates.TemplateResponse("index.htm", context={"request": request})

@app.get("/")
def home(request: Request):
    return templates.TemplateResponse("home.html", context={"request": request})

@app.get("/video")
async def video_endpoint(range: str = Header(None)):
    start, end = range.replace("bytes=", "").split("-")
    start = int(start)
    end = int(end) if end else start + CHUNK_SIZE
    with open(video_path, "rb") as video:
        video.seek(start)
        data = video.read(end - start)
        filesize = str(video_path.stat().st_size)
        headers = {
            'Content-Range': f'bytes {str(start)}-{str(end)}/{filesize}',
            'Accept-Ranges': 'bytes'
        }
        return Response(data, status_code=206, headers=headers, media_type="video/mp4")