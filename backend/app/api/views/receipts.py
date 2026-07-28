from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from app.services.ocr.parser import OCRService
from app.models import Purchase
from ..serializers import PurchaseSerializer
import logging

logger = logging.getLogger(__name__)

class ReceiptUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        receipt_file = request.FILES.get('receipt')
        if not receipt_file:
            return Response({'error': 'No receipt image provided'}, status=status.HTTP_400_BAD_REQUEST)
            
        if receipt_file.size > 10 * 1024 * 1024:
            return Response({'error': 'File too large (Max 10MB)'}, status=status.HTTP_400_BAD_REQUEST)
            
        if receipt_file.content_type not in ['image/jpeg', 'image/png']:
            return Response({'error': 'Unsupported file type. Use JPEG or PNG.'}, status=status.HTTP_400_BAD_REQUEST)

        ocr_service = OCRService()
        extracted_data = ocr_service.extract_receipt(receipt_file)
        
        if extracted_data.get('overall_confidence', 0) < 0.8:
            return Response({
                'status': 'review_required',
                'message': 'OCR confidence is low. Please review and correct the extracted fields.',
                'extracted_data': extracted_data
            }, status=status.HTTP_202_ACCEPTED)

        purchase_data = {
            'merchant_name': extracted_data['merchant_name']['value'],
            'product_name': extracted_data['product_name']['value'],
            'category': extracted_data['category']['value'],
            'amount': extracted_data['amount']['value'],
            'purchase_date': extracted_data['purchase_date']['value'],
            'card_used': 'AMEX Platinum'
        }
        
        serializer = PurchaseSerializer(data=purchase_data)
        if serializer.is_valid():
            purchase = serializer.save(user=request.user)
            purchase = Purchase.objects.get(id=purchase.id)
            final_serializer = PurchaseSerializer(purchase)
            
            return Response({
                'status': 'success',
                'message': 'Purchase automatically extracted and benefits applied.',
                'purchase': final_serializer.data
            }, status=status.HTTP_201_CREATED)
            
        return Response({'error': 'Invalid data extracted', 'details': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
