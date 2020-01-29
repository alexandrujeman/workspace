from rest_framework import routers
from MODULES_API import views as api_views

router = routers.DefaultRouter()
router.register(r'v1', api_views.ArticleDetail)
