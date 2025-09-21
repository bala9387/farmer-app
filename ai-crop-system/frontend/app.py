# frontend/app.py
from fastapi import FastAPI
from pydantic import BaseModel
from typing import Any, Dict, List

app = FastAPI(title="AI Crop ML Service")

class Inputs(BaseModel):
    inputs: Dict[str, Any]

@app.post("/predict")
async def predict(payload: Inputs):
    # Extract inputs
    pH = payload.inputs.get("pH")
    N = payload.inputs.get("N")
    P = payload.inputs.get("P")
    K = payload.inputs.get("K")

    # Dummy crop rules
    crops = [
        {"name": "Rice", "pHRange": (5.0, 7.5)},
        {"name": "Wheat", "pHRange": (6.0, 7.5)},
        {"name": "Maize", "pHRange": (5.5, 7.0)},
        {"name": "Groundnut", "pHRange": (5.0, 6.5)}
    ]

    out = []
    for c in crops:
        score = 0.5
        if pH is not None and c["pHRange"][0] <= pH <= c["pHRange"][1]:
            score += 0.4
        out.append({
            "crop": c["name"],
            "score": round(score, 2),
            "reason": "pH matched" if score > 0.8 else "partial match"
        })

    out = sorted(out, key=lambda x: x["score"], reverse=True)
    return {"recommendations": out}
