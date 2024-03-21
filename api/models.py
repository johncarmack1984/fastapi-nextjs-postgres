from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, backref

from  .database import Base

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
    post_id = Column(Integer, ForeignKey('auxhealth_posts.id'), nullable=False)

    children = relationship("Comment", backref=backref('parent', remote_side=[id]))
