import configparser
import random

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from eth_account.messages import encode_defunct
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from user_management.models import UserCaptcha, Web3User
from user_management.serializers import Web3UserSerializer
from user_management.validators import LoginPostValidator
from web3.auto import w3


sys_random = random.SystemRandom()
def get_random_string(k=35):
    letters = "abcdefghiklmnopqrstuvwwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
    return ''.join(sys_random.choices(letters, k=k))

# get_captcha
class UserCaptchaView(APIView):
    address_param = openapi.Parameter('web3_address', openapi.IN_QUERY, description="web3 address", type=openapi.TYPE_STRING, required=True)
    
    @swagger_auto_schema(manual_parameters=[address_param])
    def get(self,request,*args,**kwargs):
        content = {}
        # get the address from params
        address = request.GET.get('web3_address')
        # if user not exists
        if not Web3User.objects.filter(web3_address=address).exists():
            # create one
            Web3User(
                web3_address = address
            ).save()
        
        user_obj = Web3User.objects.get(web3_address=address)
        # delete all the old captchas of this user 
        UserCaptcha.objects.filter(user=user_obj).delete()
        # create a new captcha
        captcha = get_random_string()
        # assign it
        user_captcha_obj = UserCaptcha(
            captcha = captcha,
            user=user_obj
        )
        user_captcha_obj.save()

        content["data"] = {"captcha": user_captcha_obj.captcha}
        content["message"] = "successfully executed!"
        return Response(content, status = status.HTTP_200_OK)

# web3_login
class LoginView(APIView):

    @swagger_auto_schema(request_body=LoginPostValidator)
    def post(self,request,*args,**kwargs):
        content = {}
        serializer = LoginPostValidator(data=request.data)
        # check if request data is valid
        if serializer.is_valid():
            data = request.data
            print(data["signature"],data["web3_address"], 111111)
            # check if user exists 
            if Web3User.objects.filter(web3_address=data["web3_address"]).exists():
                user = Web3User.objects.get(web3_address=data["web3_address"])
                # get the captcha from db 
                if UserCaptcha.objects.filter(user=user).exists():
                    captcha = UserCaptcha.objects.get(user=user)
                    message = encode_defunct(text=captcha.captcha)
                    # derive public key using the provided signature and captcha  
                    pub2 = w3.eth.account.recover_message(message, signature=data["signature"])
                    # check if public key matches
                    if user.web3_address == pub2:
                        # create the access token
                        token, created = Token.objects.get_or_create(user=user)
                        UserCaptcha.objects.filter(user=user).delete()
                        serializer = Web3UserSerializer(user)
                        content["data"] = serializer.data
                        content["token"] = token.key
                        return Response(content, status = status.HTTP_200_OK)
                    content["message"] = "signature not valid"
                    return Response(content, status = status.HTTP_400_BAD_REQUEST)
                content["message"] = "captcha not found" 
                return Response(content, status = status.HTTP_400_BAD_REQUEST) 
            content["message"] = "user not yet created"
            return Response(content, status = status.HTTP_400_BAD_REQUEST) 
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST) 

# me
class UserMeView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self,request,*args,**kwargs):
        content = {}
        serializer = Web3UserSerializer(Web3User.objects.get(pk = request.user.id))
        content["data"] = serializer.data
        content["message"] = "successfully fetched!"
        return Response(content, status = status.HTTP_200_OK)

