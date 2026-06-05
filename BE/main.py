        import os
        from fastapi import FastAPI, Depends, HTTPException, status
        from sqlalchemy import create_engine, Column, Integer, String, Boolean
        from sqlalchemy.orm import sessionmaker, declarative_base
        from dotenv import load_dotenv
        from typing import Optional

        # Load environment variables (for SQLite path)
        load_dotenv()

        # --- Database Setup ---
        DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./test.db")
        engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
        SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
        Base = declarative_base()

        # --- SQLAlchemy Models ---
        class User(Base):
            tablename = "users"
            id = Column(Integer, primary_key=True, index=True)
            username = Column(String, unique=True, index=True, nullable=False)
            email = Column(String, unique=True, index=True, nullable=False)
            hashed_password = Column(String, nullable=False)
            is_active = Column(Boolean, default=True)

        # Create tables if they don't exist
        Base.metadata.create_all(bind=engine)

        # --- Dependency ---
        def get_db():
            db = SessionLocal()
            try:
                yield db
            finally:
                db.close()

        # --- Mock Registration/Login Functions (Skeleton) ---

        def get_user_by_username(db, username: str):
            user = db.query(User).filter(User.username == username).first()
            return user

        def create_user(db, username: str, email: str, hashed_password: str):
            new_user = User(username=username, email=email, hashed_password=hashed_password)
            db.add(new_user)
            db.commit()
            db.refresh(new_user)
            return new_user

        # --- FastAPI App Initialization ---
        app = FastAPI()

        # --- Routes ---

        @app.post("/register")
        def register_user(user: dict, db: Session = Depends(get_db)):
            if get_user_by_username(db, user.get("username")):
                raise HTTPException(status_code=400, detail="Username already exists")

            # NOTE: 실제 환경에서는 반드시 해시 함수 (예: bcrypt)를 사용해야 합니다. 현재는 예시로 평문 사용.
            new_user = create_user(db, user["username"], user["email"], user["password"])
            return {"message": "User created successfully", "user_id": new_user.id}

        @app.post("/login")
        def login_user(user: dict, db: Session = Depends(get_db)):
            user = get_user_by_username(db, user.get("username"))
            if not user or not user.hashed_password:
                raise HTTPException(status_code=401, detail="Invalid credentials")
            # NOTE: 실제 환경에서는 해시된 비밀번호를 비교해야 합니다.
            return {"message": f"Login successful for {user.username}", "user_id": user.id}

        @app.get("/")
        def read_root():
            return {"status": "Backend Skeleton Running", "db_path": DATABASE_URL}