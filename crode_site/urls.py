# crode_site/urls.py
from django.contrib import admin
from django.urls import path
from main import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name='home'),
    path('lab/', views.lab, name='lab'),
    path('projects/', views.projects, name='projects'),
    path('lib/', views.lib, name='lib'),

    # SEO 인프라 라우팅
    path('robots.txt', TemplateView.as_view(template_name="robots.txt", content_type="text/plain")),
    path('sitemap.xml', TemplateView.as_view(template_name="sitemap.xml", content_type="application/xml")),
]