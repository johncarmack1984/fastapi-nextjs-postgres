from fastapi import Depends, FastAPI, HTTPException
from fastapi.routing import APIRoute
from sqlalchemy.orm import Session
from typing import List
from dotenv import load_dotenv
from urllib.parse import unquote
import logging

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

import os

load_dotenv()

SQLALCHEMY_DATABASE_URL = os.getenv("POSTGRES_URL").replace(
    'postgres://',
    'postgresql://',
    1
)

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel

class CommentBase(BaseModel):
    display_name: str
    text: str
    created_at: datetime
    num_hugs: int
    parent_id: Optional[int] = None
    post_id: int

class CommentCreate(CommentBase):
    pass 

class CommentSchema(CommentBase):
    id: int

    class Config:
        from_attributes = True

class PostBase(BaseModel):
    post_url: str
    title: str
    created_at: datetime
    num_hugs: int
    patient_description: str
    assessment: str
    question: Optional[str] = None

class PostCreate(PostBase):
    pass

class PostSchema(PostBase):
    id: int
    comments: List[CommentSchema] = []

    class Config:
        from_attributes = True


from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, backref

class Post(Base):
    __tablename__ = 'auxhealth_posts'

    id = Column(Integer, primary_key=True)
    post_url = Column(String, nullable=False)
    title = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), nullable=False)
    num_hugs = Column(Integer, nullable=False)
    patient_description = Column(Text, nullable=False)
    assessment = Column(Text, nullable=False)
    question = Column(Text, nullable=True)
    comments = relationship("Comment", backref="post")

class Comment(Base):
    __tablename__ = 'auxhealth_comments'

    id = Column(Integer, primary_key=True)
    parent_id = Column(Integer, ForeignKey('auxhealth_comments.id'), nullable=True)
    display_name = Column(String, nullable=False)
    text = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), nullable=False)
    num_hugs = Column(Integer, nullable=False)
    post_id = Column(Integer, ForeignKey('auxhealth_posts.id'), nullable=False)

    children = relationship("Comment", backref=backref('parent', remote_side=[id]))


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


from sqlalchemy.orm import Session

def get_posts(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Post).order_by(Post.created_at.desc()).offset(skip).limit(limit).all()

def get_post_by_url(db: Session, post_url: str):
    return db.query(Post).filter(Post.post_url == post_url).first()

def hug_post(db: Session, post_id: int):
    db_post = db.query(Post).filter(Post.id == post_id).first()
    if db_post:
        db_post.num_hugs += 1
        db.commit()
        db.refresh(db_post)
    return db_post

def get_post(db: Session, post_id: int):
    return db.query(Post).filter(Post.id == post_id).first()

def create_post(db: Session, post: PostCreate):
    db_post = Post(**post.dict())
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post

def update_post(db: Session, post_id: int, updated_post: PostCreate):
    db_post = db.query(Post).filter(Post.id == post_id).first()
    if db_post:
        for key, value in updated_post.dict().items():
            setattr(db_post, key, value)
        db.commit()
        db.refresh(db_post)
    return db_post

def delete_post(db: Session, post_id: int):
    db_post = db.query(Post).filter(Post.id == post_id).first()
    if db_post:
        db.delete(db_post)
        db.commit()
    return db_post

def get_comments(db: Session, post_id: int):
    return db.query(Comment).filter(Comment.post_id == post_id).all()

def hug_comment(db: Session, comment_id: int):
    db_comment = db.query(Comment).filter(Comment.id == comment_id).first()
    if db_comment:
        db_comment.num_hugs += 1
        db.commit()
        db.refresh(db_comment)
    return db_comment

def create_comment(db: Session, comment: CommentCreate, post_id: int):
    db_comment = Comment(**comment.dict(), post_id=post_id)
    db.add(db_comment)
    db.commit()
    db.refresh(db_comment)
    return db_comment

def update_comment(db: Session, comment_id: int, updated_comment: CommentCreate):
    db_comment = db.query(Comment).filter(Comment.id == comment_id).first()
    if db_comment:
        for key, value in updated_comment.dict().items():
            setattr(db_comment, key, value)
        db.commit()
        db.refresh(db_comment)
    return db_comment

def delete_comment(db: Session, comment_id: int):
    db_comment = db.query(Comment).filter(Comment.id == comment_id).first()
    if db_comment:
        db.delete(db_comment)
        db.commit()
    return db_comment

Base.metadata.create_all(bind=engine)

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

@app.get("/api/posts", response_model=List[PostSchema], tags=["posts"])
def read_posts(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    posts = get_posts(db, skip=skip, limit=limit)
    return posts

@app.patch("/api/posts/{post_id}/hug", response_model=PostSchema, tags=["posts"])
def hug_post(post_id: int, db: Session = Depends(get_db)):
    db_post = hug_post(db, post_id=post_id)
    if db_post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    return db_post

@app.get("/api/posts/{post_id}", response_model=PostSchema, tags=["posts"])
def read_post(post_id: int, db: Session = Depends(get_db)):
    db_post = get_post(db, post_id=post_id)
    if db_post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    return db_post

@app.get("/api/posts/url/{post_url}", response_model=PostSchema, tags=["posts"])
def read_post_by_url(post_url: str, db: Session = Depends(get_db)):
    db_post = get_post_by_url(db, post_url=post_url)
    if db_post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    return db_post

@app.post("/api/posts", response_model=PostSchema, tags=["posts"])
def create_post(post: PostCreate, db: Session = Depends(get_db)):
    return create_post(db=db, post=post)

@app.put("/api/posts/{post_id}", response_model=PostSchema, tags=["posts"])
def update_post(post_id: int, post: PostCreate, db: Session = Depends(get_db)):
    db_post = update_post(db=db, post_id=post_id, updated_post=post)
    if db_post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    return db_post

@app.delete("/api/posts/{post_id}", response_model=PostSchema, tags=["posts"])
def delete_post(post_id: int, db: Session = Depends(get_db)):
    db_post = delete_post(db, post_id=post_id)
    if db_post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    return db_post

@app.get("/api/posts/{post_id}/comments", response_model=List[CommentSchema], tags=["comments"])
def read_comments(post_id: int, db: Session = Depends(get_db)):
    return get_comments(db, post_id=post_id)

@app.post("/api/posts/{post_id}/comments", response_model=CommentSchema, tags=["comments"])
def create_comment(post_id: int, comment: CommentCreate, db: Session = Depends(get_db)):
    return create_comment(db=db, post_id=post_id, comment=comment)

@app.patch("/api/comments/{comment_id}/hug", response_model=CommentSchema, tags=["comments"])
def hug_comment(comment_id: int, db: Session = Depends(get_db)):
    db_comment = hug_comment(db, comment_id=comment_id)
    if db_comment is None:
        raise HTTPException(status_code=404, detail="Comment not found")
    return db_comment

@app.put("/api/comments/{comment_id}", response_model=CommentSchema, tags=["comments"])
def update_comment(comment_id: int, comment: CommentCreate, db: Session = Depends(get_db)):
    db_comment = update_comment(db=db, comment_id=comment_id, updated_comment=comment)
    if db_comment is None:
        raise HTTPException(status_code=404, detail="Comment not found")
    return db_comment

@app.delete("/api/comments/{comment_id}", response_model=CommentSchema, tags=["comments"])
def delete_comment(comment_id: int, db: Session = Depends(get_db)):
    db_comment = delete_comment(db, comment_id=comment_id)
    if db_comment is None:
        raise HTTPException(status_code=404, detail="Comment not found")
    return db_comment
