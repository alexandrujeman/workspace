"""REST_API URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls import url
from django.urls import include
from . api import router

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/articles/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls')),
    url(r'^auth/', include('djoser.urls')),
    url(r'^auth/', include('djoser.urls.jwt')),
]

### API Endpoints ###
# http://0.0.0.0:8000/api/articles/v1/          # GET, POST
# http://0.0.0.0:8000/api/articles/v1/4/        # GET, PUT, PATCH, DELETE
#
#### Authentication endpoints ####
# /auth/users/	Register a new user
# /auth/users/me/	retrieve/update the currently logged in user
# /auth/jwt/create/	create a JWT by passing a valid user in the post request to this endpoint
# /auth/jwt/refresh/	get a new JWT once the lifetime of the previously generated one expires
# /api/accounts/all-profiles/	get all user profiles and create a new one
# /api/accounts/profile/id/	detail view of a user's profile
