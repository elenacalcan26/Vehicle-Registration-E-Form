from sqlalchemy import Column, Integer, String, ForeignKey, Table
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Person(Base):
    __tablename__ = "people"

    id = Column(Integer, primary_key=True, autoincrement=True)
    first_name = Column(String(30))
    last_name = Column(String(30))
    cnp = Column(String(13), unique=True)
    mail = Column(String(30), unique=True)
    phone = Column(String(15), unique=True)
    county = Column(String(30))
    preferred_license_plate = Column(String(10))
    total = Column(Integer)

    def __repr__(self) -> str:
        return f"""Person({self.first_name}, {self.last_name},
                    {self.cnp}, {self.mail}, {self.phone},
                    {self.county}, {self.preferred_license_plate}, {self.total}"""
