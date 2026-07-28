class AIBenefitInterpreter:
    def generate_explanation(self, purchase, purchase_benefit):
        """
        Mock implementation of AI generation for benefit explanation.
        In production, this would send a prompt to an LLM like OpenAI or Gemini.
        """
        benefit_name = purchase_benefit.benefit.name
        product_name = purchase.product_name or "your item"
        
        days_total = 0
        if purchase_benefit.expiration_date and purchase_benefit.activation_date:
            days_total = (purchase_benefit.expiration_date - purchase_benefit.activation_date).days
        
        expiration_str = purchase_benefit.expiration_date.strftime('%B %d, %Y') if purchase_benefit.expiration_date else "an unspecified date"
        
        if benefit_name == "Purchase Protection":
            return f"Your {product_name} qualifies for Purchase Protection for {days_total} days. Coverage remains active until {expiration_str}. Maximum coverage available is based on your eligible American Express benefit."
        elif benefit_name == "Extended Warranty":
            return f"Great news! Your {product_name} is covered under the Extended Warranty benefit, extending the manufacturer's warranty by up to {days_total} days, until {expiration_str}."
        elif benefit_name == "Return Protection":
            return f"Your {product_name} is eligible for Return Protection. If the merchant won't take it back, you're covered for {days_total} days until {expiration_str}."
        
        return f"Your {product_name} is covered by {benefit_name} until {expiration_str}."
