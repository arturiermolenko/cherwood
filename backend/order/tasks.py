import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from celery import shared_task
from django.conf import settings
from django.template.loader import render_to_string
from django.utils.html import strip_tags

from order.models import Order


@shared_task
def send_email(order_id: int) -> None:
    order = Order.objects.get(id=order_id)
    TO = [order.email, settings.EMAIL_HOST_USER]   # send notification to the owner
    FROM = "cherwood@gmail.com"
    message = MIMEMultipart("alternative")
    html_message = render_to_string(
        "email.html",
        {"order": order, "oblast": settings.REGIONS_DICT.get(order.region)}
    )
    plain_message = strip_tags(html_message)
    message.attach(MIMEText(plain_message, "plain"))
    message.attach(MIMEText(html_message, "html"))
    message["Subject"] = "[Cherwood] Order Created!"
    message["From"] = FROM

    server = smtplib.SMTP(settings.EMAIL_HOST, settings.EMAIL_PORT)
    server.ehlo()
    server.starttls()
    server.login(settings.EMAIL_HOST_USER, settings.EMAIL_HOST_PASSWORD)
    server.sendmail(FROM, TO, message.as_string())
    server.close()
