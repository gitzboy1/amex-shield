from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id', 'username', 'email', 'first_name', 'last_name', 
            'phone_number', 'country', 'profile_photo', 'role', 
            'created_at', 'updated_at'
        )
        read_only_fields = ('id', 'created_at', 'updated_at', 'role')

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password_confirm = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = (
            'email', 'password', 'password_confirm', 
            'first_name', 'last_name', 'phone_number'
        )
        
    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError({"password_confirm": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password_confirm')
        user = User.objects.create(
            username=validated_data['email'], # using email as username
            email=validated_data['email'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            phone_number=validated_data.get('phone_number', '')
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, validators=[validate_password])
    new_password_confirm = serializers.CharField(required=True)

    def validate(self, attrs):
        if attrs['new_password'] != attrs['new_password_confirm']:
            raise serializers.ValidationError({"new_password_confirm": "Password fields didn't match."})
        return attrs
class ProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'phone_number', 'country', 'profile_photo')

from app.models import Purchase, Benefit, PurchaseBenefit, Claim, Notification

class BenefitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Benefit
        fields = '__all__'

class PurchaseBenefitSerializer(serializers.ModelSerializer):
    benefit = BenefitSerializer(read_only=True)
    
    class Meta:
        model = PurchaseBenefit
        fields = '__all__'

class PurchaseSerializer(serializers.ModelSerializer):
    benefits = PurchaseBenefitSerializer(many=True, read_only=True)

    class Meta:
        model = Purchase
        fields = '__all__'
        read_only_fields = ('user', 'status', 'created_at', 'updated_at')

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'

class ClaimSerializer(serializers.ModelSerializer):
    purchase = PurchaseSerializer(read_only=True)
    benefit = BenefitSerializer(read_only=True)
    purchase_id = serializers.IntegerField(write_only=True)
    benefit_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Claim
        fields = '__all__'
        read_only_fields = ('user', 'claim_number', 'status', 'ai_draft_summary', 'submitted_at', 'resolved_at', 'created_at', 'updated_at')
