class AIClaimWriter:
    def generate_claim_summary(self, purchase, benefit):
        product = purchase.product_name or "your item"
        benefit_name = benefit.name
        
        if benefit_name == "Purchase Protection":
            return f"Claim Draft: I am submitting a claim for my {product} purchased on {purchase.purchase_date}. This item is covered under Purchase Protection. Please review the attached receipt."
        elif benefit_name == "Extended Warranty":
            return f"Claim Draft: I am filing an Extended Warranty claim for my {product}. The original manufacturer warranty has expired, and I am requesting coverage for repair/replacement. Attached is the receipt and original warranty document."
        elif benefit_name == "Return Protection":
            return f"Claim Draft: The merchant ({purchase.merchant_name}) refused to accept the return of my {product}. I am filing a Return Protection claim for the amount of ${purchase.amount}."
            
        return f"Claim Draft: I am submitting a {benefit_name} claim for {product}."
