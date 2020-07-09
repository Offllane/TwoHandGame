from django.urls import path
from django.views.generic import DetailView

from . import views
from TwoHandGame.settings import DEBUG, STATIC_URL, MEDIA_URL, MEDIA_ROOT
from django.conf.urls.static import static
from django.contrib.auth import views as authViews


urlpatterns = [
    path('',views.index, name='index')
]


if DEBUG:
    # urlpatterns += static(STATIC_URL, document_root = STATIC_ROOT)
    urlpatterns += static(MEDIA_URL, document_root = MEDIA_ROOT)


'''x-html has doctype manadatory while html doesn't require you to declare doctype
xmlns type is mandatory in html
html, head, body and title is mandatory
must be properly nested
must be properly closed
must be used in lowercase

'''