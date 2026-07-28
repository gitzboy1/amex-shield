from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

class AdvisorView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        product = request.data.get('product', 'your item')
        card = request.data.get('card', '')
        
        if not card:
            return Response({'error': 'Card is required'}, status=status.HTTP_400_BAD_REQUEST)
            
        benefits = []
        
        if card == 'Platinum':
            benefits = [
                {"name": "Extended Warranty", "desc": "Up to 1 extra year", "icon": "shield-check"},
                {"name": "Purchase Protection", "desc": "90 days against damage/theft (up to $10,000)", "icon": "shield-exclamation"},
                {"name": "Return Protection", "desc": "90 days guaranteed return (up to $300)", "icon": "refresh"}
            ]
        elif card == 'Gold':
            benefits = [
                {"name": "Extended Warranty", "desc": "Up to 1 extra year", "icon": "shield-check"},
                {"name": "Purchase Protection", "desc": "90 days against damage/theft (up to $10,000)", "icon": "shield-exclamation"}
            ]
        elif card == 'Everyday':
            benefits = [
                {"name": "Purchase Protection", "desc": "90 days against damage/theft (up to $1,000)", "icon": "shield-exclamation"}
            ]
        else:
            benefits = [
                {"name": "Basic Coverage", "desc": "Standard card protections apply", "icon": "credit-card"}
            ]
            
        return Response({
            'card': card,
            'product': product,
            'benefits': benefits,
            'message': f"Excellent choice! When you purchase {product} with your {card}, you maximize your coverage."
        })
