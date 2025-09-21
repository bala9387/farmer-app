from fastapi import FastAPI
from pydantic import BaseModel
from typing import Any, Dict, List

app = FastAPI(title="AI Crop ML Service")

# Define input data structure
class Inputs(BaseModel):
    inputs: Dict[str, Any]

# Define route outside the class
@app.post('/predict')
async def predict(payload: Inputs):
    # PoC logic: simple scoring comparing inputs to crop rules
    # Replace with real ML model call (joblib.load / TF / PyTorch)
    pH = payload.inputs.get('pH')
    N = payload.inputs.get('N')
    P = payload.inputs.get('P')
    K = payload.inputs.get('K')

    # Dummy crop list + rules (in real use read from DB or config)
    crops = [
        {"name": "Rice", "pHRange": (5.0, 7.5)},
        {"name": "Wheat", "pHRange": (6.0, 7.5)},
        {"name": "Maize", "pHRange": (5.5, 7.0)},
        {"name": "Groundnut", "pHRange": (5.0, 6.5)}
    ]

    out = []
    for c in crops:
        score = 0.5
        if pH is not None:
            if c['pHRange'][0] <= pH <= c['pHRange'][1]:
                score += 0.4
        # Add simple checks for N/P/K if needed
        out.append({
            "crop": c['name'],
            "score": round(score, 2),
            "reason": "pH matched" if score > 0.8 else "partial match"
        })

    # Sort by score descending
    out = sorted(out, key=lambda x: x['score'], reverse=True)
    return {"recommendations": out}
