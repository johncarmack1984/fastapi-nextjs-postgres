from fastapi import Depends, FastAPI, HTTPException
from fastapi.routing import APIRoute
from sqlalchemy.orm import Session
from typing import List
from dotenv import load_dotenv

from . import crud, models, schemas
from .database import SessionLocal, engine

load_dotenv()

models.Base.metadata.create_all(bind=engine)

def custom_generate_unique_id(route: APIRoute):
    return f"{route.tags[0]}-{route.name}"

app = FastAPI(generate_unique_id_function=custom_generate_unique_id)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/api/posts", response_model=List[schemas.Post], tags=["posts"])
def read_posts(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    posts = crud.get_posts(db, skip=skip, limit=limit)
    return posts

@app.patch("/api/posts/{post_id}/hug", response_model=schemas.Post, tags=["posts"])
def hug_post(post_id: int, db: Session = Depends(get_db)):
    db_post = crud.hug_post(db, post_id=post_id)
    if db_post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    return db_post

@app.get("/api/posts/{post_id}", response_model=schemas.Post, tags=["posts"])
def read_post(post_id: int, db: Session = Depends(get_db)):
    db_post = crud.get_post(db, post_id=post_id)
    if db_post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    return db_post

@app.post("/api/posts", response_model=schemas.Post, tags=["posts"])
def create_post(post: schemas.PostCreate, db: Session = Depends(get_db)):
    return crud.create_post(db=db, post=post)

@app.put("/api/posts/{post_id}", response_model=schemas.Post, tags=["posts"])
def update_post(post_id: int, post: schemas.PostCreate, db: Session = Depends(get_db)):
    db_post = crud.update_post(db=db, post_id=post_id, updated_post=post)
    if db_post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    return db_post

@app.delete("/api/posts/{post_id}", response_model=schemas.Post, tags=["posts"])
def delete_post(post_id: int, db: Session = Depends(get_db)):
    db_post = crud.delete_post(db, post_id=post_id)
    if db_post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    return db_post

@app.get("/api/posts/{post_id}/comments", response_model=List[schemas.Comment], tags=["comments"])
def read_comments(post_id: int, db: Session = Depends(get_db)):
    return crud.get_comments(db, post_id=post_id)

@app.post("/api/posts/{post_id}/comments", response_model=schemas.Comment, tags=["comments"])
def create_comment(post_id: int, comment: schemas.CommentCreate, db: Session = Depends(get_db)):
    return crud.create_comment(db=db, post_id=post_id, comment=comment)

@app.patch("/api/comments/{comment_id}/hug", response_model=schemas.Comment, tags=["comments"])
def hug_comment(comment_id: int, db: Session = Depends(get_db)):
    db_comment = crud.hug_comment(db, comment_id=comment_id)
    if db_comment is None:
        raise HTTPException(status_code=404, detail="Comment not found")
    return db_comment

@app.put("/api/comments/{comment_id}", response_model=schemas.Comment, tags=["comments"])
def update_comment(comment_id: int, comment: schemas.CommentCreate, db: Session = Depends(get_db)):
    db_comment = crud.update_comment(db=db, comment_id=comment_id, updated_comment=comment)
    if db_comment is None:
        raise HTTPException(status_code=404, detail="Comment not found")
    return db_comment

@app.delete("/api/comments/{comment_id}", response_model=schemas.Comment, tags=["comments"])
def delete_comment(comment_id: int, db: Session = Depends(get_db)):
    db_comment = crud.delete_comment(db, comment_id=comment_id)
    if db_comment is None:
        raise HTTPException(status_code=404, detail="Comment not found")
    return db_comment
