from fastapi import FastAPI, BackgroundTasks, HTTPException
from pydantic import BaseModel
from datetime import datetime
import asyncio

app = FastAPI()
db = {}  # Replace with persistent DB in production

class Transaction(BaseModel):
    transaction_id: str
    source_account: str
    destination_account: str
    amount: float
    currency: str

async def process_transaction(transaction: Transaction):
    
    if db.get(transaction.transaction_id, {}).get("status") == "PROCESSED":
        return
    db[transaction.transaction_id] = {
        **transaction.dict(),
        "status": "PROCESSING",
        "created_at": datetime.utcnow(),
        "processed_at": None
    }
    await asyncio.sleep(30)  
    db[transaction.transaction_id]["status"] = "PROCESSED"
    db[transaction.transaction_id]["processed_at"] = datetime.utcnow()

@app.post("/v1/webhooks/transactions", status_code=202)
async def webhook(transaction: Transaction, background_tasks: BackgroundTasks):
    if transaction.transaction_id in db and db[transaction.transaction_id]["status"] == "PROCESSED":
        return {"message": "Already processed"}
    background_tasks.add_task(process_transaction, transaction)
    return {"message": "Accepted"}

@app.get("/")
def health_check():
    return {"status": "HEALTHY", "current_time": datetime.utcnow().isoformat()}

@app.get("/v1/transactions/{transaction_id}")
def get_transaction(transaction_id: str):
    if transaction_id not in db:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return db[transaction_id]
