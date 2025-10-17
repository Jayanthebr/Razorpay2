BackEnd

This project is a FastAPI-based backend service that simulates receiving and processing transaction webhooks from external payment gateways such as RazorPay.
The main goal of this application is to acknowledge incoming webhooks immediately while processing them asynchronously in the background to ensure high performance and reliability.

#-------------------------------------------------------------
When a webhook request is received, the service instantly responds with a 202 Accepted status within 500 milliseconds.
After acknowledging the request, it processes the transaction in the background with a simulated 30-second delay to represent communication with an external API.
Each transaction is stored in an in-memory database and marked as PROCESSED once the background task completes.
To prevent duplicates, the application implements idempotency — meaning that if a webhook with the same transaction ID is received multiple times, it will not be reprocessed.

#--------------------------------------------------------------
API Endpoints
1. Health Check (GET /)

This endpoint is used to verify that the service is up and running.
It returns a simple JSON response showing the current health status and the current UTC time.

Example Response:

{
  "status": "HEALTHY",
  "current_time": "2025-10-17T10:30:00Z"
}

2. Receive Webhook (POST /v1/webhooks/transactions)

This endpoint receives webhook notifications containing transaction details.
Once the webhook is received, the service immediately returns a success acknowledgment with a 202 Accepted status and begins background processing of the transaction.

Example Request:

{
  "transaction_id": "txn_abc123def456",
  "source_account": "acc_user_789",
  "destination_account": "acc_merchant_456",
  "amount": 1500,
  "currency": "INR"
}


If the same transaction has already been processed earlier, the service responds with:

{
  "message": "Already processed"
}


Otherwise, the webhook is accepted, and you’ll receive:

{
  "message": "Accepted"
}

3. Get Transaction Status (GET /v1/transactions/{transaction_id})

This endpoint allows you to check the current status of any transaction using its transaction ID.
If the transaction exists, it will return the full transaction details including status, creation time, and the time it was processed.

Example Response:

{
  "transaction_id": "txn_abc123def456",
  "source_account": "acc_user_789",
  "destination_account": "acc_merchant_456",
  "amount": 1500,
  "currency": "INR",
  "status": "PROCESSED",
  "created_at": "2025-10-17T10:30:00Z",
  "processed_at": "2025-10-17T10:30:30Z"
}


If the transaction ID does not exist, the API returns:

{
  "detail": "Transaction not found"
}

Running the Application Locally

To run the application locally, follow the steps below:

Clone the repository:

git clone https://github.com/yourusername/transaction-webhook-service.git
cd transaction-webhook-service


Create and activate a virtual environment:

python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate


Install the required dependencies:

pip install fastapi uvicorn


Start the FastAPI server:

uvicorn main:app --reload


Once started, the API will be available locally at:

http://127.0.0.1:8000

Testing the Endpoints

To verify the application, you can test the following endpoints using curl or a tool like Postman.

1. Test Health Check

curl http://127.0.0.1:8000/


2. Test Webhook Endpoint

curl -X POST http://127.0.0.1:8000/v1/webhooks/transactions \
-H "Content-Type: application/json" \
-d '{"transaction_id":"txn_123","source_account":"acc_1","destination_account":"acc_2","amount":1000,"currency":"INR"}'


3. Check Transaction Status

curl http://127.0.0.1:8000/v1/transactions/txn_123


You’ll first see the transaction in a PROCESSING state and then as PROCESSED after about 30 seconds.

Technical Details

This project is built using FastAPI, a modern, high-performance Python framework for building APIs.
The service uses FastAPI’s BackgroundTasks feature to process transactions asynchronously without delaying responses.
A simulated delay of 30 seconds (asyncio.sleep(30)) has been added to represent time spent interacting with external payment APIs.

At the moment, data is stored in an in-memory dictionary (db), but in a real-world scenario, this should be replaced with a persistent database such as PostgreSQL, MongoDB, or Supabase.

The system also ensures idempotency, meaning duplicate webhook events with the same transaction ID are ignored to prevent reprocessing.


#-----------------------============--------------------------
#
#=============================================================
#
#-----------------------============--------------------------

Front End