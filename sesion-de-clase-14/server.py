import numpy as np
import tensorflow as tf
from fastapi import FastAPI, Request, Response
from pydantic import BaseModel

app = FastAPI()

model = tf.keras.models.load_model("model/1/model.keras")

def read_csv(csv_text: str):
    """
    Converts CSV text into a numpy array.
    Assumes no header and purely numeric columns.
    """
    return np.array([
        [float(col) for col in row.split(",")]
        for row in csv_text.strip().splitlines()
    ])

class SingleRecord(BaseModel):
    features: list[float]

@app.post("/predict")
async def predict(request: Request):
    """
    Single inference.
    Expects JSON:
    {
        "features": [5.1, 3.5, 1.4, 0.2]
    }
    """
    body = await request.json()
    record = SingleRecord(**body)

    arr = np.array([record.features])  # make it batch-like for TF

    prediction = model.predict(arr).tolist()

    return {"prediction": prediction[0]}


@app.post("/batch-predict")
async def batch_predict(request: Request):
    """
    Batch inference.
    Expects plain/text CSV (content-type: text/csv)
    No headers.
    Example:
    5.1,3.5,1.4,0.2
    6.2,2.8,4.8,1.8
    """
    content_type = request.headers.get("content-type")

    if content_type != "text/csv":
        return Response(
            content='{"error":"content-type must be text/csv"}',
            media_type="application/json",
            status_code=400
        )

    csv_bytes = await request.body()
    csv_text = csv_bytes.decode("utf-8")

    inputs = read_csv(csv_text)

    predictions = model.predict(inputs).tolist()

    return {"predictions": predictions}