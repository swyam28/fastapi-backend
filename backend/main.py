from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
import uvicorn

app = FastAPI()

class InputData(BaseModel):
    data: List[str]

@app.post("/bfhl")
async def process_data(input_data: InputData):
    user_id = "your_name_ddmmyyyy"
    email = "your_email@college.com"
    roll_number = "your_roll_number"
    
    numbers = [x for x in input_data.data if x.isdigit()]
    alphabets = [x for x in input_data.data if x.isalpha()]
    highest_alphabet = [max(alphabets, key=lambda c: c.lower())] if alphabets else []
    
    return {
        "is_success": True,
        "user_id": user_id,
        "email": email,
        "roll_number": roll_number,
        "numbers": numbers,
        "alphabets": alphabets,
        "highest_alphabet": highest_alphabet
    }

@app.get("/bfhl")
async def get_operation_code():
    return {"operation_code": 1}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
