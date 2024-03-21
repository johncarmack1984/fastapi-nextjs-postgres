from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel

class CommentBase(BaseModel):
    display_name: str
    text: str
    created_at: datetime

class CommentCreate(CommentBase):
    pass

class Comment(CommentBase):
    id: int
    parent_id: Optional[int] = None
    post_id: int

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

class Post(PostBase):
    id: int
    comments: List[Comment] = []

    class Config:
        from_attributes = True
