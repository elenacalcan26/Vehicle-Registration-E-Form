from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from person_model import Person, Base
from flask_sqlalchemy import SQLAlchemy

class Dao:
    def __init__(self):
        self.engine = create_engine("sqlite:///people.db", echo=True)
        Base.metadata.create_all(self.engine)

    def open_db_session(self):
        Session = sessionmaker(bind=self.engine)
        session = Session()
        return session

    def close_db_session(self, session):
        session.close()

    def insert_into_db(self, person):
        print(f"Trying to insert {person} to the DB!", flush=True)
        try:
            session = self.open_db_session()
            session.add(person)
            session.commit()
            print(f"{person} is inserted into the DB!", flush=True)
            self.close_db_session(session)
            return True
        except Exception as e:
            print(f"Failed inserting {person} to the DB! {e}", flush=True)
            return False
