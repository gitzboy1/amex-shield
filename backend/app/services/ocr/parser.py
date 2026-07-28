import random
import datetime

class OCRService:
    def extract_receipt(self, image_file):
        """
        Mock implementation of OCR extraction.
        Returns a dictionary with extracted fields and confidence scores.
        """
        # In a real scenario, this would call Tesseract, Google Vision, Textract, etc.
        
        # Simulate an occasional low confidence read for demonstration
        is_confident = random.random() > 0.3
        
        confidence = 0.95 if is_confident else 0.45
        
        merchants = ["Best Buy", "Apple Store", "Amazon", "Target", "Local Retailer"]
        categories = ["Electronics", "Appliances", "Retail", "Other"]
        products = ["Sony Headphones", "MacBook Pro", "Coffee Maker", "Office Chair"]
        
        data = {
            "merchant_name": {
                "value": random.choice(merchants),
                "confidence": confidence
            },
            "product_name": {
                "value": random.choice(products),
                "confidence": confidence - 0.05
            },
            "category": {
                "value": random.choice(categories),
                "confidence": confidence
            },
            "amount": {
                "value": round(random.uniform(20.0, 1500.0), 2),
                "confidence": confidence
            },
            "purchase_date": {
                "value": datetime.date.today().strftime("%Y-%m-%d"),
                "confidence": confidence
            },
            "overall_confidence": confidence
        }
        
        return data
